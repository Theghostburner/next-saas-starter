import React from "react";
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src="/skille_logo_transparent.png" />
      </div>
      <ul className={styles.navbarLinks}>
        <li>
          <a href="#">Login</a>
        </li>
        <li>
          <a href="#">Signup</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
