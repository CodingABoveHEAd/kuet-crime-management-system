# KUET Detectives - Crime Management System

A modern, full-stack web application for crime complaint management and analytics. Built as a comprehensive solution for managing, tracking, and analyzing crime-related incidents with an intuitive user interface and robust backend infrastructure.

## Overview

KUET Detectives is a crime management system designed to streamline the process of filing, tracking, and analyzing crime complaints. The application provides different user roles—regular users and administrators—each with tailored functionality. Users can submit detailed crime complaints with location data, while administrators have access to analytics, complaint management dashboards, and comprehensive reporting tools.

**Target Users:** Law enforcement agencies, community safety officers, and citizens reporting crimes.

**Problem Solved:** Centralized, digital management of crime complaints with real-time tracking, geographic visualization, and data-driven analytics.

---

## Key Features

### User Features
- **Complaint Filing**: Submit detailed crime complaints with descriptions, categories, and attachments
- **Location Mapping**: Interactive map integration to pinpoint incident locations using Leaflet
- **Complaint Tracking**: View personal complaint history and real-time status updates
- **User Authentication**: Secure login and registration with JWT-based authentication
- **Profile Management**: Manage personal account information and preferences

### Admin Features
- **Comprehensive Dashboard**: Real-time analytics and complaint statistics
- **Analytics & Reports**: View crime trends, complaint distributions, and geographic hotspots
- **Complaint Management**: Review, filter, and manage all submitted complaints
- **Messaging System**: Communicate directly with users regarding complaints
- **User Management**: Oversee registered users and system administration

### Technical Features
- **Dark/Light Mode Toggle**: Persistent theme preference with localStorage
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional interface with smooth animations and transitions
- **Accessibility**: WCAG-compliant with proper ARIA labels and keyboard navigation
- **Email Notifications**: Automated email system for updates and confirmations
- **Cloud Image Storage**: Cloudinary integration for complaint image uploads

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19.1.1 | UI framework |
| Vite | 7.1.2 | Build tool & dev server |
| React Router DOM | 7.8.2 | Client-side routing |
| Axios | 1.12.0 | HTTP client |
| Leaflet & React-Leaflet | 1.9.4 & 5.0.0 | Interactive mapping |
| Chart.js & React-ChartJS-2 | 4.5.0 & 5.3.0 | Data visualization |
| React Icons | 5.5.0 | Icon library |
| JWT Decode | 4.0.0 | JWT token parsing |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | Latest | Runtime environment |
| Express.js | 5.1.0 | Web framework |
| MongoDB | Cloud (Atlas) | NoSQL database |
| Mongoose | 8.18.1 | ODM for MongoDB |
| BCryptJS | 3.0.2 | Password hashing |
| JWT | 9.0.2 | Token-based authentication |
| Nodemailer | 7.0.6 | Email service |
| Multer | 2.0.2 | File upload handling |
| Cloudinary | 2.7.0 | Cloud image storage |
| CORS | 2.8.5 | Cross-origin resource sharing |
| Dotenv | 17.2.2 | Environment variables |

### Database
- **MongoDB Atlas**: Cloud-hosted NoSQL database with automatic backups and scaling

### Development Tools
- **Nodemon**: Hot reload for backend development
- **ESLint**: Code quality and consistency
- **Leaflet**: Open-source mapping library

---

## Screenshots & Demo

**Coming Soon**: Demo screenshots and live deployment links will be added in future updates.

