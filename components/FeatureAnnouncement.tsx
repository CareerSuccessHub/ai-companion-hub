"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import Link from "next/link";

interface FeatureAnnouncementProps {
  /** Unique ID for this announcement (used for localStorage tracking) */
  announcementId: string;
  /** Title of the announcement */
  title: string;
  /** Short description */
  description: string;
  /** Optional CTA link */
  ctaText?: string;
  ctaHref?: string;
}

export default function FeatureAnnouncement({
  announcementId,
  title,
  description,
  ctaText,
  ctaHref,
}: FeatureAnnouncementProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed this announcement
    const dismissed = localStorage.getItem(`announcement-${announcementId}`);
    
    // Show toast only if not dismissed AND user has visited before
    const hasVisitedBefore = localStorage.getItem("has-visited");
    
    if (!dismissed && hasVisitedBefore) {
      // Delay showing toast slightly for better UX
      setTimeout(() => setIsVisible(true), 2000);
    }

    // Mark as visited for future announcements
    if (!hasVisitedBefore) {
      localStorage.setItem("has-visited", "true");
    }
  }, [announcementId]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(`announcement-${announcementId}`, "dismissed");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-6 left-6 z-[60] max-w-sm"
        >
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-pink-500/30 rounded-lg shadow-2xl shadow-pink-500/20 p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-pink-400" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-1">{title}</h4>
                <p className="text-sm text-gray-300 mb-3">{description}</p>
                {ctaText && ctaHref && (
                  <Link
                    href={ctaHref}
                    onClick={handleDismiss}
                    className="inline-flex items-center text-sm font-medium text-pink-400 hover:text-pink-300 transition-colors"
                  >
                    {ctaText} →
                  </Link>
                )}
              </div>
              <button
                onClick={handleDismiss}
                className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
                aria-label="Dismiss announcement"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
