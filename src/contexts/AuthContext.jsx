import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock authentication - replace with real API call
    const users = [
      {
        id: 1,
        email: 'admin@school.com',
        password: 'admin123',
        role: 'admin',
        name: 'Admin User',
        avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=0ea5e9&color=fff'
      },
      {
        id: 2,
        email: 'student@school.com',
        password: 'student123',
        role: 'student',
        name: 'John Doe',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=d946ef&color=fff',
        studentId: 'STU2024001',
        grade: '10th Grade',
        registeredEvents: 5,
        achievements: 12
      }
    ];

    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return { success: true, user: userWithoutPassword };
    }
    
    return { success: false, error: 'Invalid email or password' };
  };

  const signup = (userData) => {
    // Mock signup - replace with real API call
    const newUser = {
      id: Date.now(),
      ...userData,
      role: 'student',
      avatar: `https://ui-avatars.com/api/?name=${userData.name}&background=d946ef&color=fff`,
      studentId: `STU${Date.now()}`,
      registeredEvents: 0,
      achievements: 0
    };
    
    const { password, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    return { success: true, user: userWithoutPassword };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isStudent: user?.role === 'student'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
