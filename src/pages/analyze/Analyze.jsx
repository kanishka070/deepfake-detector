import { useState } from 'react';
import { Scan, AlertCircle, ArrowLeft, Upload, Target, Shield } from 'lucide-react';
import styles from './Analyze.module.css';
import Uploader from '../../components/features/Uploader/Uploader';
import ResultDisplay from '../../components/features/ResultDisplay/ResultDisplay';
import Button from '../../components/common/button/Button';
import Loader from '../../components/common/loader/Loader';

// Mock API function
const analyzeFile = async (file, onProgress) => {
  for (let i = 0; i <= 100; i += 10) {
    await new Promise(resolve => setTimeout(resolve, 200));
    onProgress?.(i);
  }

  await new Promise(resolve => setTimeout(resolve, 1500));

  const predictions = ['real', 'fake', 'uncertain'];
  const prediction = predictions[Math.floor(Math.random() * predictions.length)];
  const confidence = prediction === 'uncertain' 
    ? 0.3 + Math.random() * 0.4 
    : 0.7 + Math.random() * 0.3;

  return {
    prediction,
    confidence,
    analysis: {
      'Facial Manipulation': prediction === 'fake' ? 'Detected' : 'Not Detected',
      'Temporal Consistency': prediction === 'fake' ? 'Inconsistent' : 'Consistent',
      'Compression Artifacts': prediction === 'fake' ? 'Present' : 'Minimal',
      'Blending Quality': prediction === 'fake' ? 'Poor' : 'Natural',
    }
  };
};

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

    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await analyzeFile(selectedFile, setUploadProgress);
      setResult(response);
    } catch (err) {
      setError(err.message || 'Analysis failed. Please try again.');
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
      {/* Animated Background */}
      <div className={styles.backgroundGradient}></div>

      {/* Floating Particles */}
      <div className={styles.particles}></div>

      {/* Back Button */}
      <button 
        className={styles.backButton}
        onClick={onBackToLanding}
        aria-label="Back to home"
      >
        <ArrowLeft size={20} />
        <span>Back to Home</span>
      </button>

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>
            Deepfake <span className={styles.gradient}>Detector</span>
          </h1>
          <p className={styles.subtitle}>Upload an image or video to analyze for deepfake manipulation</p>
          <div className={styles.badge}>
            <AlertCircle size={14} />
            <span>Demo Mode - Using Mock API</span>
          </div>
        </div>

        {!result ? (
          <div className={styles.mainContent}>
            {/* Left Side - How It Works */}
            <div className={styles.leftSection}>
              <div className={styles.howItWorksCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>
                    <Shield size={24} />
                  </div>
                  <h3>How It Works</h3>
                </div>
                
                <div className={styles.steps}>
                  <div className={styles.step}>
                    <div className={styles.stepNumber}>
                      <span>1</span>
                    </div>
                    <div className={styles.stepContent}>
                      <h4>Upload Your File</h4>
                      <p>Drag & drop or browse. Images (PNG, JPG) & videos (MP4, MOV, AVI) up to 100MB</p>
                    </div>
                  </div>

                  <div className={styles.stepDivider}></div>

                  <div className={styles.step}>
                    <div className={styles.stepNumber}>
                      <span>2</span>
                    </div>
                    <div className={styles.stepContent}>
                      <h4>AI Analyzes Content</h4>
                      <p>Advanced AI examines facial features, temporal consistency, and artifacts</p>
                    </div>
                  </div>

                  <div className={styles.stepDivider}></div>

                  <div className={styles.step}>
                    <div className={styles.stepNumber}>
                      <span>3</span>
                    </div>
                    <div className={styles.stepContent}>
                      <h4>Get Detailed Results</h4>
                      <p>Instant results with confidence scores and detailed deepfake indicators</p>
                    </div>
                  </div>
                </div>

                {/* Decorative Element */}
                <div className={styles.cardGlow}></div>
              </div>
            </div>

            {/* Right Side - Uploader */}
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
