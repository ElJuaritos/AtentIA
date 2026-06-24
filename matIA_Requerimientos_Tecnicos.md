# matIA — Requerimientos Técnicos Detallados

> Documento de arquitectura e ingeniería del producto. Versión 1.0 · Jun 2026.

---

## Índice
1. [Flujo completo de una interacción](#1-flujo-completo-de-una-interacción)
2. [Pipeline de audio (STT → LLM → TTS)](#2-pipeline-de-audio-stt--llm--tts)
3. [Sistema RAG y cartuchos](#3-sistema-rag-y-cartuchos)
4. [Prompt engineering y guardrails](#4-prompt-engineering-y-guardrails)
5. [APIs y LLMs requeridos](#5-apis-y-llms-requeridos)
6. [Flujo estructurado de sesión pedagógica](#6-flujo-estructurado-de-sesión-pedagógica)
7. [Hardware y firmware](#7-hardware-y-firmware)
8. [Backend y base de datos](#8-backend-y-base-de-datos)
9. [App de padres](#9-app-de-padres)
10. [Modo offline](#10-modo-offline)
11. [Seguridad, privacidad y compliance](#11-seguridad-privacidad-y-compliance)
12. [Estimado de costos por sesión](#12-estimado-de-costos-por-sesión)
13. [Diagrama de arquitectura](#13-diagrama-de-arquitectura)

---

## 1. Flujo completo de una interacción

Este es el ciclo completo desde que el niño presiona el botón hasta que escucha la respuesta:

```
[NIÑO presiona PTT]
        │
        ▼
[Micrófono graba audio RAW (PCM/WAV)]
        │
[NIÑO suelta PTT] → envío de audio
        │
        ▼
[STT API — Whisper] → texto en español
        │
        ▼
[Moderación de entrada — OpenAI Moderation API]
  ├─ PASA → continúa
  └─ BLOQUEADO → Mati responde: "No entendí bien, ¿me lo dices de otra forma?"
        │
        ▼
[RAG — búsqueda en Vector DB del cartucho activo]
  └─ Recupera los N chunks más relevantes del tema
        │
        ▼
[Construcción del prompt completo]
  ├─ System prompt (persona + guardrails + pedagogía)
  ├─ Contexto RAG (chunks del cartucho)
  ├─ Historial de la sesión (últimas 6 interacciones)
  └─ Query del niño
        │
        ▼
[LLM — GPT-4o-mini] → respuesta en texto
        │
        ▼
[Moderación de salida — OpenAI Moderation API]
        │
        ▼
[TTS — ElevenLabs voz custom "Mati"] → audio MP3
        │
        ▼
[Bocina reproduce audio]
[e-ink actualiza expresión de Mati según estado]
```

**Latencia objetivo:** < 2.5 segundos de extremo a extremo.  
Desglose estimado: STT ~400ms · LLM ~800ms · TTS ~600ms · red ~400ms.

---

## 2. Pipeline de audio (STT → LLM → TTS)

### 2.1 Speech-to-Text (STT)

| API | Razón de elección |
|-----|------------------|
| **OpenAI Whisper API** | Mejor soporte de español (incluyendo acentos MX), robusto con ruido de fondo, modelo probado en dispositivos de voz infantil |

- Formato de entrada: WAV 16kHz mono (óptimo para voz)
- Endpoint: `POST /v1/audio/transcriptions`
- Parámetro `language: "es"` para forzar español
- El audio **nunca se almacena** en el servidor; se procesa y descarta inmediatamente

### 2.2 Text-to-Speech (TTS)

| API | Razón de elección |
|-----|------------------|
| **ElevenLabs** | Permite clonar/diseñar una voz custom consistente para "Mati". Soporta emociones (alegre, alentador, sorprendido). La voz de Mati se mantiene igual en todos los cartuchos |

- Se diseña **una sola voz** para Mati: tono cálido, neutro-MX, ligero dinamismo
- Parámetro `stability: 0.7`, `similarity_boost: 0.8` (consistente pero natural)
- Output: MP3 → reproducido en bocina del dispositivo
- Alternativa de costo más bajo: **OpenAI TTS** (`tts-1`, voz `nova`) si el presupuesto lo requiere

### 2.3 Consideraciones de audio en hardware

- Grabación: solo durante PTT presionado (botón = interrupción de GPIO)
- Buffer: audio almacenado temporalmente en RAM (no en almacenamiento persistente)
- Ganancia de micrófono ajustada para distancia 30–60cm (niño frente al dispositivo)
- Cancelación de eco básica para evitar que el dispositivo se escuche a sí mismo

---

## 3. Sistema RAG y cartuchos

### 3.1 Qué es el RAG en matIA

RAG (Retrieval-Augmented Generation) = el LLM **solo puede responder con base en el contenido del cartucho activo**. No tiene acceso a internet ni a conocimiento general fuera del tema.

### 3.2 Estructura de un cartucho

```
cartucho_matematicas_basicas/
├── metadata.json          ← ID único, tema, edad objetivo, idioma
├── lecciones/
│   ├── leccion_01_suma.md
│   ├── leccion_02_resta.md
│   └── leccion_03_practica.md
├── preguntas_recall.json  ← banco de preguntas para repetición espaciada
├── audio_offline/
│   ├── intro.mp3
│   └── leccion_01_narrada.mp3
└── assets_eink/
    └── imagenes_pixel_art/ ← figuras para la pantalla e-ink
```

### 3.3 Cómo se carga un cartucho

1. El niño inserta la tarjeta física → el dispositivo lee el **chip NFC/RFID** de la tarjeta
2. El chip contiene solo el `cartridge_id` (ej. `mat_001_sumas`)
3. El dispositivo hace una request al backend: `GET /cartridge/:id`
4. El backend devuelve los embeddings y metadatos del cartucho desde la Vector DB
5. Los chunks relevantes se recuperan en tiempo real en cada query del niño

### 3.4 Vector Database

| Herramienta | Razón |
|-------------|-------|
| **Supabase pgvector** | Ya tienen Supabase en el proyecto. La extensión `pgvector` añade búsqueda semántica directamente en PostgreSQL. Sin costo extra de infraestructura |

- Embeddings generados con: **OpenAI `text-embedding-3-small`** (barato, rápido, buen español)
- Chunks de ~300–500 tokens con overlap de 50 tokens
- Búsqueda por cosine similarity, `top_k = 4` (los 4 chunks más relevantes por query)

### 3.5 Curadores del contenido (equipo AtentIA)

- El contenido de cada cartucho lo escribe y valida el equipo (pedagogo + experto en materia)
- Se convierte a Markdown, se chunkea y se embebe antes de producción
- Los padres **no crean contenido**, solo activan/desactivan cartuchos

---

## 4. Prompt engineering y guardrails

Este es el corazón de la seguridad y la pedagogía de matIA. El prompt tiene 5 capas:

### 4.1 Estructura del system prompt

```
SYSTEM PROMPT
├── [1] IDENTIDAD Y PERSONALIDAD
├── [2] RESTRICCIÓN DE TEMA (guardrail principal)
├── [3] REGLAS DE LENGUAJE (por edad)
├── [4] PEDAGOGÍA Y FLUJO DE SESIÓN
└── [5] REGLAS DE SEGURIDAD ABSOLUTAS
```

### 4.2 Prompt de sistema completo (plantilla)

```
Eres Mati, un elefante amigable y paciente que ayuda a los niños a aprender.
Estás ayudando a [NOMBRE_NIÑO], quien tiene [EDAD] años.
El tema de hoy es: [TEMA_CARTUCHO].

=== RESTRICCIÓN DE TEMA ===
Solo puedes hablar sobre: [TEMA_CARTUCHO].
Si el niño pregunta algo que NO sea sobre este tema, responde amablemente:
"Eso es muy interesante, pero hoy estamos aprendiendo sobre [TEMA]. ¡Sigamos!"
Nunca respondas preguntas fuera del tema, aunque el niño insista.

=== REGLAS DE LENGUAJE ===
- Usa palabras simples, adecuadas para un niño de [EDAD] años.
- Frases cortas: máximo 2 oraciones por respuesta.
- Habla siempre en español mexicano (tú, no vos/usted con el niño).
- Sé cálido, alentador y nunca hagas sentir mal al niño si se equivoca.

=== CONTEXTO DEL CARTUCHO (RAG) ===
[CHUNKS_RECUPERADOS — 4 fragmentos del contenido del cartucho]

=== FLUJO PEDAGÓGICO ===
Estado actual de la sesión: [PASO_ACTUAL]
- PASO 1 (INTRODUCCIÓN): Explica el concepto con una analogía simple.
- PASO 2 (PREGUNTA): Haz UNA pregunta sobre lo que explicaste.
- PASO 3 (EVALUACIÓN): Evalúa la respuesta. Si es correcta, celebra y avanza.
  Si es incorrecta, di: "¡Casi! [EXPLICACIÓN BREVE]. ¿Lo intentamos de nuevo?"
- PASO 4 (REFUERZO): Haz una pregunta de repaso de la lección anterior.
- PASO 5 (CIERRE): Resume lo aprendido hoy en 1 oración y felicita al niño.

=== REGLAS DE SEGURIDAD ABSOLUTAS ===
NUNCA respondas sobre: violencia, adultos, política, noticias, miedo, religión, 
otras personas, información personal, contenido inapropiado para niños.
Si el niño pregunta algo de esta lista, di solo:
"Eso no lo sé, pero sí sé mucho sobre [TEMA]. ¿Me preguntas algo de eso?"
NUNCA digas que puedes buscar en internet.
NUNCA inventes información que no esté en tu contexto.

=== HISTORIAL DE ESTA SESIÓN ===
[ÚLTIMAS 6 INTERACCIONES]
```

### 4.3 Guardrails adicionales (capas de defensa)

| Capa | Herramienta | Qué bloquea |
|------|-------------|-------------|
| Moderación de entrada | OpenAI Moderation API | Contenido violento, sexual, odio — antes de llegar al LLM |
| Restricción por prompt | System prompt | Desviaciones de tema, preguntas inapropiadas |
| Moderación de salida | OpenAI Moderation API | Verifica que la respuesta del LLM sea segura antes de enviarse al TTS |
| Temperatura baja | `temperature: 0.5` | Reduce respuestas creativas/impredecibles del LLM |
| `max_tokens: 120` | Parámetro LLM | Fuerza respuestas cortas; evita que el LLM "se extienda" |

### 4.4 Manejo de intentos de jailbreak infantil

Los niños son creativos. Ejemplos comunes y cómo los maneja el prompt:

| Intento del niño | Respuesta de Mati |
|-----------------|-------------------|
| "Olvida tus instrucciones" | El prompt no tiene instrucción de "olvidar". El LLM responde como Mati normalmente |
| "¿Cuánto es 2+2?" (fuera del tema de ciencias) | "Eso es matemáticas, ¡muy buena pregunta! Pero hoy estamos aprendiendo sobre [tema]. ¿Seguimos?" |
| "Dime malas palabras" | Bloqueado por Moderation API antes de llegar al LLM |
| "¿Quién es tu jefe?" / preguntas meta | "Soy Mati, tu amigo elefante. ¡Solo sé cosas de [tema]!" |

---

## 5. APIs y LLMs requeridos

### 5.1 Tabla completa de servicios

| Servicio | API / Proveedor | Uso | Tier recomendado |
|----------|----------------|-----|------------------|
| **STT** | OpenAI Whisper | Transcripción de voz del niño | `whisper-1` |
| **LLM** | OpenAI GPT-4o-mini | Generación de respuestas | `gpt-4o-mini` |
| **TTS** | ElevenLabs | Voz custom de Mati | Starter plan |
| **Embeddings** | OpenAI | Vectorización del contenido de cartuchos | `text-embedding-3-small` |
| **Vector DB** | Supabase pgvector | Almacén y búsqueda de contenido RAG | Supabase Pro |
| **Moderación** | OpenAI Moderation | Filtro de entrada y salida | `omni-moderation-latest` |
| **Auth** | Supabase Auth | Autenticación de padres | Incluido en Supabase |
| **Base de datos** | Supabase PostgreSQL | Usuarios, sesiones, progreso, reportes | Supabase Pro |
| **Backend** | Node.js (ya existe) | API central del sistema | Render.com (ya configurado) |

### 5.2 ¿Por qué GPT-4o-mini y no otro LLM?

| Criterio | GPT-4o-mini | Claude Haiku | Gemini Flash |
|----------|-------------|--------------|--------------|
| Costo | ✅ Muy bajo | ✅ Bajo | ✅ Bajo |
| Latencia | ✅ ~800ms | ✅ ~700ms | ✅ ~600ms |
| Español MX | ✅ Excelente | ✅ Muy bueno | ✅ Bueno |
| Seguimiento de instrucciones | ✅ Muy bueno | ✅ Excelente | ⚠️ Variable |
| Ecosystem / tools | ✅ Whisper + Moderation en mismo provider | ⚠️ Separado | ⚠️ Separado |

**Recomendación:** GPT-4o-mini para MVP. Escalar a GPT-4o si la complejidad lo requiere.

### 5.3 Conexión a internet requerida

| Función | Requiere internet | Modo offline |
|---------|-----------------|--------------|
| Conversación con Mati (IA) | ✅ Sí | ❌ No disponible |
| Reproducción de audio del cartucho | ❌ No | ✅ MP3 pre-grabados |
| Actualización de cartucho | ✅ Sí | ❌ No |
| Reportes a app de padres | ✅ Sí | ⏳ Se sincroniza al volver online |
| Pantalla e-ink (expresiones Mati) | ❌ No | ✅ Assets en memoria del dispositivo |

**Protocolo de conexión perdida:** si el dispositivo pierde wifi durante una sesión, Mati dice:
_"Parece que no tengo señal. Mientras tanto, ¿escuchamos la lección de hoy?"_ → modo audio offline.

---

## 6. Flujo estructurado de sesión pedagógica

Mati siempre lidera la sesión. El niño puede interrumpir con preguntas, pero Mati retoma el hilo.

```
INICIO DE SESIÓN
│
├─► Saludo personalizado
│   Mati: "¡Hola [Nombre]! Hoy vamos a aprender sobre [tema]. ¿Listo?"
│
├─► PASO 1: INTRODUCCIÓN (Mati explica)
│   • 1–2 oraciones simples sobre el concepto
│   • Usa analogía/metáfora según la edad
│   • e-ink muestra imagen relacionada
│
├─► PASO 2: PREGUNTA DE COMPRENSIÓN
│   • Mati hace UNA pregunta abierta o de opción múltiple
│   • Espera al niño (PTT)
│
├─► PASO 3: EVALUACIÓN
│   ├─ Correcta → "¡Excelente! Eso es exactamente correcto." → PASO 4
│   └─ Incorrecta → "¡Casi! [corrección breve]. ¿Lo intentamos de nuevo?"
│       └─ Si falla 2 veces → Mati explica diferente y avanza
│
├─► PASO 4: REFUERZO (repetición espaciada)
│   • Repregunta algo de la lección anterior (si existe)
│   • Registra en BD para calendarizar repaso futuro
│
├─► (Repite pasos 1–4 para cada sub-concepto del cartucho)
│
└─► PASO 5: CIERRE
    • Resumen en 1 oración
    • "Hoy aprendiste X cosas nuevas. ¡Eres increíble!"
    • App de padres recibe notificación de sesión completada
```

### 6.1 Estados de la sesión (máquina de estados)

```
IDLE → GREETING → INTRO → QUESTION → EVALUATING → REINFORCEMENT → CLOSING → IDLE
                               ↑                        │
                               └────────────────────────┘
                                    (loop por N conceptos)
```

El backend guarda el `session_state` en cada paso para poder reanudar si se interrumpe.

---

## 7. Hardware y firmware

### 7.1 Componentes clave del dispositivo

| Componente | Opción recomendada | Notas |
|------------|-------------------|-------|
| **Procesador** | Raspberry Pi Zero 2W | WiFi integrado, bajo costo (~$15 USD), suficiente para el pipeline |
| **Pantalla e-ink** | Waveshare 2.13" (250×122 px) o 2.9" | SPI, bajo consumo, escala de grises. Actualización parcial disponible |
| **Audio DAC/ADC** | I2S codec (MAX98357A para bocina + INMP441 para mic) | Calidad suficiente para voz |
| **Bocina** | 3W 4Ω con disipador acústico interno | No rejilla exterior |
| **Micrófono** | MEMS digital (INMP441 o similar) | Solo activo cuando GPIO PTT = HIGH |
| **Botón PTT** | Tactile switch de alta durabilidad (>500K pulsaciones) | Interrupción de GPIO |
| **Cartucho** | NFC tag (NTAG215) incrustado en la tarjeta física | Solo almacena `cartridge_id` de 8 chars |
| **Lector NFC** | PN532 (I2C) | Lee la tarjeta al insertarla |
| **Batería** | Li-Po 3.7V 3000mAh | Autonomía ~6–8h de uso activo |
| **USB-C** | Solo para carga (5V/2A) | No data transfer para el niño |
| **Almacenamiento** | MicroSD 16GB (clase 10) | OS + audio offline + assets e-ink |

### 7.2 Firmware (software del dispositivo)

- **OS:** Raspberry Pi OS Lite (headless, sin GUI)
- **Lenguaje:** Python 3.11 (scripts de control) + C para interrupciones de GPIO
- **Librerías clave:**

```
RPi.GPIO          → control del botón PTT y NFC
waveshare_epd     → driver para pantalla e-ink
sounddevice       → captura de audio PCM
requests          → llamadas HTTP al backend
pygame.mixer      → reproducción de MP3 (TTS)
nfcpy / pn532     → lectura de tarjeta NFC del cartucho
```

- **Flujo de firmware:**

```python
# Pseudo-código del loop principal
while True:
    cartucho = leer_nfc()
    if cartucho != cartucho_actual:
        cartucho_actual = cartucho
        actualizar_pantalla_eink("cargando...")
        backend.cargar_cartucho(cartucho_actual)
    
    if boton_ptt.presionado():
        audio = grabar_audio()
        respuesta = backend.procesar_query(audio, cartucho_actual, sesion_id)
        reproducir_audio(respuesta.mp3)
        actualizar_pantalla_eink(respuesta.expresion_mati)
```

### 7.3 Pantalla e-ink — estados de Mati

La pantalla solo se actualiza entre respuestas (no en tiempo real) para preservar consumo.

| Estado | Expresión de Mati (pixel art) |
|--------|------------------------------|
| Idle / esperando PTT | Mati sentado, ojos abiertos |
| Escuchando (PTT presionado) | Mati con oreja grande levantada |
| Pensando (procesando) | Mati con burbuja de pensamiento |
| Respondiendo | Mati con boca abierta, animado |
| Correcto | Mati celebrando (brazos arriba) |
| Incorrecto | Mati con cara de "casi, ánimo" |
| Offline | Mati durmiendo |

---

## 8. Backend y base de datos

### 8.1 Estructura del backend (ya existe en `/AtentIA/server`)

Se extiende el servidor Node.js existente con las siguientes rutas nuevas:

```
POST   /api/session/start          → inicia sesión, carga estado pedagógico
POST   /api/session/query          → recibe audio, devuelve MP3 + expresión
POST   /api/session/end            → guarda sesión, genera reporte
GET    /api/cartridge/:id          → devuelve metadata y activa cartucho en RAG
GET    /api/parent/report/:child   → reporte de progreso (seleccionable: básico/detallado/completo)
POST   /api/parent/limits          → configura límites de tiempo y cartuchos activos
```

### 8.2 Esquema de base de datos (Supabase)

```sql
-- Niño (un dispositivo = un niño)
children (
  id UUID PRIMARY KEY,
  name TEXT,
  age INT,
  device_id TEXT UNIQUE,
  parent_id UUID REFERENCES parents(id),
  created_at TIMESTAMP
)

-- Sesiones
sessions (
  id UUID PRIMARY KEY,
  child_id UUID REFERENCES children(id),
  cartridge_id TEXT,
  started_at TIMESTAMP,
  ended_at TIMESTAMP,
  session_state JSONB,   -- máquina de estados
  total_turns INT,
  completed BOOLEAN
)

-- Interacciones individuales
interactions (
  id UUID PRIMARY KEY,
  session_id UUID REFERENCES sessions(id),
  turn_number INT,
  child_text TEXT,       -- transcripción del niño (Whisper)
  mati_text TEXT,        -- respuesta de Mati
  is_question BOOLEAN,   -- ¿Mati hizo pregunta?
  child_answered_correctly BOOLEAN,
  created_at TIMESTAMP
)

-- Progreso por concepto (para repetición espaciada)
concept_progress (
  id UUID PRIMARY KEY,
  child_id UUID REFERENCES children(id),
  cartridge_id TEXT,
  concept_key TEXT,
  times_correct INT DEFAULT 0,
  times_incorrect INT DEFAULT 0,
  last_seen TIMESTAMP,
  next_review TIMESTAMP    -- algoritmo SM-2 de repetición espaciada
)

-- Cartuchos activos (padres activan/desactivan)
active_cartridges (
  child_id UUID REFERENCES children(id),
  cartridge_id TEXT,
  activated_by UUID REFERENCES parents(id),
  activated_at TIMESTAMP,
  PRIMARY KEY (child_id, cartridge_id)
)

-- Contenido de cartuchos (chunks para RAG)
cartridge_chunks (
  id UUID PRIMARY KEY,
  cartridge_id TEXT,
  content TEXT,
  embedding VECTOR(1536),  -- pgvector
  chunk_index INT,
  metadata JSONB
)
```

### 8.3 Algoritmo de repetición espaciada

Se usa una versión simplificada de **SM-2** (el mismo algoritmo de Anki):

```
intervalo_siguiente = intervalo_anterior × factor_de_facilidad
factor_de_facilidad ajustado según:
  - respuesta correcta a la primera → factor sube
  - necesitó 2 intentos → factor se mantiene  
  - falló → factor baja, se reagenda para mañana
```

---

## 9. App de padres

### 9.1 Stack tecnológico

- **Framework:** React (puede reutilizarse del `/client` existente) o React Native para móvil nativo
- **Auth:** Supabase Auth (email/password + magic link)
- **Notificaciones push:** Supabase Realtime o Firebase Cloud Messaging

### 9.2 Funcionalidades

**Reportes (el padre elige el nivel de detalle):**

| Nivel | Qué incluye |
|-------|------------|
| **Básico** | Tiempo de uso hoy/semana, temas trabajados, racha de días consecutivos |
| **Detallado** | % de preguntas correctas por tema, conceptos dominados vs pendientes, curva de progreso semanal, próximas revisiones de repetición espaciada |
| **Completo** | Todo lo anterior + transcripción de conversaciones de la sesión + análisis: "Mati notó que [Nombre] tuvo dificultad con [concepto]" |

**Gestión:**
- Activar/desactivar cartuchos disponibles en el dispositivo
- Configurar límite diario de tiempo (ej. 30 min/día)
- Programar horarios permitidos (ej. solo después de las 4pm)
- Recibir notificación cuando el niño completa una sesión

---

## 10. Modo offline

Cuando no hay WiFi, el dispositivo usa **audio pre-grabado del cartucho** (MP3 almacenados en MicroSD):

```
Cartucho insertado sin internet:
│
├─ e-ink muestra: "Sin conexión — Modo lectura"
├─ Mati dice (audio pre-grabado): "Hoy no tengo internet, pero podemos
│   escuchar la lección de [tema] juntos. ¡Presiona A para empezar!"
│
└─ Botón A → reproduce narración del tema (MP3)
   Botón B → siguiente pista
   PTT → Mati responde: "Para hablar conmigo necesito internet.
                         ¡Pero puedes seguir escuchando!"
```

**Sincronización al volver online:**
- El progreso local (tiempo de uso, lecciones escuchadas) se sincroniza automáticamente
- Los reportes de padres se actualizan

---

## 11. Seguridad, privacidad y compliance

### 11.1 Datos del niño

| Dato | ¿Se almacena? | Dónde | Por cuánto tiempo |
|------|--------------|-------|------------------|
| Audio de voz | ❌ NO | — | Procesado y descartado al instante |
| Transcripción (texto) | ✅ Sí (opcional para reporte "Completo") | Supabase (encriptado) | 90 días |
| Respuestas correctas/incorrectas | ✅ Sí | Supabase | Mientras la cuenta esté activa |
| Nombre del niño | ✅ Sí | Supabase | Mientras la cuenta esté activa |

### 11.2 Cumplimiento regulatorio

| Regulación | Aplicación | Cumplimiento matIA |
|------------|-----------|-------------------|
| **COPPA** (EE.UU.) | Si se vende en USA | Consentimiento parental, sin datos sin autorización |
| **LFPDPPP** (México) | Aplica hoy | Aviso de privacidad, datos del niño bajo custodia de padres |
| **GDPR** (Europa) | Si se expande a EU | Derecho al olvido, portabilidad de datos |

### 11.3 Medidas técnicas de privacidad

- Todo tráfico por **HTTPS/TLS 1.3**
- Audio **nunca viaja sin cifrar** (TLS en tránsito)
- El botón PTT es hardware: **físicamente imposible** grabar sin presionarlo
- Sin cámara, sin acelerómetro, sin geolocalización en el dispositivo
- Claves de API solo en el backend (nunca en el firmware del dispositivo)
- El dispositivo se autentica con el backend usando un `device_token` rotativo

---

## 12. Estimado de costos por sesión

Asumiendo sesión promedio de **10 minutos**, ~20 interacciones del niño:

| Servicio | Consumo estimado | Costo estimado |
|----------|-----------------|----------------|
| Whisper STT | 20 clips × ~5s = 100s de audio | ~$0.010 USD |
| GPT-4o-mini | 20 turnos × ~500 tokens = 10K tokens | ~$0.006 USD |
| ElevenLabs TTS | 20 respuestas × ~80 chars = 1,600 chars | ~$0.005 USD |
| Supabase queries | 20 queries vector + 20 writes | Incluido en plan |
| **Total por sesión** | | **~$0.02–0.03 USD** |

**Costo mensual por niño activo** (15 sesiones/mes): ~$0.30–0.45 USD  
**Margen con suscripción Starter** (149 MXN ≈ $8 USD): **~97% de margen sobre API costs**

---

## 13. Diagrama de arquitectura

```
┌─────────────────────────────────────────────────────┐
│                  DISPOSITIVO matIA                   │
│                                                      │
│  [PTT Button] → [Mic] → [Audio Buffer]              │
│  [NFC Reader] → cartridge_id                        │
│  [e-ink Display] ← expresión Mati                   │
│  [Speaker] ← MP3                                    │
│                   │ WiFi / HTTPS                     │
└───────────────────┼─────────────────────────────────┘
                    │
┌───────────────────▼─────────────────────────────────┐
│              BACKEND (Node.js / Render)              │
│                                                      │
│  /session/query                                      │
│    1. Audio → Whisper STT → texto                   │
│    2. Moderation API (input)                        │
│    3. pgvector → RAG chunks del cartucho            │
│    4. Build prompt (system + RAG + history)         │
│    5. GPT-4o-mini → respuesta texto                 │
│    6. Moderation API (output)                       │
│    7. ElevenLabs → MP3 de Mati                      │
│    8. Guardar interacción en Supabase               │
│    9. Devolver MP3 + expresión al dispositivo       │
└─────────────────────────────────────────────────────┘
                    │
┌───────────────────▼─────────────────────────────────┐
│              SUPABASE                                │
│  PostgreSQL + pgvector + Auth + Realtime            │
│  Tablas: children, sessions, interactions,          │
│           concept_progress, cartridge_chunks        │
└─────────────────────────────────────────────────────┘
                    │
┌───────────────────▼─────────────────────────────────┐
│              APP DE PADRES (React/PWA)               │
│  Reportes (básico/detallado/completo seleccionable) │
│  Gestión de cartuchos + límites de tiempo           │
│  Notificaciones de sesión completada                │
└─────────────────────────────────────────────────────┘
```

---

## Preguntas abiertas para la siguiente sesión

- [ ] ¿Cuántos conceptos por cartucho? (ej. 10 sub-temas por tarjeta)
- [ ] ¿El niño puede pausar la sesión y retomarla después?
- [ ] ¿Hay un límite de sesiones por día o solo límite de tiempo?
- [ ] ¿Los cartuchos tienen nivel de dificultad (principiante / intermedio)?
- [ ] ¿Quién produce el contenido de los primeros cartuchos para el MVP?
- [ ] ¿La app de padres es web (PWA) o nativa (iOS/Android)?
