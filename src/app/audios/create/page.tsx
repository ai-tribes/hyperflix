"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { BiArrowBack, BiMicrophone } from 'react-icons/bi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import styles from './create.module.css';

// Define type for the form data
interface FormData {
  text: string;
  voice: string;
  language: string;
  speed: number;
  emphasis: number[];
}

const CreateVoiceoverPage = () => {
  const [formData, setFormData] = useState<FormData>({
    text: '',
    voice: 'male1',
    language: 'en-US',
    speed: 1.0,
    emphasis: []
  });

  const [previewAvailable, setPreviewAvailable] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle form field changes
  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Generate voiceover preview
  const generatePreview = () => {
    if (!formData.text.trim()) {
      alert('Please enter text for the voiceover');
      return;
    }
    
    setLoading(true);
    
    // Simulate API call for generating voiceover
    setTimeout(() => {
      setPreviewAvailable(true);
      setLoading(false);
    }, 2000);
  };

  // Save voiceover
  const saveVoiceover = () => {
    alert('Voiceover saved! In a real implementation, this would save to your library.');
  };

  return (
    <DashboardLayout>
      <div className={styles.createVoiceoverPage}>
        <div className={styles.pageHeader}>
          <Link href="/audios" className={styles.backLink}>
            <BiArrowBack />
            Back to Audios
          </Link>
          <h1>Create AI Voiceover</h1>
          <p>Generate professional voiceovers for your memecoin marketing videos</p>
        </div>
        
        <div className={styles.createContainer}>
          <div className={styles.formSection}>
            <div className={styles.formGroup}>
              <label htmlFor="text">Voiceover Text</label>
              <textarea 
                id="text"
                className={styles.textarea}
                rows={6}
                placeholder="Enter the text you want converted to speech..."
                value={formData.text}
                onChange={(e) => handleChange('text', e.target.value)}
              />
              <div className={styles.textCounter}>
                {formData.text.length} / 500 characters
              </div>
            </div>
            
            <div className={styles.voiceSettings}>
              <div className={styles.settingGroup}>
                <label htmlFor="voice">Voice</label>
                <select 
                  id="voice"
                  className={styles.select}
                  value={formData.voice}
                  onChange={(e) => handleChange('voice', e.target.value)}
                >
                  <option value="male1">Male 1 (Enthusiastic)</option>
                  <option value="male2">Male 2 (Deep, Professional)</option>
                  <option value="female1">Female 1 (Energetic)</option>
                  <option value="female2">Female 2 (Calm, Trustworthy)</option>
                </select>
              </div>
              
              <div className={styles.settingGroup}>
                <label htmlFor="language">Language</label>
                <select 
                  id="language"
                  className={styles.select}
                  value={formData.language}
                  onChange={(e) => handleChange('language', e.target.value)}
                >
                  <option value="en-US">English (US)</option>
                  <option value="en-GB">English (UK)</option>
                  <option value="es-ES">Spanish</option>
                  <option value="fr-FR">French</option>
                  <option value="de-DE">German</option>
                </select>
              </div>
              
              <div className={styles.settingGroup}>
                <label htmlFor="speed">Speed</label>
                <div className={styles.rangeControl}>
                  <input 
                    type="range" 
                    id="speed"
                    min="0.5" 
                    max="2" 
                    step="0.1"
                    value={formData.speed}
                    onChange={(e) => handleChange('speed', parseFloat(e.target.value))}
                    className={styles.rangeSlider}
                  />
                  <span className={styles.rangeValue}>{formData.speed}x</span>
                </div>
              </div>
            </div>
            
            <div className={styles.emphasis}>
              <label>Emphasis (Optional)</label>
              <p className={styles.helperText}>Select words to emphasize in your voiceover</p>
              
              <div className={styles.wordsContainer}>
                {formData.text.split(' ').map((word, idx) => (
                  word && (
                    <button 
                      key={idx}
                      className={`${styles.wordChip} ${formData.emphasis.includes(idx) ? styles.emphasized : ''}`}
                      onClick={() => {
                        const newEmphasis = [...formData.emphasis];
                        if (newEmphasis.includes(idx)) {
                          handleChange('emphasis', newEmphasis.filter(i => i !== idx));
                        } else {
                          handleChange('emphasis', [...newEmphasis, idx]);
                        }
                      }}
                    >
                      {word}
                    </button>
                  )
                ))}
              </div>
            </div>
            
            <div className={styles.actionButtons}>
              <button 
                className={styles.generateBtn}
                onClick={generatePreview}
                disabled={loading}
              >
                {loading ? 'Generating...' : 'Generate Preview'}
              </button>
            </div>
          </div>
          
          <div className={styles.previewSection}>
            <div className={styles.previewHeader}>
              <h3>Voiceover Preview</h3>
            </div>
            
            {previewAvailable ? (
              <div className={styles.audioPreview}>
                <div className={styles.audioPlayer}>
                  <div className={styles.playerIcon}>
                    <BiMicrophone size={24} />
                  </div>
                  <div className={styles.playerWaveform}>
                    <div className={styles.waveformPlaceholder}>
                      {/* This would be a real audio waveform in the actual implementation */}
                      <div className={styles.waveBar} style={{ height: '60%' }}></div>
                      <div className={styles.waveBar} style={{ height: '30%' }}></div>
                      <div className={styles.waveBar} style={{ height: '80%' }}></div>
                      <div className={styles.waveBar} style={{ height: '40%' }}></div>
                      <div className={styles.waveBar} style={{ height: '70%' }}></div>
                      <div className={styles.waveBar} style={{ height: '20%' }}></div>
                      <div className={styles.waveBar} style={{ height: '50%' }}></div>
                      <div className={styles.waveBar} style={{ height: '90%' }}></div>
                      <div className={styles.waveBar} style={{ height: '40%' }}></div>
                      <div className={styles.waveBar} style={{ height: '60%' }}></div>
                      <div className={styles.waveBar} style={{ height: '30%' }}></div>
                      <div className={styles.waveBar} style={{ height: '70%' }}></div>
                    </div>
                  </div>
                  <div className={styles.playerControls}>
                    <button className={styles.playBtn}>▶ Play</button>
                    <span className={styles.duration}>0:00 / 0:30</span>
                  </div>
                </div>
                <div className={styles.previewActions}>
                  <button className={styles.saveBtn} onClick={saveVoiceover}>
                    Save Voiceover
                  </button>
                  <button className={styles.regenerateBtn} onClick={generatePreview}>
                    Regenerate
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.emptyPreview}>
                <BiMicrophone size={48} />
                <p>Your voiceover preview will appear here</p>
                <p className={styles.tipText}>Enter your text and click "Generate Preview"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateVoiceoverPage; 