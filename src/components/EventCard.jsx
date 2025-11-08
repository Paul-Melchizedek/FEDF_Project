import React from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const EventCard = ({ event, showActions = false, onRegister, onUnregister, isRegistered = false }) => {
  const availableSpots = event.capacity - event.registered;
  const percentFilled = (event.registered / event.capacity) * 100;

  const getStatusBadge = (status) => {
    const badges = {
      upcoming: 'badge badge-info',
      ongoing: 'badge badge-success',
      completed: 'badge badge-danger'
    };
    return badges[status] || 'badge badge-info';
  };

  return (
    <div className="card group hover:scale-[1.02] transition-transform duration-300">
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <span className={getStatusBadge(event.status)}>
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </span>
        </div>
        <div className="absolute bottom-2 left-2">
          <span className="badge bg-white text-gray-800 font-semibold">
            {event.category}
          </span>
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
        {event.title}
      </h3>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {event.description}
      </p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-2 text-primary-600" />
          <span>{format(new Date(event.date), 'MMM dd, yyyy')}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="h-4 w-4 mr-2 text-primary-600" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-2 text-primary-600" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Users className="h-4 w-4 mr-2 text-primary-600" />
          <span>{event.registered} / {event.capacity} registered</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              percentFilled >= 90 ? 'bg-red-500' : 
              percentFilled >= 70 ? 'bg-yellow-500' : 
              'bg-green-500'
            }`}
            style={{ width: `${percentFilled}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {availableSpots > 0 ? `${availableSpots} spots remaining` : 'Event full'}
        </p>
      </div>

      <div className="flex gap-2">
        <Link 
          to={`/event/${event.id}`}
          className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-all duration-200"
        >
          View Details
        </Link>
        
        {showActions && event.status === 'upcoming' && (
          isRegistered ? (
            <button
              onClick={() => onUnregister(event.id)}
              className="flex-1 bg-red-100 hover:bg-red-200 text-red-800 font-semibold py-2 px-4 rounded-lg transition-all duration-200"
            >
              Unregister
            </button>
          ) : (
            <button
              onClick={() => onRegister(event.id)}
              disabled={availableSpots === 0}
              className={`flex-1 font-semibold py-2 px-4 rounded-lg transition-all duration-200 ${
                availableSpots === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'btn-primary'
              }`}
            >
              Register
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default EventCard;
