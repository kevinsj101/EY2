// import React from 'react';
// import { ChartBarSquareIcon, ArrowTrendingUpIcon, ShieldCheckIcon, BellAlertIcon } from '@heroicons/react/24/outline';

// function MintecAnalytics() {
//   return (
//     <div
//       className="min-h-screen flex flex-col items-center justify-center p-4 bg-cover bg-center"
//       style={{
//         backgroundImage: `url('https://images.pexels.com/photos/1796698/pexels-photo-1796698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`
//       }}
//     >
//       <div className="bg-white bg-opacity-40 p-8 shadow-lg backdrop-filter backdrop-blur-lg rounded-lg w-full max-w-4xl">
//         <h1 className="text-3xl font-semibold text-gray-800 text-center mb-10">Solutions</h1>

//         <div className="grid grid-cols-2 gap-10">
//           {/* Forecasts */}
//           <div className="flex flex-col items-center space-y-4">
//             <div className="bg-white bg-opacity-50 rounded-full p-4 shadow-lg backdrop-filter backdrop-blur-md">
//               <ChartBarSquareIcon className="h-10 w-10 text-blue-500" />
//             </div>
//             <button className="bg-white bg-opacity-40 py-2 px-6 rounded-full shadow-md text-lg font-medium text-gray-800 hover:bg-blue-100">
//               FORECASTS
//             </button>
//           </div>

//           {/* Price Change */}
//           <div className="flex flex-col items-center space-y-4">
//             <div className="bg-white bg-opacity-50 rounded-full p-4 shadow-lg backdrop-filter backdrop-blur-md">
//               <ArrowTrendingUpIcon className="h-10 w-10 text-blue-500" />
//             </div>
//             <button className="bg-white bg-opacity-40 py-2 px-6 rounded-full shadow-md text-lg font-medium text-gray-800 hover:bg-blue-100">
//               PRICE CHANGE
//             </button>
//           </div>

//           {/* Price Risk */}
//           <div className="flex flex-col items-center space-y-4">
//             <div className="bg-white bg-opacity-50 rounded-full p-4 shadow-lg backdrop-filter backdrop-blur-md">
//               <ShieldCheckIcon className="h-10 w-10 text-blue-500" />
//             </div>
//             <button className="bg-white bg-opacity-40 py-2 px-6 rounded-full shadow-md text-lg font-medium text-gray-800 hover:bg-blue-100">
//               PRICE RISK
//             </button>
//           </div>

//           {/* Price Alert */}
//           <div className="flex flex-col items-center space-y-4">
//             <div className="bg-white bg-opacity-50 rounded-full p-4 shadow-lg backdrop-filter backdrop-blur-md">
//               <BellAlertIcon className="h-10 w-10 text-blue-500" />
//             </div>
//             <button className="bg-white bg-opacity-40 py-2 px-6 rounded-full shadow-md text-lg font-medium text-gray-800 hover:bg-blue-100">
//               PRICE ALERT
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MintecAnalytics;

import React from 'react';
import { ChartBarSquareIcon, ArrowTrendingUpIcon, ShieldCheckIcon, BellAlertIcon,ArrowTrendingDownIcon,CircleStackIcon} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

function MintecAnalytics() {
  const navigate = useNavigate();

  // Navigation handlers for each button
  const handleForecastClick = () => {
    navigate('/forecast');
  };

  const handlePriceChangeClick = () => {
    navigate('/price-change'); // Add this route if it exists
  };

  const handlePriceRiskClick = () => {
    navigate('/price-risk'); // Add this route if it exists
  };

  const handlePriceAlertClick = () => {
    navigate('/price-alert'); // Add this route if it exists
  };

  const handlevendorRiskClick = () => {
    navigate('/vendor-risk'); // Add this route if it exists
  };

  const handlecategoryRiskClick = () => {
    navigate('/category-risk'); // Add this route if it exists
  };


  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-cover bg-cente bg-blackr"
    >
      <div className="bg-white bg-opacity-40 p-8 shadow-lg backdrop-filter backdrop-blur-lg rounded-lg w-full max-w-4xl">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-10">Solutions</h1>

        <div className="grid grid-cols-5 gap-10">

          {/* Price Change */}
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-white bg-opacity-50 rounded-full p-4 shadow-lg backdrop-filter backdrop-blur-md">
              <CircleStackIcon className="h-10 w-10 text-blue-500" />
            </div>
            <button
              className="bg-white bg-opacity-40 py-2 px-6 rounded-full shadow-md text-lg font-medium text-gray-800 hover:bg-blue-100  nowrap"
              onClick={handlePriceRiskClick}
            >
              Summary
            </button>
          </div>
          

          {/* Price Risk */}
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-white bg-opacity-50 rounded-full p-4 shadow-lg backdrop-filter backdrop-blur-md">
              <ArrowTrendingUpIcon className="h-10 w-10 text-blue-500" />
            </div>
            <button
              className="bg-white bg-opacity-40 py-2 px-6 rounded-full shadow-md text-lg font-medium text-gray-800 hover:bg-blue-100"
              onClick={handlePriceChangeClick}
            >
              Price Risk
            </button>
          </div>

          {/* Vendor Risk */}
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-white bg-opacity-50 rounded-full p-4 shadow-lg backdrop-filter backdrop-blur-md">
              <ShieldCheckIcon className="h-10 w-10 text-blue-500" />
            </div>
            <button
              className="bg-white bg-opacity-40 py-2 px-6 rounded-full shadow-md text-lg font-medium text-gray-800 hover:bg-blue-100  nowrap"
              onClick={handlevendorRiskClick}
            >
              Vendor Risk
            </button>
          </div>


          {/* Forecasts */}
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-white bg-opacity-50 rounded-full p-4 shadow-lg backdrop-filter backdrop-blur-md">
              <ArrowTrendingDownIcon className="h-10 w-10 text-blue-500" />
            </div>
            <button
              className="bg-white bg-opacity-40 py-2 px-6 rounded-full shadow-md text-lg font-medium text-gray-800 hover:bg-blue-100"
              onClick={handleForecastClick}
            >
              FORECASTS
            </button>
          </div>

          {/* Category Analysis */}
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-white bg-opacity-50 rounded-full p-4 shadow-lg backdrop-filter backdrop-blur-md">
              <ChartBarSquareIcon className="h-10 w-10 text-blue-500" />
            </div>
            <button
              className="bg-white bg-opacity-40 py-2 px-6 rounded-full shadow-md text-lg font-medium text-gray-800 hover:bg-blue-100"
              onClick={handlecategoryRiskClick}
            >
              Category Analysis
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default MintecAnalytics;
