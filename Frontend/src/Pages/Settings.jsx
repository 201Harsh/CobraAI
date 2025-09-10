import React from 'react'
import { FaUserCog, FaPalette, FaLock, FaSignOutAlt } from 'react-icons/fa'

const Settings = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-center text-white mb-8">
        Settings
      </h1>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Profile Settings */}
        <div className="bg-gray-800 rounded-2xl p-6 flex items-center space-x-4 hover:border-pink-600 border border-gray-700 transition cursor-pointer">
          <FaUserCog className="text-pink-500 text-2xl" />
          <div>
            <h2 className="text-2xl font-semibold">Profile Settings</h2>
            <p className="text-blue-200">
              Update your personal information and preferences.
            </p>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-gray-800 rounded-2xl p-6 flex items-center space-x-4 hover:border-pink-600 border border-gray-700 transition cursor-pointer">
          <FaPalette className="text-pink-500 text-2xl" />
          <div>
            <h2 className="text-2xl font-semibold">Appearance</h2>
            <p className="text-blue-200">
              Customize theme, layout, and color preferences.
            </p>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-gray-800 rounded-2xl p-6 flex items-center space-x-4 hover:border-pink-600 border border-gray-700 transition cursor-pointer">
          <FaLock className="text-pink-500 text-2xl" />
          <div>
            <h2 className="text-2xl font-semibold">Security</h2>
            <p className="text-blue-200">
              Change your password and configure two-factor authentication.
            </p>
          </div>
        </div>

        {/* Logout */}
        <div className="bg-gray-800 rounded-2xl p-6 flex items-center space-x-4 hover:border-red-500 border border-gray-700 transition cursor-pointer">
          <FaSignOutAlt className="text-pink-500 text-2xl" />
          <div>
            <h2 className="text-2xl font-semibold">Logout</h2>
            <p className="text-blue-200">Sign out of your account securely.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
