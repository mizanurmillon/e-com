import React, { useContext, useState, useRef, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';

export default function SupportWidget() {
  const { chatMessages, sendChatMessage } = useContext(ShopContext);
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const msgEndRef = useRef(null);

  // Auto-scroll chat history to bottom on new message
  useEffect(() => {
    if (msgEndRef.current) {
      msgEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    sendChatMessage(inputVal);
    setInputVal('');
  };

  return (
    <>
      {/* Floating Chat Bubble */}
      <button className="chatbot-bubble" onClick={() => setIsOpen(!isOpen)} style={{ border: 'none' }}>
        {isOpen ? '❌' : '🤖'}
      </button>

      {/* Expanded Chatbot Window */}
      {isOpen && (
        <div className="chatbot-window">
          
          {/* Chat Header */}
          <div className="chat-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px' }}>🤖</span>
              <div style={{ textAlign: 'left' }}>
                <h4 style={{ fontSize: '13px', margin: 0, fontWeight: 700, color: 'white' }}>Aura Support AI</h4>
                <span style={{ fontSize: '9px', opacity: 0.8 }}>Online • Instant Replies</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ color: 'white', fontWeight: 'bold' }}>×</button>
          </div>

          {/* Chat Messages */}
          <div className="chat-messages">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-msg-bubble ${msg.sender === 'bot' ? 'bot' : 'user'}`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={msgEndRef}></div>
          </div>

          {/* Chat Input form */}
          <form onSubmit={handleSend} className="chat-input-area">
            <input
              type="text"
              className="form-control"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask about shipping, returns..."
              style={{ fontSize: '12px', borderRadius: '18px', paddingBlock: '6px' }}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '6px 14px', borderRadius: '18px', fontSize: '12px' }}>
              Send
            </button>
          </form>

        </div>
      )}
    </>
  );
}
