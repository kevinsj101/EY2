import React from "react";
import img1 from "./Images/img1.png";
import img2 from "./Images/img2.png";
import img3 from "./Images/img3.png";
const Card = ({ image, description, link }) => (
  <div className="border rounded-lg p-4 m-4 max-w-xs flex flex-col items-center z-10 border-black bg-white">
    <img src={image} alt="Platform Logo" className="h-32 mb-4" />
    <p className="text-center text-sm text-gray-700 mb-4">{description}</p>
    <a href={link} target="_blank" rel="noopener noreferrer">
      <button className="bg-green-200 text-green-800 font-semibold px-4 py-2 rounded-full flex items-center">
        Details
        <span className="ml-2">→</span>
      </button>
    </a>
  </div>
);

const CardList = () => {
  const data = [
    {
      image: img2,
      description: "Agricultural Commodity Production Forecast",
      link: "https://data.gov.in",
    },
    {
      image: img1,
      description: "Agricultural Commodity Production Forecast",
      link: "https://agmarknet.gov.in",
    },
    {
      image: img3,
      description: "Agricultural Commodity Production Forecast",
      link: "https://icar.org.in",
    },
  ];

  return (
    <div className="flex justify-center">
      {data.map((item, index) => (
        <Card
          key={index}
          image={item.image}
          description={item.description}
          link={item.link}
        />
      ))}
    </div>
  );
};

export default CardList;

// import React, { useState } from 'react';
// import { X, ChevronDown, ChevronUp, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import img1 from "./Images/img1.png";
// import img2 from "./Images/img2.png";
// import img3 from "./Images/img3.png";

// const Modal = ({ isOpen, onClose, title, productionData, platformData }) => {
//   const [activeTab, setActiveTab] = useState('production');
//   const [expandedYears, setExpandedYears] = useState({});

//   if (!isOpen) return null;

//   // Group production data by year
//   const yearGroupedData = productionData.reduce((acc, item) => {
//     if (!acc[item.Year]) acc[item.Year] = [];
//     acc[item.Year].push(item);
//     return acc;
//   }, {});

//   const toggleYearExpansion = (year) => {
//     setExpandedYears(prev => ({
//       ...prev,
//       [year]: !prev[year]
//     }));
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//       <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-auto">
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-800">{title} Production & Pricing</h2>
//             <button 
//               onClick={onClose} 
//               className="text-gray-600 hover:text-gray-900 transition-colors"
//             >
//               <X size={24} />
//             </button>
//           </div>

//           {/* Tabs */}
//           <div className="flex mb-6 border-b">
//             <button 
//               className={`px-4 py-2 ${activeTab === 'production' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
//               onClick={() => setActiveTab('production')}
//             >
//               Production Data
//             </button>
//             <button 
//               className={`px-4 py-2 ${activeTab === 'pricing' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
//               onClick={() => setActiveTab('pricing')}
//             >
//               Pricing
//             </button>
//           </div>

//           {activeTab === 'production' && (
//             <div>
//               {/* Production Chart */}
//               <div className="h-96 w-full mb-6">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart data={productionData}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="Month" />
//                     <YAxis label={{ value: 'Production', angle: -90, position: 'insideLeft' }} />
//                     <Tooltip />
//                     <Legend />
//                     <Line type="monotone" dataKey="Predicted_Production" stroke="#8884d8" activeDot={{ r: 8 }} />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>

