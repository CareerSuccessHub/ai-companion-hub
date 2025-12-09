"use client"

import { motion } from "framer-motion"
import { FileSearch, Wallet, BotMessageSquare, GraduationCap, Rocket, ArrowUpRight, Sparkles } from "lucide-react"

const tools = [
  {
    icon: FileSearch,
    title: "Resume Reviewer",
    description:
      "Get instant AI-powered feedback on your resume with actionable suggestions to stand out to recruiters.",
    className: "md:col-span-2 md:row-span-1",
    gradient: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-cyan-400",
    hoverBorder: "hover:border-cyan-500/50",
    glowColor: "cyan",
  },
  {
    icon: Wallet,
    title: "Salary Negotiator",
    description: "AI coaching to help you confidently negotiate the compensation you deserve.",
    className: "md:col-span-1 md:row-span-2",
    gradient: "from-emerald-500/20 to-green-500/20",
    iconColor: "text-emerald-400",
    hoverBorder: "hover:border-emerald-500/50",
    glowColor: "emerald",
  },
  {
    icon: BotMessageSquare,
    title: "AI Career Mentor",
    description: "Your personal AI advisor for career decisions, interview prep, and professional growth strategies.",
    className: "md:col-span-1 md:row-span-1",
    gradient: "from-blue-500/20 to-violet-500/20",
    iconColor: "text-blue-400",
    hoverBorder: "hover:border-blue-500/50",
    glowColor: "blue",
  },
  {
    icon: GraduationCap,
    title: "Scholarship Finder",
    description: "Discover scholarships and funding opportunities tailored to your profile and goals.",
    className: "md:col-span-1 md:row-span-1",
    gradient: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-400",
    hoverBorder: "hover:border-violet-500/50",
    glowColor: "violet",
  },
  {
    icon: Rocket,
    title: "Side Hustle Generator",
    description: "Unlock personalized side income ideas based on your skills, interests, and available time.",
    className: "md:col-span-2 md:row-span-1",
    gradient: "from-pink-500/20 to-rose-500/20",
    iconColor: "text-pink-400",
    hoverBorder: "hover:border-pink-500/50",
    glowColor: "pink",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export function FeaturesSection() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(16,185,129,0.08),transparent_70%)]" />

      {/* Animated background orbs */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
        className="absolute top-1/4 left-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
        className="absolute bottom-1/4 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Powerful AI Tools
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            5 Free Tools to{" "}
            <motion.span
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
              className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-[length:200%_auto] bg-clip-text text-transparent"
            >
              Accelerate Your Career
            </motion.span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Powerful AI-driven tools designed to help you land your dream job and grow professionally
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]"
        >
          {tools.map((tool) => (
            <motion.div
              key={tool.title}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`group relative rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm p-6 overflow-hidden transition-all duration-500 ${tool.hoverBorder} hover:bg-card/50 ${tool.className}`}
            >
              {/* Animated gradient background on hover */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} transition-opacity duration-500`}
              />

              {/* Glow effect */}
              <div
                className={`absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-${tool.glowColor}-500/30 via-transparent to-${tool.glowColor}-500/30 blur-sm`}
              />

              {/* Animated border glow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 rounded-2xl border border-white/10"
              />

              <div className="relative z-10 h-full flex flex-col">
                {/* Icon with animation */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center mb-4 shadow-lg`}
                >
                  <tool.icon className={`w-7 h-7 ${tool.iconColor}`} />
                </motion.div>

                {/* Title with arrow */}
                <div className="flex items-center gap-2 mb-2">
                  <h3
                    className={`text-xl font-semibold text-foreground group-hover:${tool.iconColor} transition-colors duration-300`}
                  >
                    {tool.title}
                  </h3>
                  <motion.div
                    initial={{ x: -5, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ArrowUpRight className={`w-5 h-5 ${tool.iconColor}`} />
                  </motion.div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed flex-1">{tool.description}</p>

                {/* Animated "Try it" prompt */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <span className={`text-sm font-medium ${tool.iconColor}`}>Try it free →</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
