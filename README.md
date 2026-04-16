# 🎓 Campus Compass (Hirect)

**Campus Compass** is a modern, full-stack job portal platform designed to connect job seekers with opportunities seamlessly. Built with React and Django, it features an intelligent keyword-based search system, advanced filtering, job application tracking, and data analytics to help users find and manage their dream jobs effectively.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-blue.svg)
![Django](https://img.shields.io/badge/Django-5.2.5-green.svg)
![Python](https://img.shields.io/badge/Python-3.8+-yellow.svg)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Running the Application](#-running-the-application)
- [API Endpoints](#-api-endpoints)
- [Environment Variables](#-environment-variables)
- [Usage Guide](#-usage-guide)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🔍 Job Search & Discovery
- **Intelligent Keyword Search**: Filter jobs instantly by title, location, or description
- **Advanced Filtering**: Filter by experience level (Entry, Mid, Senior), salary range, and location
- **Real-time Search**: Instant results as you type with optimized query performance

### 📊 Job Management
- **Job Listings**: Browse comprehensive job postings with detailed information
- **Job Details**: View full job descriptions, responsibilities, qualifications, and salary information
- **Application Tracking**: Track all your job applications in one place
- **Application Status**: Monitor application status (Applied, Reviewed, Accepted, Rejected)

### 🔐 Authentication & Security
- **User Registration & Login**: Secure authentication system with JWT tokens
- **Protected Routes**: Role-based access control for authenticated users
- **Session Management**: Persistent login sessions with secure token handling

### 📈 Analytics & Insights
- **Data Visualization**: Interactive charts and graphs for job market insights
- **Application Analytics**: Track your application success rates and patterns
- **Market Trends**: Visualize salary trends, popular locations, and in-demand skills

### 💼 Application System
- **Easy Application**: Apply to jobs with resume upload and cover letter
- **Resume Management**: Upload and manage multiple versions of your resume
- **Application History**: Complete history of all submitted applications

### 🎨 Modern UI/UX
- **Responsive Design**: Fully responsive across desktop, tablet, and mobile devices
- **Modern Components**: Built with shadcn/ui and Radix UI primitives
- **Smooth Animations**: Fluid transitions and interactions with Tailwind CSS
- **Dark Mode Support**: Toggle between light and dark themes

---

## 🛠️ Tech Stack

### Backend (Django)
- **Django 5.2.5**: High-level Python web framework for rapid development
- **Django REST Framework 3.16.1**: Powerful toolkit for building Web APIs
- **Django CORS Headers**: Handle Cross-Origin Resource Sharing (CORS)
- **Django Filters 25.1**: Dynamic queryset filtering for advanced search
- **SQLite**: Lightweight, self-contained SQL database engine

### Data Analytics
- **Matplotlib**: Comprehensive library for creating static visualizations
- **Seaborn**: Statistical data visualization based on matplotlib
- **Scikit-learn**: Machine learning library for predictive analytics
- **Pandas**: Data manipulation and analysis library
- **NumPy**: Fundamental package for scientific computing

### Frontend (React)
- **React 18.3.1**: JavaScript library for building user interfaces
- **Vite 5.4.19**: Next-generation frontend build tool
- **React Router DOM 6.30.1**: Declarative routing for React applications
- **TanStack Query 5.83.0**: Powerful data synchronization for React
- **Tailwind CSS 3.4.17**: Utility-first CSS framework
- **shadcn/ui**: Re-usable component collection built with Radix UI
- **Radix UI**: Unstyled, accessible component primitives
- **React Hook Form 7.61.1**: Performant forms with easy validation
- **Zod 3.25.76**: TypeScript-first schema validation
- **Recharts 2.15.4**: Composable charting library for React
- **Lucide React**: Beautiful & consistent icon toolkit

### Development Tools
- **ESLint**: Code quality and consistency
- **PostCSS**: CSS transformation and optimization
- **Autoprefixer**: Automatic CSS vendor prefixing

---

## 📁 Project Structure

```
campus-compass/
├── campus-compass-django/          # Backend Django Application
│   ├── api/                        # API Application
│   │   ├── models.py              # Database models (Job, JobApplication)
│   │   ├── serializers.py         # DRF serializers
│   │   ├── views.py               # API views and endpoints
│   │   ├── urls.py                # API URL routing
│   │   ├── filters.py             # Django filter configurations
│   │   ├── admin.py               # Django admin configuration
│   │   └── management/
│   │       └── commands/
│   │           └── seed_jobs.py   # Seed data for jobs
│   ├── campus_compass/            # Project settings
│   │   ├── settings.py            # Django settings
│   │   ├── urls.py                # Main URL configuration
│   │   └── wsgi.py                # WSGI application
│   ├── media/                     # User uploads (resumes, visualizations)
│   ├── db.sqlite3                 # SQLite database
│   ├── manage.py                  # Django management script
│   └── requirements.txt           # Python dependencies
│
├── campus-compass-react/          # Frontend React Application
│   ├── src/
│   │   ├── components/           # React components
│   │   │   ├── auth/            # Authentication components
│   │   │   │   ├── AuthPage.jsx
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   ├── SignUpForm.jsx
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   ├── jobs/            # Job-related components
│   │   │   │   ├── JobCard.jsx
│   │   │   │   ├── JobList.jsx
│   │   │   │   ├── FilterBar.jsx
│   │   │   │   └── ApplicationModal.jsx
│   │   │   ├── layout/          # Layout components
│   │   │   │   └── Header.jsx
│   │   │   └── ui/              # shadcn/ui components
│   │   ├── contexts/            # React contexts
│   │   │   └── AuthContext.jsx
│   │   ├── pages/               # Page components
│   │   │   ├── Index.jsx
│   │   │   ├── JobDashboard.jsx
│   │   │   ├── JobDetail.jsx
│   │   │   ├── MyApplications.jsx
│   │   │   ├── Analysis.jsx
│   │   │   └── NotFound.jsx
│   │   ├── hooks/               # Custom React hooks
│   │   ├── lib/                 # Utility functions
│   │   ├── types/               # TypeScript type definitions
│   │   ├── App.jsx              # Main App component
│   │   └── main.jsx             # Application entry point
│   ├── public/                  # Static assets
│   ├── index.html               # HTML template
│   ├── vite.config.js           # Vite configuration
│   ├── tailwind.config.js       # Tailwind CSS configuration
│   ├── package.json             # Node.js dependencies
│   └── eslint.config.js         # ESLint configuration
│
├── README.md                      # This file
├── features.txt                   # Feature documentation
└── package.json                   # Root package configuration
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v7.0.0 or higher) - Comes with Node.js
- **Python** (v3.8 or higher) - [Download](https://www.python.org/)
- **pip** (v20.0.0 or higher) - Comes with Python
- **Git** - [Download](https://git-scm.com/)

### Verify Installation

```powershell
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Python version
python --version

# Check pip version
pip --version
```

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```powershell
git clone https://github.com/Adarshh17/Hirect.git
cd campus-compass
```

### 2. Backend Setup (Django)

#### Navigate to Django directory
```powershell
cd campus-compass-django
```

#### Create a virtual environment
```powershell
python -m venv venv
```

#### Activate the virtual environment
```powershell
# On Windows PowerShell
.\venv\Scripts\Activate.ps1

# If you encounter execution policy error, run:
# Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### Install Python dependencies
```powershell
pip install -r requirements.txt
```

#### Run database migrations
```powershell
python manage.py makemigrations
python manage.py migrate
```

#### Create a superuser (admin account)
```powershell
python manage.py createsuperuser
# Follow the prompts to create your admin account
```

#### (Optional) Seed sample job data
```powershell
python manage.py seed_jobs
```

### 3. Frontend Setup (React)

#### Open a new terminal and navigate to React directory
```powershell
cd campus-compass-react
```

#### Install Node.js dependencies
```powershell
npm install
```

---

## 🎯 Running the Application

### Start the Backend Server (Django)

```powershell
# Navigate to Django directory
cd campus-compass-django

# Activate virtual environment (if not already activated)
.\venv\Scripts\Activate.ps1

# Start Django development server
python manage.py runserver
```

The backend API will be available at: **http://localhost:8000**

**Admin Panel**: http://localhost:8000/admin

### Start the Frontend Server (React)

```powershell
# Open a new terminal
# Navigate to React directory
cd campus-compass-react

# Start Vite development server
npm run dev
```

The frontend application will be available at: **http://localhost:5173**

### Access the Application

1. Open your browser and navigate to **http://localhost:5173**
2. Create an account or login with existing credentials
3. Start exploring job listings and applying to jobs!

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register/      - Register a new user
POST   /api/auth/login/         - Login user
POST   /api/auth/logout/        - Logout user
GET    /api/auth/user/          - Get current user details
```

### Jobs
```
GET    /api/jobs/               - List all jobs (supports filtering)
GET    /api/jobs/{id}/          - Get job details
POST   /api/jobs/               - Create new job (admin)
PUT    /api/jobs/{id}/          - Update job (admin)
DELETE /api/jobs/{id}/          - Delete job (admin)
```

### Applications
```
GET    /api/applications/       - List user's applications
GET    /api/applications/{id}/  - Get application details
POST   /api/applications/       - Submit job application
PUT    /api/applications/{id}/  - Update application status
DELETE /api/applications/{id}/  - Delete application
```

### Analytics
```
GET    /api/analytics/jobs/     - Job statistics and insights
GET    /api/analytics/apps/     - Application statistics
```

### Query Parameters for Filtering

**Jobs Endpoint** (`/api/jobs/`)
- `search` - Search by title, location, or description
- `experience_level` - Filter by experience level (entry, mid, senior)
- `location` - Filter by location
- `min_salary` - Minimum salary
- `max_salary` - Maximum salary

Example:
```
GET /api/jobs/?search=developer&experience_level=mid&location=New York
```

---

## 🔧 Environment Variables

### Django (.env file in campus-compass-django/)

```env
# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database (SQLite is default, no configuration needed)
# For PostgreSQL, uncomment and configure:
# DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# CORS Settings
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173

# Media Files
MEDIA_ROOT=media/
MEDIA_URL=/media/
```

### React (.env file in campus-compass-react/)

```env
# API Base URL
VITE_API_URL=http://localhost:8000/api

# Optional: Analytics Keys
# VITE_ANALYTICS_KEY=your-analytics-key
```

---

## 📖 Usage Guide

### For Job Seekers

1. **Create Account**: Sign up with your email and password
2. **Browse Jobs**: Explore available job listings on the dashboard
3. **Search & Filter**: Use search bar and filters to find relevant jobs
4. **View Details**: Click on any job card to see full details
5. **Apply**: Submit your application with resume and cover letter
6. **Track Applications**: Monitor your applications in "My Applications" page
7. **View Analytics**: Check your application statistics and insights

### For Administrators

1. **Access Admin Panel**: Navigate to http://localhost:8000/admin
2. **Login**: Use your superuser credentials
3. **Manage Jobs**: Create, edit, or delete job postings
4. **Review Applications**: View and update application statuses
5. **Manage Users**: Add or remove users and set permissions

---

## 🧪 Development

### Run Tests

```powershell
# Django tests
cd campus-compass-django
python manage.py test

# React tests (if configured)
cd campus-compass-react
npm run test
```

### Linting

```powershell
# Frontend linting
cd campus-compass-react
npm run lint
```

### Build for Production

```powershell
# Build React app
cd campus-compass-react
npm run build

# Django static files
cd campus-compass-django
python manage.py collectstatic
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards
- Follow PEP 8 for Python code
- Use ESLint rules for JavaScript/React code
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation for new features

---

## 🐛 Troubleshooting

### Common Issues

**Issue**: Django server won't start
```powershell
# Solution: Check if port 8000 is already in use
netstat -ano | findstr :8000
# Kill the process or use a different port
python manage.py runserver 8001
```

**Issue**: Virtual environment activation fails
```powershell
# Solution: Set execution policy
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Issue**: React app CORS errors
```
Solution: Ensure Django CORS settings include your frontend URL
Check campus_compass/settings.py for CORS_ALLOWED_ORIGINS
```

**Issue**: npm install fails
```powershell
# Solution: Clear npm cache and retry
npm cache clean --force
npm install
```

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Authors

- **Adarsh** - *Initial work* - [Adarshh17](https://github.com/Adarshh17)

---

## 🙏 Acknowledgments

- shadcn/ui for beautiful UI components
- Django REST Framework for robust API development
- React community for excellent tools and libraries
- All contributors who helped improve this project

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Open an issue on [GitHub Issues](https://github.com/Adarshh17/Hirect/issues)
3. Contact the maintainers

---

## 🔮 Future Enhancements

- [ ] Email notifications for application updates
- [ ] Advanced recommendation system using ML
- [ ] Company profiles and ratings
- [ ] Interview scheduling system
- [ ] Chat functionality between recruiters and applicants
- [ ] Mobile app (React Native)
- [ ] Integration with LinkedIn API
- [ ] Resume parsing and skill extraction
- [ ] Video interview capabilities
- [ ] Payment integration for premium features

---

**Made with ❤️ by Campus Compass Team**
