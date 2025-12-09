"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Check,
  Heart,
  Sparkles,
  ExternalLink,
  Coffee,
  Zap,
  Gift,
  Gem,
  ShieldCheck,
  Users,
  Star,
  PartyPopper,
} from "lucide-react"

const tiers = [
  {
    name: "Free Forever",
    price: "$0",
    period: "forever",
    description: "Full access to all career tools, no strings attached",
    icon: Gift,
    featured: true,
    buttonText: "Get Started Free",
    buttonVariant: "default" as const,
    features: [
      { text: "Salary Negotiator AI", icon: Sparkles },
      { text: "Resume Reviewer", icon: ShieldCheck },
      { text: "AI Career Mentor", icon: Users },
      { text: "Scholarship Finder", icon: Star },
      { text: "Side Hustle Generator", icon: Zap },
      { text: "Unlimited usage", icon: Check },
      { text: "No account required", icon: Check },
    ],
  },
  {
    name: "Supporter",
    price: "$5",
    period: "/month",
    description: "Support our mission via Ko-fi",
    icon: Heart,
    featured: false,
    buttonText: "Support on Ko-fi",
    buttonVariant: "outline" as const,
    externalLink: true,
    features: [
      { text: "Everything in Free", icon: Check },
      { text: "Support development", icon: Heart },
      { text: "Early feature access", icon: Zap },
      { text: "Community Discord", icon: Users },
      { text: "Name in supporters list", icon: Star },
      { text: "Good karma", icon: PartyPopper },
    ],
  },
  {
    name: "Premium",
    price: "Soon",
    period: "",
    description: "Advanced features coming soon",
    icon: Gem,
    featured: false,
    buttonText: "Join Waitlist",
    buttonVariant: "outline" as const,
    comingSoon: true,
    features: [
      { text: "Everything in Free", icon: Check },
      { text: "Advanced AI models", icon: Sparkles },
      { text: "Custom career reports", icon: ShieldCheck },
      { text: "1-on-1 AI coaching", icon: Users },
      { text: "Priority support", icon: Star },
      { text: "API access", icon: Zap },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const featureVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
}

export function PricingSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[#0F172A]" />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        className="absolute top-1/4 left-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1.3, 1, 1.3], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
        className="absolute bottom-1/4 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"
      />

      <div className="relative z-10 container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            <Badge
              variant="outline"
              className="px-4 py-2 mb-6 border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
            >
              <Coffee className="w-4 h-4 mr-2" />
              Donation-Based Platform
            </Badge>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            <span className="text-foreground">Simple, </span>
            <motion.span
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
              className="bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-400 bg-[length:200%_auto] bg-clip-text text-transparent"
            >
              Transparent
            </motion.span>
            <span className="text-foreground"> Pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            All tools are free. Support us if you'd like to help keep this project running and growing.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto perspective-1000"
        >
          {tiers.map((tier, tierIndex) => (
            <motion.div key={tier.name} variants={cardVariants} whileHover={{ y: -10, transition: { duration: 0.3 } }}>
              <Card
                className={`relative h-full p-6 lg:p-8 backdrop-blur-xl border-border/50 transition-all duration-500 hover:border-emerald-500/50 ${
                  tier.featured
                    ? "bg-gradient-to-b from-emerald-500/10 to-card/80 border-emerald-500/30 shadow-2xl shadow-emerald-500/20"
                    : "bg-card/60 hover:shadow-xl hover:shadow-emerald-500/10"
                }`}
              >
                {/* Featured badge */}
                {tier.featured && (
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2"
                  >
                    <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold px-4 py-1.5">
                      <motion.div
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <Zap className="w-4 h-4 mr-1" />
                      </motion.div>
                      RECOMMENDED
                    </Badge>
                  </motion.div>
                )}

                {/* Coming soon badge */}
                {tier.comingSoon && (
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2"
                  >
                    <Badge
                      variant="outline"
                      className="border-muted-foreground/30 bg-muted/50 text-muted-foreground font-medium px-4 py-1"
                    >
                      COMING SOON
                    </Badge>
                  </motion.div>
                )}

                {/* Icon and tier name */}
                <div className="flex items-center gap-3 mb-4 mt-2">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      tier.featured
                        ? "bg-gradient-to-br from-emerald-500/30 to-green-500/30 text-emerald-400"
                        : "bg-secondary/80 text-muted-foreground"
                    }`}
                  >
                    <tier.icon className="w-7 h-7" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-foreground">{tier.name}</h3>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <motion.span
                    animate={tier.featured ? { scale: [1, 1.02, 1] } : {}}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className={`text-4xl lg:text-5xl font-bold ${
                      tier.featured
                        ? "bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent"
                        : "text-foreground"
                    }`}
                  >
                    {tier.price}
                  </motion.span>
                  {tier.period && <span className="text-muted-foreground ml-1">{tier.period}</span>}
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-6">{tier.description}</p>

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    className={`w-full mb-6 font-bold py-7 text-lg ${
                      tier.featured
                        ? "bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/40"
                        : "border-2 border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50"
                    }`}
                    variant={tier.buttonVariant}
                    disabled={tier.comingSoon}
                  >
                    {tier.buttonText}
                    {tier.externalLink && <ExternalLink className="w-5 h-5 ml-2" />}
                  </Button>
                </motion.div>

                {/* Features list with staggered animation */}
                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ staggerChildren: 0.05, delayChildren: 0.3 + tierIndex * 0.1 }}
                  className="space-y-3"
                >
                  {tier.features.map((feature) => (
                    <motion.li
                      key={feature.text}
                      variants={featureVariants}
                      className="flex items-center gap-3 text-sm"
                    >
                      <feature.icon
                        className={`w-4 h-4 flex-shrink-0 ${tier.featured ? "text-emerald-400" : "text-muted-foreground"}`}
                      />
                      <span className="text-foreground/90">{feature.text}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center text-muted-foreground text-sm mt-12"
        >
          Questions? Reach out anytime — we're here to help.
        </motion.p>
      </div>
    </section>
  )
}
