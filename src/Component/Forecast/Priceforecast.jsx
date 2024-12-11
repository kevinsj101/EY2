
// import React, { useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import priceforcast from './Data/priceforcast.json';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const PriceForecast = () => {
//   const [filtersVisible, setFiltersVisible] = useState(false);
//   const [dateRange, setDateRange] = useState({ start: '', end: '' });

//   const toggleFilters = () => setFiltersVisible(!filtersVisible);

//   // Ensure data exists and is an array
//   const validData = Array.isArray(priceforcast) ? priceforcast : [];

//   const filteredData = validData.filter((item) => {
//     if (!item || !item.Date) return false;
//     const date = new Date(item.Date);
//     const startDate = dateRange.start ? new Date(dateRange.start) : null;
//     const endDate = dateRange.end ? new Date(dateRange.end) : null;
//     return (!startDate || date >= startDate) && (!endDate || date <= endDate);
//   });

//   // Get current month's price info
//   const getCurrentMonthPriceInfo = () => {
//     if (filteredData.length === 0) return {
//       price: 0,
//       change: 0,
//       date: new Date().toLocaleDateString('en-IN')
//     };

//     const currentDate = new Date();
//     const currentMonth = currentDate.getMonth();
//     const currentYear = currentDate.getFullYear();

//     // Find the price for the current month
//     const currentMonthData = filteredData.find(item => {
//       const itemDate = new Date(item.Date);
//       return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear;
//     });

//     // If no current month data, use the latest available data
//     if (!currentMonthData) {
//       return {
//         price: filteredData[filteredData.length - 1]['Predicted Price (per tonne) in INR'] || 0,
//         change: 0,
//         date: new Date().toLocaleDateString('en-IN', {
//           year: 'numeric',
//           month: 'short',
//           day: 'numeric'
//         })
//       };
//     }

//     // Find previous month's data for comparison
//     const previousMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
//     const previousMonthData = filteredData.find(item => {
//       const itemDate = new Date(item.Date);
//       return itemDate.getMonth() === previousMonthDate.getMonth() && 
//              itemDate.getFullYear() === previousMonthDate.getFullYear();
//     });

//     const currentPrice = currentMonthData['Predicted Price (per tonne) in INR'];
//     const previousPrice = previousMonthData ? 
//       previousMonthData['Predicted Price (per tonne) in INR'] : currentPrice;
    
//     const change = previousPrice ? 
//       ((currentPrice - previousPrice) / previousPrice * 100) : 0;
    
//     return {
//       price: currentPrice || 0,
//       change: change || 0,
//       date: new Date(currentMonthData.Date).toLocaleDateString('en-IN', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric'
//       })
//     };
//   };

//   const currentMonthInfo = getCurrentMonthPriceInfo();

//   // Calculate min and max prices with null checks
//   const validPrices = filteredData
//     .map(item => item['Predicted Price (per tonne) in INR'])
//     .filter(price => typeof price === 'number' && !isNaN(price));

//   const minPrice = validPrices.length > 0 ? Math.min(...validPrices) : 0;
//   const maxPrice = validPrices.length > 0 ? Math.max(...validPrices) : 0;

//   const chartData = {
//     labels: filteredData.map((item) => {
//       const date = new Date(item.Date);
//       return date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
//     }),
//     datasets: [
//       {
//         label: 'Price Trend',
//         data: filteredData.map((item) => item['Predicted Price (per tonne) in INR'] || 0),
//         borderColor: '#0EA5E9',
//         backgroundColor: 'rgba(14, 165, 233, 0.1)',
//         fill: true,
//         tension: 0.4,
//         borderWidth: 1.5,
//         pointRadius: 0,
//         pointHoverRadius: 4,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { display: false },
//       tooltip: {
//         mode: 'index',
//         intersect: false,
//         backgroundColor: 'white',
//         titleColor: '#1F2937',
//         bodyColor: '#1F2937',
//         borderColor: '#E5E7EB',
//         borderWidth: 1,
//         padding: 12,
//         displayColors: false,
//         callbacks: {
//           label: (context) => `₹${context.raw.toFixed(2)} per tonne`,
//         },
//       },
//     },
//     scales: {
//       x: {
//         grid: { display: false },
//         ticks: { color: '#6B7280', font: { size: 11 } },
//         title: {
//           display: true,
//           text: 'Date',
//           color: '#6B7280',
//           font: { size: 12, weight: 'bold' },
//         },
//       },
//       y: {
//         grid: { color: 'rgba(229, 231, 235, 0.5)' },
//         ticks: {
//           color: '#6B7280',
//           font: { size: 11 },
//           callback: (value) => `₹${value.toFixed(2)}`,
//         },
//         min: Math.floor(minPrice - 0.5),
//         max: Math.ceil(maxPrice + 0.5),
//         title: {
//           display: true,
//           text: 'Predicted Price (per tonne) in INR (₹)',
//           color: '#6B7280',
//           font: { size: 12, weight: 'bold' },
//         },
//       },
//     },
//     interaction: {
//       mode: 'index',
//       intersect: false,
//     },
//   };
  

