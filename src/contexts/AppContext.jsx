import React, { createContext, useContext, useState, useEffect } from 'react';
import { format, addDays, addWeeks } from 'date-fns';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Mock data generator
const generateMockEvents = () => {
  const categories = ['Sports', 'Arts', 'Technology', 'Music', 'Drama', 'Community Service', 'Science'];
  const statuses = ['upcoming', 'ongoing', 'completed'];
  
  return [
    {
      id: 1,
      title: 'Annual Sports Day',
      description: 'Inter-school sports competition featuring athletics, basketball, and soccer.',
      category: 'Sports',
      date: format(addDays(new Date(), 5), 'yyyy-MM-dd'),
      time: '09:00 AM',
      location: 'Main Sports Ground',
      capacity: 200,
      registered: 145,
      status: 'upcoming',
      organizer: 'PE Department',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500'
    },
    {
      id: 2,
      title: 'Coding Hackathon',
      description: '24-hour coding competition for building innovative tech solutions.',
      category: 'Technology',
      date: format(addDays(new Date(), 12), 'yyyy-MM-dd'),
      time: '10:00 AM',
      location: 'Computer Lab',
      capacity: 50,
      registered: 48,
      status: 'upcoming',
      organizer: 'CS Department',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500'
    },
    {
      id: 3,
      title: 'Art Exhibition',
      description: 'Showcase of student artwork including paintings, sculptures, and digital art.',
      category: 'Arts',
      date: format(addDays(new Date(), 3), 'yyyy-MM-dd'),
      time: '02:00 PM',
      location: 'Art Gallery',
      capacity: 100,
      registered: 67,
      status: 'upcoming',
      organizer: 'Art Department',
      image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=500'
    },
    {
      id: 4,
      title: 'Music Concert',
      description: 'Evening of classical and contemporary music performances by students.',
      category: 'Music',
      date: format(addWeeks(new Date(), 2), 'yyyy-MM-dd'),
      time: '06:00 PM',
      location: 'Auditorium',
      capacity: 300,
      registered: 0,
      status: 'upcoming',
      organizer: 'Music Department',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500'
    },
    {
      id: 5,
      title: 'Science Fair',
      description: 'Exhibition of innovative science projects and experiments.',
      category: 'Science',
      date: format(addDays(new Date(), 20), 'yyyy-MM-dd'),
      time: '11:00 AM',
      location: 'Science Building',
      capacity: 150,
      registered: 89,
      status: 'upcoming',
      organizer: 'Science Department',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500'
    },
    {
      id: 6,
      title: 'Drama Workshop',
      description: 'Interactive drama and theater workshop with professional actors.',
      category: 'Drama',
      date: format(addDays(new Date(), -5), 'yyyy-MM-dd'),
      time: '03:00 PM',
      location: 'Theater Hall',
      capacity: 75,
      registered: 75,
      status: 'completed',
      organizer: 'Drama Club',
      image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=500'
    },
    {
      id: 7,
      title: 'Community Clean-Up Drive',
      description: 'Environmental initiative to clean local parks and streets.',
      category: 'Community Service',
      date: format(new Date(), 'yyyy-MM-dd'),
      time: '08:00 AM',
      location: 'City Park',
      capacity: 100,
      registered: 82,
      status: 'ongoing',
      organizer: 'Student Council',
      image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=500'
    }
  ];
};

export const AppProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    // Initialize with mock data
    setEvents(generateMockEvents());
    
    // Load from localStorage if available
    const saved = localStorage.getItem('registeredEvents');
    if (saved) {
      setRegisteredEvents(JSON.parse(saved));
    }

    // Mock notifications
    setNotifications([
      {
        id: 1,
        title: 'Event Reminder',
        message: 'Community Clean-Up Drive starts today at 8:00 AM',
        type: 'info',
        read: false,
        timestamp: new Date().toISOString()
      },
      {
        id: 2,
        title: 'Registration Confirmed',
        message: 'You have been registered for Annual Sports Day',
        type: 'success',
        read: false,
        timestamp: new Date(Date.now() - 3600000).toISOString()
      }
    ]);
  }, []);

  const registerForEvent = (eventId, userId) => {
    const event = events.find(e => e.id === eventId);
    if (!event) return { success: false, error: 'Event not found' };
    
    if (registeredEvents.includes(eventId)) {
      return { success: false, error: 'Already registered for this event' };
    }

    if (event.registered >= event.capacity) {
      return { success: false, error: 'Event is full' };
    }

    // Update event registration count
    setEvents(events.map(e => 
      e.id === eventId ? { ...e, registered: e.registered + 1 } : e
    ));

    // Add to registered events
    const updated = [...registeredEvents, eventId];
    setRegisteredEvents(updated);
    localStorage.setItem('registeredEvents', JSON.stringify(updated));

    // Add notification
    addNotification({
      title: 'Registration Successful',
      message: `You have been registered for ${event.title}`,
      type: 'success'
    });

    return { success: true };
  };

  const unregisterFromEvent = (eventId) => {
    setEvents(events.map(e => 
      e.id === eventId ? { ...e, registered: e.registered - 1 } : e
    ));

    const updated = registeredEvents.filter(id => id !== eventId);
    setRegisteredEvents(updated);
    localStorage.setItem('registeredEvents', JSON.stringify(updated));

    return { success: true };
  };

  const addEvent = (eventData) => {
    const newEvent = {
      id: Date.now(),
      ...eventData,
      registered: 0,
      status: 'upcoming'
    };
    setEvents([...events, newEvent]);
    return { success: true, event: newEvent };
  };

  const updateEvent = (eventId, eventData) => {
    setEvents(events.map(e => 
      e.id === eventId ? { ...e, ...eventData } : e
    ));
    return { success: true };
  };

  const deleteEvent = (eventId) => {
    setEvents(events.filter(e => e.id !== eventId));
    return { success: true };
  };

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      ...notification,
      read: false,
      timestamp: new Date().toISOString()
    };
    setNotifications([newNotification, ...notifications]);
  };

  const markNotificationAsRead = (notificationId) => {
    setNotifications(notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    ));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const value = {
    events,
    notifications,
    registeredEvents,
    registerForEvent,
    unregisterFromEvent,
    addEvent,
    updateEvent,
    deleteEvent,
    addNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    unreadCount: notifications.filter(n => !n.read).length
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
