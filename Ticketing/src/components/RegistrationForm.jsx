import React, { useState } from 'react';

export default function RegistrationForm({ queues, setQueues }) {
  const [name, setName] = useState('');
  const [ticketType, setTicketType] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !ticketType) return alert('Name and ticket type are required.');

    const ticket = { name, type: ticketType };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/tickets/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticket),
      });

      if (!response.ok) {
        throw new Error('Failed to register ticket.');
      }

      const newTicket = await response.json();

      const updatedQueue = [...queues[ticketType], {
        name: newTicket.name,
        timestamp: new Date(newTicket.timestamp).getTime()
      }];

      setQueues({ ...queues, [ticketType]: updatedQueue });
      setName('');
      setTicketType('');
      setShowModal(true);
    } catch (err) {
      console.error(err);
      alert('❌ Error submitting ticket.');
    }
  };

  const handleProcessClick = () => {
    setShowModal(false);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <>
      <div className="bg-dark-100 p-5 rounded-2xl shadow-inner shadow-light-100/10 mb-6">
        <h2>Register for Ticket</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent border border-light-200 text-light-100 p-3 rounded"
          />
          <select
            value={ticketType}
            onChange={(e) => setTicketType(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded mb-4 w-full"
          >
            <option value="" disabled>Choose ticket type</option>
            <option value="VIP">VIP</option>
            <option value="Regular">Regular</option>
          </select>
          <button type="submit" className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 w-full">
            Submit
          </button>
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-2xl shadow-xl max-w-md w-full text-center space-y-4">
            <h3 className="text-xl font-bold">✅ Request Submitted!</h3>
            <p>You can submit another ticket or proceed to process the queue.</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
              >
                Submit Another
              </button>
              <button
                onClick={handleProcessClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Process Queue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