For now, you can run the application locally following the [Installation & Setup](#installation--setup) section below.

---

## Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **MongoDB Atlas Account** (free tier available at [mongodb.com](https://www.mongodb.com/cloud/atlas))
- **Cloudinary Account** (free tier available at [cloudinary.com](https://cloudinary.com))
- **Gmail App Password** (for email notifications)

### Step 1: Clone the Repository

```bash
git clone https://github.com/CodingABoveHEAd/kuet-crime-management-system.git
cd kuet-crime-management-system
```

### Step 2: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration
# Required variables:
#   - MONGO_URI: MongoDB connection string
#   - JWT_SECRET: Secret key for JWT tokens
#   - CLOUDINARY_CLOUD_NAME: Cloudinary cloud name
#   - CLOUDINARY_API_KEY: Cloudinary API key
#   - CLOUDINARY_API_SECRET: Cloudinary API secret
#   - EMAIL_USER: Gmail address for notifications
#   - EMAIL_PASSWORD: Gmail app password
#   - PORT: Server port (default: 5000)

# Start backend server
npm run dev
# Server runs on http://localhost:5000
```

### Step 3: Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev
# Application runs on http://localhost:5173 (or next available port)
```

### Step 4: Access the Application

- **Frontend**: Open [http://localhost:5173](http://localhost:5173) in your browser
- **User Registration**: Click "Register" to create a new account
- **Admin Access**: Use admin credentials after database setup

### Environment Variables Reference

Create a `.env` file in the `backend` directory with the following structure:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/kuet-crime-management-system
JWT_SECRET=your-secret-key-here
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
PORT=5000
NODE_ENV=development
```

---

## Project Structure

```
kuet-crime-management-system/
├── frontend/                          # React frontend application
│   ├── public/                        # Static assets
│   ├── src/
│   │   ├── components/                # Reusable React components
│   │   │   ├── Nav.jsx               # Navigation bar with theme toggle
│   │   │   ├── Footer.jsx            # Footer component
│   │   │   ├── ThemeToggle.jsx       # Dark/light mode toggle
│   │   │   ├── AllComplaints.jsx     # Complaints list view
│   │   │   ├── MyComplaints.jsx      # User's complaints
│   │   │   └── Logo.jsx              # Logo component
│   │   ├── context/                  # React Context providers
│   │   │   └── AuthContext.jsx       # Authentication context
│   │   ├── hooks/                    # Custom React hooks
│   │   │   └── useTheme.js           # Theme management hook
│   │   ├── pages/                    # Page components
│   │   │   ├── Home.jsx              # Landing page
│   │   │   ├── Login.jsx             # User login
│   │   │   ├── Register.jsx          # User registration
│   │   │   ├── Dashboard.jsx         # User dashboard
│   │   │   ├── ComplaintForm.jsx     # File new complaint
│   │   │   ├── Contact.jsx           # Contact page
│   │   │   ├── about.jsx             # About page
│   │   │   ├── AdminDashboard.jsx    # Admin analytics dashboard
│   │   │   ├── AdminMap.jsx          # Crime location heatmap
│   │   │   └── AdminMessages.jsx     # Admin messaging system
│   │   ├── styles/                   # CSS stylesheets
│   │   │   ├── theme.css             # CSS variables & theme definitions
│   │   │   ├── componentstyles/      # Component-specific styles
│   │   │   └── pagestyles/           # Page-specific styles
│   │   ├── App.jsx                   # Root component
│   │   ├── main.jsx                  # React DOM entry point
│   │   └── index.css                 # Global styles
│   ├── package.json
│   ├── vite.config.js               # Vite configuration
│   └── eslint.config.js             # ESLint configuration
│
├── backend/                           # Express.js backend
│   ├── config/                        # Configuration files
│   │   ├── db.js                     # MongoDB connection
│   │   └── cloudinary.js             # Cloudinary setup
│   ├── controllers/                   # Route controllers
│   │   ├── authController.js         # Authentication logic
│   │   ├── complaintController.js    # Complaint management
│   │   ├── userController.js         # User management
│   │   ├── contactController.js      # Contact form handling
│   │   └── analyticsController.js    # Analytics data processing
│   ├── models/                        # MongoDB schemas
│   │   ├── User.js                   # User model
│   │   ├── Complaint.js              # Complaint model
│   │   └── Contact.js                # Contact model
│   ├── routes/                        # API routes
│   │   ├── authRoutes.js             # Auth endpoints
│   │   ├── complaintRoutes.js        # Complaint endpoints
│   │   ├── userRoutes.js             # User endpoints
│   │   ├── contactRoutes.js          # Contact endpoints
│   │   └── analyticsRoute.js         # Analytics endpoints
│   ├── middleware/                    # Custom middleware
│   │   ├── authMiddleware.js         # JWT verification
│   │   └── uploadMiddleware.js       # File upload handling
│   ├── utils/                         # Utility functions
│   │   └── sendEmail.js              # Email service
│   ├── server.js                      # Express app setup
│   ├── package.json
│   └── .env                           # Environment variables
│
└── LICENSE                            # Project license
```

---

## Usage

### For Regular Users

1. **Register**: Create a new account with email and password
2. **Login**: Access your user dashboard
3. **File Complaint**: Click "New Complaint" to report a crime
   - Provide incident details (description, category, date/time)
   - Select location on interactive map
   - Upload supporting images
   - Submit complaint
4. **Track Complaints**: View all your complaints and their status
5. **Contact Support**: Use the contact form for inquiries

### For Administrators

1. **Login**: Use admin credentials
2. **Dashboard**: View real-time analytics and complaint statistics
3. **Crime Map**: Visualize complaint locations on interactive map
4. **Manage Complaints**: Review, update, and manage all submitted complaints
5. **Message Users**: Send updates and responses to complaint filers
6. **Generate Reports**: Create data-driven reports for analysis

### Authentication Flow

- Users authenticate with **JWT tokens** stored in browser localStorage
- Tokens are included in all API requests via Authorization headers
- Token expiration invalidates session; users must re-login

---

## Future Improvements

### Planned Features
- **Advanced Filtering**: Filter complaints by date range, category, status, location radius
- **Notification System**: Real-time in-app notifications and push notifications
- **Mobile App**: Native iOS and Android applications
- **Export Functionality**: Export complaints and reports to PDF/CSV
- **Email Templates**: Customizable email templates for automated communications
- **Geofencing Alerts**: Automatic alerts for crimes in specific geographic areas
- **User Verification**: Phone number and email verification two-factor authentication
- **Activity Logging**: Audit trail of all admin actions

### Infrastructure
- **Automated Testing**: Unit tests, integration tests, and E2E tests
- **CI/CD Pipeline**: GitHub Actions for automated build and deployment
- **API Documentation**: OpenAPI/Swagger documentation
- **Performance Optimization**: Caching strategies, database indexing, CDN integration
- **Monitoring & Logging**: Application performance monitoring and error tracking

### Security Enhancements
- **Rate Limiting**: Prevent abuse with request rate limiting
- **Input Validation**: Comprehensive validation and sanitization
- **HTTPS Enforcement**: SSL/TLS encryption for all communications
- **CORS Policies**: Strict CORS configuration

---

## Contributing

We welcome contributions from developers, designers, and researchers. Here's how to get involved:

### How to Contribute

1. **Fork** the repository
2. **Create** a new branch for your feature: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m "Add your feature description"`
4. **Push** to your branch: `git push origin feature/your-feature-name`
5. **Open** a Pull Request with a clear description of changes

### Contribution Guidelines

- Follow the existing code style and conventions
- Test your changes locally before submitting
- Write clear, descriptive commit messages
- Update documentation as needed
- Ensure no sensitive data is committed

### Reporting Issues

- Check existing issues before creating a new one
- Provide detailed reproduction steps
- Include error messages and screenshots if applicable
- Specify your environment (OS, Node version, etc.)

---

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

---

## Project Information

- **Repository**: [kuet-crime-management-system](https://github.com/CodingABoveHEAd/kuet-crime-management-system)
- **Status**: Active Development
- **Last Updated**: February 2026

---

## Acknowledgments

Built as a full-stack web development project demonstrating:
- Modern React patterns and hooks
- RESTful API design with Express.js
- MongoDB database design and optimization
- Responsive design and accessibility best practices
- Cloud service integration (Cloudinary, MongoDB Atlas)
- Authentication and authorization systems
- Real-time data visualization and mapping

---

## Contact & Support

For questions, suggestions, or support:
- Open an issue on GitHub
- Review the project documentation
- Check the existing FAQ section

---

**Happy coding! Thank you for your interest in KUET Detectives.**
