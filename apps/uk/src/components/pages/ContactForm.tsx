'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    botcheck: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [mailtoHref, setMailtoHref] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.botcheck) {
      setStatus('success');
      setFeedbackMsg('Thanks for contacting us. We will get back to you as soon as possible.');
      return;
    }

    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setFeedbackMsg('Please fill in all required fields marked with *.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setStatus('error');
      setFeedbackMsg('Please enter a valid email address.');
      return;
    }

    const subject = formData.subject || 'Miroooo contact request';
    const bodyLines = [
      `First name: ${formData.firstName}`,
      `Last name: ${formData.lastName}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone}`,
      `Subject: ${subject}`,
      '',
      formData.message,
    ];
    const mailto = `mailto:support@trymiroooo.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
    setMailtoHref(mailto);

    setStatus('submitting');

    try {
      const payload = new FormData();
      payload.append('access_key', 'c5701bc7-0fe8-4bbf-bda7-af778b74c0fd');
      payload.append('to', 'support@trymiroooo.com');
      payload.append('from_name', 'Miroooo Support');
      payload.append('replyto', formData.email);
      payload.append('name', `${formData.firstName} ${formData.lastName}`.trim());
      payload.append('email', formData.email);
      payload.append('phone', formData.phone);
      payload.append('subject', `[Miroooo Contact] ${subject}`);
      payload.append('message', formData.message);
      payload.append('page', typeof window !== 'undefined' ? window.location.pathname : '');
      payload.append('source_url', typeof window !== 'undefined' ? window.location.href : '');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: payload,
        headers: { Accept: 'application/json' },
      });

      if (response && response.ok) {
        const result = await response.json();
        if (result && result.success) {
          setStatus('success');
          setFeedbackMsg('Thanks for contacting us. We will get back to you as soon as possible.');
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
            botcheck: '',
          });
          return;
        }
      }

      setStatus('error');
      setFeedbackMsg(
        'We could not deliver your message automatically. Please click below to email support directly.'
      );
    } catch {
      setStatus('error');
      setFeedbackMsg(
        'We could not deliver your message automatically. Please click below to email support directly.'
      );
    }
  };

  return (
    <main id="main">
      {/* SECTION 1: HERO SECTION */}
      <section className="contact-hero" aria-labelledby="contact-hero-heading">
        <div className="contact-glow contact-glow--top-left" aria-hidden="true" />
        <div className="contact-glow contact-glow--bottom-right" aria-hidden="true" />

        <div className="site-shell contact-hero-grid">
          <div className="contact-hero-content reveal">
            <p className="eyebrow eyebrow--light">Contact Miroooo</p>
            <h1 id="contact-hero-heading" className="contact-hero-title">
              We are here to <em className="contact-em">help.</em>
            </h1>
            <p className="contact-lead">
              Welcome to Miroooo, where precision oral care meets thoughtful support. We are delighted to assist you with
              product questions, order help, and anything you need for a smoother daily routine.
            </p>

            <div className="contact-pills-wrap">
              <a className="contact-pill contact-pill--primary" href="mailto:support@trymiroooo.com">
                <svg className="pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>support@trymiroooo.com</span>
              </a>
              <span className="contact-pill contact-pill--outline">
                <svg className="pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Mon – Fri: 9:00 AM – 6:00 PM GMT</span>
              </span>
              <span className="contact-pill contact-pill--outline">
                <svg className="pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>71-75 Shelton St, London WC2H 9JQ, UK</span>
              </span>
            </div>

            <p className="contact-intro">
              Choose the contact path that suits you best. For product questions, order support, or store help, our team
              will get back to you promptly.
            </p>
          </div>

          <div className="contact-hero-media-col reveal">
            <div className="contact-hero-media-card">
              <div className="contact-hero-image-wrap">
                <img
                  src="/assets/miroooo-x2-sonic-electric-toothbrush-sticky-add-to-cart.webp"
                  alt="Miroooo Sonic Electric Toothbrushes Customer Care Support Desk"
                  width={800}
                  height={1000}
                  loading="eager"
                />
              </div>
              <div className="contact-hero-overlay-card">
                <div className="contact-overlay-header">
                  <svg className="contact-overlay-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  <span className="contact-overlay-title">Support Desk</span>
                </div>
                <p className="contact-overlay-desc">Product guidance, order updates, and care support for your Miroooo brushes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: HELP & SOCIAL SECTION */}
      <section className="contact-help-section" aria-labelledby="help-center-heading">
        <div className="site-shell contact-help-grid">
          <div className="contact-help-intro reveal">
            <p className="eyebrow eyebrow--light">Help center</p>
            <h2 id="help-center-heading" className="contact-section-title">
              FAQ, help, and <em className="contact-em">social updates</em>
            </h2>
            <p className="contact-section-copy">
              Explore our frequently asked questions for quick answers. For personalised assistance, use the contact form
              below or stay connected with us on social media for updates and promotions.
            </p>
          </div>

          <div className="contact-help-cards-col">
            <div className="contact-help-cards-grid">
              {/* Card 1: FAQs */}
              <Link className="contact-service-card reveal" href="/pages/faqs">
                <div className="contact-service-card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <h3 className="contact-service-card__title">FAQs</h3>
                <p className="contact-service-card__copy">Quick answers for shipping, returns, product use, and order questions.</p>
                <div className="contact-service-card__action">
                  <span>Browse FAQs</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </div>
              </Link>

              {/* Card 2: Support Email */}
              <a className="contact-service-card reveal" href="mailto:support@trymiroooo.com">
                <div className="contact-service-card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <h3 className="contact-service-card__title">Support email</h3>
                <p className="contact-service-card__copy">Prefer email? Reach the Miroooo support desk directly.</p>
                <div className="contact-service-card__action">
                  <span>Email Miroooo</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </div>
              </a>
            </div>

            {/* Social Links Row */}
            <div className="contact-social-row reveal">
              <p className="contact-social-heading">Connect with us</p>
              <div className="contact-social-pills">
                <a
                  className="contact-social-link"
                  href="https://www.facebook.com/profile.php?id=61593351131893"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Miroooo on Facebook"
                >
                  <span>Facebook</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
                <a
                  className="contact-social-link"
                  href="https://www.instagram.com/miroooo_official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Miroooo on Instagram"
                >
                  <span>Instagram</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
                <a
                  className="contact-social-link"
                  href="https://www.youtube.com/channel/UCVMc0L8ja_3DCL_bI3dczrQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Subscribe to Miroooo on YouTube"
                >
                  <span>YouTube</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CONTACT FORM SECTION */}
      <section className="contact-form-section" id="contact-form" aria-labelledby="form-section-heading">
        <div className="contact-glow contact-glow--form" aria-hidden="true" />

        <div className="site-shell contact-form-grid">
          <div className="contact-form-info reveal">
            <p className="eyebrow eyebrow--light">Contact form</p>
            <h2 id="form-section-heading" className="contact-section-title">
              Send us a <em className="contact-em">message.</em>
            </h2>
            <p className="contact-section-copy">
              Have a question or need assistance? Fill out the form below with your name, email, and message. We will get
              back to you promptly.
            </p>

            <div className="contact-callouts-list">
              <div className="contact-callout-box reveal">
                <div className="contact-callout-icon-wrap">
                  <svg className="contact-callout-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <p className="contact-callout-text">
                  Include your order number if your message is about shipping, returns, or an existing purchase.
                </p>
              </div>
              <div className="contact-callout-box reveal">
                <div className="contact-callout-icon-wrap">
                  <svg className="contact-callout-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <p className="contact-callout-text">
                  Messages are reviewed Monday through Friday during UK support hours.
                </p>
              </div>
            </div>

            <div className="contact-faq-cta reveal">
              <Link className="button button--outline contact-faq-link" href="/pages/faqs">
                <span className="btn-fill" data-fill />
                <span className="btn-text">
                  <span>Browse FAQs first</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          <div className="contact-form-container reveal">
            <form className="contact-form-card" id="contact-form-element" onSubmit={handleSubmit} noValidate>
              <div className="contact-form-fields">
                <div className="form-group">
                  <label className="form-label" htmlFor="field-first-name">
                    First Name <span className="required-indicator">*</span>
                  </label>
                  <input
                    className="form-control"
                    id="field-first-name"
                    name="firstName"
                    type="text"
                    placeholder="Your first name"
                    autoComplete="given-name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="field-last-name">
                    Last Name <span className="required-indicator">*</span>
                  </label>
                  <input
                    className="form-control"
                    id="field-last-name"
                    name="lastName"
                    type="text"
                    placeholder="Your last name"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="field-email">
                    Email <span className="required-indicator">*</span>
                  </label>
                  <input
                    className="form-control"
                    id="field-email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="field-phone">
                    Phone
                  </label>
                  <input
                    className="form-control"
                    id="field-phone"
                    name="phone"
                    type="tel"
                    placeholder="Your phone (optional)"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group form-group--full">
                  <label className="form-label" htmlFor="field-subject">
                    Subject
                  </label>
                  <input
                    className="form-control"
                    id="field-subject"
                    name="subject"
                    type="text"
                    placeholder="What can we help with?"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group form-group--full">
                  <label className="form-label" htmlFor="field-message">
                    Message <span className="required-indicator">*</span>
                  </label>
                  <textarea
                    className="form-control form-textarea"
                    id="field-message"
                    name="message"
                    rows={5}
                    maxLength={1000}
                    placeholder="Your message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Anti-spam Honeypot */}
              <div className="visually-hidden" aria-hidden="true">
                <label htmlFor="field-botcheck">Do not fill this field</label>
                <input
                  id="field-botcheck"
                  name="botcheck"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.botcheck}
                  onChange={handleChange}
                />
              </div>

              {/* Submission Status Banner */}
              {status !== 'idle' && (
                <div
                  className={`contact-feedback-box ${
                    status === 'success' ? 'is-success' : status === 'error' ? 'is-error' : ''
                  }`}
                  id="contact-feedback"
                  role="status"
                  aria-live="polite"
                >
                  <div className="contact-feedback-inner">
                    <div className="contact-feedback-icon" id="contact-feedback-icon">
                      {status === 'success' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                      )}
                      {status === 'error' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                      )}
                    </div>
                    <div className="contact-feedback-body">
                      <p className="contact-feedback-msg" id="contact-feedback-msg">
                        {feedbackMsg}
                      </p>
                      {status === 'error' && mailtoHref && (
                        <a className="contact-feedback-mailto" id="contact-feedback-mailto" href={mailtoHref}>
                          Email support@trymiroooo.com directly
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <button
                className="button button--primary contact-form-submit"
                id="contact-submit-btn"
                type="submit"
                disabled={status === 'submitting'}
              >
                <span className="btn-fill" data-fill />
                <span className="btn-text">
                  {status === 'submitting' ? (
                    <span className="btn-loader" id="btn-loader" aria-hidden="true">
                      <svg className="spin-animation" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                        <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
                      </svg>
                    </span>
                  ) : (
                    <span className="btn-send-icon" id="btn-send-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </span>
                  )}
                  <span className="btn-text-content" id="btn-text-content">
                    {status === 'submitting' ? 'Sending...' : 'Send message'}
                  </span>
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
