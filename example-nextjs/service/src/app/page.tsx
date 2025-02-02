"use client";

import Image from "next/image";

/**
 * Home page component that displays the main landing content.
 *
 * @returns {JSX.Element} The rendered Home page.
 */
export default function Home() {
  return (
    <div className="container">
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={400}
        height={200}
        className="logo"
      />
    </div>
  );
}