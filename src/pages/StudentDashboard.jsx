import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';
import StatCard from '../components/StatCard';
import { 
  Calendar, 
  Trophy, 
  TrendingUp, 
  Award, 
  Clock,
  Filter,
  Download,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { events, registeredEvents, registerForEvent, unregisterFromEvent } = useApp();
  const [filter, setFilter] = useState('all'); // all, registered, available
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [notification, setNotification] = useState(null);

  const categories = ['All', 'Sports', 'Arts', 'Technology', 'Music', 'Drama', 'Science', 'Community Service'];

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleRegister = (eventId) => {
    const result = registerForEvent(eventId, user.id);
    if (result.success) {
      showNotification('Successfully registered for the event!', 'success');
    } else {
      showNotification(result.error, 'error');
    }
  };

  const handleUnregister = (eventId) => {
    const result = unregisterFromEvent(eventId);
    if (result.success) {
      showNotification('Successfully unregistered from the event.', 'success');
    }
  };

  const handleDownloadCertificate = (eventTitle) => {
    showNotification(`Certificate for "${eventTitle}" downloaded!`, 'success');
  };

  // Filter events
  const getFilteredEvents = () => {
    let filtered = events;

    // Filter by registration status
    if (filter === 'registered') {
      filtered = filtered.filter(e => registeredEvents.includes(e.id));
    } else if (filter === 'available') {
      filtered = filtered.filter(e => !registeredEvents.includes(e.id) && e.status === 'upcoming');
    }

    // Filter by category
    if (categoryFilter !== 'All') {
      filtered = filtered.filter(e => e.category === categoryFilter);
    }

    return filtered;
  };

  const filteredEvents = getFilteredEvents();
  const myEvents = events.filter(e => registeredEvents.includes(e.id));
  const upcomingEvents = myEvents.filter(e => e.status === 'upcoming');
  const completedEvents = myEvents.filter(e => e.status === 'completed');

  // Stats
  const stats = [
    {
      icon: Calendar,
      title: 'Events Registered',
      value: registeredEvents.length,
      color: 'primary',
      trend: { positive: true, value: '+2 this week' }
    },
    {
      icon: Trophy,
      title: 'Events Completed',
      value: completedEvents.length,
      color: 'green',
      trend: { positive: true, value: `${completedEvents.length} certificates` }
    },
    {
      icon: TrendingUp,
      title: 'Participation Rate',
      value: `${Math.round((completedEvents.length / Math.max(registeredEvents.length, 1)) * 100)}%`,
      color: 'blue'
    },
    {
      icon: Award,
      title: 'Achievements',
      value: user?.achievements || 0,
      color: 'yellow'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-20 right-4 z-50 animate-slide-down ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white px-6 py-4 rounded-lg shadow-2xl flex items-center space-x-2`}>
          {notification.type === 'success' ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <AlertCircle className="h-5 w-5" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">
            Track your activities and discover new opportunities
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Upcoming Events Section */}
        {upcomingEvents.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Your Upcoming Events</h2>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="space-y-4">
                {upcomingEvents.slice(0, 3).map((event) => (
                  <div 
                    key={event.id}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary-600 text-white rounded-lg p-3">
                        <Calendar className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{event.title}</h3>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {format(new Date(event.date), 'MMM dd, yyyy')} at {event.time}
                          </span>
                          <span className="badge badge-info">{event.category}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleUnregister(event.id)}
                      className="text-red-600 hover:text-red-700 font-medium text-sm"
                    >
                      Unregister
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Completed Events with Certificates */}
        {completedEvents.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Your Certificates</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedEvents.map((event) => (
                <div key={event.id} className="card group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Award className="h-6 w-6 text-green-600" />
                    </div>
                    <span className="badge badge-success">Completed</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {format(new Date(event.date), 'MMMM dd, yyyy')}
                  </p>
                  <button
                    onClick={() => handleDownloadCertificate(event.title)}
                    className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Certificate</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Browse Events Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Browse Events</h2>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="text-sm text-gray-600">Filter:</span>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                All Events
              </button>
              <button
                onClick={() => setFilter('registered')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === 'registered'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                My Events ({registeredEvents.length})
              </button>
              <button
                onClick={() => setFilter('available')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === 'available'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Available
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setCategoryFilter(category)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    categoryFilter === category
                      ? 'bg-secondary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  showActions={true}
                  onRegister={handleRegister}
                  onUnregister={handleUnregister}
                  isRegistered={registeredEvents.includes(event.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl">
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StudentDashboard;
