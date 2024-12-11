import React, { useState } from 'react';
import Onlinedata from '../Data/Onlinedata';
import Subscription from '../Data/Subscription';

function Vender() {
  const [activeSection, setActiveSection] = useState('VendorFilePlacement');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white p-4">
        <ul className="flex space-x-6 justify-center text-white">
          <li>
            <button 
              className="hover:bg-gray-200 px-4 py-2 rounded text-black"
              onClick={() => setActiveSection('OnlineData')}
            >
              Online Data
            </button>
          </li>
          <li>
            <button
              className="hover:bg-gray-200 px-4 py-2 rounded text-black"
              onClick={() => setActiveSection('Subscription')}
            >
              Subscription-Based Data
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="p-6">
        {activeSection === 'OnlineData' && <Onlinedata />}
        {activeSection === 'Subscription' && <Subscription />}
      </div>
    </div>
  );
}

export default Vender;
