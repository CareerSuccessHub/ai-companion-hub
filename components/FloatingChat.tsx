"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";import MarkdownRenderer from "./MarkdownRenderer";
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);

  // Show greeting pop-up after a delay (only once per session)
  useEffect(() => {
    const hasSeenGreeting = sessionStorage.getItem('chat-greeting-shown');
    
    if (!hasSeenGreeting) {
      const timer = setTimeout(() => {
        setShowGreeting(true);
        sessionStorage.setItem('chat-greeting-shown', 'true');
        
        // Auto-hide greeting after 10 seconds
        setTimeout(() => {
          setShowGreeting(false);
        }, 10000);
      }, 2000); // Show after 2 seconds

      return () => clearTimeout(timer);
    }
  }, []); // Empty dependency array - runs once per component mount

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages([...messages, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      
      if (data.reply) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.reply,
        };
        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (err) {
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Greeting Pop-up */}
      <AnimatePresence>
        {showGreeting && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-24 right-6 z-50 w-80 bg-slate-800 border-2 border-blue-500/50 rounded-lg shadow-2xl overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={() => setShowGreeting(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-700"
              aria-label="Close greeting"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Greeting Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5 text-white" />
                </motion.div>
                <h3 className="text-white font-bold">AI Career Mentor</h3>
              </div>
            </div>

            {/* Greeting Message */}
            <div className="p-4">
              <p className="text-gray-300 text-sm leading-relaxed">
                👋 Hey there! I'm your AI Career Mentor.
              </p>
              <p className="text-gray-300 text-sm leading-relaxed mt-2">
                I can help you polish your resume, give tips on salary, plan your career, and find the right jobs.
              </p>
              <p className="text-gray-300 text-sm leading-relaxed mt-2">
                Think of me as your career buddy — just tap me anytime you need a hand! 😊
              </p>
              <button
                onClick={() => {
                  setShowGreeting(false);
                  setIsOpen(true);
                }}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Start Chatting
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-shadow"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="sparkles"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-slate-900 border border-slate-800 rounded-lg shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-800 bg-gradient-to-r from-blue-600 to-cyan-600">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5 text-white" />
                </motion.div>
                <h3 className="text-white font-bold">AI Career Mentor</h3>
              </div>
              <p className="text-blue-100 text-sm mt-1">Ask me anything about your career!</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center mt-8 text-gray-500">
                  <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Start a conversation!</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2 rounded-lg ${
                        msg.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-800 text-gray-100'
                      }`}
                    >
                      {msg.role === 'assistant' ? (
                        <MarkdownRenderer content={msg.content} className="prose-sm" />
                      ) : (
                        msg.content
                      )}
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 px-4 py-2 rounded-lg text-gray-100">
                    <span className="animate-pulse">Typing...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about careers, resumes, salaries..."
                  className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-50 flex items-center gap-2"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
