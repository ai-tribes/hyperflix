"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import styles from './support.module.css';

export default function SupportPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    if (!name || !email || !subject || !message) {
      setError('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success
      setSuccess(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>Support Center</h1>
        
        <div className={styles.content}>
          <div className={styles.faqSection}>
            <h2>Frequently Asked Questions</h2>
            
            <div className={styles.faqItem}>
              <h3>How do I upgrade my subscription?</h3>
              <p>
                You can upgrade your subscription by going to your Account &rarr; Subscription page
                and selecting the "Upgrade" option for the plan you'd like to switch to.
              </p>
            </div>
            
            <div className={styles.faqItem}>
              <h3>Can I cancel my subscription?</h3>
              <p>
                Yes, you can cancel your subscription at any time from your Account &rarr; Subscription page.
                Your subscription will remain active until the end of your current billing period.
              </p>
            </div>
            
            <div className={styles.faqItem}>
              <h3>How do I create my first AI video?</h3>
              <p>
                To create your first AI video, navigate to the "Create" section in the sidebar,
                select a template, customize your content, and click "Generate Video".
              </p>
            </div>
            
            <div className={styles.faqItem}>
              <h3>How many tokens do I need to generate a video?</h3>
              <p>
                The number of tokens required depends on the length and complexity of the video.
                Basic videos typically require 1-5 tokens, while premium videos may need 10-20 tokens.
              </p>
            </div>
            
            <div className={styles.faqItem}>
              <h3>How do I get more tokens?</h3>
              <p>
                Tokens are included in your monthly subscription. Higher tier plans include more tokens.
                You can also purchase additional token packs from the Tokens page.
              </p>
            </div>
          </div>
          
          <div className={styles.contactSection}>
            <h2>Contact Support</h2>
            
            {error && (
              <div className={styles.error}>
                <p>{error}</p>
              </div>
            )}
            
            {success && (
              <div className={styles.success}>
                <p>Your message has been sent successfully! Our support team will get back to you as soon as possible.</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
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
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="What is your question about?"
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please describe your issue in detail"
                  rows={5}
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 