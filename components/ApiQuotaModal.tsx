"use client";

import { useEffect } from "react";
import { X, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ApiQuotaModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolName: string;
}

export default function ApiQuotaModal({ isOpen, onClose, toolName }: ApiQuotaModalProps) {
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border-2 border-red-500/50 rounded-xl shadow-2xl max-w-md w-full p-5 relative"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="bg-red-500/20 p-3 rounded-full">
                  <AlertCircle className="w-8 h-8 text-red-400" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white text-center mb-2">
                Daily Request Limit Reached 😅
              </h3>
              
              <p className="text-sm text-gray-300 text-center mb-4">
                Looks like our AI tools have hit the daily limit. We cap usage to keep the service free for everyone!
              </p>

              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 mb-4 space-y-2">
                <div className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-blue-400 font-bold">•</span>
                  <span><strong>Try again tomorrow</strong> — quota resets at 4 PM Philippine Time</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm"
              >
                Got it, thanks!
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                💡 We&apos;re working hard to keep everything free. Thanks for understanding!
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
