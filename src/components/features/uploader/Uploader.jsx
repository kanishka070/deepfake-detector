import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Video, Image } from 'lucide-react';
import styles from './Uploader.module.css';
import Button from '../../common/button/Button';

const Uploader = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      
      // Create preview for images/videos
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'video/*': ['.mp4', '.mov', '.avi']
    },
    maxSize: 100 * 1024 * 1024, // 100MB
    multiple: false
  });

  const removeFile = () => {
    setSelectedFile(null);
    setPreview(null);
  };

  return (
    <div className={styles.uploader}>
      {!selectedFile ? (
        <div 
          {...getRootProps()} 
          className={`${styles.dropzone} ${isDragActive ? styles.active : ''}`}
        >
          <input {...getInputProps()} />
          <Upload className={styles.uploadIcon} size={48} />
          <h3>Drag & drop your file here</h3>
          <p className={styles.subtitle}>or click to browse</p>
          <p className={styles.fileTypes}>
            Supports: Images (PNG, JPG) & Videos (MP4, MOV, AVI) up to 100MB
          </p>
        </div>
      ) : (
        <div className={styles.preview}>
          <div className={styles.previewHeader}>
            <div className={styles.fileInfo}>
              {selectedFile.type.startsWith('video/') ? (
                <Video size={20} />
              ) : (
                <Image size={20} />
              )}
              <span className={styles.fileName}>{selectedFile.name}</span>
              <span className={styles.fileSize}>
                ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
              </span>
            </div>
            <Button variant="secondary" size="sm" onClick={removeFile}>
              Remove
            </Button>
          </div>
          
          {preview && (
            <div className={styles.previewMedia}>
              {selectedFile.type.startsWith('video/') ? (
                <video src={preview} controls className={styles.media} />
              ) : (
                <img src={preview} alt="Preview" className={styles.media} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Uploader;
