import { Upload, Shield, Zap, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import Card from '../../components/common/card/Card';
import Button from '../../components/common/button/Button';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Shield size={32} />,
      title: 'Advanced Detection',
      description: 'State-of-the-art AI algorithms to detect deepfakes with high accuracy'
    },
    {
      icon: <Zap size={32} />,
      title: 'Fast Analysis',
      description: 'Get results in seconds with our optimized processing pipeline'
    },
    {
      icon: <Lock size={32} />,
      title: 'Secure & Private',
      description: 'Your data is encrypted and automatically deleted after analysis'
    }
  ];

  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>
            Detect Deepfakes with
            <span className={styles.gradient}> AI Precision</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Upload images or videos to analyze for deepfake manipulation using advanced machine learning
          </p>
          <Button
            variant="primary"
            size="lg"
            icon={<Upload size={20} />}
            onClick={() => navigate('/analyze')}
          >
            Start Analysis
          </Button>
        </section>

        <section className={styles.features}>
          {features.map((feature, index) => (
            <Card key={index} className={styles.featureCard} hover>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </Card>
          ))}
        </section>

        <section className={styles.cta}>
          <Card className={styles.ctaCard}>
            <h2>Ready to verify your media?</h2>
            <p>Upload your first file and get instant deepfake detection results</p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/analyze')}
            >
              Get Started
            </Button>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Home;
