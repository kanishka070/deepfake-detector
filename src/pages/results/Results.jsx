import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import styles from './Results.module.css';
import ResultDisplay from '../../components/features/resultDisplay/ResultDisplay';
import Button from '../../components/common/button/Button';
import Loader from '../../components/common/loader/Loader';
import { deepfakeAPI } from '../../services/api';

const Results = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadResult();
  }, [id]);

  const loadResult = async () => {
    try {
      const data = await deepfakeAPI.getAnalysis(id);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to load analysis');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.resultsPage}>
        <Loader size="lg" text="Loading analysis..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.resultsPage}>
        <div className={styles.error}>
          <h2>Error</h2>
          <p>{error}</p>
          <Button onClick={() => navigate('/analyze')}>
            Back to Analyze
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.resultsPage}>
      <div className={styles.container}>
        <Button
          variant="secondary"
          size="sm"
          icon={<ArrowLeft size={16} />}
          onClick={() => navigate(-1)}
          className={styles.backButton}
        >
          Back
        </Button>

        <div className={styles.content}>
          <h1 className={styles.title}>Analysis Results</h1>
          {result && <ResultDisplay result={result} />}
        </div>
      </div>
    </div>
  );
};

export default Results;
