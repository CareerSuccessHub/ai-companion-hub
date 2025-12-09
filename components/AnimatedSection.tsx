"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  delay?: number
  className?: string
}

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

export default function AnimatedSection({ children, delay = 0, className = "" }: AnimatedSectionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
