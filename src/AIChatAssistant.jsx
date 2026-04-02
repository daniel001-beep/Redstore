import React, { useState, useRef, useEffect } from 'react';
import { httpsCallable } from 'firebase/functions';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import './AIChatAssistant.css';

const AIChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hello! I'm your Redstore shopping assistant. How can I help you today?" }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
        scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    const userMessage = { role: 'user', text: query };
    setMessages(prev => [...prev, userMessage]);
    setQuery('');
    setLoading(true);

    try {
      // Call the Cloud Function
      const getAIResponse = httpsCallable(functions, 'getAIResponse');
      const result = await getAIResponse({ query });
      
      const assistantMessage = { role: 'assistant', text: result.data.response };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("AI Assistant Error:", error);
      let errorMessage = "I'm sorry, I'm having some trouble right now. Please try again later.";
      
      if (error.code === 'failed-precondition') {
          errorMessage = "The assistant is still being set up. Please try again in a few minutes.";
      }
      
      setMessages(prev => [...prev, { role: 'assistant', text: errorMessage }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-chat-root">
      {/* Floating Action Button */}
      <button 
        className={`ai-chat-fab ${isOpen ? 'open' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
        title="Ask our AI Assistant"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      {/* Chat Window */}
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
            {messages.map((msg, idx) => (
              <div key={idx} className={`msg-row ${msg.role}`}>
                <div className={`msg-bubble ${msg.role}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
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
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={loading}
              autoFocus
            />
            <button type="submit" disabled={!query.trim() || loading} className="send-btn">
              <Send size={20} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIChatAssistant;
