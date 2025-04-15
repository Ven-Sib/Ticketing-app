// components/TicketStatusTabs.jsx
import React, { useState, useEffect } from 'react';

export default function TicketStatusTabs() {
  const [status, setStatus] = useState('active');
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async (status) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/tickets/status/${status}/`);
      const data = await res.json();
      setTickets(data);
    } catch (err) {
      console.error("❌ Failed to fetch tickets by status:", err);
    }
  };

  useEffect(() => {
    fetchTickets(status);
  }, [status]);

  return (
    <div className="bg-dark-100 p-5 rounded-2xl shadow-inner shadow-light-100/10 mt-6">
      <h2 className="text-xl font-bold mb-4">🎟️ View Tickets by Status</h2>

      <div className="flex gap-4 mb-4">
        {['active', 'processed', 'cancelled'].map(s => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`px-4 py-2 rounded text-white ${
              status === s ? 'bg-blue-700' : 'bg-gray-600 hover:bg-gray-500'
            }`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <ul className="text-light-200 text-sm space-y-2 max-h-60 overflow-y-auto">
        {tickets.length === 0 ? (
          <p className="text-gray-400 italic">No {status} tickets found.</p>
        ) : (
          tickets.map((ticket, index) => (
            <li key={index}>
              {ticket.timestamp} — <strong>{ticket.name}</strong> ({ticket.type})
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
