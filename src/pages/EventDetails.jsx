import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  User,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import { format } from 'date-fns';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, registeredEvents, registerForEvent, unregisterFromEvent } = useApp();
  const { isAuthenticated, isStudent, user } = useAuth();
  const [notification, setNotification] = useState(null);

  const event = events.find(e => e.id === parseInt(id));
  const isRegistered = registeredEvents.includes(parseInt(id));

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h2>
            <Link to="/" className="btn-primary">
              Return Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleRegister = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const result = registerForEvent(parseInt(id), user.id);
    if (result.success) {
      showNotification('Successfully registered for the event!', 'success');
    } else {
      showNotification(result.error, 'error');
    }
  };

  const handleUnregister = () => {
    const result = unregisterFromEvent(parseInt(id));
    if (result.success) {
      showNotification('Successfully unregistered from the event.', 'success');
    }
  };

  const availableSpots = event.capacity - event.registered;
  const percentFilled = (event.registered / event.capacity) * 100;

  const getStatusBadge = (status) => {
    const badges = {
      upcoming: { className: 'badge badge-info', text: 'Upcoming' },
      ongoing: { className: 'badge badge-success', text: 'Ongoing' },
      completed: { className: 'badge badge-danger', text: 'Completed' }
    };
    return badges[status] || badges.upcoming;
  };

  const statusBadge = getStatusBadge(event.status);

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

      <div className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className={statusBadge.className}>
                  {statusBadge.text}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className="badge bg-white text-gray-800 font-semibold">
                  {event.category}
                </span>
              </div>
            </div>

            {/* Event Info */}
            <div className="card">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-700">
                  <Calendar className="h-5 w-5 mr-3 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{format(new Date(event.date), 'MMMM dd, yyyy')}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-700">
                  <Clock className="h-5 w-5 mr-3 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-medium">{event.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-700">
                  <MapPin className="h-5 w-5 mr-3 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{event.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-700">
                  <User className="h-5 w-5 mr-3 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-500">Organizer</p>
                    <p className="font-medium">{event.organizer}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">About This Event</h2>
                <p className="text-gray-700 leading-relaxed">{event.description}</p>
              </div>
            </div>

            {/* Additional Info */}
            {isRegistered && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-green-900 mb-1">You're Registered!</h3>
                    <p className="text-green-700 text-sm">
                      You're all set for this event. We'll send you a reminder before it starts.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {!isAuthenticated && event.status === 'upcoming' && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-start">
                  <Info className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Want to Register?</h3>
                    <p className="text-blue-700 text-sm mb-3">
                      Please sign in or create an account to register for this event.
                    </p>
                    <div className="flex space-x-2">
                      <Link to="/login" className="text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all">
                        Sign In
                      </Link>
                      <Link to="/signup" className="text-sm bg-white hover:bg-gray-50 text-blue-600 font-semibold py-2 px-4 rounded-lg border border-blue-600 transition-all">
                        Sign Up
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Registration Card */}
            <div className="card sticky top-24">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Capacity</span>
                  <span className="font-bold text-gray-900">{event.registered} / {event.capacity}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-300 ${
                      percentFilled >= 90 ? 'bg-red-500' : 
                      percentFilled >= 70 ? 'bg-yellow-500' : 
                      'bg-green-500'
                    }`}
                    style={{ width: `${percentFilled}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {availableSpots > 0 
                    ? `${availableSpots} spots remaining` 
                    : 'Event is full'}
                </p>
              </div>

              {isAuthenticated && isStudent && event.status === 'upcoming' && (
                <div className="space-y-3">
                  {isRegistered ? (
                    <button
                      onClick={handleUnregister}
                      className="w-full bg-red-100 hover:bg-red-200 text-red-800 font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                    >
                      Unregister
                    </button>
                  ) : (
                    <button
                      onClick={handleRegister}
                      disabled={availableSpots === 0}
                      className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-200 ${
                        availableSpots === 0
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'btn-primary'
                      }`}
                    >
                      {availableSpots === 0 ? 'Event Full' : 'Register Now'}
                    </button>
                  )}
                </div>
              )}

              {event.status === 'completed' && (
                <div className="text-center p-4 bg-gray-100 rounded-lg">
                  <p className="text-gray-600 font-medium">This event has ended</p>
                </div>
              )}
            </div>

            {/* Quick Info */}
            <div className="card">
              <h3 className="font-bold text-gray-900 mb-4">Quick Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium text-gray-900">{event.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className={statusBadge.className}>{statusBadge.text}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Organizer</span>
                  <span className="font-medium text-gray-900">{event.organizer}</span>
                </div>
              </div>
            </div>

            {/* Share */}
            <div className="card">
              <h3 className="font-bold text-gray-900 mb-4">Share Event</h3>
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-all">
                  Facebook
                </button>
                <button className="flex-1 bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-all">
                  Twitter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EventDetails;
