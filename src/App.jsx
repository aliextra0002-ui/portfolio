import { Link, Route, Routes } from 'react-router-dom';
import ContactPage from './pages/contact-page.jsx';

function HomePage() {
  return (
    <section className="page">
      <h1>Portfolio</h1>
      <p>
        Multilingual AI product development for customer support teams.
      </p>
      <Link className="text-link" to="/contact">
        Book a call
      </Link>
    </section>
  );
}

export default function App() {
  return (
    <div className="app">
      <header className="site-header">
        <Link className="brand" to="/">
          Portfolio
        </Link>
        <nav className="site-nav" aria-label="Main">
          <Link to="/">Home</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>

      <main className="site-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
    </div>
  );
}
