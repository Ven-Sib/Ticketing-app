import React, { useState } from 'react';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import logo from '../assets/logo.jpg';

export default function TicketQueue({ queues, setQueues, ticketsLeft, setTicketsLeft, log, setLog }) {
  const [cancelName, setCancelName] = useState('');

  const generateReceipt = async (ticket) => {
    const doc = new jsPDF();
    const timeNow = new Date().toLocaleString();

    const img = new Image();
    img.src = logo;
    await new Promise((resolve) => (img.onload = resolve));
    doc.addImage(img, 'PNG', 140, 10, 50, 20);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('🎟️ Ticket Receipt', 20, 25);
    doc.setDrawColor(200);
    doc.setLineWidth(0.5);
    doc.line(20, 28, 190, 28);

    doc.setFontSize(14);
    doc.setTextColor(80, 80, 80);
    doc.text('Customer Details', 20, 40);

    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.setFont('helvetica', 'normal');
    doc.text(`👤 Name: ${ticket.name}`, 20, 50);
    doc.text(`🎫 Ticket Type: ${ticket.type}`, 20, 60);
    doc.text(`📅 Issued: ${timeNow}`, 20, 70);

    const qrText = `Ticket for ${ticket.name} (${ticket.type}) at ${timeNow}`;
    const qrDataUrl = await QRCode.toDataURL(qrText);
    doc.text('📌 QR Code:', 20, 85);
    doc.addImage(qrDataUrl, 'PNG', 20, 90, 40, 40);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('✅ Thank you for registering!', 20, 145);
    doc.text('This receipt was auto-generated.', 20, 152);

    // ✅ Save locally
    doc.save(`ticket_receipt_${ticket.name}.pdf`);

    // ✅ Send to backend
    const pdfBlob = doc.output('blob');
    const formData = new FormData();
    formData.append('pdf', pdfBlob, `ticket_receipt_${ticket.name}.pdf`);
    formData.append('name', ticket.name);
    formData.append('email', ticket.email || 'test@example.com');

    try {
      await fetch('http://127.0.0.1:8000/api/send-receipt/', {
        method: 'POST',
        body: formData,
      });
      console.log('📧 Receipt sent to backend.');
    } catch (error) {
      console.error('❌ Failed to send receipt:', error);
    }
  };

  const processTickets = () => {
    let newQueues = { ...queues };
    let newLog = [...log];
    let newTickets = { ...ticketsLeft };

    const processType = (type) => {
      while (newQueues[type].length && newTickets[type] > 0) {
        const person = newQueues[type].shift();
        newTickets[type]--;
        const time = new Date().toLocaleTimeString();
        const ticket = { name: person.name, type, time };
        newLog.push({ ...ticket, success: true });
        generateReceipt(ticket);
      }
    };

    processType('VIP');
    processType('Regular');

    if (newQueues.VIP.length) {
      newLog.push({ name: newQueues.VIP[0].name, type: 'VIP', time: new Date().toLocaleTimeString(), success: false });
    }
    if (newQueues.Regular.length) {
      newLog.push({ name: newQueues.Regular[0].name, type: 'Regular', time: new Date().toLocaleTimeString(), success: false });
    }

    setQueues(newQueues);
    setTicketsLeft(newTickets);
    setLog(newLog);
    alert("✅ Tickets successfully processed. You may view your receipt in your Downloads folder.");
  };

  const cancelTicket = async () => {
    if (!cancelName) return alert("Please enter a name to cancel.");

    let found = false;
    const newQueues = { ...queues };
    const newLog = [...log];

    const cancelOnServer = async (name, type) => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/tickets/cancel/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, type })
        });

        if (!res.ok) {
          const err = await res.json();
          console.error("❌ Backend error:", err);
        }
      } catch (error) {
        console.error('❌ Failed to cancel on backend:', error);
      }
    };

    ['VIP', 'Regular'].forEach(type => {
      newQueues[type] = newQueues[type].filter(person => {
        if (person.name === cancelName && !found) {
          setTicketsLeft(prev => ({ ...prev, [type]: prev[type] + 1 }));
          cancelOnServer(cancelName, type);
          found = true;
          return false;
        }
        return true;
      });
    });

    if (!found) {
      const idx = newLog.findIndex(entry => entry.name === cancelName && entry.success);
      if (idx !== -1) {
        const type = newLog[idx].type;
        setTicketsLeft(prev => ({ ...prev, [type]: prev[type] + 1 }));
        cancelOnServer(cancelName, type);

        newLog[idx].success = false; // ✅ mark as cancelled
        found = true;
      }
    }

    if (!found) {
      alert("❌ No ticket found for cancellation.");
    } else {
      alert("✅ Ticket cancelled successfully.");
      setQueues(newQueues);
      setLog(newLog);
    }

    setCancelName('');
  };

  return (
    <div className="bg-dark-100 p-5 rounded-2xl shadow-inner shadow-light-100/10 mb-6">
      <h2>Process Tickets</h2>
      <button onClick={processTickets} className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 w-full mb-4">
        Process Queue
      </button>

      <h2 className="mt-4">Cancel Ticket</h2>
      <input
        type="text"
        placeholder="Enter name to cancel"
        value={cancelName}
        onChange={(e) => setCancelName(e.target.value)}
        className="bg-transparent border border-light-200 text-light-100 p-3 rounded w-full mt-2"
      />
      <button onClick={cancelTicket} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 w-full mt-2">
        Cancel Ticket
      </button>
    </div>
  );
}
