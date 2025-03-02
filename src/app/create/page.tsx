"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import styles from './create.module.css';

// Define type for the form data
interface FormData {
  hook: string;
  videoType: string;
  avatar: string;
  audio: {
    type: string;
    selection: string;
  };
  demoVideo: null | File;
  [key: string]: any; // Index signature to allow dynamic access
}

export default function CreatePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    hook: '',
    videoType: 'ugc',
    avatar: '',
    audio: {
      type: 'music',
      selection: ''
    },
    demoVideo: null
  });

  // Handle form field changes
  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle nested changes (for audio)
  const handleNestedChange = (parent: string, field: string, value: any) => {
    setFormData(prev => {
      const parentObj = prev[parent as keyof FormData];
      return {
        ...prev,
        [parent]: {
          ...parentObj,
          [field]: value
        }
      };
    });
  };

  // Handle step navigation
  const goToNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Generate UGC content
  const generateContent = () => {
    // This would call the AI generation API in the real implementation
    console.log('Generating content with data:', formData);
    alert('Video generation started! This would connect to the AI backend in the full implementation.');
  };

  // Render each step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className={styles.stepContent}>
            <h2>Step 1: Hook</h2>
            <p className={styles.stepDescription}>Enter or generate viral hooks for your memecoin</p>
            
            <div className={styles.formGroup}>
              <label htmlFor="hook">Hook Text</label>
              <textarea 
                id="hook"
                value={formData.hook}
                onChange={(e) => handleChange('hook', e.target.value)}
                placeholder="Enter a viral hook for your memecoin..."
                className={styles.textarea}
                rows={4}
              />
            </div>
            
            <div className={styles.formGroup}>
              <button className={styles.generateBtn}>
                Generate 10+ Hooks
              </button>
              <p className={styles.helperText}>AI will create viral hooks based on your memecoin details</p>
            </div>
            
            <div className={styles.formActions}>
              <div></div> {/* Spacer for alignment */}
              <button className={styles.nextBtn} onClick={goToNextStep}>Next: Video</button>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className={styles.stepContent}>
            <h2>Step 2: Video</h2>
            <p className={styles.stepDescription}>Choose an AI avatar and content type</p>
            
            <div className={styles.formGroup}>
              <label>Content Type</label>
              <div className={styles.toggleButtons}>
                <button 
                  className={`${styles.toggleBtn} ${formData.videoType === 'ugc' ? styles.active : ''}`}
                  onClick={() => handleChange('videoType', 'ugc')}
                >
                  UGC
                </button>
                <button 
                  className={`${styles.toggleBtn} ${formData.videoType === 'lipsync' ? styles.active : ''}`}
                  onClick={() => handleChange('videoType', 'lipsync')}
                >
                  Lip Sync
                </button>
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label>Choose Avatar</label>
              <div className={styles.avatarGrid}>
                <div className={styles.placeholderText}>
                  Avatar selection would appear here with crypto-themed characters
                </div>
              </div>
            </div>
            
            <div className={styles.formActions}>
              <button className={styles.backBtn} onClick={goToPrevStep}>Back</button>
              <button className={styles.nextBtn} onClick={goToNextStep}>Next: Audio</button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className={styles.stepContent}>
            <h2>Step 3: Audio</h2>
            <p className={styles.stepDescription}>Add background music or generate a voiceover</p>
            
            <div className={styles.formGroup}>
              <label>Audio Type</label>
              <div className={styles.toggleButtons}>
                <button 
                  className={`${styles.toggleBtn} ${formData.audio.type === 'music' ? styles.active : ''}`}
                  onClick={() => handleNestedChange('audio', 'type', 'music')}
                >
                  Background Music
                </button>
                <button 
                  className={`${styles.toggleBtn} ${formData.audio.type === 'voiceover' ? styles.active : ''}`}
                  onClick={() => handleNestedChange('audio', 'type', 'voiceover')}
                >
                  Voice Over
                </button>
              </div>
            </div>
            
            <div className={styles.formGroup}>
              {formData.audio.type === 'music' ? (
                <>
                  <label>Select Music</label>
                  <select 
                    className={styles.select}
                    value={formData.audio.selection}
                    onChange={(e) => handleNestedChange('audio', 'selection', e.target.value)}
                  >
                    <option value="">Select Background Music</option>
                    <option value="energetic">Energetic</option>
                    <option value="motivational">Motivational</option>
                    <option value="exciting">Exciting</option>
                    <option value="professional">Professional</option>
                  </select>
                </>
              ) : (
                <>
                  <label>Generate Voice Over</label>
                  <textarea 
                    className={styles.textarea}
                    placeholder="Enter text for AI voice over..."
                    rows={4}
                    value={formData.audio.selection}
                    onChange={(e) => handleNestedChange('audio', 'selection', e.target.value)}
                  />
                  <div className={styles.voiceOptions}>
                    <label>Voice:</label>
                    <select className={styles.select}>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    <label>Language:</label>
                    <select className={styles.select}>
                      <option value="en-US">English (US)</option>
                      <option value="en-GB">English (UK)</option>
                    </select>
                  </div>
                </>
              )}
            </div>
            
            <div className={styles.formActions}>
              <button className={styles.backBtn} onClick={goToPrevStep}>Back</button>
              <button className={styles.nextBtn} onClick={goToNextStep}>Next: Demo Video</button>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className={styles.stepContent}>
            <h2>Step 4: Demo Video (Optional)</h2>
            <p className={styles.stepDescription}>Upload a demo video of your product/token</p>
            
            <div className={styles.uploadArea}>
              <div className={styles.uploadIcon}>📤</div>
              <p>Drag & drop a video file here or click to browse</p>
              <button className={styles.uploadBtn}>Upload Video</button>
            </div>
            
            <div className={styles.formActions}>
              <button className={styles.backBtn} onClick={goToPrevStep}>Back</button>
              <button className={styles.generateContentBtn} onClick={generateContent}>Generate UGC</button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className={styles.createPage}>
          <div className={styles.createHeader}>
            <h1>Create UGC Content</h1>
            <p>Generate viral TikTok content for your memecoin in a few steps</p>
          </div>
          
          <div className={styles.createContainer}>
            <div className={styles.stepIndicator}>
              <div className={`${styles.step} ${currentStep >= 1 ? styles.active : ''}`}>
                <div className={styles.stepNumber}>1</div>
                <span className={styles.stepLabel}>Hook</span>
              </div>
              <div className={styles.stepConnector}></div>
              <div className={`${styles.step} ${currentStep >= 2 ? styles.active : ''}`}>
                <div className={styles.stepNumber}>2</div>
                <span className={styles.stepLabel}>Video</span>
              </div>
              <div className={styles.stepConnector}></div>
              <div className={`${styles.step} ${currentStep >= 3 ? styles.active : ''}`}>
                <div className={styles.stepNumber}>3</div>
                <span className={styles.stepLabel}>Audio</span>
              </div>
              <div className={styles.stepConnector}></div>
              <div className={`${styles.step} ${currentStep >= 4 ? styles.active : ''}`}>
                <div className={styles.stepNumber}>4</div>
                <span className={styles.stepLabel}>Demo</span>
              </div>
            </div>
            
            <div className={styles.contentContainer}>
              <div className={styles.formContainer}>
                {renderStepContent()}
              </div>
              
              <div className={styles.previewContainer}>
                <div className={styles.previewHeader}>
                  <h3>Live Preview</h3>
                </div>
                <div className={styles.previewContent}>
                  <div className={styles.previewPlaceholder}>
                    <p>Your video preview will appear here</p>
                    <div className={styles.phoneFrame}>
                      <div className={styles.phoneScreen}>
                        {formData.hook && (
                          <div className={styles.previewHook}>{formData.hook}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
} 