
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loginType, setLoginType] = useState(''); // 'owner' or 'vendor'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const openLoginDialog = (type) => {
    setLoginType(type);
    setIsDialogOpen(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Logic to validate login details can be added here.
    setIsDialogOpen(false);

    if (loginType === 'owner') {
      navigate('/home');
    } else if (loginType === 'vendor') {
      navigate('/vendor');
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-no-repeat bg-cover bg-center bg-yellow-50"
    >
      <h1 className="text-Black text-4xl mb-8">Welcome to Our Platform</h1>
      <div className="space-x-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded "
          onClick={() => openLoginDialog('owner')}
        >
          Login as User
        </button>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded"
          onClick={() => openLoginDialog('vendor')}
        >
          Login as Vendor
        </button>
      </div>

      {/* Dialog for login form */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg w-80 p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              {loginType === 'owner' ? 'Owner Login' : 'Vendor Login'}
            </h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700">Username</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
