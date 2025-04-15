import React from 'react';

export default function TicketSummary({ log, ticketsLeft }) {
  const vipSold = log.filter(t => t.type === 'VIP' && t.success).length;
  const regularSold = log.filter(t => t.type === 'Regular' && t.success).length;
  const totalSold = vipSold + regularSold;

  return (
    <div className="bg-dark-100 p-5 rounded-2xl shadow-inner shadow-light-100/10 mt-6">
      <h2 className="text-xl font-bold mb-2">📒 Transaction Log</h2>

      <div className="text-sm text-light-200 mb-4 space-y-1">
        <p>✅ VIP Tickets Sold: {vipSold}</p>
        <p>✅ Regular Tickets Sold: {regularSold}</p>
        <p>🎟️ Total Tickets Sold: {totalSold}</p>
        
      </div>

      <ul className="space-y-2 text-sm max-h-48 overflow-y-auto">
        {log.length === 0 ? (
          <li className="text-gray-400 italic">No transactions recorded.</li>
        ) : (
          log.map((entry, index) => (
            <li key={index} className={entry.success ? 'text-green-400' : 'text-red-400'}>
              {entry.time} – <strong>{entry.name}</strong> [{entry.type}] — {entry.success ? '✅ Confirmed' : '❌ Denied'}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
