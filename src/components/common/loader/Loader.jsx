import styles from './Loader.module.css';

const Loader = ({ size = 'md', text = '' }) => {
  return (
    <div className={styles.loaderContainer}>
      <div className={`${styles.spinner} ${styles[size]}`}>
        <div className={styles.circle}></div>
      </div>
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
};

export default Loader;