//   // If no data is available, show a message
//   if (filteredData.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
//         <div className="bg-white rounded-lg shadow-sm p-6 text-center">
//           <h2 className="text-lg font-semibold text-gray-900">No data available</h2>
//           <p className="text-gray-500 mt-2">Please check your data source or try adjusting the filters.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-[1920px] mx-auto space-y-6">
//         {/* Price Summary Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <div className="text-sm text-gray-500 mb-1">Current Month's Price</div>
//             <div className="text-2xl font-semibold text-gray-900">
//               ₹{currentMonthInfo.price.toFixed(2)}
//             </div>
//             <div className="text-sm text-gray-500 mt-1">{currentMonthInfo.date}</div>
//             <div className={`text-sm mt-2 ${currentMonthInfo.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
//               {currentMonthInfo.change >= 0 ? '↑' : '↓'} {Math.abs(currentMonthInfo.change).toFixed(2)}% from last month
//             </div>
//           </div>
          
//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <div className="text-sm text-gray-500 mb-1">Range</div>
//             <div className="text-lg font-semibold text-gray-900">
//               ₹{minPrice.toFixed(2)} - ₹{maxPrice.toFixed(2)}
//             </div>
//             <div className="text-sm text-gray-500 mt-1">Per tonne</div>
//           </div>

//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <div className="text-sm text-gray-500 mb-1">Average Price</div>
//             <div className="text-lg font-semibold text-gray-900">
//               ₹{(validPrices.reduce((acc, price) => acc + price, 0) / validPrices.length || 0).toFixed(2)}
//             </div>
//             <div className="text-sm text-gray-500 mt-1">Per tonne</div>
//           </div>
//         </div>

//         {/* Rest of the component remains the same */}
//         <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
//           <div className="lg:col-span-3 bg-white rounded-lg shadow-sm p-6">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-lg font-semibold text-gray-900">Price Forecast Trend</h2>
//               <div className="flex gap-2">
//                 <button
//                   onClick={toggleFilters}
//                   className="px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
//                 >
//                   Filter
//                 </button>
//               </div>
//             </div>

//             {filtersVisible && (
//               <div className="flex gap-4 mb-6 p-4 bg-gray-50 rounded-md">
//                 <div className="flex gap-4">
//                   <div>
//                     <label className="block text-sm text-gray-600 mb-1">Start Date</label>
//                     <input
//                       type="date"
//                       value={dateRange.start}
//                       onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
//                       className="px-2 py-1 border rounded-md text-sm"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm text-gray-600 mb-1">End Date</label>
//                     <input
//                       type="date"
//                       value={dateRange.end}
//                       onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
//                       className="px-2 py-1 border rounded-md text-sm"
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             <div className="h-[600px]">
//               <Line data={chartData} options={chartOptions} />
//             </div>
//           </div>

//           <div className="lg:col-span-2 bg-white rounded-lg shadow-sm overflow-hidden">
//             <div className="px-6 py-4 border-b">
//               <h3 className="text-lg font-semibold text-gray-900">Price History</h3>
//             </div>
//             <div className="overflow-y-auto" style={{ maxHeight: "600px" }}>
//               <table className="w-full">
//                 <thead className="bg-gray-50 sticky top-0">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (₹/tonne)</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {filteredData.map((item, index) => {
//                     const currentPrice = item['Predicted Price (per tonne) in INR'] || 0;
//                     const previousPrice = index > 0 ? (filteredData[index - 1]['Predicted Price (per tonne) in INR'] || 0) : currentPrice;
//                     const change = ((currentPrice - previousPrice) / previousPrice) * 100;
                    
//                     return (
//                       <tr key={index} className="hover:bg-gray-50">
//                         <td className="px-6 py-4 text-sm text-gray-900">
//                           {new Date(item.Date).toLocaleDateString('en-IN', {
//                             year: 'numeric',
//                             month: 'short',
//                             day: 'numeric'
//                           })}
//                         </td>
//                         <td className="px-6 py-4 text-sm text-gray-900">
//                           {currentPrice.toFixed(2)}
//                         </td>
//                         <td className={`px-6 py-4 text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
//                           {change >= 0 ? '+' : ''}{change.toFixed(2)}%
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PriceForecast;


