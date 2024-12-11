// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Forecast = () => {
//   const navigate = useNavigate();

//   // Navigation handlers for each option
//   const handlePriceForecastClick = () => navigate('/price-forecast');
//   const handleSupplyForecastClick = () => navigate('/supply-forecast');
//   const handleConsumptionForecastClick = () => navigate('/consumption-forecast');
//   const handleWeatherForecastClick = () => navigate('/weather-forecast');

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
//       {/* Glassmorphism container */}
//       <div className="grid grid-cols-2 gap-8 max-w-xl w-full p-8 bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg border border-white border-opacity-30">
        
//         {/* Price Forecast */}
//         <button
//           onClick={handlePriceForecastClick}
//           className="p-6 bg-white bg-opacity-40 rounded-lg shadow-md flex items-center justify-center hover:bg-blue-100 transition backdrop-blur-sm"
//         >
//           <span className="text-xl font-semibold text-gray-700">Price Forecast</span>
//         </button>
        
//         {/* Supply Forecast */}
//         <button
//           onClick={handleSupplyForecastClick}
//           className="p-6 bg-white bg-opacity-40 rounded-lg shadow-md flex items-center justify-center hover:bg-blue-100 transition backdrop-blur-sm"
//         >
//           <span className="text-xl font-semibold text-gray-700">Supply Forecast</span>
//         </button>

//         {/* Consumption Forecast */}
//         <button
//           onClick={handleConsumptionForecastClick}
//           className="p-6 bg-white bg-opacity-40 rounded-lg shadow-md flex items-center justify-center hover:bg-blue-100 transition backdrop-blur-sm"
//         >
//           <span className="text-xl font-semibold text-gray-700">Consumption Forecast</span>
//         </button>
        
//         {/* Weather Forecast */}
//         <button
//           onClick={handleWeatherForecastClick}
//           className="p-6 bg-white bg-opacity-40 rounded-lg shadow-md flex items-center justify-center hover:bg-blue-100 transition backdrop-blur-sm"
//         >
//           <span className="text-xl font-semibold text-gray-700">Weather Forecast</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Forecast;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChartBarSquareIcon, 
  TruckIcon, 
  PresentationChartLineIcon 
} from '@heroicons/react/24/outline';

const ForecastButton = ({ icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="p-6 bg-white bg-opacity-40 rounded-lg shadow-md flex flex-col items-center justify-center hover:bg-blue-100 transition backdrop-blur-sm"
    aria-label={label}
  >
    <Icon className="h-12 w-12 text-gray-700 mb-2" />
    <span className="text-xl font-semibold text-gray-700">{label}</span>
  </button>
);

const Forecast = () => {
  const navigate = useNavigate();

  return (
    <div  className="min-h-screen flex flex-col items-center justify-center p-4 bg-cover bg-center"
    style={{
      backgroundImage: `url('https://images.pexels.com/photos/1796698/pexels-photo-1796698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`
    }}>
      <div className="grid grid-cols-3 gap-8 max-w-3xl w-full p-8 bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg border border-white border-opacity-30">
        
        {/* Price Forecast */}
        <ForecastButton 
          icon={ChartBarSquareIcon} 
          label="Price Forecast" 
          onClick={() => navigate('/price-forecast')} 
        />
        
        {/* Supply Forecast */}
        <ForecastButton 
          icon={TruckIcon} 
          label="Supply Forecast" 
          onClick={() => navigate('/supply-forecast')} 
        />

        {/* Consumption Forecast */}
        <ForecastButton 
          icon={PresentationChartLineIcon} 
          label="Consumption Forecast" 
          onClick={() => navigate('/consumption-forecast')} 
        />
        
      </div>
    </div>
  );
};

export default Forecast;
