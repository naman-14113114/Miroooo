import React, { type ReactNode } from "react";
import { legalEntity } from "@/data/policies";

interface PolicyLayoutProps {
  title: string;
  lastUpdated?: string;
  children: ReactNode;
}

export function PolicyLayout({
  title,
  lastUpdated = "January 2026",
  children,
}: PolicyLayoutProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-white">
      <div className="border-b border-[rgba(255,255,255,0.08)] pb-8 mb-10">
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
          Legal & Transparency
        </p>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">{title}</h1>
        <p className="text-xs text-neutral-400 mt-2 font-mono">Last updated: {lastUpdated}</p>
      </div>

      <div className="prose prose-invert max-w-none text-xs sm:text-sm text-neutral-300 leading-relaxed space-y-6">
        {children}
      </div>

      <div className="mt-14 pt-8 border-t border-[rgba(255,255,255,0.08)] text-xs text-neutral-400 space-y-1">
        <p className="font-semibold text-neutral-300">{legalEntity.company}</p>
        <p>{legalEntity.address}</p>
        <p>Support contact: <a href={`mailto:${legalEntity.email}`} className="text-emerald-400 hover:underline">{legalEntity.email}</a></p>
      </div>
    </div>
  );
}