// import React, { useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
// } from 'chart.js';
// import supply from './Data/priceforcast.json';

// ChartJS.register(
//   CategoryScale, 
//   LinearScale, 
//   PointElement, 
//   LineElement, 
//   Title, 
//   Tooltip, 
//   Legend,
//   Filler
// );

// const SupplyForecast = () => {
//   const [filtersVisible, setFiltersVisible] = useState(false);
//   const [dateRange, setDateRange] = useState({ start: '', end: '' });

//   const toggleFilters = () => setFiltersVisible(!filtersVisible);

//   // Ensure data exists and is an array
//   const validData = Array.isArray(supply) ? supply : [];

//   const filteredData = validData.filter((item) => {
//     if (!item || !item.Year || !item.Month) return false;
//     const date = new Date(`${item.Year}-${item.Month}-01`);
//     const startDate = dateRange.start ? new Date(dateRange.start) : null;
//     const endDate = dateRange.end ? new Date(dateRange.end) : null;
//     return (!startDate || date >= startDate) && (!endDate || date <= endDate);
//   });

//   // Get current month's supply info (unchanged from previous implementation)
//   const getCurrentMonthSupplyInfo = () => {
//     if (filteredData.length === 0) return {
//       supply: 0,
//       change: 0,
//       date: new Date().toLocaleDateString('en-IN')
//     };

//     const currentDate = new Date();
//     const currentMonth = currentDate.getMonth();
//     const currentYear = currentDate.getFullYear();

//     // Find the supply for the current month
//     const currentMonthData = filteredData.find(item => 
//       item.Year === currentYear && 
//       item.Month.toLowerCase() === new Date(currentDate.getFullYear(), currentMonth).toLocaleString('default', { month: 'short' }).toLowerCase()
//     );

//     // If no current month data, use the latest available data
//     if (!currentMonthData) {
//       return {
//         supply: filteredData[filteredData.length - 1]['Market Price (INR per quintal)'] || 0,
//         change: 0,
//         date: new Date().toLocaleDateString('en-IN', {
//           year: 'numeric',
//           month: 'short',
//           day: 'numeric'
//         })
//       };
//     }

//     // Find previous month's data for comparison
//     const previousMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
//     const previousMonthData = filteredData.find(item => 
//       item.Year === previousMonthDate.getFullYear() && 
//       item.Month.toLowerCase() === new Date(previousMonthDate.getFullYear(), previousMonthDate.getMonth()).toLocaleString('default', { month: 'short' }).toLowerCase()
//     );

//     const currentSupply = currentMonthData['Market Price (INR per quintal)'];
//     const previousSupply = previousMonthData ? previousMonthData['Market Price (INR per quintal)'] : currentSupply;
    
//     const change = previousSupply ? 
//       ((currentSupply - previousSupply) / previousSupply * 100) : 0;
    
//     return {
//       supply: currentSupply || 0,
//       change: change || 0,
//       date: `${currentMonthData.Month} ${currentMonthData.Year}`
//     };
//   };

//   const currentMonthInfo = getCurrentMonthSupplyInfo();

//   // Calculate min and max supplies with null checks
//   const validSupplies = filteredData
//     .map(item => item['Market Price (INR per quintal)'])
//     .filter(supply => typeof supply === 'number' && !isNaN(supply));

//   const minSupply = validSupplies.length > 0 ? Math.min(...validSupplies) : 0;
//   const maxSupply = validSupplies.length > 0 ? Math.max(...validSupplies) : 0;

