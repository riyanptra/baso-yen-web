import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "40px", backgroundColor: "#ffebeb", color: "#d32f2f", fontFamily: "sans-serif" }}>
          <h2>Oops! Layar Putih Terdeteksi.</h2>
          <p><strong>Error:</strong> {this.state.error?.toString()}</p>
          <pre style={{ backgroundColor: "#fff", padding: "20px", overflow: "auto", border: "1px solid #f44336" }}>
            {this.state.errorInfo?.componentStack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
