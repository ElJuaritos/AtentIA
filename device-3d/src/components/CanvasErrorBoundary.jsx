/**
 * Captura errores de WebGL/R3F para evitar pantalla en blanco silenciosa.
 */
import { Component } from 'react';

const boxStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  gap: 8,
  padding: 24,
  textAlign: 'center',
  color: '#111E31',
};

export default class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message ?? 'Error desconocido' };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={boxStyle}>
          <p style={{ fontSize: 14, fontWeight: 600 }}>No se pudo cargar el modelo 3D</p>
          <p style={{ fontSize: 12, opacity: 0.6, maxWidth: 280 }}>{this.state.message}</p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false, message: '' })}
            style={{ marginTop: 8, fontSize: 12, color: '#658E74', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Reintentar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