//   const chartData = {
//     labels: filteredData.map((item) => `${item.Month.charAt(0).toUpperCase() + item.Month.slice(1)} ${item.Year}`),
//     datasets: [
//       {
//         label: 'Supply Trend',
//         data: filteredData.map((item) => item['Market Price (INR per quintal)'] || 0),
//         borderColor: '#3B82F6', // Bright blue border
//         backgroundColor: 'rgba(59, 130, 246, 0.3)', // Lighter, more transparent fill
//         fill: true, // This is key for creating an area chart
//         tension: 0.1, // Slight curve for a more modern look
//         borderWidth: 2,
//         pointRadius: 0, // Slightly larger points
//         pointHoverRadius: 6,
//         pointBackgroundColor: '#3B82F6', // Match point color to line
//         pointBorderColor: 'white', // White border for points
//         pointHoverBackgroundColor: '#2563EB', // Darker blue on hover
//         pointHoverBorderColor: 'white',
//       },
//     ],
//   };
  
  // const chartOptions = {
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   plugins: {
  //     legend: { display: false },
  //     tooltip: {
  //       mode: 'index',
  //       intersect: false,
  //       backgroundColor: 'white',
  //       titleColor: '#1F2937',
  //       bodyColor: '#1F2937',
  //       borderColor: '#3B82F6', 
  //       borderWidth: 1,
  //       padding: 12,
  //       displayColors: false,
  //       callbacks: {
  //         label: (context) => `Price: ${context.raw.toFixed(2)} Units`,
  //       },
  //     },
  //   },
  //   scales: {
  //     x: {
  //       grid: { 
  //         display: true, 
  //         color: 'rgba(59, 130, 246, 0.1)', 
  //         drawBorder: false 
  //       },
  //       ticks: { 
  //         color: '#6B7280', 
  //         font: { size: 11 },
  //         padding: 10 
  //       },
  //       title: {
  //         display: true,
  //         text: 'Forecast Period',
  //         color: 'Black',
  //         font: { size: 12, weight: 'bold' },
  //       },
  //     },
  //     y: {
  //       grid: { 
  //         color: 'rgba(59, 130, 246, 0.1)', 
  //         drawBorder: false,
  //         borderDash: [5, 5] 
  //       },
  //       ticks: {
  //         color: '#6B7280',
  //         font: { size: 11 },
  //         padding: 10, 
  //         callback: (value) => `${value.toFixed(0)}`,
  //         stepSize: 200 // Add step size for clearer intervals
  //       },
  //       min: 0, // Start from 0
  //       max: 1000, // Set max to 1000
  //       title: {
  //         display: true,
  //         text: 'Predicted Price (INR)',
  //         color: 'Black',
  //         font: { size: 12, weight: 'bold' },
  //       },
  //     },
  //   },
  //   layout: {
  //     padding: {
  //       left: 10,
  //       right: 10,
  //       top: 10,
  //       bottom: 10
  //     }
  //   },
  //   interaction: {
  //     mode: 'nearest',
  //     axis: 'x',
  //     intersect: false
  //   },
  // };
  
//   // If no data is available, show a message
//   if (filteredData.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
//         <div className="bg-white rounded-lg shadow-sm p-6 text-center">
//           <h2 className="text-lg font-semibold text-gray-900">No data available</h2>
//           <p className="text-gray-500 mt-2">Please check your data source or try adjusting the filters.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-[1920px] mx-auto space-y-6">
//         {/* Supply Summary Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <div className="text-sm text-gray-500 mb-1">Current Month's Price</div>
//             <div className="text-2xl font-semibold text-gray-900">
//               {currentMonthInfo.supply.toFixed(2)}
//             </div>
//             <div className="text-sm text-gray-500 mt-1">{currentMonthInfo.date}</div>
//             <div className={`text-sm mt-2 ${currentMonthInfo.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
//               {currentMonthInfo.change >= 0 ? '↑' : '↓'} {Math.abs(currentMonthInfo.change).toFixed(2)}% from last month
//             </div>
//           </div>
          
//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <div className="text-sm text-gray-500 mb-1">Range</div>
//             <div className="text-lg font-semibold text-gray-900">
//               {minSupply.toFixed(2)} - {maxSupply.toFixed(2)}
//             </div>
//             <div className="text-sm text-gray-500 mt-1">Price</div>
//           </div>

//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <div className="text-sm text-gray-500 mb-1">Average Price</div>
//             <div className="text-lg font-semibold text-gray-900">
//               {(validSupplies.reduce((acc, supply) => acc + supply, 0) / validSupplies.length || 0).toFixed(2)}
//             </div>
//             <div className="text-sm text-gray-500 mt-1">Per Month</div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
//           <div className="lg:col-span-3 bg-white rounded-lg shadow-sm p-6">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-lg font-semibold text-gray-900">Price Forecast Trend</h2>
//               <div className="flex gap-2">
//                 <button
//                   onClick={toggleFilters}
//                   className="px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
//                 >
//                   Filter
//                 </button>
//               </div>
//             </div>

//             {filtersVisible && (
//               <div className="flex gap-4 mb-6 p-4 bg-gray-50 rounded-md">
//                 <div className="flex gap-4">
//                   <div>
//                     <label className="block text-sm text-gray-600 mb-1">Start Date</label>
//                     <input
//                       type="month"
//                       value={dateRange.start ? dateRange.start : ''}
//                       onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
//                       className="px-2 py-1 border rounded-md text-sm"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm text-gray-600 mb-1">End Date</label>
//                     <input
//                       type="month"
//                       value={dateRange.end ? dateRange.end : ''}
//                       onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
//                       className="px-2 py-1 border rounded-md text-sm"
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             <div className="h-[600px]">
//             <Line data={chartData} options={chartOptions} />
//             </div>
//           </div>

//           <div className="lg:col-span-2 bg-white rounded-lg shadow-sm overflow-hidden">
//             <div className="px-6 py-4 border-b">
//               <h3 className="text-lg font-semibold text-gray-900">Price History</h3>
//             </div>
//             <div className="overflow-y-auto" style={{ maxHeight: "600px" }}>
//               <table className="w-full">
//                 <thead className="bg-gray-50 sticky top-0">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month/Year</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (Quintals)</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {filteredData.map((item, index) => {
//                     const currentSupply = item['Market Price (INR per quintal)'] || 0;
//                     const previousSupply = index > 0 ? (filteredData[index - 1]['Market Price (INR per quintal)'] || 0) : currentSupply;
//                     const change = ((currentSupply - previousSupply) / previousSupply) * 100;
                    
//                     return (
//                       <tr key={index} className="hover:bg-gray-50">
//                         <td className="px-6 py-4 text-sm text-gray-900">
//                           {item.Month.charAt(0).toUpperCase() + item.Month.slice(1)} {item.Year}
//                         </td>
//                         <td className="px-6 py-4 text-sm text-gray-900">
//                           {currentSupply.toFixed(2)}
//                         </td>
//                         <td className={`px-6 py-4 text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
//                           {change >= 0 ? '+' : ''}{change.toFixed(2)}%
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SupplyForecast;

import React, { useState } from "react";
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import { Line } from "react-chartjs-2";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import prices from "./Data/priceforcast.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const PriceRecommendationSpeedometer = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(null);

  // Get unique years and months from the prices data
  const availableYears = [...new Set(prices.map((item) => item.Year))].sort(
    (a, b) => b - a
  );

  const availableMonths = selectedPeriod?.year
    ? [
        ...new Set(
          prices
            .filter((item) => item.Year === selectedPeriod.year)
            .map((item) => item.Month)
        ),
      ]
    : [];

  // Calculate price change percentage
  const calculatePriceChange = (year, month) => {
    const currentPeriodData = prices.find(
      (item) =>
        item.Year === year && item.Month.toLowerCase() === month.toLowerCase()
    );

    if (!currentPeriodData) return 0;

    const currentPrice = currentPeriodData["Market Price (INR per quintal)"];

    // Find previous period data
    const currentIndex = prices.findIndex(
      (item) =>
        item.Year === year && item.Month.toLowerCase() === month.toLowerCase()
    );

    const previousMonth = currentIndex > 0 ? prices[currentIndex - 1] : null;

    if (!previousMonth) return 0;

    const previousPrice = previousMonth["Market Price (INR per quintal)"];
    return previousPrice
      ? ((currentPrice - previousPrice) / previousPrice) * 100
      : 0;
  };

  // Determine recommendation level
  const getRecommendationLevel = (changePercentage) => {
    if (changePercentage < 5) return 0; // Avoid
    if (changePercentage >= 5 && changePercentage <= 10) return 1; // Plan
    if (changePercentage > 10 && changePercentage <= 20) return 2; // Partial
    if (changePercentage > 20) return 3; // Full
    return 0;
  };

  // Speedometer data
  const speedometerData = [
    { name: "Avoid", value: 25 },
    { name: "Plan", value: 25 },
    { name: "Partial", value: 25 },
    { name: "Full", value: 25 },
  ];

  const COLORS = ["#EF4444", "#F97316", "#22C55E", "#10B981"];

  // Calculate needle rotation based on recommendation level
  const getNeedleRotation = (level) => {
    switch (level) {
      case 0:
        return -45; // Avoid
      case 1:
        return -15; // Plan
      case 2:
        return 15; // Partial
      case 3:
        return 45; // Full
      default:
        return 0;
    }
  };

  // Render active shape for the selected sector
  const renderActiveShape = (props) => {
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
    } = props;

    // Calculate label position
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius - 10}
          outerRadius={outerRadius + 20}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor="middle"
          dominantBaseline="middle"
          fontWeight="bold"
          fontSize="12px"
        >
          {payload.name}
        </text>
      </g>
    );
  };

  // Selected data handling
  const handleYearChange = (e) => {
    setSelectedPeriod({
      year: parseInt(e.target.value),
      month: "",
    });
  };

  const handleMonthChange = (e) => {
    if (selectedPeriod?.year) {
      setSelectedPeriod({
        ...selectedPeriod,
        month: e.target.value,
      });
    }
  };

  // Calculate price change and recommendation level
  const priceChange =
    selectedPeriod?.year && selectedPeriod?.month
      ? calculatePriceChange(selectedPeriod.year, selectedPeriod.month)
      : 0;
  const recommendationLevel = getRecommendationLevel(priceChange);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-full flex flex-col">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Price Recommendation Insights
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Select a year and month to get a data-driven recommendation on market positioning and trading strategy.
        </p>
      </div>

      <div className="flex gap-4 mb-4 justify-center">
        <select 
          value={selectedPeriod?.year || ''} 
          onChange={handleYearChange}
          className="px-2 py-1 border rounded-md text-sm"
        >
          <option value="">Select Year</option>
          {availableYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <select 
          value={selectedPeriod?.month || ''} 
          onChange={handleMonthChange}
          disabled={!selectedPeriod?.year}
          className="px-2 py-1 border rounded-md text-sm"
        >
          <option value="">Select Month</option>
          {availableMonths.map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>

      <div className="flex-grow relative">
        <div
          className="h-full relative"
          style={{
            width: '100%',
            height: '300px',
            position: 'relative',
          }}
        >
          {/* Recommendation Text */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
            <p className="text-sm font-medium">
              {selectedPeriod?.year && selectedPeriod?.month
                ? `Recommendation: ${speedometerData[recommendationLevel].name}`
                : 'Select Year and Month'}
            </p>
            {selectedPeriod?.year && selectedPeriod?.month && (
              <p className="text-xs text-gray-500">Price Change: {priceChange.toFixed(2)}%</p>
            )}
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={speedometerData}
                cx="50%"
                cy="70%"
                startAngle={180}
                endAngle={0}
                innerRadius="60%"
                outerRadius="80%"
                paddingAngle={0}
                dataKey="value"
                activeIndex={selectedPeriod?.year && selectedPeriod?.month ? recommendationLevel : -1}
                activeShape={renderActiveShape}
              >
                {speedometerData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Needle with Heroicon */}
          <div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 origin-bottom flex flex-col items-center"
            style={{
              top:'45%',
              transform: `translateX(-50%) rotate(${getNeedleRotation(recommendationLevel)}deg)`,
              transition: 'transform 0.5s ease-in-out',
            }}
          >
            {/* <div 
              className="w-1 bg-black h-24 relative"
              style={{
                transformOrigin: 'bottom center',
              }} 
            />
            {/* <ChevronUpIcon 
              className="text-black w-8 h-8 -mt-2" 
              style={{
                transformOrigin: 'bottom center',
              }}
            /> */}
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <div className="text-sm text-gray-600">
          <strong>How to Interpret:</strong>
          <ul className="mt-2 space-y-1 text-xs">
            <li>• Avoid (Red): Potential market downturn, consider caution</li>
            <li>• Plan (Orange): Moderate risk, strategic planning recommended</li>
            <li>• Partial (Green): Favorable conditions, consider partial investment</li>
            <li>• Full (Teal): Highly favorable, potential for full market engagement</li>
          </ul>
        </div>
      </div>
    </div>
  );
};


const PriceForecast = () => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [alertSubmitted, setAlertSubmitted] = useState(false);
  const [alertLoading, setAlertLoading] = useState(false);
  const [alertForm, setAlertForm] = useState({
    minPrice: "",
    maxPrice: "",
    email: "",
  });

  const toggleFilters = () => setFiltersVisible(!filtersVisible);

  const handleAlertSubmit = async (e) => {
    e.preventDefault();
    setAlertLoading(true);

    // Simulate API call or email sending
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setAlertLoading(false);
    setAlertSubmitted(true);

    // Optional: Reset form after 3 seconds
    setTimeout(() => {
      setAlertSubmitted(false);
      setAlertDialogOpen(false);
      setAlertForm({
        minPrice: "",
        maxPrice: "",
        email: "",
      });
    }, 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAlertForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Ensure data exists and is an array
  const validData = Array.isArray(prices) ? prices : [];

  const filteredData = validData.filter((item) => {
    if (!item || !item.Year || !item.Month) return false;
    const date = new Date(`${item.Year}-${item.Month}-01`);
    const startDate = dateRange.start ? new Date(dateRange.start) : null;
    const endDate = dateRange.end ? new Date(dateRange.end) : null;
    return (!startDate || date >= startDate) && (!endDate || date <= endDate);
  });

  // Get current month's price info
  const getCurrentMonthPriceInfo = () => {
    if (filteredData.length === 0)
      return {
        price: 0,
        change: 0,
        date: new Date().toLocaleDateString("en-IN"),
      };

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Find the price for the current month
    const currentMonthData = filteredData.find(
      (item) =>
        item.Year === currentYear &&
        item.Month.toLowerCase() ===
          new Date(currentDate.getFullYear(), currentMonth)
            .toLocaleString("default", { month: "short" })
            .toLowerCase()
    );

    // If no current month data, use the latest available data
    if (!currentMonthData) {
      return {
        price:
          filteredData[filteredData.length - 1][
            "Market Price (INR per quintal)"
          ] || 0,
        change: 0,
        date: new Date().toLocaleDateString("en-IN", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      };
    }

    // Find previous month's data for comparison
    const previousMonthDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1
    );
    const previousMonthData = filteredData.find(
      (item) =>
        item.Year === previousMonthDate.getFullYear() &&
        item.Month.toLowerCase() ===
          new Date(
            previousMonthDate.getFullYear(),
            previousMonthDate.getMonth()
          )
            .toLocaleString("default", { month: "short" })
            .toLowerCase()
    );

    const currentPrice = currentMonthData["Market Price (INR per quintal)"];
    const previousPrice = previousMonthData
      ? previousMonthData["Market Price (INR per quintal)"]
      : currentPrice;

    const change = previousPrice
      ? ((currentPrice - previousPrice) / previousPrice) * 100
      : 0;

    return {
      price: currentPrice || 0,
      change: change || 0,
      date: `${currentMonthData.Month} ${currentMonthData.Year}`,
    };
  };

  const currentMonthInfo = getCurrentMonthPriceInfo();

  // Calculate min and max prices
  const validPrices = filteredData
    .map((item) => item["Market Price (INR per quintal)"])
    .filter((price) => typeof price === "number" && !isNaN(price));

  const minPrice = validPrices.length > 0 ? Math.min(...validPrices) : 0;
  const maxPrice = validPrices.length > 0 ? Math.max(...validPrices) : 0;

  const chartData = {
    labels: filteredData.map(
      (item) =>
        `${item.Month.charAt(0).toUpperCase() + item.Month.slice(1)} ${
          item.Year
        }`
    ),
    datasets: [
      {
        label: "Price Trend",
        data: filteredData.map(
          (item) => item["Market Price (INR per quintal)"] || 0
        ),
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.3)",
        fill: true,
        tension: 0.1,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: "#3B82F6",
        pointBorderColor: "white",
        pointHoverBackgroundColor: "#2563EB",
        pointHoverBorderColor: "white",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "white",
        titleColor: "#1F2937",
        bodyColor: "#1F2937",
        borderColor: "#3B82F6",
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) => `Price: ${context.raw.toFixed(2)} Units`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: "rgba(59, 130, 246, 0.1)",
          drawBorder: false,
        },
        ticks: {
          color: "#6B7280",
          font: { size: 11 },
          padding: 10,
        },
        title: {
          display: true,
          text: "Forecast Period",
          color: "Black",
          font: { size: 12, weight: "bold" },
        },
      },
      y: {
        grid: {
          color: "rgba(59, 130, 246, 0.1)",
          drawBorder: false,
          borderDash: [5, 5],
        },
        ticks: {
          color: "#6B7280",
          font: { size: 11 },
          padding: 10,
          callback: (value) => `₹${value.toFixed(0)}`,
          stepSize: 50, // Add step size for clearer intervals
        },
        min: 250, // Start from 0
        max: 400, // Set max to 1000
        title: {
          display: true,
          text: "Predicted Price (INR)",
          color: "Black",
          font: { size: 12, weight: "bold" },
        },
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  };

  if (filteredData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-900">
            No price data available
          </h2>
          <p className="text-gray-500 mt-2">
            Please check your data source or try adjusting the filters.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1920px] mx-auto space-y-6">
        {/* Price Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm text-gray-500 mb-1">Current Price</div>
            <div className="text-2xl font-semibold text-gray-900">
              ₹{currentMonthInfo.price.toFixed(2)}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {currentMonthInfo.date}
            </div>
            <div
              className={`text-sm mt-2 ${
                currentMonthInfo.change >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {currentMonthInfo.change >= 0 ? "↑" : "↓"}{" "}
              {Math.abs(currentMonthInfo.change).toFixed(2)}% from last month
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm text-gray-500 mb-1">Price Range</div>
            <div className="text-lg font-semibold text-gray-900">
              ₹{minPrice.toFixed(2)} - ₹{maxPrice.toFixed(2)}
            </div>
            <div className="text-sm text-gray-500 mt-1">per quintal</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm text-gray-500 mb-1">Average Price</div>
            <div className="text-lg font-semibold text-gray-900">
              ₹
              {(
                validPrices.reduce((acc, price) => acc + price, 0) /
                  validPrices.length || 0
              ).toFixed(2)}
            </div>
            <div className="text-sm text-gray-500 mt-1">per quintal</div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="lg:col-span-3 bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Price Forecast Trend
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={toggleFilters}
                  className="px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Filter
                </button>
              </div>
            </div>

            {/* Price Alert  */}

            <div className="flex justify-end mb-4">
              <button
                onClick={() => setAlertDialogOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>
                Price Alert
              </button>

              {/* Dialog Overlay */}
              {alertDialogOpen && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
                  onClick={(e) => {
                    if (e.target === e.currentTarget) setAlertDialogOpen(false);
                  }}
                >
                  <div
                    className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {!alertSubmitted ? (
                      <>
                        <div className="mb-4">
                          <h2 className="text-xl font-semibold text-gray-900">
                            Set Price Alert
                          </h2>
                          <p className="text-sm text-gray-500 mt-1">
                            Get notified when prices go beyond your specified
                            range
                          </p>
                        </div>
                        <form
                          onSubmit={handleAlertSubmit}
                          className="space-y-4"
                        >
                          <div>
                            <label
                              htmlFor="minPrice"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Minimum Price
                            </label>
                            <input
                              id="minPrice"
                              name="minPrice"
                              type="number"
                              placeholder="Enter minimum price"
                              value={alertForm.minPrice}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="maxPrice"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Maximum Price
                            </label>
                            <input
                              id="maxPrice"
                              name="maxPrice"
                              type="number"
                              placeholder="Enter maximum price"
                              value={alertForm.maxPrice}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Email Address
                            </label>
                            <input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="Enter your email"
                              value={alertForm.email}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>
                          <button
                            type="submit"
                            disabled={alertLoading}
                            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                          >
                            {alertLoading && (
                              <svg
                                className="animate-spin h-5 w-5 mr-3"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                            )}
                            {alertLoading ? "Submitting..." : "Set Alert"}
                          </button>
                        </form>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <h2 className="text-2xl font-bold text-green-600 mb-4">
                          Thank You!
                        </h2>
                        <p className="text-gray-600">
                          We'll notify you at {alertForm.email} if the price
                          goes beyond ₹{alertForm.minPrice} - ₹
                          {alertForm.maxPrice}
                        </p>
                      </div>
                    )}

                    {/* Close Button */}
                    <button
                      onClick={() => setAlertDialogOpen(false)}
                      className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {filtersVisible && (
              <div className="flex gap-4 mb-6 p-4 bg-gray-50 rounded-md">
                <div className="flex gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Start Date
                    </label>
                    <input
                      type="month"
                      value={dateRange.start ? dateRange.start : ""}
                      onChange={(e) =>
                        setDateRange({ ...dateRange, start: e.target.value })
                      }
                      className="px-2 py-1 border rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      End Date
                    </label>
                    <input
                      type="month"
                      value={dateRange.end ? dateRange.end : ""}
                      onChange={(e) =>
                        setDateRange({ ...dateRange, end: e.target.value })
                      }
                      className="px-2 py-1 border rounded-md text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="h-[600px]">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
            
          <div className="lg:col-span-2 grid grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  Price History
                </h3>
              </div>
              <div className="overflow-y-auto" style={{ maxHeight: "500px" }}>
                <table className="w-full">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Month/Year
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price (₹/quintal)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Change
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredData.map((item, index) => {
                      const currentPrice =
                        item["Market Price (INR per quintal)"] || 0;
                      const previousPrice =
                        index > 0
                          ? filteredData[index - 1][
                              "Market Price (INR per quintal)"
                            ] || 0
                          : currentPrice;
                      const change =
                        ((currentPrice - previousPrice) / previousPrice) * 100;

                      return (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {item.Month.charAt(0).toUpperCase() +
                              item.Month.slice(1)}{" "}
                            {item.Year}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            ₹{currentPrice.toFixed(2)}
                          </td>
                          <td
                            className={`px-6 py-4 text-sm ${
                              change >= 0 ? "text-green-500" : "text-red-500"
                            }`}
                          >
                            {change >= 0 ? "+" : ""}
                            {change.toFixed(2)}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <PriceRecommendationSpeedometer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceForecast;