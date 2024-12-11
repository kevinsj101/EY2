import React from 'react';
import img4 from './Images/img4.png';
import img5 from './Images/img5.png';
const platforms = [
  {
    name: 'Statista',
    description: 'Short description about platform/company',
    logo: img4, 
    link: 'https://www.statista.com/'
  },
  {
    name: 'Future Market Insights',
    description: 'Short description about platform/company',
    logo: img5, 
    link: 'https://www.futuremarketinsights.com/'
  }
];

function Subscription() {
  return (
    <div className="flex justify-center gap-8 p-8">
      {platforms.map((platform, index) => (
        <div
          key={index}
          className="border rounded-lg shadow-lg p-6 w-64 text-center"
        >
          <img src={platform.logo} alt={platform.name} className="h-20 mx-auto mb-4" />
          <p className="text-gray-700 mb-6">{platform.description}</p>
          <button
            onClick={() => window.open(platform.link, '_blank')}
            className="bg-green-200 text-gray-800 py-2 px-4 rounded-full flex items-center justify-center hover:bg-green-300"
          >
            Details <span className="ml-2">→</span>
          </button>
        </div>
      ))}
    </div>
  );
}

export default Subscription;
