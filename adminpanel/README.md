#  School Admin Panel

React + Vite + Tailwind CSS v4 admin dashboard for managing students, teachers, assignments, and more.

---

##  Project Structure

```
school_adminpanel/
├── src/
│   ├── components/
│   │   ├── Assignments/
│   │   │   └── Assignments.jsx     # Assignments CRUD + assign to students
│   │   ├── Dashboard/
│   │   │   └── Dashboard.jsx       # Stats + recent data (API connected)
│   │   ├── navbar/
│   │   │   └── Navbar.jsx          # Top navigation bar
│   │   ├── Profile/
│   │   │   └── Profile.jsx         # Admin profile page
│   │   ├── Settings/
│   │   │   └── Settings.jsx        # Settings page
│   │   ├── Sidebar/
│   │   │   └── Sidebar.jsx         # Side navigation (responsive)
│   │   ├── Students/
│   │   │   └── Students.jsx        # Students CRUD (auto roll_no)
│   │   ├── Subjects/
│   │   │   └── Subjects.jsx        # Subjects management
│   │   └── Teachers/
│   │       └── Teachers.jsx        # Teachers CRUD
│   ├── public/
│   │   ├── AdminSignup.jsx         # Admin registration page
│   │   └── LoginPage.jsx           # Admin login page
│   ├── routes/
│   │   └── Routes.jsx              # All app routes
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env                            # API base URL
├── vite.config.js
└── package.json
```

---

##  Prerequisites

- Node.js v18+
- npm
- Backend server running on port 4000

---

##  Setup & Run

### 1. Install dependencies

```bash
cd school_adminpanel
npm install
```

### 2. Configure `.env`

Create `.env` file in `school_adminpanel/` folder:

```env
VITE_API_BASE_URL=http://localhost:4000/api
```

### 3. Start development server

```bash
npm run dev
```

Admin Panel runs on: **http://localhost:5173**

### 4. Build for production

```bash
npm run build
```

---

##  Login

First register an admin account:
- Go to `/admin-signup`
- Use secret code: `ADMIN123` to get admin role

Or login directly if account exists:
- URL: `http://localhost:5173/login`
- Email: your registered email
- Password: your password

---

##  Features

| Feature | Description |
|---------|-------------|
|  Dashboard | Real-time stats — students, teachers, assignments count |
|  Students | Add (auto roll_no), edit, delete students |
|  Teachers | Add, edit, delete teachers with subject info |
|  Subjects | View subjects with teacher mapping |
|  Assignments | Create assignments, assign to specific students |
|  Profile | Admin profile page |
|  Settings | App settings |

---

##  Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Redirect | Redirects to `/login` |
| `/login` | LoginPage | Admin login |
| `/admin-signup` | AdminSignup | Admin registration |
| `/admin` | Dashboard | Main dashboard |
| `/admin/students` | Students | Student management |
| `/admin/teachers` | Teachers | Teacher management |
| `/admin/subjects` | Subjects | Subject management |
| `/admin/assignments` | Assignments | Assignment management |
| `/admin/profile` | Profile | Admin profile |
| `/admin/settings` | Settings | Settings |

---

##  Tech Stack

- **React 19** — UI framework
- **Vite 8** — Build tool
- **Tailwind CSS v4** — Styling
- **React Router DOM v7** — Routing
- **Axios** — HTTP requests
- **Lucide React** — Icons
