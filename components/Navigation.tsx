"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, BookOpen, GraduationCap, Menu, X, ChevronDown, Briefcase } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/blog", label: "Blog", icon: BookOpen },
    { href: "/scholarships", label: "Scholarships", icon: GraduationCap },
    { href: "/updates", label: "Updates", icon: Briefcase },
  ];

  const toolsItems = [
    { href: "/tools/salary-negotiator", label: "Salary Negotiator" },
    { href: "/tools/resume-reviewer", label: "Resume Reviewer" },
    { href: "/tools/side-hustle", label: "Side Hustle Generator" },
  ];

  return (
    <nav className="bg-slate-900/95 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 font-bold text-xl group">
            <motion.div 
              className="relative w-12 h-12"
            >
              <Image
                src="/logo-2.svg"
                alt="AI Career Hub Logo"
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </motion.div>
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              AI Career Hub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <motion.div
                  key={item.href}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all relative overflow-hidden ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30"
                        : "text-gray-300 hover:text-white hover:bg-slate-800/50"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <Icon className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                </motion.div>
              );
            })}
            
            {/* Tools Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setToolsOpen(true)}
              onMouseLeave={() => setToolsOpen(false)}
            >
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-800/50 transition-all"
              >
                <Briefcase className="w-4 h-4" />
                <span>Tools</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${toolsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {toolsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full right-0 -mt-2 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden z-50"
                >
                  {toolsItems.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="block px-4 py-3 text-gray-300 hover:bg-slate-700 hover:text-white transition-colors border-b border-slate-700 last:border-0"
                    >
                      {tool.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-slate-800">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            
            {/* Mobile Tools Section */}
            <div className="mt-2 pt-2 border-t border-slate-700">
              <div className="px-4 py-2 text-sm font-semibold text-gray-400">Tools</div>
              {toolsItems.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  {tool.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
