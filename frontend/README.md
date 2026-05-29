#  School Student Portal

React + Vite + Tailwind CSS v4 student-facing portal for viewing assignments, subjects, and profile.

---

##  Project Structure

```
schoolFrontend/
├── src/
│   ├── components/
│   │   ├── Assignments/
│   │   │   └── Assignments.jsx     # View & submit assignments
│   │   ├── home_page/
│   │   │   └── Home_page.jsx       # Layout wrapper (unused as route)
│   │   ├── MySubjects/
│   │   │   └── MySubjects.jsx      # Student's enrolled subjects
│   │   ├── navbar/
│   │   │   └── Navbar.jsx          # Top navbar with student name
│   │   ├── Profile/
│   │   │   └── Profile.jsx         # Student profile page
│   │   ├── public/
│   │   │   ├── LoginPage.jsx       # Student login
│   │   │   └── SignupPage.jsx      # Student signup
│   │   ├── Settings/
│   │   │   └── Settings.jsx        # Settings page
│   │   ├── Sidebar/
│   │   │   └── Sidebar.jsx         # Side navigation (responsive)
│   │   └── StudentDashboard/
│   │       └── StudentDashboard.jsx  # Dashboard with stats + assignments
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
- Student account created by Admin

---

##  Setup & Run

### 1. Install dependencies

```bash
cd schoolFrontend
npm install
```

### 2. Configure `.env`

Create `.env` file in `schoolFrontend/` folder:

```env
VITE_API_BASE_URL=http://localhost:4000/api
```

### 3. Start development server

```bash
npm run dev
```

Student Portal runs on: **http://localhost:5174**

> Note: If port 5173 is taken by admin panel, Vite auto-assigns 5174

### 4. Build for production

```bash
npm run build
```

---

##  Login

Student accounts are created by Admin from the Admin Panel.

- URL: `http://localhost:5174/login`
- Email: email set by admin
- Password: password set by admin

Or register yourself:
- URL: `http://localhost:5174/signup`

---

##  Features

| Feature | Description |
|---------|-------------|
|  Dashboard | Assignment stats — total, completed, pending |
|  Assignments | View assigned tasks, filter by status, submit with note |
|  My Subjects | View subjects based on assigned assignments |
|  Profile | Student profile — name, class, roll number |
|  Settings | Notification, dark mode, language settings |

---

##  Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Redirect | Redirects to `/login` |
| `/login` | LoginPage | Student login |
| `/signup` | SignupPage | Student self-registration |
| `/dashboard` | StudentDashboard | Main dashboard |
| `/dashboard/subjects` | MySubjects | Enrolled subjects |
| `/dashboard/assignments` | Assignments | View & submit assignments |
| `/dashboard/profile` | Profile | Student profile |
| `/dashboard/settings` | Settings | Settings |

---

##  Assignment Submission Flow

1. Admin creates assignment and assigns it to students
2. Student sees assignment with **"pending"** status
3. Student clicks **Submit** button → modal opens
4. Student writes submission note (optional) → clicks **Submit Now**
5. Status changes to **"submitted"**
6. Admin can mark it as **"completed"** and add marks

---

##  Tech Stack

- **React 19** — UI framework
- **Vite 8** — Build tool
- **Tailwind CSS v4** — Styling
- **React Router DOM v7** — Routing
- **Axios** — HTTP requests
- **Lucide React** — Icons
