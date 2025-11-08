import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';
import { Calendar, Users, Trophy, TrendingUp, ChevronRight, Sparkles } from 'lucide-react';

const Home = () => {
  const { events } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Sports', 'Arts', 'Technology', 'Music', 'Drama', 'Science', 'Community Service'];
  const upcomingEvents = events.filter(e => e.status === 'upcoming');
  
  const filteredEvents = selectedCategory === 'All' 
    ? upcomingEvents 
    : upcomingEvents.filter(e => e.category === selectedCategory);

  const features = [
    {
      icon: Calendar,
      title: 'Event Management',
      description: 'Browse and register for diverse extracurricular activities'
    },
    {
      icon: Users,
      title: 'Community Building',
      description: 'Connect with peers who share your interests'
    },
    {
      icon: Trophy,
      title: 'Track Achievements',
      description: 'Monitor your participation and earn certificates'
    },
    {
      icon: TrendingUp,
      title: 'Personal Growth',
      description: 'Develop new skills and expand your horizons'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="bg-secondary-200/30 backdrop-blur-sm px-4 py-2 rounded-full flex items-center space-x-2">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm font-semibold">Welcome to StudentHub</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Your Passion,
              <br />
              <span className="text-secondary-200">Shape Your Future</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
              Join a vibrant community of students engaged in exciting extracurricular activities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="bg-secondary-200 text-primary-800 hover:bg-secondary-300 font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105">
                Get Started Free
                <ChevronRight className="inline ml-2 h-5 w-5" />
              </Link>
              <Link to="/login" className="bg-transparent border-2 border-secondary-200 text-white hover:bg-secondary-200/20 font-bold py-4 px-8 rounded-lg transition-all duration-200">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-secondary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">{events.length}+</div>
              <div className="text-gray-600">Active Events</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">500+</div>
              <div className="text-gray-600">Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">50+</div>
              <div className="text-gray-600">Activities</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">95%</div>
              <div className="text-gray-600">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose StudentHub?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to explore, participate, and excel in extracurricular activities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="card text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="bg-gradient-to-br from-primary-500 to-secondary-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 bg-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Upcoming Events
            </h2>
            <p className="text-lg text-gray-600">
              Explore exciting activities happening soon
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.slice(0, 6).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          {filteredEvents.length > 6 && (
            <div className="text-center mt-8">
              <Link to="/login" className="btn-primary">
                View All Events
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-secondary-100">
            Join thousands of students already exploring their passions
          </p>
          <Link to="/signup" className="bg-secondary-200 text-primary-800 hover:bg-secondary-300 font-bold py-4 px-8 rounded-lg transition-all duration-200 inline-flex items-center shadow-xl hover:shadow-2xl transform hover:scale-105">
            Create Your Account
            <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
