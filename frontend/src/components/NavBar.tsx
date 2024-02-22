// Navbar.tsx
import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link href="/">
        <img src="/images/movieIcon.png" alt="Logo" className="logo" />
      </Link>
      <h1 className="navTitle">MovieShop</h1>
      <ul className="navList">
        <li className="navItem">
          <Link href="/">Home</Link>
        </li>
        <li className="navItem">
          <Link href="/AddMovie">Add a Movie</Link>
        </li>
        <li className="navItem">
          <Link href="/RemoveMovie">Remove a Movie</Link>
        </li>
        <li className="navItem">
          <Link href="/About">About</Link>
        </li>
        <li className="navItem">
          <Link href="/Contact">Contact</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
