import Link from "next/link";

/**
 * NavBar component that displays fixed top navigation links.
 *
 * @returns {JSX.Element} The rendered navigation bar.
 */
export default function NavBar() {
  return (
    <header className="nav-header">
      <nav>
        <ul className="nav-ul">
          <li className="nav-li">
            <Link className="nav-link" href="/">
              Home
            </Link>
          </li>
          <li className="nav-li">
            <Link className="nav-link" href="/about">
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}