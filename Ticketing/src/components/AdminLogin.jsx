import React, { useState } from 'react';

export default function AdminLogin({ setIsAdmin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      if (res.ok) {
        alert('✅ Admin login successful');
        setIsAdmin(true);
        setError('');
      } else {
        const data = await res.json();
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setError('❌ Error connecting to server');
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-3 bg-dark-100 p-4 rounded mb-4">
      <h3 className="text-lg font-bold">🔐 Admin Login</h3>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="p-2 rounded text-black"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="p-2 rounded text-black"
      />

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
        Login
      </button>
    </form>
  );
}
