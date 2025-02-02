import React from 'react';

/**
 * Home component that mimics the server HTML response from the Express app.
 * It displays the container information and uses assets similar to the Express version.
 *
 * @returns {JSX.Element} The rendered Home component.
 */
const Home = () => {
  return (
    <div className="container">
      <img src="/images/logo.png" alt="Logo" className="logo" />
    </div>
  );
};

export default Home; 