"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface NewBadgeProps {
  /** Date when feature was added (e.g., "2025-12-16") */
  addedDate: string;
  /** Days to show badge before auto-hiding (default: 14) */
  daysToShow?: number;
  /** Size variant */
  size?: "sm" | "md";
}

export default function NewBadge({ 
  addedDate, 
  daysToShow = 14,
  size = "md" 
}: NewBadgeProps) {
  // Check if badge should still be visible
  const added = new Date(addedDate);
  const now = new Date();
  const daysSinceAdded = Math.floor((now.getTime() - added.getTime()) / (1000 * 60 * 60 * 24));
  
  // Don't render if past expiry
  if (daysSinceAdded > daysToShow) {
    return null;
  }

  const sizeClasses = size === "sm" 
    ? "text-[10px] px-1.5 py-0.5 gap-0.5" 
    : "text-xs px-2 py-1 gap-1";

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`inline-flex items-center ${sizeClasses} bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-400/40 rounded-full font-semibold text-pink-300`}
    >
      <Sparkles size={size === "sm" ? 10 : 12} className="text-pink-400" />
      NEW
    </motion.span>
  );
}
