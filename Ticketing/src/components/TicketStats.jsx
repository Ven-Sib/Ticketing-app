import React from 'react';

export default function TicketStats({ ticketsLeft, total, available }) {
  return (
    <div className="bg-dark-100 p-5 rounded-2xl shadow-inner shadow-light-100/10 mb-6">
      <h2>🎟️ Ticket Stats</h2>

      <p className="font-semibold mt-2">VIP Tickets</p>
      <p>Sold: {ticketsLeft.VIP} / {total.VIP}</p>
      <p>Available: {available.VIP}</p>

      <p className="font-semibold mt-4">Regular Tickets</p>
      <p>Sold: {ticketsLeft.Regular} / {total.Regular}</p>
      <p>Available: {available.Regular}</p>

      <p className="mt-4 font-bold">Total Sold: {ticketsLeft.VIP + ticketsLeft.Regular}</p>
    </div>
  );
}
