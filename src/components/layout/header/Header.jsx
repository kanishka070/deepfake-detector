import { Shield } from 'lucide-react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Shield size={28} />
          <span className={styles.logoText}>DeepGuard</span>
        </div>
        <nav className={styles.nav}>
          <a href="#analyze" className={styles.navLink}>Analyze</a>
          <a href="#history" className={styles.navLink}>History</a>
          <a href="#about" className={styles.navLink}>About</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
