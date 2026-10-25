'use client';

import React from 'react';
import Link from 'next/link';

interface DentalAppSectionProps {
  isX2?: boolean;
  isFlosser?: boolean;
}

export function DentalAppSection({ isX2 = false, isFlosser = false }: DentalAppSectionProps) {
  return (
    <section
      id="shopify-section-template--miroooo-dental-app"
      className="shopify-section gb-dental-app-section"
      aria-labelledby="dental-app-title"
      style={{
        background: '#080909',
        color: '#f4f2ec',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <style>{`
        .gb-dental-app-section {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          align-items: center;
          min-height: 0;
          background: #080909;
          color: #f4f2ec;
        }
        .gb-dental-app__media {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          padding: 0;
          margin: 0;
        }
        .gb-dental-app__media img {
          width: 100%;
          height: 100%;
          aspect-ratio: 1 / 1;
          object-fit: contain;
          display: block;
          margin: 0;
          padding: 0;
        }
        .gb-dental-app__content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          padding: clamp(24px, 4vw, 48px) clamp(32px, 6vw, 90px);
          box-sizing: border-box;
        }
        .gb-dental-app__content .gb-kicker {
          color: rgba(255, 255, 255, 0.6);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin: 0 0 12px 0;
        }
        .gb-dental-app__content h2 {
          max-width: 620px;
          margin: 0 0 16px;
          font-size: clamp(34px, 4.4vw, 64px);
          font-weight: 540;
          letter-spacing: -0.05em;
          line-height: 1.02;
          color: #ffffff;
        }
        .gb-dental-app__content > p:not(.gb-kicker) {
          max-width: 520px;
          margin: 0 0 28px;
          color: rgba(244, 242, 236, 0.72);
          font-size: 15px;
          line-height: 1.65;
        }
        .gb-dental-app__proof {
          width: 100%;
          max-width: 520px;
          margin: 0 0 32px;
          padding: 0;
          border-top: 1px solid rgba(244, 242, 236, 0.16);
          list-style: none;
        }
        .gb-dental-app__proof li {
          display: grid;
          grid-template-columns: 46px 1fr;
          gap: 12px;
          padding: 14px 0;
          border-bottom: 1px solid rgba(244, 242, 236, 0.16);
          font-size: 13px;
          color: #f4f2ec;
        }
        .gb-dental-app__proof span {
          color: rgba(255, 255, 255, 0.45);
          font-size: 11px;
          letter-spacing: 0.08em;
          font-weight: 700;
        }
        .gb-dental-app-section .gb-button {
          background: #000000 !important;
          color: #ffffff !important;
          border: 1.5px solid #ffffff !important;
          border-color: #ffffff !important;
        }
        .gb-dental-app-section .gb-button:hover {
          border-color: #ffffff !important;
        }
        @media (max-width: 900px) {
          .gb-dental-app-section {
            grid-template-columns: 1fr;
          }
          .gb-dental-app__media {
            min-height: 0 !important;
            width: 100% !important;
            max-width: min(100%, 540px) !important;
            aspect-ratio: 1 / 1 !important;
            margin: 0 auto !important;
          }
          .gb-dental-app__content {
            padding: 32px 20px 48px;
          }
          .gb-dental-app__content h2 {
            font-size: clamp(30px, 7vw, 42px);
            margin-bottom: 14px;
          }
        }
      `}</style>
      <div className="gb-dental-app__media reveal">
        <img
          src={
            isFlosser
              ? '/assets_ref/flosser/gallery/miroooo-water-flosser-black-white-duo.webp'
              : isX2
                ? '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-smile-coach-app.webp'
                : '/assets_ref/x/gallery/miroooo-x1-sonic-electric-toothbrush-smile-coach-app.webp'
          }
          alt={
            isFlosser
              ? 'Miroooo Precision Water Flosser in Obsidian Black and Glacier White with companion dental app'
              : isX2
                ? 'Miroooo X2 toothbrush held beside the Smile Coach app'
                : 'Miroooo X1 toothbrush held beside the Smile Coach app'
          }
          width={1254}
          height={1254}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="gb-dental-app__content reveal">
        <p className="gb-kicker">Free Customer App</p>
        <h2 id="dental-app-title">Miroooo Dental App</h2>
        <p>
          {isFlosser
            ? 'Set your priorities and follow a tailored 28-day routine with guided hydrodynamic flossing sessions, quadrant pacing cues, and private on-device habit tracking.'
            : 'Set your priorities and follow a tailored 28-day routine with guided two-minute sessions, quadrant pacing cues, and private on-device habit tracking.'}
        </p>
        <ul className="gb-dental-app__proof" aria-label="Miroooo Dental App features">
          <li>
            <span>01</span> Personal 28-day plan
          </li>
          <li>
            <span>02</span> {isFlosser ? 'Four-quadrant hydro timer' : 'Four-zone brush timer'}
          </li>
          <li>
            <span>03</span> Private, on-device progress
          </li>
        </ul>
        <Link className="gb-button gb-button--dark" href="/pages/smile-coach">
          <span className="btn-fill" data-fill />
          <span className="btn-text">
            Open Smile Coach <span aria-hidden="true">↗</span>
          </span>
        </Link>
      </div>
    </section>
  );
}
