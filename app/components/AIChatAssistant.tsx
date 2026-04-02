"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import './AIChatAssistant.css';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const AIChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'assistant', content: "Hello! I'm your Redstore shopping assistant. How can I help you today?" }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: trimmed };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const assistantId = (Date.now() + 1).toString();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })) }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Failed to get response');
      }

      const contentType = res.headers.get('content-type') || '';

      // Handle JSON error response
      if (contentType.includes('application/json')) {
        const data = await res.json();
        const errorMsg = data.error || "I couldn't process that request. Please try again.";
        setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: errorMsg }]);
        return;
      }

      // Handle streaming text response (toTextStreamResponse sends plain text chunks)
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';

      setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '...' }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          assistantContent += chunk;
          setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: assistantContent } : m));
        }
      }

      // If we never got streamed content, show fallback
      if (!assistantContent) {
        setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: "I'm having trouble responding right now. Please try again." } : m));
      }
    } catch (error: any) {
      console.error("AI Assistant Error:", error);
      setMessages(prev => {
        const filtered = prev.filter(m => m.id !== assistantId);
        return [...filtered, { id: assistantId, role: 'assistant', content: "I'm sorry, I'm having some trouble right now. Please try again later." }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ai-chat-root">
      <button
        className={`ai-chat-fab ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Ask our AI Assistant"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      {isOpen && (
        <div className="ai-chat-window">
          <div className="ai-chat-header">
            <div className="ai-chat-title">
              <span className="status-dot"></span>
              <h3>Assistant</h3>
            </div>
            <p>Ready to help find your products</p>
          </div>

          <div className="ai-chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`msg-row ${msg.role}`}>
                <div className={`msg-bubble ${msg.role}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
              <div className="msg-row assistant">
                <div className="msg-bubble assistant thinking">
                  <Loader2 className="spinner" size={16} />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="ai-chat-input-area" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              autoFocus
            />
            <button type="submit" disabled={!input.trim() || isLoading} className="send-btn">
              <Send size={20} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIChatAssistant;
