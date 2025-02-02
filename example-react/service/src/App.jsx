import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import { Helmet } from 'react-helmet-async';

/**
 * Navigation bar component that displays links at the top of the page.
 *
 * @returns {JSX.Element} The rendered navigation bar.
 */
const NavBar = () => {
  return (
    <header className="nav-header">
      <nav>
        <ul className="nav-ul">
          <li className="nav-li">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-li">
            <Link className="nav-link" to="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

/**
 * Main application component with a fixed navigation bar and routing for content.
 *
 * @returns {JSX.Element} The rendered App component.
 */
const App = () => {
  React.useEffect(() => {
    document.title = "Serverless Container Framework - React App";
  }, []);

  return (
    <>
      <Helmet>
        <title>Serverless Container Framework - React App</title>
        <meta name="description" content="Serverless Container Framework - React App" />
      </Helmet>
      <div>
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </>
  );
};

export default App; 