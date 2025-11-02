import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import styles from './ResultDisplay.module.css';
import Card from '../../common/card/Card';

const ResultDisplay = ({ result }) => {
  const { prediction, confidence, analysis } = result;
  
  const getStatusConfig = () => {
    if (prediction === 'real') {
      return {
        icon: <CheckCircle size={64} />,
        className: styles.real,
        label: 'Authentic',
        message: 'This media appears to be genuine'
      };
    } else if (prediction === 'fake') {
      return {
        icon: <XCircle size={64} />,
        className: styles.fake,
        label: 'Deepfake Detected',
        message: 'This media shows signs of manipulation'
      };
    } else {
      return {
        icon: <AlertTriangle size={64} />,
        className: styles.uncertain,
        label: 'Uncertain',
        message: 'Unable to determine with confidence'
      };
    }
  };

  const status = getStatusConfig();

  return (
    <Card className={styles.resultCard}>
      <div className={`${styles.statusIndicator} ${status.className}`}>
        {status.icon}
        <h2>{status.label}</h2>
        <p className={styles.message}>{status.message}</p>
      </div>

      <div className={styles.confidenceBar}>
        <div className={styles.confidenceHeader}>
          <span>Confidence Score</span>
          <span className={styles.confidenceValue}>{(confidence * 100).toFixed(1)}%</span>
        </div>
        <div className={styles.progressBar}>
          <div 
            className={`${styles.progress} ${status.className}`}
            style={{ width: `${confidence * 100}%` }}
          />
        </div>
      </div>

      {analysis && (
        <div className={styles.analysisDetails}>
          <h3>Analysis Details</h3>
          {Object.entries(analysis).map(([key, value]) => (
            <div key={key} className={styles.detailRow}>
              <span className={styles.detailKey}>{key}:</span>
              <span className={styles.detailValue}>{value}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default ResultDisplay;