//               {/* Detailed Data Table */}
//               <div className="overflow-x-auto">
//                 {Object.entries(yearGroupedData).map(([year, data]) => (
//                   <div key={year} className="mb-4">
//                     <div 
//                       onClick={() => toggleYearExpansion(year)}
//                       className="flex justify-between items-center bg-gray-100 p-3 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
//                     >
//                       <h3 className="font-semibold text-gray-700">Year {year}</h3>
//                       {expandedYears[year] ? <ChevronUp /> : <ChevronDown />}
//                     </div>
//                     {expandedYears[year] && (
//                       <table className="w-full border-collapse mt-2">
//                         <thead>
//                           <tr className="bg-gray-50">
//                             <th className="p-2 border text-left">Month</th>
//                             <th className="p-2 border text-right">Predicted Production</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {data.map((item, index) => (
//                             <tr key={index} className="hover:bg-gray-100">
//                               <td className="p-2 border capitalize">{item.Month}</td>
//                               <td className="p-2 border text-right">{item.Predicted_Production.toFixed(2)}</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {activeTab === 'pricing' && (
//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="bg-gray-50 p-6 rounded-lg">
//                 <h3 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
//                   <DollarSign className="mr-3 text-green-600" />
//                   Current Pricing
//                 </h3>
//                 {platformData.pricing.map((priceItem, index) => (
//                   <div key={index} className="mb-3 border-b pb-3 last:border-b-0">
//                     <div className="flex justify-between items-center">
//                       <p className="text-gray-600 font-medium">{priceItem.type}</p>
//                       <div className="flex items-center">
//                         <span className="text-gray-800 font-bold mr-2">₹{priceItem.value}</span>
//                         {priceItem.trend === 'up' ? (
//                           <TrendingUp className="text-green-600" size={20} />
//                         ) : (
//                           <TrendingDown className="text-red-600" size={20} />
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <div className="bg-gray-50 p-6 rounded-lg">
//                 <h3 className="text-xl font-semibold mb-4 text-gray-700">
//                   Price Forecast
//                 </h3>
//                 <div className="text-center">
//                   <p className="text-gray-600 mb-2">Projected Price Range</p>
//                   <p className="text-2xl font-bold text-blue-600">
//                     ₹{platformData.priceForecast.min} - ₹{platformData.priceForecast.max}
//                   </p>
//                   <p className="text-sm text-gray-500 mt-2">
//                     {platformData.priceForecast.period} Forecast
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const Card = ({ image, title, description, productionData, platformData }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <>
//       <div className="border border-gray-300 rounded-lg p-4 m-4 max-w-xs flex flex-col items-center shadow-md hover:shadow-lg transition-shadow">
//         <img src={image} alt={title} className="h-32 mb-4 object-contain" />
//         <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
//         <p className="text-center text-sm text-gray-600 mb-4">{description}</p>
//         <button 
//           onClick={() => setIsModalOpen(true)}
//           className="bg-green-200 text-green-800 font-semibold px-4 py-2 rounded-full flex items-center hover:bg-green-300 transition-colors"
//         >
//           View Details
//           <span className="ml-2">→</span>
//         </button>
//       </div>

//       <Modal 
//         isOpen={isModalOpen} 
//         onClose={() => setIsModalOpen(false)}
//         title={title}
//         productionData={productionData}
//         platformData={platformData}
//       />
//     </>
//   );
// };

// const CardList = () => {
//   const data = [
//     {
//       image: img2,
//       title: "Data Gov.in",
//       description: "Agricultural Commodity Production Forecast",
//       productionData: [
//         {"Year": 2023, "Month": "jul", "Predicted_Production": 2875.93},
//         {"Year": 2023, "Month": "aug", "Predicted_Production": 1421.01},
//         {"Year": 2023, "Month": "sep", "Predicted_Production": 2450.01},
//         {"Year": 2023, "Month": "oct", "Predicted_Production": 4902.89},
//         {"Year": 2023, "Month": "nov", "Predicted_Production": 3174.03},
//         {"Year": 2023, "Month": "dec", "Predicted_Production": 3476.29},
//         {"Year": 2024, "Month": "jan", "Predicted_Production": 4650},
//         {"Year": 2024, "Month": "feb", "Predicted_Production": 3800.25},
//         {"Year": 2024, "Month": "mar", "Predicted_Production": 2350.1},
//         {"Year": 2024, "Month": "apr", "Predicted_Production": 1805.78},
//         {"Year": 2024, "Month": "may", "Predicted_Production": 2150.63},
//         {"Year": 2024, "Month": "jun", "Predicted_Production": 2205.94},
//         {"Year": 2024, "Month": "jul", "Predicted_Production": 1268.34},
//         {"Year": 2024, "Month": "aug", "Predicted_Production": 1803.45},
//         {"Year": 2024, "Month": "sep", "Predicted_Production": 1100.21},
//         {"Year": 2024, "Month": "oct", "Predicted_Production": 3650.67},
//         {"Year": 2024, "Month": "nov", "Predicted_Production": 4332.41},
//         {"Year": 2024, "Month": "dec", "Predicted_Production": 3995.29},
//         {"Year": 2025, "Month": "jan", "Predicted_Production": 3797.310302734375},
//         {"Year": 2025, "Month": "feb", "Predicted_Production": 3722.768310546875}
//       ],
//       platformData: {
//         pricing: [
//           { type: "Current Market Price", value: 2450.50, trend: "up" },
//           { type: "Minimum Support Price", value: 2200.75, trend: "down" }
//         ],
//         priceForecast: {
//           min: 2300,
//           max: 2600,
//           period: "Next 6 Months"
//         }
//       }
//     },
//     {
//       image: img1,
//       title: "AGMARKNET",
//       description: "Agricultural Commodity Production Forecast",
//       productionData: [
//         {"Year": 2023, "Month": "jul", "Predicted_Production": 3200.45},
//         {"Year": 2023, "Month": "aug", "Predicted_Production": 1600.23},
//         // Similar structure to wheat production data
//         {"Year": 2025, "Month": "jan", "Predicted_Production": 4100.310302734375},
//         {"Year": 2025, "Month": "feb", "Predicted_Production": 3850.768310546875}
//       ],
//       platformData: {
//         pricing: [
//           { type: "Current Market Price", value: 2650.25, trend: "up" },
//           { type: "Minimum Support Price", value: 2400.50, trend: "up" }
//         ],
//         priceForecast: {
//           min: 2500,
//           max: 2800,
//           period: "Next 6 Months"
//         }
//       }
//     },
//     {
//       image: img3,
//       title: "ICAR",
//       description: "Agricultural Commodity Production Forecast",
//       productionData: [
//         {"Year": 2023, "Month": "jul", "Predicted_Production": 2600.78},
//         {"Year": 2023, "Month": "aug", "Predicted_Production": 1300.45},
//         // Similar structure to wheat production data
//         {"Year": 2025, "Month": "jan", "Predicted_Production": 3500.310302734375},
//         {"Year": 2025, "Month": "feb", "Predicted_Production": 3250.768310546875}
//       ],
//       platformData: {
//         pricing: [
//           { type: "Current Market Price", value: 2250.75, trend: "down" },
//           { type: "Minimum Support Price", value: 2000.25, trend: "up" }
//         ],
//         priceForecast: {
//           min: 2100,
//           max: 2400,
//           period: "Next 6 Months"
//         }
//       }
//     }
//   ];

//   return (
//     <div className="flex justify-center flex-wrap">
//       {data.map((item, index) => (
//         <Card
//           key={index}
//           image={item.image}
//           title={item.title}
//           description={item.description}
//           productionData={item.productionData}
//           platformData={item.platformData}
//         />
//       ))}
//     </div>
//   );
// };

// export default CardList;