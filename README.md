# matIA / AtentIA — Documento de traspaso de contexto

> **Uso:** Pega el [PROMPT DE INICIO](#prompt-de-inicio) en un chat nuevo. El resto es la memoria del proyecto.

---

## 1. Quién soy y el contexto del proyecto

| Campo | Detalle |
|-------|---------|
| **Equipo** | Multidisciplinario de bootcamp de emprendimiento del ITAM |
| **Premio** | El equipo ganador va al MIT (Delta V demo day). El pitch final es en **inglés** ante un jurado calificado |
| **Empresa** | AtentIA |
| **Producto** | matIA |
| **Estado actual** | Customer discovery (Disciplined Entrepreneurship de Aulet, Pasos 1–5) + construcción de MVP/prototipo, documentos y estudio de mercado |
| **Preferencia de estilo** | Respuestas concisas y directas, sin relleno |

---

## 2. Qué es matIA (definición del producto)

**Consola educativa audio-first** con tutor de IA para niños de **5 a 10 años**. Estilo retro (Game Boy / Yoto). Pantalla-cero de entretenimiento; el aprendizaje es activo y medible.

### Forma y diseño

- Dispositivo físico tipo juguete, **sellado**, colores **navy** (`#2A3C86`) + **naranja** (`#FF7A14`)
- **Pantalla e-ink** (tinta electrónica, tipo Kindle) en escala de grises — **NO emite luz**, cuida la vista, bajo consumo. Solo apoyo visual al audio; aquí "vive" **Mati** (mascota elefante en pixel art)

### Audio-first

- El niño aprende **escuchando y conversando** con la IA
- Bocina + jack 3.5 mm + micrófono
- **Botón Push-to-Talk (privacidad):** el micrófono **SOLO** escucha mientras el niño mantiene presionado el botón. Sin escucha pasiva / "siempre encendido". **Argumento clave de seguridad**

### Modelo híbrido online/offline (estilo cartucho)

- Contenido pre-autorado funciona **offline** (como un ROM de Game Boy)
- La IA generativa "viva" funciona **online** desde la nube
- **Tarjetas-cartucho físicas** = cargan un tema, acotan a la IA, coleccionables, curadas por los padres

### IA acotada (RAG)

- Responde solo sobre el contenido curado, **sin web abierta**, filtros por edad
- Conversaciones que **terminan**, no que enganchan (sin mecánicas de "brain rot")

### Hardware y controles

- **Carcasa sellada** (sin rejillas, para que no entren migajas/líquidos) con disipador interno (heat sink) en lugar de ventilación
- **Sin cámara**
- Controles físicos: cruceta (D-pad), botones A/B, Start/Select, perilla de volumen con tope seguro, esquineros de protección, puertos USB-C + jack 3.5 mm

### App de padres

- Curan materias/temas
- Ponen límites de tiempo
- Reciben reportes de aprendizaje

### Pedagogía

- Recall activo, repetición espaciada, reforzadores éticos
- **Regla:** se premia terminar, no empezar

### Modelo de negocio (precios ilustrativos)

| Concepto | Precio |
|----------|--------|
| Dispositivo | ~1,499 MXN (one-time) |
| Suscripción Starter | 149 MXN/mes (1 lección activa) |
| Suscripción Unlimited | 299 MXN/mes (hasta 3 lecciones + IA avanzada) |

**Beachhead:** hogares premium en México (CDMX) → media → Latinoamérica (ventaja de contenido en español).

---

## 3. Estudio de mercado (TAM/SAM/SOM) — cifras 2024–2025

| Métrica | Valor | Notas |
|---------|-------|-------|
| **TAM** | ≈ 187 mil M USD | EdTech global (Grand View Research) |
| **TAM operativo** | ≈ ~18 mil M USD | Juguetes inteligentes 14.4 mil M + tutores de IA 3.55 mil M; crece doble dígito |
| **SAM** | ≈ 3.2 mil M USD | Reproductores de audio para niños (Marketintelo). Validado: Tonies ~519 M USD (2024, +33%) y Yoto ~128 M USD (2024, +86%) |
| **SOM (México premium)** | EdTech MX 4.4 mil M USD (2024) → 14.4 mil M (2033, CAGR 12.8%; IMARC) | ~12.9 M niños 6–11 (CONAPO/INEGI 2024). Techo premium ~165 M USD/año; captura temprana ~1.9–3.8 M USD/año |

> **Cuidado:** las cifras varían mucho entre firmas; presentarlas como **rangos con fuente**.

### Competidores y diferenciación (dónde gana matIA)

| Competidor | Limitación | Ventaja de matIA |
|------------|------------|------------------|
| **Yoto / Tonies / Storypod** | Audio pasivo, sin pantalla | Tutor de IA + recall + medición + reportes |
| **Miko, Curio/Grok, Echo Dot Kids** | Señalados en 2025 por Fairplay, U.S. PIRG, NBC, CNN por escucha permanente y datos de menores | Push-to-talk + IA acotada + curado por padres |
| **Moxie/Embodied** (quebró ene-2025) | Dependía 100% de la nube | Continuidad offline (cartucho) |
| **Khanmigo / Synthesis** | Tutores software en tablet/teléfono = vuelven a la pantalla | Dispositivo dedicado sin pantalla |
| **Casi todos** | — | Español primero, currículo MX, precio MX |

**Posicionamiento:**

> *"matIA = la forma sin pantalla de Yoto + la inteligencia de un tutor de IA + la seguridad que los juguetes de IA no tienen — en español y para México."*

---

## 4. Evidencia de respaldo (para el pitch)

### Investigación scrolling/memoria

- **NO** hay evidencia causal robusta de daño a memoria a largo plazo
- **SÍ** evidencia indirecta: codificación superficial por atención dividida, descarga/efecto Google, desplazamiento del sueño
- Decir **"se asocia con"**, no **"provoca"**
- Fuentes peer-reviewed: Science (Sparrow 2011), PNAS (Uncapher 2018), Psychonomic Bulletin & Review (2015), Nature Sci Reports (2025), etc.

### Sondeo PROFECO (2018, CDMX, n=408, niños 3–12)

| Dato | Cifra |
|------|-------|
| Celular | 81% |
| Tableta | 57% |
| Empezó antes de los 7 | ~67% |
| Uso mayormente pasivo (videos+juegos) | ~68% |
| Control parental | solo 24% (50% no tiene, 21% no lo conoce) |
| Riesgo #1 percibido: contenido inapropiado | 33.7% |
| Riesgo #2 percibido: adicción | 21.3% |
| Compró dispositivo como regalo | 55% (46% Navidad/Reyes) |
| Decisión de compra la toma el padre | 59% |

> **Caveat:** 2018, CDMX, pre-pandemia.

---

## 5. Archivos en la carpeta del proyecto (BootCamp)

| Archivo | Descripción |
|---------|-------------|
| `matIA_Prototipo_3D.html` | Modelo 3D interactivo (Three.js r128). Estado: pantalla e-ink, push-to-talk, sin placa madre, carcasa sellada, cartucho, dispositivo centrado |
| `matIA_Prototipo_CODIGO.txt` | El mismo HTML como texto para copiar/pegar en la landing |
| `Estudio_Mercado_matIA.docx` | Estudio TAM/SAM/SOM + competidores + APA |
| `matIA_Concepto_Producto.docx` | Concepto de producto |
| `matIA_Pitch_Deck_v3.pptx` | Deck (12 slides) |
| *Otros* | Documentos de pasos 1–5, estrategia de entrevistas, etc. |

---

## 6. Notas técnicas / aprendizajes

- El modelo 3D se codifica **sin poder ver el render WebGL** (no hay preview) → León es "los ojos": revisa en Chrome/Edge
- Three.js r128 desde cdnjs. **No usar** `THREE.CapsuleGeometry` (no existe en r128)
- Docs vía skills (docx/pptx/xlsx). Estudio de mercado hecho con docx + validación + QA visual (PDF→imagen)

### Pendientes ofrecidos (no hechos aún)

- [ ] Ficha técnica de hardware
- [ ] Encuesta a padres propia
- [ ] Guion de narración del pitch
- [ ] Reflejar push-to-talk y e-ink en el deck/concepto
- [ ] Convertir el estudio de mercado en 2–3 slides

---

## PROMPT DE INICIO

> Pega esto en un chat nuevo:

```
Hola Claude. Continúo un proyecto de emprendimiento; aquí está todo el contexto. Léelo y confírmame que lo tienes antes de empezar.

SOY: León, equipo de bootcamp del ITAM. Empresa AtentIA, producto matIA. El ganador va al MIT (Delta V); el pitch final es en INGLÉS ante jurado. Prefiero respuestas concisas y directas.

PRODUCTO matIA: consola educativa audio-first con tutor de IA para niños de 5 a 10 años, estilo retro (Game Boy/Yoto). Pantalla e-ink (tipo Kindle, sin luz). Botón push-to-talk (mic solo al presionar = privacidad). Modelo híbrido: contenido offline tipo cartucho (tarjetas físicas) + IA generativa online. IA acotada (RAG, sin web abierta), sin cámara, carcasa sellada con disipador. App de padres con reportes de aprendizaje. Pedagogía: recall activo + repetición espaciada, sin mecánicas de brain rot. Precio: dispositivo ~1,499 MXN + suscripción Starter 149/Unlimited 299 MXN/mes. Beachhead: hogares premium en México.

MERCADO: TAM ~187 mil M USD (EdTech global); TAM operativo ~18 mil M (juguetes inteligentes + tutores IA). SAM ~3.2 mil M USD (audio para niños; validado por Tonies ~519M y Yoto ~128M en 2024). SOM México premium: EdTech MX 4.4 mil M (2024), ~12.9M niños 6-11; captura temprana ~1.9-3.8M USD/año.

DIFERENCIACIÓN: vs Yoto/Tonies (audio pasivo) → matIA enseña y mide; vs juguetes de IA Miko/Curio (señalados por Fairplay/PIRG/NBC 2025 por escucha permanente) → matIA tiene push-to-talk e IA acotada; vs Moxie (quebró, dependía de nube) → matIA funciona offline; vs Khanmigo/Synthesis (software en pantalla) → matIA es dispositivo sin pantalla; ventaja: español/MX.

EVIDENCIA: scrolling se "asocia con" (no "provoca") peor atención/memoria — evidencia mayormente correlacional. PROFECO 2018: control parental solo 24%, riesgo #1 percibido contenido inapropiado 33.7% y adicción 21.3%.

ARCHIVOS YA CREADOS (carpeta BootCamp): matIA_Prototipo_3D.html (modelo 3D Three.js con e-ink + push-to-talk, sin placa madre), Estudio_Mercado_matIA.docx, matIA_Concepto_Producto.docx, matIA_Pitch_Deck_v3.pptx.

NOTA TÉCNICA: el modelo 3D se codifica sin poder ver el render WebGL; yo reviso en Chrome. Three.js r128 (no usar CapsuleGeometry).

MI SIGUIENTE PETICIÓN ES: [escribe aquí lo que necesitas]
```
