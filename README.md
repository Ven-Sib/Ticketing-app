
# 🎟️ Ticketing System (Full Stack App)

A powerful, full-stack event ticketing system, combining the speed of **React.js** with the robustness of **Django REST Framework**.

---

## 🚀 Features

- 🎫 **User Registration & Ticket Requests**
- 🧾 **PDF Receipt Generation** (auto download + email)
- 🟢 **Live Queue with Auto-Processing**
- ❌ **Ticket Cancellation**
- ✅ **Admin Login & Log View**
- 📊 **Dynamic Stats** (sold, cancelled, available)
- 📤 **Email Delivery of Ticket Receipts**
- 🧩 **QR Code & Branding**
- 🌐 **React Frontend + Django API**

---

## 🛠️ Tech Stack

| Frontend                         | Backend                 | Tools                 |
|----------------------------------|--------------------------|------------------------|
| React + Vite + TailwindCSS      | Django + Django REST     | GitHub, GitHub Pages   |
| jsPDF + QRCode                  | SQLite (Dev)             | Visual Studio Code     |
| Email API                       | Django Admin + Sessions  | Render (for backend)   |

---

## 📁 Project Structure

```
salesapp/
├── backend/          # Django project & API
│   ├── manage.py
│   └── ticketapi/
├── Ticketing/         # React frontend
│   ├── src/
│   └── public/
├── README.md
└── .gitignore
```

---

## ⚙️ Getting Started

### 🐍 Backend (Django)

```bash
cd backend
python -m venv env
source env/bin/activate      # Windows: env\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Visit: `http://127.0.0.1:8000/api/`

---

### ⚛️ Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

Visit: `http://localhost:5173`

---

## 🔐 Admin Access

- Django Admin: `http://127.0.0.1:8000/admin/`
- Or use the **custom admin login page**
- Create admin account:

```bash
python manage.py createsuperuser
```


## 📸 Screenshots

> _(Add screenshots of the queue, receipts, stats panel, etc.)_


## 📦 Deployment Plans

- React frontend → GitHub Pages (or Vercel)
- Django backend → Render / Railway / Fly.io


## 🤝 Contributing

Pull requests are welcome.  
Open issues or suggest features here:  
👉 [GitHub Issues](https://github.com/vensensibanda/ticketing-app/issues)


## 🙌 Acknowledgements

- [React](https://reactjs.org)
- [Django](https://www.djangoproject.com/)
- [jsPDF](https://github.com/parallax/jsPDF)
- [QRCode](https://github.com/soldair/node-qrcode)

