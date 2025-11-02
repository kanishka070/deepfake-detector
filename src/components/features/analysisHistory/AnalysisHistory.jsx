import { useState, useEffect } from 'react';
import { Clock, Trash2, Eye } from 'lucide-react';
import styles from './AnalysisHistory.module.css';
import Card from '../../common/card/Card';
import Button from '../../common/button/Button';
import { deepfakeAPI } from '../../../services/api';

const AnalysisHistory = ({ onViewResult }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await deepfakeAPI.getHistory();
      setHistory(data.results || []);
    } catch (error) {
      console.error('Failed to load history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deepfakeAPI.deleteAnalysis(id);
      setHistory(history.filter(item => item.id !== id));
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const getResultClass = (prediction) => {
    if (prediction === 'real') return styles.real;
    if (prediction === 'fake') return styles.fake;
    return styles.uncertain;
  };

  if (loading) {
    return <div className={styles.loading}>Loading history...</div>;
  }

  if (history.length === 0) {
    return (
      <Card className={styles.emptyState}>
        <Clock size={48} className={styles.emptyIcon} />
        <h3>No analysis history</h3>
        <p>Your analyzed files will appear here</p>
      </Card>
    );
  }

  return (
    <div className={styles.history}>
      <h2 className={styles.title}>Analysis History</h2>
      <div className={styles.list}>
        {history.map((item) => (
          <Card key={item.id} className={styles.historyItem} hover>
            <div className={styles.itemContent}>
              <div className={styles.itemInfo}>
                <div className={styles.fileName}>{item.filename}</div>
                <div className={styles.metadata}>
                  <span className={styles.timestamp}>
                    {new Date(item.timestamp).toLocaleDateString()}
                  </span>
                  <span className={`${styles.result} ${getResultClass(item.prediction)}`}>
                    {item.prediction.toUpperCase()}
                  </span>
                  <span className={styles.confidence}>
                    {(item.confidence * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className={styles.actions}>
                <Button
                  variant="secondary"
                  size="sm"
                  icon={<Eye size={16} />}
                  onClick={() => onViewResult(item)}
                >
                  View
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  icon={<Trash2 size={16} />}
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AnalysisHistory;
