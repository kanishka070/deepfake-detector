import { Github, Twitter, Mail } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.copyright}>
            © 2025 DeepGuard. Protecting digital authenticity.
          </p>
          <div className={styles.social}>
            <a href="#github" className={styles.socialLink} aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="#twitter" className={styles.socialLink} aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="#email" className={styles.socialLink} aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
