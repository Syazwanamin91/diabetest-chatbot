import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Bot, User, Loader2, Info, RefreshCw, Sparkles } from 'lucide-react';

const API_BASE_URL = "http://127.0.0.1:8000";

export default function DiabetesChatbot() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I am your diabetes care assistant. I can answer questions based on the medical documents provided. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending a message
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessageText = input;
    setInput(''); // Clear input immediately
    
    // Add User Message
    const newUserMsg = {
      id: Date.now(),
      text: userMessageText,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      // Connect to the FastAPI endpoint provided
      const response = await axios.get(`${API_BASE_URL}/ask`, {
        params: { question: userMessageText }
      });

      const botResponseText = response.data.answer;

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date()
      }]);

    } catch (error) {
      console.error("API Error:", error);
      
      let errorMessage = "I'm having trouble connecting to the server. Please check if the backend is running.";
      if (error.response) {
        // Server responded with a status code other than 2xx
        errorMessage = `Error: ${error.response.data.detail || "Server error"}`;
      } else if (error.request) {
        // Request made but no response
        errorMessage = "Network error. Is the FastAPI server running on port 8000?";
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: errorMessage,
        sender: 'bot',
        isError: true,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
      // Focus back on input after sending
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        text: "Chat cleared. Ask me a new question about diabetes.",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  };

  // Helper to format time
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg text-white shadow-blue-200 shadow-md">
            <Sparkles size={24} strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Diabetes Care AI</h1>
            <p className="text-xs text-slate-500 font-medium">RAG Powered • Gemini 2.0 Flash</p>
          </div>
        </div>
        <button 
          onClick={handleClearChat}
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          title="Clear Chat"
        >
          <RefreshCw size={20} />
        </button>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[85%] md:max-w-[75%] gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              {/* Avatar */}
              <div className={`
                flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1
                ${msg.sender === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-emerald-600 text-white'}
              `}>
                {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>

              {/* Message Bubble */}
              <div className="flex flex-col gap-1">
                <div 
                  className={`
                    px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-sm
                    ${msg.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : msg.isError 
                        ? 'bg-red-50 text-red-600 border border-red-100 rounded-tl-none'
                        : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none'}
                  `}
                >
                  {msg.text}
                </div>
                <span className={`text-[10px] text-slate-400 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  {formatTime(msg.timestamp)}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-start w-full">
            <div className="flex max-w-[75%] gap-3 flex-row">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center mt-1">
                <Bot size={16} />
              </div>
              <div className="bg-white border border-slate-200 px-5 py-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                <Loader2 className="animate-spin text-emerald-600" size={18} />
                <span className="text-slate-500 text-sm font-medium">Analyzing documents...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </main>

      {/* Input Area */}
      <footer className="bg-white border-t border-slate-200 p-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSend} className="relative flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              placeholder="Ask about diabetes symptoms, treatments, or diet..."
              className="w-full pl-5 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`
                absolute right-2 p-2 rounded-lg transition-all duration-200
                ${!input.trim() || isLoading 
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'}
              `}
            >
              <Send size={20} strokeWidth={2.5} />
            </button>
          </form>
          <div className="text-center mt-3">
             <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
               <Info size={10} />
               AI answers are based on specific context and may not cover all medical cases.
             </p>
          </div>
        </div>
      </footer>
    </div>
  );
}