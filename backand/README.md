#  School Management System — Backend API

Node.js + Express + PostgreSQL (Supabase) backend for the School Management System.

---

##  Project Structure

```
school_backand/
├── config/
│   └── db.js                      # PostgreSQL connection (Supabase)
├── controllers/
│   ├── assignmentController.js    # Assignment CRUD
│   ├── dashboardController.js     # Admin dashboard stats
│   ├── studentAssignmentController.js  # Assign/submit assignments
│   ├── studentController.js       # Student CRUD
│   ├── studentDashboardController.js   # Student portal APIs
│   ├── teacherController.js       # Teacher CRUD
│   └── userController.js          # Auth (register/login)
├── middleware/
│   ├── authMiddleware.js          # JWT token verify
│   └── isAdmin.js                 # Admin role check
├── migrations/
│   ├── users.sql
│   ├── students.sql
│   ├── teachers.sql
│   ├── assignments.sql
│   └── public.student_assignments.sql
├── models/                        # Database query functions
├── routes/                        # Express routes
├── .env                           # Environment variables
└── index.js                       # Entry point
```

---

##  Prerequisites

- Node.js v18+
- npm
- Supabase account (PostgreSQL database)

---

##  Setup & Run

### 1. Install dependencies

```bash
cd school_backand
npm install
```

### 2. Configure `.env`

Create `.env` file in `school_backand/` folder:

```env
DATABASE_URL=postgresql://postgres:<YOUR_PASSWORD>@db.<YOUR_PROJECT_REF>.supabase.co:5432/postgres
PORT=4000
JWT_SECRET=secretkey
```

> Get `DATABASE_URL` from: Supabase Dashboard → Settings → Database → Connection String → URI

### 3. Run database migrations

Go to **Supabase Dashboard → SQL Editor** and run these files in order:

1. `migrations/users.sql`
2. `migrations/students.sql`
3. `migrations/teachers.sql`
4. `migrations/assignments.sql`
5. `migrations/public.student_assignments.sql`

### 4. Start the server

```bash
# Development (auto-restart)
npm run dev

# Production
npm start
```

Server runs on: **http://localhost:4000**

---

##  API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register new user |
| POST | `/api/users/login` | Login (returns JWT token) |
| GET | `/api/users/profile` | Get logged-in user profile |

### Admin Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard` | Stats + recent students + assignments |

### Students (Admin only)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/students/create` | Add student (auto roll_no + creates user) |
| GET | `/api/students/` | Get all students |
| PUT | `/api/students/:id` | Update student |
| DELETE | `/api/students/:id` | Delete student (removes from users too) |

### Teachers (Admin only)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/teachers/create` | Add teacher |
| GET | `/api/teachers/` | Get all teachers |
| PUT | `/api/teachers/:id` | Update teacher |
| DELETE | `/api/teachers/:id` | Delete teacher |

### Assignments (Admin only)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/assignments/create` | Create assignment |
| GET | `/api/assignments/` | Get all assignments |
| PUT | `/api/assignments/:id` | Update assignment |
| DELETE | `/api/assignments/:id` | Delete assignment |
| POST | `/api/assignments/:id/assign` | Assign students to assignment |
| GET | `/api/assignments/:id/students` | Get assigned students |
| DELETE | `/api/assignments/:id/students/:studentId` | Remove student |
| POST | `/api/assignments/:id/submit` | Student submits assignment |

### Student Portal
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/student/dashboard` | Student dashboard stats |
| GET | `/api/student/assignments` | Student's assignments |
| GET | `/api/student/subjects` | Student's subjects |
| GET | `/api/student/profile` | Student profile |

---

##  Authentication

All protected routes require JWT token in header:

```
Authorization: Bearer <token>
```

Token is received after login. Admin routes also require `role: "admin"`.

---

##  Default Admin Setup

Register an admin account using the Admin Panel signup with secret code `ADMIN123`:

```json
{
  "full_name": "Admin Name",
  "email": "admin@school.com",
  "password": "yourpassword",
  "admin_secret_code": "ADMIN123"
}
```
