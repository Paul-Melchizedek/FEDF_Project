# Student Extracurricular Activities Management Platform

A modern, responsive web application built with React for managing student extracurricular activities.

## Features

### For Students
- Browse and explore available activities
- Register for events online
- Track participation and achievements
- Receive real-time notifications
- Download certificates and reports
- View personal dashboard with stats

### For Administrators
- Create, edit, and schedule events
- Manage student registrations
- Track participation and attendance
- Generate reports (CSV/PDF)
- Send announcements and notifications
- View analytics and insights

## Technology Stack

- **Frontend**: React 18 with JavaScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Date Handling**: date-fns

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd FEDF
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Default Login Credentials

### Admin Account
- Email: admin@school.com
- Password: admin123

### Student Account
- Email: student@school.com
- Password: student123

## Project Structure

```
FEDF/
├── src/
│   ├── components/       # Reusable UI components
│   ├── contexts/         # React Context providers
│   ├── pages/           # Page components
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── public/              # Static assets
└── index.html           # HTML template
```

## Features Highlights

- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Role-Based Access**: Separate dashboards for students and administrators
- **Real-Time Notifications**: Stay updated with event changes
- **Event Calendar**: Visual calendar view of all activities
- **Analytics Dashboard**: Track participation and engagement
- **Certificate Generation**: Download participation certificates
- **Report Export**: Export data in CSV/PDF formats

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
