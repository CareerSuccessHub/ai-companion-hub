"use client"

import { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"

interface GradientIconProps {
  icon: LucideIcon
  gradient?: string
  size?: number
  animate?: boolean
}

export default function GradientIcon({ 
  icon: Icon, 
  gradient = "from-blue-400 to-cyan-400",
  size = 24,
  animate = true
}: GradientIconProps) {
  const iconElement = (
    <div className="relative inline-flex">
      {/* Glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-30 blur-lg rounded-full`} />
      
      {/* Icon with gradient */}
      <div className={`relative bg-gradient-to-br ${gradient} p-3 rounded-xl shadow-lg`}>
        <Icon className="w-6 h-6 text-white" style={{ width: size, height: size }} />
      </div>
    </div>
  )

  if (!animate) return iconElement

  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {iconElement}
    </motion.div>
  )
}
