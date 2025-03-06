import Link from "next/link";
import styles from "../styles/Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>TownSquare</div>
      <ul className={styles.navLinks}>
        <li><Link href="/">HOME</Link></li>
        <li><Link href="/discussion">DISCUSSION</Link></li>
        <li><Link href="/local-events">LOCAL EVENTS</Link></li>
        <li><Link href="/political-wiki">POLITICAL WIKI</Link></li>
        <li><Link href="/stand">WHERE DO YOU STAND?</Link></li>
      </ul>
      <div className={styles.authLinks}>
        <Link href="/auth">SIGN UP / SIGN IN</Link>
      </div>
    </nav>
  );
};

export default Navigation;
