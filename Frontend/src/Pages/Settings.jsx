import React, { useState } from 'react';
import { FaUserCog, FaPalette, FaLock, FaSignOutAlt, FaChevronRight, FaMoon, FaSun, FaBell, FaGlobe, FaCreditCard } from 'react-icons/fa';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const renderContent = () => {
    switch(activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Profile Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Bio</label>
                <textarea 
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  rows="3"
                  placeholder="Tell us about yourself"
                ></textarea>
              </div>
            </div>
            <button className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-6 rounded-lg transition">
              Save Changes
            </button>
          </div>
        );
      case 'appearance':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Appearance</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center">
                  {darkMode ? <FaMoon className="text-purple-400 mr-3" /> : <FaSun className="text-yellow-400 mr-3" />}
                  <span>Dark Mode</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                </label>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <h3 className="font-medium mb-2">Theme Color</h3>
                <div className="flex space-x-3">
                  {['#EC4899', '#3B82F6', '#10B981', '#F59E0B'].map(color => (
                    <div 
                      key={color}
                      className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-600 hover:scale-110 transition"
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Security</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-800 rounded-lg">
                <h3 className="font-medium mb-2">Change Password</h3>
                <div className="space-y-3">
                  <input 
                    type="password" 
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Current Password"
                  />
                  <input 
                    type="password" 
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="New Password"
                  />
                  <input 
                    type="password" 
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Confirm New Password"
                  />
                </div>
                <button className="mt-4 bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-6 rounded-lg transition">
                  Update Password
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center">
                  <FaLock className="text-blue-400 mr-3" />
                  <span>Two-Factor Authentication</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                </label>
              </div>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center">
                  <FaBell className="text-yellow-400 mr-3" />
                  <span>Enable Notifications</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={notifications}
                    onChange={() => setNotifications(!notifications)}
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                </label>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <h3 className="font-medium mb-2">Notification Preferences</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-pink-500 focus:ring-pink-500" defaultChecked />
                    <span className="ml-2">Email Notifications</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-pink-500 focus:ring-pink-500" defaultChecked />
                    <span className="ml-2">Push Notifications</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-pink-500 focus:ring-pink-500" />
                    <span className="ml-2">SMS Alerts</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Select a section</div>;
    }
  };

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: <FaUserCog /> },
    { id: 'appearance', label: 'Appearance', icon: <FaPalette /> },
    { id: 'security', label: 'Security', icon: <FaLock /> },
    { id: 'notifications', label: 'Notifications', icon: <FaBell /> },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 p-6">
        <h1 className="text-2xl font-bold mb-8 flex items-center">
          <FaUserCog className="mr-2 text-pink-500" />
          Settings
        </h1>
        <nav className="space-y-2">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition ${activeSection === item.id ? 'bg-pink-900/30 text-pink-400' : 'hover:bg-gray-700'}`}
            >
              <div className="flex items-center">
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </div>
              <FaChevronRight className="text-xs" />
            </button>
          ))}
          <button className="w-full flex items-center p-3 rounded-lg text-red-400 hover:bg-red-900/20 mt-8 transition">
            <FaSignOutAlt className="mr-3" />
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-3xl mx-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;