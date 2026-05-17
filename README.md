# Mamo Family Expense Tracker

## Project Title

Mamo Family Expense Tracker – It is a modern web application that help families like mine to track their daily expenses and gain insights into spending habits.

---

## Problem Summary

Managing household expenses manually is always diffcult to my family and it is time consuming and we end up every time to spend money here and there without counting and that make us very stressful so this website solves that problem by providing a centralized dashboard where families like mine can record expenses and view spending insights and helps them to understand where their money goes and supports better financial decision making.

---

## Technical Stack

This project was built using these technologies:

Frontend:
- React.js (UI development)
- Vite (Fast development server and build tool)

Styling:
- Tailwind CSS (Responsive and modern styling)
- Heroicons (UI icons)

Routing:
- React state-based section navigation (Dashboard, Expenses, Reports, Settings)

Backend:
- FastAPI (Python REST API)
- Uvicorn (ASGI server)

Database:
- MySQL (Stores expenses and categories)

Data Management:
- React useState and localStorage (for saving categories and expenses)

Authentication:
- JWT Authentication
- Passlib (password hashing)
- Role-based access control (Admin/User)

AI Features:
- Google Gemini API
- Browser Speech Recognition API
- Voice-to-expense conversion system

API Communication:
- Axios Fetch API (Frontend between Backend communication)

Development Tools:
- Node.js
- Python 3
- VS Code

State Management:
- React useState
- localStorage

---

## Feature List

Key features of the application include:

- Dashboard
- Add and manage expenses
- Category management system
- Toast notifications for actions
- Reports page with insights
- Dark mode support
- Sidebar navigation between pages
- Dynamic page titles and breadcrumbs
- Activity Logs
- Voice expense input using AI - Gemini 
- User authentication 
- Multi user support

---

## Folder Structure

The project follows a structured folder organization:

## 📁 Folder Structure

The project is divided into **frontend** and **backend** sections.

### Backend (FastAPI + MySQL)

backend/
- **app/routes/**
  - `expenses.py` — Contains API endpoints for managing expenses.
  - `users.py` — Contains user management endpoints, including profile updates, admin user editing, account activation/deactivation, password reset, and activity logs.
  - `voice.py` — Contains the voice expense parsing endpoint that uses the Gemini API to convert spoken text into structured expense data.
  - `auth.py` — Contains authentication routes such as user registration and login.
- **db.py** — Handles database connection setup.
- **main.py** — Entry point for the FastAPI application.
- **models.py** — Defines database models using SQLAlchemy.
- **schemas.py** — Defines request and response validation using Pydantic.
- **.env** — Stores environment variables like database credentials.
- **database/** — Contains database-related configuration files.
- **auth.py/** - Handles password hashing, JWT token creation, current user authentication, and admin role protection.

---

### Frontend (React + Tailwind CSS)

frontend/
- **public/**
  - Stores static assets such as icons and favicon.

- **src/components/**
  Contains reusable UI components such as:
  - AddExpenseModal.jsx
  - AddUserModal.jsx
  - EditUserModal.jsx
  - ExpenseTable.jsx
  - Sidebar.jsx
  - Topbar.jsx
  - Toast.jsx
  - Pagination.jsx
  - VoiceExpenseButton.jsx
  - AccountInactiveModal.jsx

- **src/pages/**
  Contains main application pages:
  - DashboardPage.jsx — Displays summary and charts.
  - ExpensesPage.jsx — Manages expense records.
  - ReportsPage.jsx — Shows insights and analytics.
  - SettingsPage.jsx — Manages categories.
  - AdminUsersPage.jsx - Manages Users.
  - UserActivityPage.jsx - Shows Activity Log.

- **src/services/**
  - api.js — Handles communication with the backend API.

- **App.jsx**
  Root layout component.

- **main.jsx**
  React application entry point.

- **index.css**
  Global styling file.

---

### Other Important Files

- **.venv/** — Python virtual environment.
- **node_modules/** — Installed frontend dependencies.
- **requirements.txt** — Backend dependencies.
- **package.json** — Frontend dependencies.

---

## Challenges Overcome

One of the main challenges was connecting the React frontend with the FastAPI backend while ensuring smooth data flow between the user interface and the MySQL database. Another challenge involved designing a category management system that prevents deleting categories that are already used in expenses. Updating all related expenses automatically when a category name changes required careful state and database synchronization. Implementing reports and insights required grouping and calculating data dynamically from stored expenses. Debugging database connection issues and environment variables was also an important part of development. Also several technical challenges were encountered during Integrating voice recognition with Gemini AI and Connecting React frontend with FastAPI backend.

---

## Future Improvements

Possible enhancements include:

- Monthly budget limits
- Expense reminders
- Push notifications and reminders
- Financial goals and savings tracking
- Mobile app version
- OCR receipt scanning
- AI spending recommendations
- Recurring expense detection

---

## Author

Developed by:  
**Mutaz S M Harara - 26249918 **


## Screen shots of the application

![alt text](frontend/image.png)

![alt text](frontend/image-1.png)

![alt text](frontend/image-2.png)

![alt text](frontend/image-3.png)

![alt text](frontend/image-4.png)
