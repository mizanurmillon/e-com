import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { initialFAQs } from '../data/mockData';

export default function Support() {
  const { addTicket, user, navigate } = useContext(ShopContext);

  const [activeFaq, setActiveFaq] = useState(null);

  // Form States - Helpdesk Ticket
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Shipping');
  const [message, setMessage] = useState('');
  const [ticketPlacedId, setTicketPlacedId] = useState('');

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;
    
    const tktId = addTicket(subject, category, message);
    setTicketPlacedId(tktId);
    setSubject('');
    setMessage('');
  };

  return (
    <div className="container page-fade-in" style={{ paddingBlock: '48px', textAlign: 'left' }}>
      
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <span className="badge badge-primary" style={{ marginBottom: '8px' }}>HELPDESK SUPPORT</span>
        <h1 className="serif-title" style={{ fontSize: '40px', fontWeight: 800, margin: 0 }}>How can we help you?</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px', maxWidth: '500px', margin: '8px auto 0' }}>
          Search our frequently answered queries or file an official customer care ticket.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '48px', alignItems: 'flex-start' }}>
        
        {/* Left Column: FAQ accordions */}
        <div>
          <h2 className="serif-title" style={{ fontSize: '22px', marginBottom: '24px', fontWeight: 700 }}>Frequently Asked Questions</h2>
          
          {initialFAQs.map((faq, idx) => (
            <div key={idx} className="accordion">
              <div onClick={() => toggleFaq(idx)} className="accordion-header">
                <span>{faq.q}</span>
                <span>{activeFaq === idx ? '▲' : '▼'}</span>
              </div>
              {activeFaq === idx && (
                <div className="accordion-content">
                  {faq.a}
                </div>
              )}
            </div>
          ))}

          {/* Prompt to use chatbot */}
          <div className="glass" style={{ padding: '24px', borderRadius: '12px', marginTop: '24px', border: '1px dashed var(--primary)' }}>
            <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: 700 }}>💬 Need Instant Answers?</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '0 0 12px 0' }}>
              Click on the floating robot icon in the bottom right corner to chat live with our Aura Virtual AI Helper.
            </p>
          </div>
        </div>

        {/* Right Column: Ticket creator */}
        <div>
          <h2 className="serif-title" style={{ fontSize: '22px', marginBottom: '24px', fontWeight: 700 }}>Open a Support Ticket</h2>
          
          {ticketPlacedId ? (
            <div className="glass" style={{ padding: '32px', borderRadius: '16px', border: '1px solid var(--success)', textAlign: 'center' }}>
              <span style={{ fontSize: '48px' }}>📬</span>
              <h3 style={{ fontSize: '18px', marginBlock: '16px 8px', fontWeight: 700 }}>Ticket Submitted!</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                Your ticket has been recorded with reference number <strong>{ticketPlacedId}</strong>. An agent will review it and reply within 12 hours.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button
                  onClick={() => navigate(user ? 'dashboard' : 'auth')}
                  className="btn btn-primary btn-sm"
                >
                  View in Dashboard
                </button>
                <button
                  onClick={() => setTicketPlacedId('')}
                  className="btn btn-secondary btn-sm"
                >
                  Create another ticket
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleTicketSubmit} className="glass" style={{ padding: '32px', borderRadius: '16px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div className="form-group">
                <label className="form-label">Subject Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Delivery delay, defective item"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Inquiry Category</label>
                <select
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ fontSize: '13px' }}
                >
                  <option value="Shipping">Shipping & Tracking</option>
                  <option value="Billing">Billing & Refunds</option>
                  <option value="Technical">Technical Switch help</option>
                  <option value="Returns">Returns & Exchanges</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Detail Message</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Explain your issue in detail..."
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                File Support Ticket
              </button>

              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center', display: 'block' }}>
                {user ? 'Filed under account email: ' + user.email : 'Note: Unregistered tickets require verification code via email.'}
              </span>

            </form>
          )}

        </div>

      </div>

    </div>
  );
}
