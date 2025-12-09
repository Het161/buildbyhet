'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Volume2, VolumeX, Sparkles } from 'lucide-react';
import GlassCard from './ui/GlassCard';

// ========== TYPE DEFINITIONS ==========
interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// ========== QUICK QUESTIONS ==========
const quickQuestions = [
  "What's your best project?",
  "What tech stack do you use?",
  "Tell me about your skills",
  "Are you available for work?",
  "What are you currently learning?",
  "Show me your achievements",
];

// ============================================
// AI ASSISTANT - HOME PAGE ONLY
// ============================================
export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hey! 👋 I'm Het's AI assistant. Ask me anything about his projects, skills, or experience!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // ========== WELCOME POPUP (3 SECOND DELAY) ==========
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(true);
    }, 3000);

    // Auto-hide welcome after 8 seconds
    const hideTimer = setTimeout(() => {
      setShowWelcome(false);
    }, 11000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);
  
  // --- TRIGGER AVATAR ANIMATION ---
  const triggerAvatarTalking = (isActive: boolean) => {
    const event = new CustomEvent('avatar-talking', {
      detail: { isTalking: isActive }
    });
    window.dispatchEvent(event);
  };
  
  // --- TEXT-TO-SPEECH ---
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      utterance.lang = 'en-US';
      
      utterance.onstart = () => triggerAvatarTalking(true);
      utterance.onend = () => triggerAvatarTalking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };
  
  // --- SEND MESSAGE ---
  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    
    const userMessage: Message = {
      role: 'user',
      content: text,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      const aiMessage: Message = {
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      
      if (voiceEnabled) {
        speakText(data.message);
      }
      
    } catch (error: any) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '❌ Oops! Something went wrong. Please try again or reach out via the contact form!',
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };
  
  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };
  
  return (
    <>
      {/* ========== WELCOME POPUP ========== */}
      <AnimatePresence>
        {showWelcome && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 40, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 40, y: 10 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="fixed bottom-24 right-6 z-40 max-w-xs"
          >
            <div className="relative">
              {/* Speech bubble tail pointing to button */}
              <div className="absolute -bottom-2 right-6 w-4 h-4 bg-electric-blue/20 backdrop-blur-xl border-l border-b border-white/10 transform rotate-45" />

              {/* Popup content */}
              <div className="bg-electric-blue/20 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">👋</div>
                  <div className="flex-1">
                    <p className="text-white font-semibold mb-1">Hi there!</p>
                    <p className="text-gray-300 text-sm">
                      I'm Het's AI assistant. Ask me anything!
                    </p>
                  </div>
                  <button
                    onClick={() => setShowWelcome(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========== FLOATING BUTTON WITH BREATHING ANIMATION ========== */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-electric-blue to-neon-purple flex items-center justify-center shadow-2xl cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1, rotate: isOpen ? 0 : 15 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          scale: isOpen ? 1 : [1, 1.05, 1],
          boxShadow: isOpen 
            ? '0 10px 40px rgba(102, 126, 234, 0.4)'
            : [
                '0 10px 40px rgba(102, 126, 234, 0.4)',
                '0 10px 50px rgba(102, 126, 234, 0.6)',
                '0 10px 40px rgba(102, 126, 234, 0.4)',
              ]
        }}
        transition={{
          duration: 3,
          repeat: isOpen ? 0 : Infinity,
          ease: "easeInOut"
        }}
        aria-label="Open AI Chat Assistant"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6 text-white" />
            <Sparkles className="w-3 h-3 text-white absolute top-2 right-2" />
          </>
        )}

        {/* Badge for new messages */}
        {!isOpen && (
          <motion.div
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            1
          </motion.div>
        )}
      </motion.button>

      {/* ========== CHAT WINDOW ========== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-[400px] h-[600px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-8rem)]"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <GlassCard className="h-full flex flex-col p-0 overflow-hidden">
              
              {/* ========== HEADER ========== */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-electric-blue/20 to-neon-purple/20">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-electric-blue to-neon-purple flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    {/* Online indicator with pulse */}
                    <motion.div
                      className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-deep-navy"
                      animate={{
                        boxShadow: [
                          '0 0 0 0 rgba(34, 197, 94, 0.7)',
                          '0 0 0 6px rgba(34, 197, 94, 0)',
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white flex items-center gap-1">
                      Het's AI Assistant
                      <Sparkles className="w-4 h-4 text-electric-blue" />
                    </h3>
                    <p className="text-xs text-gray-400">Always available</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setVoiceEnabled(!voiceEnabled);
                      if (voiceEnabled) {
                        window.speechSynthesis.cancel();
                      }
                    }}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors duration-300"
                    title={voiceEnabled ? 'Disable voice' : 'Enable voice'}
                  >
                    {voiceEnabled ? (
                      <Volume2 className="w-5 h-5 text-electric-blue" />
                    ) : (
                      <VolumeX className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400 hover:text-white" />
                  </button>
                </div>
              </div>
              
              {/* ========== MESSAGES ========== */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-deep-navy/20">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      message.role === 'user' 
                        ? 'bg-gradient-to-r from-electric-blue to-neon-purple text-white rounded-br-none' 
                        : 'bg-white/5 border border-white/10 text-gray-200 rounded-bl-none'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                      <span className="text-xs text-gray-500 mt-1 block">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </motion.div>
                ))}
                
                {/* Typing indicator */}
                {isLoading && (
                  <motion.div 
                    className="flex justify-start" 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                  >
                    <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-bl-none">
                      <div className="flex gap-1">
                        <motion.div
                          className="w-2 h-2 bg-electric-blue rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-electric-blue rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-electric-blue rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
              {/* ========== QUICK QUESTIONS ========== */}
              {messages.length === 1 && !isLoading && (
                <div className="px-4 pb-2 bg-deep-navy/20">
                  <p className="text-xs text-gray-400 mb-2">💡 Try asking:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.slice(0, 3).map((question, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleQuickQuestion(question)}
                        className="text-xs px-3 py-1.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-electric-blue/30 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {question}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* ========== INPUT FORM ========== */}
              <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-deep-navy/50">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    disabled={isLoading}
                    className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-full focus:border-electric-blue focus:outline-none focus:ring-2 focus:ring-electric-blue/50 text-white placeholder-gray-500 text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    maxLength={200}
                  />
                  <motion.button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="p-3 rounded-full bg-gradient-to-r from-electric-blue to-neon-purple hover:shadow-lg hover:shadow-electric-blue/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Send className="w-5 h-5 text-white" />
                  </motion.button>
                </div>
              </form>
              
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
