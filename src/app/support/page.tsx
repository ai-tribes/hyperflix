"use client";

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import styles from './support.module.css';

export default function Support() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!name || !email || !subject || !message) {
      setError('Please fill in all fields');
      return;
    }
    
    // In a real application, you would send this data to your backend
    // For now, we'll just simulate a successful submission
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitted(true);
    } catch (err) {
      setError('Failed to submit your request. Please try again.');
    }
  };

  return (
    <div className={styles.supportContainer}>
      <div className={styles.supportHeader}>
        <h1>Support Center</h1>
        <p>We're here to help you with any questions or issues you may have</p>
      </div>
      
      <div className={styles.supportContent}>
        <div className={styles.faqSection}>
          <h2>Frequently Asked Questions</h2>
          
          <div className={styles.faqItem}>
            <h3>How do I create my first video?</h3>
            <p>Navigate to the "Create" section in your dashboard, select a template, customize it with your memecoin details, and click "Generate Video".</p>
          </div>
          
          <div className={styles.faqItem}>
            <h3>What file formats are supported for audio uploads?</h3>
            <p>We support MP3, WAV, and M4A audio formats. Files should be under 10MB for optimal performance.</p>
          </div>
          
          <div className={styles.faqItem}>
            <h3>How can I cancel my subscription?</h3>
            <p>You can cancel your subscription at any time from the Account Settings page. Your access will continue until the end of your billing period.</p>
          </div>
          
          <div className={styles.faqItem}>
            <h3>Can I download my generated videos?</h3>
            <p>Yes, all generated videos can be downloaded in MP4 format. You can find the download button next to each video in your library.</p>
          </div>
          
          <div className={styles.faqItem}>
            <h3>How many videos can I create per month?</h3>
            <p>The number of videos depends on your subscription plan. Check the Pricing page for detailed information about each plan's limits.</p>
          </div>
        </div>
        
        <div className={styles.contactSection}>
          <h2>Contact Us</h2>
          
          {submitted ? (
            <div className={styles.successMessage}>
              <h3>Thank you for reaching out!</h3>
              <p>We've received your message and will get back to you within 24 hours.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className={styles.resetButton}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.contactForm}>
              {error && <div className={styles.errorMessage}>{error}</div>}
              
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className={styles.input}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className={styles.input}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="What is your inquiry about?"
                  className={styles.input}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please describe your issue or question in detail"
                  rows={5}
                  className={styles.textarea}
                />
              </div>
              
              <button type="submit" className={styles.submitButton}>
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
      
      <div className={styles.supportInfo}>
        <div className={styles.infoCard}>
          <h3>Email Support</h3>
          <p>For general inquiries: support@hyperflix.ai</p>
          <p>For billing questions: billing@hyperflix.ai</p>
        </div>
        
        <div className={styles.infoCard}>
          <h3>Business Hours</h3>
          <p>Monday - Friday: 9am - 6pm EST</p>
          <p>Weekend support available for emergency issues</p>
        </div>
        
        <div className={styles.infoCard}>
          <h3>Response Time</h3>
          <p>We aim to respond to all inquiries within 24 hours</p>
          <p>Premium plan users receive priority support</p>
        </div>
      </div>
    </div>
  );
} 