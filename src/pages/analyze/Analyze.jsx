import { useState } from 'react';
import { Scan, AlertCircle, ArrowLeft } from 'lucide-react';
import styles from './Analyze.module.css';
import Uploader from '../../components/features/Uploader/Uploader';
import ResultDisplay from '../../components/features/resultDisplay/ResultDisplay';
import Button from '../../components/common/button/Button';
import Loader from '../../components/common/loader/Loader';
import { predictVideo } from '../../services/deepfakeApi';

const Analyze = ({ onBackToLanding }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setResult(null);
    setError(null);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setResult(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith('video/')) {
      setError('Only video files (mp4/mov/avi) are supported.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await predictVideo(selectedFile, setUploadProgress);
      setResult(response);
    } catch (err) {
      const errorMsg = err?.detail || err?.message || 'Analysis failed. Please try again.';
      setError(errorMsg);
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
      setUploadProgress(0);
    }
  };

  const resetAnalysis = () => {
    setSelectedFile(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className={styles.analyzePage}>
      <div className={styles.backgroundGradient}></div>
      <div className={styles.particles}></div>

      <button 
        className={styles.backButton}
        onClick={onBackToLanding}
        aria-label="Back to home"
      >
        <ArrowLeft size={20} />
        <span>Back to Home</span>
      </button>

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Deepfake <span className={styles.gradient}>Detector</span>
          </h1>
          <p className={styles.subtitle}>Upload a video to analyze for deepfake manipulation</p>
        </div>

        {!result ? (
          <div className={styles.mainContent}>
            <div className={styles.leftSection}>
              <div className={styles.howItWorksCard}>
                <div className={styles.cardHeader}>
                  <h3>How It Works</h3>
                </div>
                
                <div className={styles.steps}>
                  <div className={styles.step}>
                    <div className={styles.stepNumber}><span>1</span></div>
                    <div className={styles.stepContent}>
                      <h4>Upload Your Video</h4>
                      <p>Drag & drop or browse. Videos (MP4, MOV, AVI) up to 100MB</p>
                    </div>
                  </div>
                  <div className={styles.stepDivider}></div>
                  <div className={styles.step}>
                    <div className={styles.stepNumber}><span>2</span></div>
                    <div className={styles.stepContent}>
                      <h4>AI Analyzes Content</h4>
                      <p>Advanced AI examines facial features, temporal consistency, and artifacts</p>
                    </div>
                  </div>
                  <div className={styles.stepDivider}></div>
                  <div className={styles.step}>
                    <div className={styles.stepNumber}><span>3</span></div>
                    <div className={styles.stepContent}>
                      <h4>Get Detailed Results</h4>
                      <p>Instant results with confidence scores and analysis</p>
                    </div>
                  </div>
                </div>
                <div className={styles.cardGlow}></div>
              </div>
            </div>

            <div className={styles.rightSection}>
              <div className={styles.uploaderCard}>
                <Uploader 
                  onFileSelect={handleFileSelect}
                  selectedFile={selectedFile}
                  onRemove={handleRemoveFile}
                />
                
                {selectedFile && !isAnalyzing && (
                  <div className={styles.actions}>
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      onClick={handleAnalyze}
                      icon={<Scan size={20} />}
                    >
                      Analyze Media
                    </Button>
                  </div>
                )}

                {isAnalyzing && (
                  <Loader size="lg" text={`Analyzing... ${uploadProgress}%`} />
                )}

                {error && (
                  <div className={styles.error}>
                    <AlertCircle size={20} />
                    <p>{error}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.resultContainer}>
            <ResultDisplay result={result} />
            <div className={styles.actions}>
              <Button variant="secondary" size="lg" fullWidth onClick={resetAnalysis}>
                Analyze Another File
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analyze;
