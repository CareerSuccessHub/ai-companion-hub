"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Star,
  ArrowRight,
  Sparkles,
  Zap,
  FileSearch,
  Wallet,
  BotMessageSquare,
  Compass,
  Rocket,
} from "lucide-react"

const tools = [
  { icon: Wallet, name: "Salary Negotiator", color: "text-emerald-400" },
  { icon: FileSearch, name: "Resume Reviewer", color: "text-cyan-400" },
  { icon: BotMessageSquare, name: "AI Career Mentor", color: "text-blue-400" },
  { icon: Compass, name: "Scholarship Finder", color: "text-violet-400" },
  { icon: Rocket, name: "Side Hustle Generator", color: "text-pink-400" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
}

const floatVariants = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
  },
}

const pulseGlow = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.5, 0.8, 0.5],
    transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
  },
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-[#0F172A]" />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl"
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

      <div className="relative z-10 container mx-auto px-4 py-20 lg:py-32">
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
            >
              <Badge variant="outline" className="px-4 py-2 border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm">
                <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                Powered by Advanced AI
              </Badge>
            </motion.div>

            {/* Heading with gradient */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-balance"
            >
              <motion.span
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-[length:200%_auto] bg-clip-text text-transparent"
              >
                AI Career
              </motion.span>
              <br />
              <span className="text-foreground">Success Hub</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed text-pretty"
            >
              Supercharge your career with our suite of{" "}
              <span className="text-cyan-400 font-semibold">free AI-powered tools</span>. From salary negotiation to
              resume optimization — we've got you covered.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  className="relative bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold px-10 py-8 text-xl shadow-lg shadow-blue-500/25 transition-all hover:shadow-2xl hover:shadow-blue-500/40 group overflow-hidden"
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                  />
                  <Wallet className="w-6 h-6 mr-3" />
                  Try Salary Negotiator
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-cyan-500/50 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300 hover:border-cyan-400 font-bold px-10 py-8 text-xl backdrop-blur-sm"
                >
                  <FileSearch className="w-6 h-6 mr-3" />
                  Review My Resume
                </Button>
              </motion.div>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex items-center gap-6 pt-4"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
                    className="w-10 h-10 rounded-full border-2 border-[#0F172A] bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-xs font-bold text-[#0F172A]"
                  >
                    {String.fromCharCode(64 + i)}
                  </motion.div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span className="text-foreground font-bold">10K+</span>
                  <span className="text-muted-foreground">users</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.div
                      key={star}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 1 + star * 0.1, type: "spring" }}
                    >
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                  <span className="text-muted-foreground text-sm ml-1">4.9/5</span>
                </div>
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
              <Card className="relative bg-card/80 backdrop-blur-xl border-border/50 p-8 shadow-2xl shadow-blue-500/10">
                <motion.div className="absolute -top-3 -right-3" whileHover={{ scale: 1.1, rotate: 3 }}>
                  <Badge className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold px-4 py-1.5 text-sm">
                    <Zap className="w-4 h-4 mr-1" />
                    100% FREE
                  </Badge>
                </motion.div>

                <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Sparkles className="w-6 h-6 text-cyan-400" />
                  </motion.div>
                  5 Free Tools
                </h3>

                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
                  {tools.map((tool) => (
                    <motion.div
                      key={tool.name}
                      variants={itemVariants}
                      whileHover={{ x: 8, backgroundColor: "rgba(6, 182, 212, 0.1)" }}
                      className="group flex items-center gap-4 p-4 rounded-xl bg-secondary/50 transition-all cursor-pointer border border-transparent hover:border-cyan-500/30"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center ${tool.color}`}
                      >
                        <tool.icon className="w-6 h-6" />
                      </motion.div>
                      <div className="flex-1">
                        <span className="text-foreground font-semibold group-hover:text-cyan-400 transition-colors">
                          {tool.name}
                        </span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                    </motion.div>
                  ))}
                </motion.div>

                <div className="mt-6 pt-6 border-t border-border/50">
                  <p className="text-sm text-muted-foreground text-center">
                    No credit card required • Start in seconds
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Decorative floating elements with enhanced animations */}
            <motion.div
              variants={pulseGlow}
              animate="animate"
              className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl opacity-20 blur-xl"
            />
            <motion.div
              variants={pulseGlow}
              animate="animate"
              style={{ animationDelay: "1s" }}
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full opacity-20 blur-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
