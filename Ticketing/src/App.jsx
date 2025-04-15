import React, { useState, useEffect } from 'react';
import RegistrationForm from './components/RegistrationForm';
import TicketQueue from './components/TicketQueue';
import TicketSummary from './components/TicketSummary';
import TicketStats from './components/TicketStats';
import AdminLogin from './components/AdminLogin';
import TicketStatusTabs from './components/TicketStatusTabs';
import bgImage from './assets/ok.jpg';

export default function App() {
  const [queues, setQueues] = useState({ VIP: [], Regular: [] });
  const [ticketsLeft, setTicketsLeft] = useState({ VIP: 0, Regular: 0 });
  const [totalTickets, setTotalTickets] = useState({ VIP: 0, Regular: 0 });
  const [availableTickets, setAvailableTickets] = useState({ VIP: 0, Regular: 0 });
  const [log, setLog] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // ✅ Fetch updated stats from backend
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/stats/')
      .then(res => res.json())
      .then(data => {
        setTicketsLeft({
          VIP: data.VIP_active,
          Regular: data.Regular_active,
        });
        setTotalTickets({
          VIP: data.VIP_total,
          Regular: data.Regular_total,
        });
        setAvailableTickets({
          VIP: data.VIP_available,
          Regular: data.Regular_available,
        });
      })
      .catch(err => console.error('Failed to fetch stats:', err));
  }, []);

  // ✅ Fetch full ticket data only if admin is logged in
  useEffect(() => {
    if (!isAdmin) return;

    fetch('http://127.0.0.1:8000/api/tickets/', {
      credentials: 'include'
    })
      .then(res => {
        if (!res.ok) throw new Error("Not authorized");
        return res.json();
      })
      .then(data => {
        const newQueues = { VIP: [], Regular: [] };
        const newLog = [];

        data.forEach(ticket => {
          newQueues[ticket.type].push({
            name: ticket.name,
            timestamp: new Date(ticket.timestamp).getTime()
          });

          newLog.push({
            name: ticket.name,
            type: ticket.type,
            time: new Date(ticket.timestamp).toLocaleTimeString(),
            success: true
          });
        });

        setQueues(newQueues);
        setLog(newLog);
      })
      .catch(err => {
        console.warn("Admin data not loaded:", err.message);
      });
  }, [isAdmin]);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-black/60 p-6 rounded-xl text-white w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-6">🎟️ Event Ticketing System</h1>

        <RegistrationForm queues={queues} setQueues={setQueues} />
        <TicketQueue
          queues={queues}
          setQueues={setQueues}
          ticketsLeft={ticketsLeft}
          setTicketsLeft={setTicketsLeft}
          log={log}
          setLog={setLog}
        />
        <TicketStats
          ticketsLeft={ticketsLeft}
          total={totalTickets}
          available={availableTickets}
        />

        {isAdmin ? (
          <>
            <TicketSummary log={log} ticketsLeft={ticketsLeft} />
            <TicketStatusTabs />
            <button
              onClick={() => {
                fetch('http://127.0.0.1:8000/api/logout/', {
                  method: 'POST',
                  credentials: 'include',
                });
                setIsAdmin(false);
              }}
              className="text-sm text-red-300 hover:underline mt-4"
            >
              🚪 Logout
            </button>
          </>
        ) : (
          <AdminLogin setIsAdmin={setIsAdmin} />
        )}
      </div>
    </div>
  );
}
