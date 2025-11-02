import { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import { ArrowRight, Zap, Target, Shield } from 'lucide-react';
import styles from './Landing.module.css';
import Button from '../../components/common/button/Button';

const Landing = ({ onGetStarted }) => {
  const [splineLoaded, setSplineLoaded] = useState(false);

  useEffect(() => {
    const removeSplineLogo = () => {
      const logoById = document.getElementById('logo');
      if (logoById) {
        logoById.style.display = 'none';
        logoById.remove();
      }

      const logoElements = document.querySelectorAll('[id*="logo"], [class*="logo"], [class*="spline"]');
      logoElements.forEach(el => {
        const text = el.textContent?.toLowerCase() || '';
        if (text.includes('spline') || text.includes('built')) {
          el.style.display = 'none';
          el.remove();
        }
      });

      const viewers = document.querySelectorAll('spline-viewer');
      viewers.forEach(viewer => {
        if (viewer.shadowRoot) {
          const shadowLogo = viewer.shadowRoot.querySelector('#logo');
          if (shadowLogo) {
            shadowLogo.style.display = 'none';
            shadowLogo.style.opacity = '0';
            shadowLogo.style.visibility = 'hidden';
            shadowLogo.style.pointerEvents = 'none';
            shadowLogo.remove();
          }

          const allShadowElements = viewer.shadowRoot.querySelectorAll('*');
          allShadowElements.forEach(el => {
            const id = el.id?.toLowerCase() || '';
            const className = el.className?.toLowerCase() || '';
            if (id.includes('logo') || className.includes('logo')) {
              el.style.display = 'none';
              el.remove();
            }
          });
        }
      });

      const anchors = document.querySelectorAll('a');
      anchors.forEach(anchor => {
        const href = anchor.href?.toLowerCase() || '';
        const text = anchor.textContent?.toLowerCase() || '';
        if (href.includes('spline') || text.includes('spline') || text.includes('built')) {
          anchor.style.display = 'none';
          anchor.remove();
        }
      });
    };

    removeSplineLogo();

    const intervals = [100, 300, 500, 1000, 2000, 3000, 5000];
    const timeouts = intervals.map(delay => 
      setTimeout(removeSplineLogo, delay)
    );

    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        removeSplineLogo();
      });
    });

    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class', 'id']
    });

    return () => {
      timeouts.forEach(clearTimeout);
      observer.disconnect();
    };
  }, []);

  return (
    <div className={styles.landing}>
      <div className={styles.container}>
        <div className={styles.hero}>
          <div className={styles.splineSection}>
            <div className={styles.splineContainer}>
              <Spline
                scene="https://prod.spline.design/dro4okE8S78OVoZi/scene.splinecode"
                onLoad={() => setSplineLoaded(true)}
                className={styles.spline}
              />
              {!splineLoaded && (
                <div className={styles.splineLoader}>
                  <div className={styles.loader}></div>
                  <p>Loading Experience...</p>
                </div>
              )}
            </div>
          </div>

          <div className={styles.contentSection}>
            <div className={styles.header}>
              <div className={styles.badge}>
                <Shield size={14} />
                <span>AI-Powered Detection</span>
              </div>
              <h1 className={styles.title}>
                Welcome to <span className={styles.gradient}>ByteBuster</span>
              </h1>
              <p className={styles.subtitle}>
                Your intelligent companion for detecting deepfake content. 
                Powered by advanced AI to protect digital authenticity.
              </p>
            </div>

            <div className={styles.features}>
              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <Zap size={20} />
                </div>
                <div className={styles.featureContent}>
                  <h3>Fast Analysis</h3>
                  <p>Get results in seconds</p>
                </div>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <Target size={20} />
                </div>
                <div className={styles.featureContent}>
                  <h3>High Accuracy</h3>
                  <p>Advanced AI detection</p>
                </div>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <Shield size={20} />
                </div>
                <div className={styles.featureContent}>
                  <h3>Secure</h3>
                  <p>Your data stays private</p>
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={onGetStarted}
              fullWidth
              icon={<ArrowRight size={20} />}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
