"use client";

import { useState } from "react";
import { Send, BotMessageSquare } from "lucide-react";
import GradientIcon from "./GradientIcon";
import { motion } from "framer-motion";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const colors = {
    blue: 'bg-blue-600',
  };

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
    setError("");

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply,
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err: any) {
      setError(err.message);
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 rounded-lg border border-slate-800 flex flex-col h-[600px] hover:border-blue-500/50 transition-all duration-300">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <GradientIcon icon={BotMessageSquare} gradient="from-blue-400 to-violet-500" size={20} animate={false} />
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
            AI Career Mentor
          </h2>
        </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center mt-8 text-gray-500">
            Start chatting with your companion!
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-gray-100'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 text-gray-100 p-3 rounded-lg animate-pulse">
              Thinking...
            </div>
          </div>
        )}
        {error && (
          <div className="text-center text-red-400 text-sm">
            Error: {error}
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
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
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
    </div>
  );
}
