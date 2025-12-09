"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  Sparkles,
  Zap,
  FileSearch,
  Wallet,
  BotMessageSquare,
  GraduationCap,
  Rocket,
  ArrowRight,
  Users,
  Star,
} from "lucide-react"

const tools = [
  { icon: Wallet, name: "Salary Negotiator", color: "text-emerald-400", href: "#salary-negotiator" },
  { icon: FileSearch, name: "Resume Reviewer", color: "text-cyan-400", href: "#resume-reviewer" },
  { icon: BotMessageSquare, name: "AI Career Mentor", color: "text-blue-400", href: "#ai-mentor" },
  { icon: GraduationCap, name: "Scholarship Finder", color: "text-violet-400", href: "/scholarships" },
  { icon: Rocket, name: "Side Hustle Generator", color: "text-pink-400", href: "#side-hustle" },
]

const floatVariants = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
}

export default function ModernHero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-slate-950" />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm rounded-full"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              Powered by Advanced AI
            </motion.div>

            {/* Heading with gradient */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
            >
              <motion.span
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-[length:200%_auto] bg-clip-text text-transparent"
              >
                AI Career
              </motion.span>
              <br />
              <span className="text-gray-100">Success Hub</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg sm:text-xl text-gray-400 max-w-xl leading-relaxed"
            >
              Supercharge your career with our suite of{" "}
              <span className="text-cyan-400 font-semibold">free AI-powered tools</span>. From salary negotiation to
              resume optimization — we&apos;ve got you covered.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="#salary-negotiator"
                  className="relative inline-flex items-center justify-center bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold px-8 py-4 text-lg rounded-lg shadow-lg shadow-blue-500/25 transition-all hover:shadow-2xl hover:shadow-blue-500/40 group overflow-hidden"
                >
                  <Wallet className="w-5 h-5 mr-2" />
                  Try Salary Negotiator
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="#resume-reviewer"
                  className="inline-flex items-center justify-center border-2 border-cyan-500/50 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300 hover:border-cyan-400 font-bold px-8 py-4 text-lg rounded-lg backdrop-blur-sm transition-all"
                >
                  <FileSearch className="w-5 h-5 mr-2" />
                  Review My Resume
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust badges - honest metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex items-center gap-6 pt-4 flex-wrap"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-lg">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-gray-100 font-semibold">Powered by Google Gemini AI</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-green-600/20 border border-green-500/30 rounded-lg">
                <Zap className="w-4 h-4 text-green-400" />
                <span className="text-gray-100 font-semibold">100% Free Forever</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right content - Floating card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            {/* Main tools card */}
            <motion.div variants={floatVariants} animate="animate">
              <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-800/50 p-8 rounded-2xl shadow-2xl shadow-blue-500/10">
                <motion.div className="absolute -top-3 -right-3" whileHover={{ scale: 1.1, rotate: 3 }}>
                  <div className="inline-flex items-center gap-1 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold px-4 py-1.5 text-sm rounded-full">
                    <Zap className="w-4 h-4" />
                    100% FREE
                  </div>
                </motion.div>

                <h3 className="text-2xl font-bold text-gray-100 mb-6 flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-6 h-6 text-cyan-400" />
                  </motion.div>
                  5 Free Tools
                </h3>

                <div className="space-y-4">
                  {tools.map((tool, index) => (
                    <motion.div
                      key={tool.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                      whileHover={{ x: 8, backgroundColor: "rgba(6, 182, 212, 0.1)" }}
                    >
                      <Link
                        href={tool.href}
                        className="group flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 transition-all cursor-pointer border border-transparent hover:border-cyan-500/30"
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center ${tool.color}`}
                        >
                          <tool.icon className="w-6 h-6" />
                        </motion.div>
                        <div className="flex-1">
                          <span className="text-gray-100 font-semibold group-hover:text-cyan-400 transition-colors">
                            {tool.name}
                          </span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-slate-800/50">
                  <p className="text-sm text-gray-400 text-center">
                    No credit card required • Start in seconds
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Decorative floating elements */}
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl opacity-20 blur-xl"
            />
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full opacity-20 blur-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
