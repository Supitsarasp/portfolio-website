import { Component } from 'react';

export default class PortfolioErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error) {
    if (import.meta.env.DEV) console.error(error);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return <main className="min-h-screen bg-base-bg px-6 py-16 text-text-primary"><div className="mx-auto max-w-2xl rounded-2xl border border-border-light bg-white p-7 shadow-soft"><h1 className="text-2xl font-bold mb-3">ไม่สามารถแสดงแฟ้มสะสมผลงานได้</h1><p>ข้อมูลบางส่วนมีรูปแบบไม่ถูกต้อง กรุณาตรวจไฟล์ <code>src/data/portfolioContent.json</code> แล้วรัน <code>npm run validate:content</code></p>{import.meta.env.DEV && <pre className="mt-5 overflow-auto rounded-lg bg-base-bg p-4 text-sm whitespace-pre-wrap">{this.state.error.message}</pre>}</div></main>;
  }
}
