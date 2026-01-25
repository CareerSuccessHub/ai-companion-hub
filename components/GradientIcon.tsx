"use client"

import { LucideIcon } from "lucide-react"

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
  return (
    <div className={`relative inline-flex ${animate ? 'transition-transform hover:scale-110 active:scale-95' : ''}`}>
      {/* Glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-30 blur-lg rounded-full`} />
      
      {/* Icon with gradient */}
      <div className={`relative bg-gradient-to-br ${gradient} p-3 rounded-xl shadow-lg`}>
        <Icon className="w-6 h-6 text-white" style={{ width: size, height: size }} />
      </div>
    </div>
  )
}
