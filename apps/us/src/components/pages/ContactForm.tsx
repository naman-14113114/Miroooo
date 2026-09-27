'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      setStatus('error');
      setFeedbackMsg('Please fill in all required fields marked with *.');
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
    <div className="contact-page-root bg-[#080909] text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section 1: Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[11.5px] font-bold uppercase tracking-widest text-white/50 block">
              Contact Miroooo
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              We are here to <em className="italic font-serif">help.</em>
            </h1>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed font-light">
              Welcome to Miroooo, where precision oral care meets thoughtful support. We are delighted to assist you with product questions, order help, and anything you need for a smoother daily routine.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="mailto:support@trymiroooo.com"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-[13px] font-medium transition-colors"
              >
                <span>✉</span>
                <span>support@trymiroooo.com</span>
              </a>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-white/70 text-[13px]">
                <span>🕒</span>
                <span>Mon – Fri: 9:00 AM – 5:00 PM EST</span>
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-white/70 text-[13px]">
                <span>📍</span>
                <span>131 Continental Dr Suite 305, Newark, DE 19713, USA</span>
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#111213]">
              <Image
                src="/assets/miroooo-x2-sonic-electric-toothbrush-sticky-add-to-cart.webp"
                alt="Miroooo Support Desk"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <div>
                  <strong className="block text-white text-[15px] font-bold">US Support Desk</strong>
                  <p className="text-white/70 text-[12.5px]">Product guidance, order tracking, and warranty support.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Quick Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/pages/faqs"
            className="p-6 rounded-3xl bg-[#111213] border border-white/10 hover:border-white/20 transition-all space-y-3 block group"
          >
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white text-lg">
              ?
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-white">FAQs &amp; Help</h3>
            <p className="text-[13px] text-white/60">
              Quick answers for delivery, returns, brush care, and order questions.
            </p>
            <span className="text-[13px] font-semibold text-white/90 group-hover:underline block pt-2">
              Browse FAQs →
            </span>
          </Link>

          <Link
            href="/policies/delivery-returns"
            className="p-6 rounded-3xl bg-[#111213] border border-white/10 hover:border-white/20 transition-all space-y-3 block group"
          >
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white text-lg">
              📦
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-white">Delivery &amp; Returns</h3>
            <p className="text-[13px] text-white/60">
              Learn about tracked US shipping, dispatch times, and our 30-day defective return policy.
            </p>
            <span className="text-[13px] font-semibold text-white/90 group-hover:underline block pt-2">
              Delivery details →
            </span>
          </Link>

          <a
            href="mailto:support@trymiroooo.com"
            className="p-6 rounded-3xl bg-[#111213] border border-white/10 hover:border-white/20 transition-all space-y-3 block group"
          >
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white text-lg">
              ✉
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-white">Direct Email</h3>
            <p className="text-[13px] text-white/60">
              Prefer direct email? Reach our US customer service team directly.
            </p>
            <span className="text-[13px] font-semibold text-white/90 group-hover:underline block pt-2">
              Email Miroooo →
            </span>
          </a>
        </section>

        {/* Section 3: Contact Form */}
        <section id="contact-form" className="p-8 sm:p-12 rounded-3xl bg-[#111213] border border-white/10 shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-white/50">
                Online Inquiry
              </span>
              <h2 className="text-3xl font-extrabold text-white">
                Send Us a Message
              </h2>
              <p className="text-[13.5px] text-white/60">
                Messages are reviewed Monday through Friday during US support hours (9:00 AM – 5:00 PM EST).
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-white/80 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Your first name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/40 text-[14px] focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-white/80 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Your last name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/40 text-[14px] focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-white/80 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/40 text-[14px] focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-white/80 mb-1">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/40 text-[14px] focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-white/80 mb-1">
                  Subject / Order Number
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What can we help you with?"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/40 text-[14px] focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-white/80 mb-1">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  maxLength={1000}
                  placeholder="Please describe your inquiry in detail..."
                  required
                  className="w-full p-4 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/40 text-[14px] focus:outline-none focus:border-white transition-colors"
                />
              </div>

              {/* Botcheck honeypot */}
              <input
                type="text"
                name="botcheck"
                value={formData.botcheck}
                onChange={handleChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {status === 'success' && (
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-[13.5px]">
                  ✓ {feedbackMsg}
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-[13.5px] space-y-2">
                  <p>⚠ {feedbackMsg}</p>
                  {mailtoHref && (
                    <a href={mailtoHref} className="underline block font-semibold">
                      Click here to email support@trymiroooo.com directly
                    </a>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-4 rounded-full bg-white text-black font-extrabold text-[15px] hover:bg-neutral-200 active:scale-95 transition-all shadow-xl disabled:opacity-50"
              >
                {status === 'submitting' ? 'Sending Message...' : 'Send Message →'}
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
