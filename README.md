
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
![Screenshot 2025-04-15 015241](https://github.com/user-attachments/assets/f84d505b-a634-4bbe-87a9-56152cf28e2a)
![Screenshot 2025-04-15 015250](https://github.com/user-attachments/assets/06f1d319-2841-48f7-8667-42e59db3b017)
![Screenshot 2025-04-15 015308](https://github.com/user-attachments/assets/52e10956-56bf-470b-9a72-aa277c1e04a1)
![Screenshot 2025-04-15 015334](https://github.com/user-attachments/assets/e00b666b-9030-42f9-b33d-a621991122b9)
![Screenshot 2025-04-15 015345](https://github.com/user-attachments/assets/7eaa0219-3822-49d2-a266-05807ccda557)
![Screenshot 2025-04-15 015403](https://github.com/user-attachments/assets/7adabc84-88e6-4564-a540-bb40c83b8522)
![Screenshot 2025-04-15 015525](https://github.com/user-attachments/assets/5c3342f1-049e-4501-92ec-e011fbf96080)


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

