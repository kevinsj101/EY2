import React, { useState } from 'react';
import Vendorfileplacement from './Vendorfileplacement';

function Vender() {
  const [activeSection, setActiveSection] = useState('VendorFilePlacement');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 p-4">
        <ul className="flex space-x-6 justify-center text-white">
          <li>
            <button
              className="hover:bg-blue-500 px-4 py-2 rounded"
              onClick={() => setActiveSection('VendorFilePlacement')}
            >
              Vendor File Placement
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="p-6">
        {activeSection === 'VendorFilePlacement' && <Vendorfileplacement />}
      </div>
    </div>
  );
}

export default Vender;
