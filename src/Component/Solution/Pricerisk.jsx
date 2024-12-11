// import React, { useState } from 'react';
// import pricer from './Data/pricer.json';
// import consumptionForecast from './Data/consumptionforcast.json';
// import supplyForecast from './Data/supplyforcast.json';
// import priceForecast from './Data/priceforcast.json';

// function Pricerisk() {
//   const [selectedProduct, setSelectedProduct] = useState(pricer[0]['Product ID']);
//   const [selectedMonth, setSelectedMonth] = useState(pricer[0].Month);
//   const [activeTab, setActiveTab] = useState('Bids');

//   // Get unique products from the pricer data
//   const uniqueProducts = [...new Set(pricer.map(item => item['Product ID']))];

//   // Get unique months from the pricer data
//   const uniqueMonths = [...new Set(pricer.map(item => item.Month))];

//   // Filter data based on product and month
//   const filteredBids = pricer.filter(item => 
//     item['Product ID'] === selectedProduct && 
//     item.Month === selectedMonth && 
//     item['Bid Status'] === 'Bid Accepted'
//   );


//   //Supply forecast 
//   const [fromYear, setFromYear] = useState(2024); // Default from year
//   const [toYear, setToYear] = useState(2025); // Default to year (can be adjusted dynamically)

//   // Restrict years to 2023-2026 and filter based on the selected year range
//   const filteredForecast = supplyForecast.filter(
//     (item) => item.Year >= fromYear && item.Year <= toYear
//   );

//   // Define the months from July to December
//   const monthsFromJulyToDec = ['28-Jul', '28-Aug', '28-Sep', '28-Oct', '28-Nov', '28-Dec'];

//   // Filter consumption data for months from July to December and selected product
//   const filteredConsumptionForecast = consumptionForecast.filter(item => 
//     monthsFromJulyToDec.includes(item.Month) &&
//     (item['P1Consumption(quintal)'] || item['P2Consumption(quintal)'] || item['P3Consumption(quintal)'])
//   );

//   // Render tabs
//   const renderTabs = () => {
//     const tabs = [
//       'Bids', 
//       'Consumption Forecast', 
//       'Supply Forecast', 
//       'Price Forecast'
//     ];

//     return (
//       <div className="flex border-b mb-4 bg-white">
//         {tabs.map(tab => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-4 py-2 font-semibold ${activeTab === tab ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>
//     );
//   };

//   // Render bids section
//   const renderBidsSection = () => {
//     return (
//       <div className="bg-white p-4 rounded-lg">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold text-gray-800">Accepted Bids</h1>
          
//           <div className="flex space-x-4">
//             {/* Product Filter Dropdown */}
//             <div className="relative">
//               <select
//                 value={selectedProduct}
//                 onChange={(e) => setSelectedProduct(e.target.value)}
//                 className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 {uniqueProducts.map(product => (
//                   <option key={product} value={product}>
//                     {product}
//                   </option>
//                 ))}
//               </select>
//             </div>
    
//             {/* Month Filter Dropdown */}
//             <div className="relative">
//               <select
//                 value={selectedMonth}
//                 onChange={(e) => setSelectedMonth(e.target.value)}
//                 className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 {uniqueMonths.map(month => (
//                   <option key={month} value={month}>
//                     {month}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>
    
//         {filteredBids.length === 0 ? (
//           <div className="text-center text-gray-600 text-xl py-10">
//             No accepted bids for {selectedProduct} in {selectedMonth}.
//           </div>
//         ) : (
//           <div className="grid grid-cols-3 gap-6">
//             {filteredBids.map((item, index) => (
//               <div 
//                 key={index} 
//                 className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-green-100 p-4 w-full"
//               >
//                 {/* Vendor ID */}
//                 <div className="bg-green-50 p-4 border-b border-green-100 rounded-t-lg mb-3">
//                   <h2 className="text-lg font-bold text-green-800">Vendor ID: {item['Vendor ID']}</h2>
//                   <p className="text-xs text-gray-500">Month: {item.Month}</p>
//                 </div>
//                 {/* Data Boxes */}
//                 <div className="space-y-4">
//                   <div className="flex justify-between p-3 border border-gray-200 rounded-lg">
//                     <span className="text-gray-600">Vendor Address: </span>
//                     <span className="text-gray-800">{item['Vendor Address']}</span>
//                   </div>
//                   <div className="flex justify-between p-3 border border-gray-200 rounded-lg">
//                     <span className="text-gray-600">Quoted Price: </span>
//                     <span className="text-blue-600">₹{item['Quoted Price(INR)'].toLocaleString()}</span>
//                   </div>
//                   <div className="flex justify-between p-3 border border-gray-200 rounded-lg">
//                     <span className="text-gray-600">Consumption: </span>
//                     <span className="text-gray-800">{item['Consumption(Quintal)']} Quintals</span>
//                   </div>
//                   <div className="flex justify-between p-3 border border-gray-200 rounded-lg">
//                     <span className="text-gray-600">Highest Market Price: </span>
//                     <span className="text-green-600">₹{item['Highest Market Price(INR)'].toLocaleString()}</span>
//                   </div>
//                   <div className="flex justify-between p-3 border border-gray-200 rounded-lg">
//                     <span className="text-gray-600">Lowest Market Price: </span>
//                     <span className="text-red-600">₹{item['Lowest Market Price(INR)'].toLocaleString()}</span>
//                   </div>
//                   <div className="flex justify-between p-3 border border-gray-200 rounded-lg">
//                     <span className="text-gray-600">Current Cost to Client: </span>
//                     <span className="text-gray-800">₹{item['Current Cost to Client(INR)'].toLocaleString()}</span>
//                   </div>
//                   <div className="flex justify-between p-3 border border-gray-200 rounded-lg">
//                     <span className="text-gray-600">% Diff Highest Market: </span>
//                     <span className={item['Percentage Diff Highest Market'] >= 0 ? 'text-green-600' : 'text-red-600'}>
//                       {item['Percentage Diff Highest Market'].toFixed(2)}%
//                     </span>
//                   </div>
//                   <div className="flex justify-between p-3 border border-gray-200 rounded-lg">
//                     <span className="text-gray-600">% Diff Lowest Market: </span>
//                     <span className={item['Percentage Diff Lowest Market'] >= 0 ? 'text-green-600' : 'text-red-600'}>
//                       {item['Percentage Diff Lowest Market'].toFixed(2)}%
//                     </span>
//                   </div>
//                   <div className="flex justify-between p-3 border border-gray-200 rounded-lg">
//                     <span className="text-gray-600">Bid Status: </span>
//                     <span className="text-green-600">{item['Bid Status']}</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };
  

//     // Render consumption forecast section
//       // Render consumption forecast section
//   const renderConsumptionForecastSection = () => {
//     return (
//       <div className="bg-white p-4 rounded-lg">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold text-gray-800">Consumption Forecast</h1>
//           <div className="flex space-x-4">
//             {/* Product Filter Dropdown */}
//             <div className="relative">
//               <select
//                 value={selectedProduct}
//                 onChange={(e) => setSelectedProduct(e.target.value)}
//                 className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 {uniqueProducts.map(product => (
//                   <option key={product} value={product}>
//                     {product}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {filteredConsumptionForecast.length === 0 ? (
//           <div className="text-center text-gray-600 text-xl py-10">
//             No consumption forecast data for {selectedProduct} from the last six months starting from July.
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredConsumptionForecast.map((item, index) => (
//               <div key={index} className="bg-white rounded-lg shadow-md p-4 border">
//                 <h3 className="text-lg font-bold mb-4 text-blue-700">Consumption Forecast</h3>
//                 {Object.entries(item).map(([key, value]) => (
//                   <div key={key} className="flex justify-between mb-2 border-b pb-1">
//                     <span className="text-gray-600">{key}:</span>
//                     <span className="font-semibold">{value}</span>
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   const renderSupplyForecastSection = () => {
//     return (
//       <div className="bg-white p-4 rounded-lg">
//         {/* Year Range Filter Section */}
//         <div className="mb-6 flex gap-4 items-center">
//           <label className="flex items-center">
//             From Year:
//             <select
//               value={fromYear}
//               onChange={(e) => setFromYear(parseInt(e.target.value))}
//               className="ml-2 border px-2 py-1 rounded"
//             >
//               {[2023, 2024, 2025, 2026].map((year) => (
//                 <option key={year} value={year}>
//                   {year}
//                 </option>
//               ))}
//             </select>
//           </label>
          
//           <label className="flex items-center">
//             To Year:
//             <select
//               value={toYear}
//               onChange={(e) => setToYear(parseInt(e.target.value))}
//               className="ml-2 border px-2 py-1 rounded"
//             >
//               {[2023, 2024, 2025, 2026].map((year) => (
//                 <option key={year} value={year}>
//                   {year}
//                 </option>
//               ))}
//             </select>
//           </label>
//         </div>

//         {/* Calendar Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredForecast.length > 0 ? (
//             filteredForecast.map((item, index) => (
//               <div key={index} className="bg-white rounded-lg shadow-md p-4 border">
//                 <h3 className="text-lg font-bold mb-4 text-green-700">
//                   Supply Forecast
//                 </h3>
//                 <div className="flex justify-between mb-2 border-b pb-1">
//                   <span className="text-gray-600">Year:</span>
//                   <span className="font-semibold">{item.Year}</span>
//                 </div>
//                 <div className="flex justify-between mb-2 border-b pb-1">
//                   <span className="text-gray-600">Month:</span>
//                   <span className="font-semibold">
//                     {item.Month.charAt(0).toUpperCase() + item.Month.slice(1)}
//                   </span>
//                 </div>
//                 <div className="flex justify-between mb-2 border-b pb-1">
//                   <span className="text-gray-600">Predicted Production:</span>
//                   <span className="font-semibold">{item.Predicted_Production}</span>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500 col-span-full">
//               No data available for the selected year range.
//             </p>
//           )}
//         </div>
//       </div>
//     );
//   };

//   const renderPriceForecastSection = () => {
//     return (
//       <div className="bg-white p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {priceForecast.map((item, index) => (
//           <div key={index} className="bg-white rounded-lg shadow-md p-4 border">
//             <h3 className="text-lg font-bold mb-4 text-purple-700">Price Forecast</h3>
//             {Object.entries(item).map(([key, value]) => (
//               <div key={key} className="flex justify-between mb-2 border-b pb-1">
//                 <span className="text-gray-600">{key}:</span>
//                 <span className="font-semibold">{value}</span>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   // Render active section based on selected tab
//   const renderActiveSection = () => {
//     switch (activeTab) {
//       case 'Bids':
//         return renderBidsSection();
//       case 'Consumption Forecast':
//         return renderConsumptionForecastSection();
//       case 'Supply Forecast':
//         return renderSupplyForecastSection();
//       case 'Price Forecast':
//         return renderPriceForecastSection();
//       default:
//         return renderBidsSection();
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-6 bg-white min-h-screen">
//       {renderTabs()}
//       {renderActiveSection()}
//     </div>
//   );
// }

// export default Pricerisk




// import React, { useState, useMemo } from 'react';
// import pricer from './Data/pricer.json';
// import consumptionForecast from './Data/consumptionforcast.json';
// import supplyForecast from './Data/supplyforcast.json';
// import priceForecast from './Data/priceforcast.json';

// function Pricerisk() {
//   const [selectedOption, setSelectedOption] = useState('');
//   const [selectedMonth, setSelectedMonth] = useState('');
//   const [selectedProduct, setSelectedProduct] = useState('');
//   const [selectedConsumptionProduct, setSelectedConsumptionProduct] = useState('');
//   const [selectedSupplyStartYear, setSelectedSupplyStartYear] = useState(2024);
//   const [selectedSupplyEndYear, setSelectedSupplyEndYear] = useState(2025);
//   const [selectedSupplyPeriod, setSelectedSupplyPeriod] = useState('');
//   const [selectedPriceStartYear, setSelectedPriceStartYear] = useState(2024);
//   const [selectedPriceEndYear, setSelectedPriceEndYear] = useState(2025);
//   const [selectedPricePeriod, setSelectedPricePeriod] = useState('');

//   const analysisOptions = [
//     'Bids', 
//     'Consumption Forecast', 
//     'Supply Forecast', 
//     'Price Forecast'
//   ];

//   // Dynamic extraction of unique years and periods
//   const uniqueSupplyYears = useMemo(() => {
//     return [...new Set(supplyForecast.map(item => item.Year))].sort();
//   }, []);

//   const uniqueSupplyPeriods = useMemo(() => {
//     return [...new Set(supplyForecast.map(item => item.Month))].sort();
//   }, []);

//   const uniquePriceYears = useMemo(() => {
//     return [...new Set(priceForecast.map(item => item.Year))].sort();
//   }, []);

//   const uniquePricePeriods = useMemo(() => {
//     return [...new Set(priceForecast.map(item => item.Month))].sort();
//   }, []);

//  // Dynamic product extraction for Consumption Forecast
//  const uniqueConsumptionProducts = useMemo(() => {
//   return Object.keys(consumptionForecast[0])
//     .filter(key => key.startsWith('P') && key.endsWith('Consumption(quintal)'))
//     .map(key => key.replace('Consumption(quintal)', ''));
// }, []);

// const uniqueMonths = [...new Set(pricer.map(item => item.Month))];
// const uniqueProducts = [...new Set(pricer.map(item => item['Product ID']))];

// const getFilteredData = useMemo(() => {
//   if (selectedOption === 'Bids') {
//     return pricer.filter(item => 
//       item['Bid Status'] === 'Bid Accepted' &&
//       selectedMonth && 
//       selectedProduct &&
//       item.Month === selectedMonth &&
//       item['Product ID'] === selectedProduct
//     );
//   }

//   if (selectedOption === 'Consumption Forecast') {
//     return selectedConsumptionProduct 
//       ? consumptionForecast 
//       : [];
//   }

//   if (selectedOption === 'Supply Forecast') {
//     const filteredData = supplyForecast.filter(item => 
//       item.Year >= selectedSupplyStartYear && 
//       item.Year <= selectedSupplyEndYear &&
//       (selectedSupplyPeriod ? item.Month === selectedSupplyPeriod : true)
//     );

//     // Custom sorting: prioritize 2024 December first
//     return filteredData.sort((a, b) => {
//       const isADec2024 = a.Year === 2024 && a.Month === 'Dec';
//       const isBDec2024 = b.Year === 2024 && b.Month === 'Dec';
      
//       if (isADec2024 && !isBDec2024) return -1;
//       if (!isADec2024 && isBDec2024) return 1;
      
//       // Then sort by Year, then by Month
//       if (a.Year !== b.Year) return a.Year - b.Year;
//       return a.Month.localeCompare(b.Month);
//     });
//   }

//   if (selectedOption === 'Price Forecast') {
//     const filteredData = priceForecast.filter(item => 
//       item.Year >= selectedPriceStartYear && 
//       item.Year <= selectedPriceEndYear &&
//       (selectedPricePeriod ? item.Month === selectedPricePeriod : true)
//     );

//     // Custom sorting: prioritize 2024 December first
//     return filteredData.sort((a, b) => {
//       const isADec2024 = a.Year === 2024 && a.Month === 'Dec';
//       const isBDec2024 = b.Year === 2024 && b.Month === 'Dec';
      
//       if (isADec2024 && !isBDec2024) return -1;
//       if (!isADec2024 && isBDec2024) return 1;
      
//       // Then sort by Year, then by Month
//       if (a.Year !== b.Year) return a.Year - b.Year;
//       return a.Month.localeCompare(b.Month);
//     });
//   }

//   return [];
// }, [selectedOption, selectedMonth, selectedProduct, 
//   selectedConsumptionProduct, selectedSupplyStartYear, 
//   selectedSupplyEndYear, selectedSupplyPeriod,
//   selectedPriceStartYear, selectedPriceEndYear, selectedPricePeriod]);

//   const renderDataTiles = () => {
//     if (!selectedOption) {
//       return <p className="text-gray-500 text-center">Select an Analysis Option</p>;
//     }

//     if (selectedOption === 'Bids' && (!selectedMonth || !selectedProduct)) {
//       return <p className="text-gray-500 text-center">Please select both Month and Product</p>;
//     }

//     if (getFilteredData.length === 0) {
//       return <p className="text-gray-500 text-center">No data available</p>;
//     }

//     if (selectedOption === 'Bids') {
//       return (
//         <div className="space-y-6">
//           {getFilteredData.map((bid, index) => (
//             <div key={index} className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-blue-500">
//               <div className="grid grid-cols-4 gap-4">
//                 {/* Vendor ID Tile */}
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <div className="text-xs text-gray-500 mb-1">Vendor ID</div>
//                   <div className="text-lg font-bold text-blue-600">{bid['Vendor ID']}</div>
//                 </div>

//                 {/* Vendor Address Tile */}
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <div className="text-xs text-gray-500 mb-1">Vendor Address</div>
//                   <div className="text-sm">{bid['Vendor Address']}</div>
//                 </div>

//                 {/* Quoted Price Tile */}
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <div className="text-xs text-gray-500 mb-1">Quoted Price (INR)</div>
//                   <div className="text-lg font-bold text-green-600">{bid['Quoted Price(INR)']}</div>
//                 </div>

//                 {/* Consumption Tile */}
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <div className="text-xs text-gray-500 mb-1">Consumption (Quintal)</div>
//                   <div className="text-lg">{bid['Consumption(Quintal)']}</div>
//                 </div>

//                 {/* Highest Market Price Tile */}
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <div className="text-xs text-gray-500 mb-1">Highest Market Price (INR)</div>
//                   <div className="text-lg font-bold text-red-600">{bid['Highest Market Price(INR)']}</div>
//                 </div>

//                 {/* Lowest Market Price Tile */}
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <div className="text-xs text-gray-500 mb-1">Lowest Market Price (INR)</div>
//                   <div className="text-lg font-bold text-blue-600">{bid['Lowest Market Price(INR)']}</div>
//                 </div>

//                 {/* Current Cost to Client Tile */}
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <div className="text-xs text-gray-500 mb-1">Current Cost to Client (INR)</div>
//                   <div className="text-lg">{bid['Current Cost to Client(INR)']}</div>
//                 </div>

//                 {/* Percentage Diff Highest Market Tile */}
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <div className="text-xs text-gray-500 mb-1">% Diff Highest Market</div>
//                   <div className="text-lg text-orange-600">{bid['Percentage Diff Highest Market']}%</div>
//                 </div>

//                 {/* Percentage Diff Lowest Market Tile */}
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <div className="text-xs text-gray-500 mb-1">% Diff Lowest Market</div>
//                   <div className="text-lg text-purple-600">{bid['Percentage Diff Lowest Market']}%</div>
//                 </div>

//                 {/* Bid Status Tile */}
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <div className="text-xs text-gray-500 mb-1">Bid Status</div>
//                   <div className="text-lg font-bold text-green-700">{bid['Bid Status']}</div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       );
//     }

//     if (selectedOption === 'Consumption Forecast') {
//       return (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {getFilteredData.map((item, index) => (
//             <div key={index} className="bg-white shadow-md rounded-lg p-4">
//               <div className="font-bold text-lg mb-4 border-b pb-2">{item.Month}</div>
//               <div className="flex justify-between border-b py-2">
//                 <span className="text-gray-600">
//                   {selectedConsumptionProduct} Consumption
//                 </span>
//                 <span className="font-semibold">
//                   {item[`${selectedConsumptionProduct}Consumption(quintal)`]} Quintal
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       );
//     }

//     if (selectedOption === 'Supply Forecast') {
//       return (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//             <thead className="bg-blue-50 text-blue-800">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Year</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Month</th>
//                 <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider">Predicted Production</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {getFilteredData.map((item, index) => (
//                 <tr 
//                   key={index} 
//                   className="hover:bg-gray-50 transition-colors duration-200"
//                 >
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.Year}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.Month}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
//                     {item.Predicted_Production}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       );
//     }

//     if (selectedOption === 'Price Forecast') {
//       return (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//             <thead className="bg-blue-50 text-blue-800">
//               <tr>
//                 {Object.keys(getFilteredData[0] || {}).map(key => (
//                   <th 
//                     key={key} 
//                     className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
//                   >
//                     {key}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {getFilteredData.map((item, index) => (
//                 <tr 
//                   key={index} 
//                   className="hover:bg-gray-50 transition-colors duration-200"
//                 >
//                   {Object.entries(item).map(([key, value]) => (
//                     <td 
//                       key={key} 
//                       className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
//                     >
//                       {value}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       );
//     }

//     return null;
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Navbar */}
//       <nav className="bg-white shadow-md">
//         <div className="container mx-auto px-4 py-4">
//           <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">Forecast</h1>
          
//           <div className="flex justify-center space-x-4">
//             <select 
//               value={selectedOption} 
//               onChange={(e) => {
//                 setSelectedOption(e.target.value);
//                 setSelectedMonth('');
//                 setSelectedProduct('');
//                 setSelectedConsumptionProduct('');
//               }}
//               className="w-48 p-2 border rounded bg-white"
//             >
//               <option value="">Select Analysis Type</option>
//               {analysisOptions.map(option => (
//                 <option key={option} value={option}>{option}</option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </nav>

//       {/* Bids Month and Product Filters */}
//       {selectedOption === 'Bids' && (
//         <div className="flex justify-center space-x-4 my-4">
//           <select 
//             value={selectedMonth} 
//             onChange={(e) => setSelectedMonth(e.target.value)}
//             className="w-48 p-2 border rounded bg-white"
//           >
//             <option value="">Select Month</option>
//             {uniqueMonths.map(month => (
//               <option key={month} value={month}>{month}</option>
//             ))}
//           </select>

//           <select 
//             value={selectedProduct} 
//             onChange={(e) => setSelectedProduct(e.target.value)}
//             className="w-48 p-2 border rounded bg-white"
//           >
//             <option value="">Select Product</option>
//             {uniqueProducts.map(product => (
//               <option key={product} value={product}>{product}</option>
//             ))}
//           </select>
//         </div>
//       )}

//       {/* Product Filter for Consumption Forecast */}
//       {selectedOption === 'Consumption Forecast' && (
//         <div className="flex justify-center space-x-4 my-4">
//           <select 
//             value={selectedConsumptionProduct} 
//             onChange={(e) => setSelectedConsumptionProduct(e.target.value)}
//             className="w-48 p-2 border rounded bg-white"
//           >
//             <option value="">Select Consumption Product</option>
//             {uniqueConsumptionProducts.map(product => (
//               <option key={product} value={product}>{product}</option>
//             ))}
//           </select>
//         </div>
//       )}

//       {/* Supply Forecast Filters */}
//       {selectedOption === 'Supply Forecast' && (
//         <div className="flex justify-center space-x-4 my-4">
//           <select 
//             value={selectedSupplyStartYear} 
//             onChange={(e) => setSelectedSupplyStartYear(Number(e.target.value))}
//             className="w-48 p-2 border rounded bg-white"
//           >
//             <option value="">Start Year</option>
//             {uniqueSupplyYears.map(year => (
//               <option key={year} value={year}>{year}</option>
//             ))}
//           </select>

//           <select 
//             value={selectedSupplyEndYear} 
//             onChange={(e) => setSelectedSupplyEndYear(Number(e.target.value))}
//             className="w-48 p-2 border rounded bg-white"
//           >
//             <option value="">End Year</option>
//             {uniqueSupplyYears.map(year => (
//               <option key={year} value={year}>{year}</option>
//             ))}
//           </select>

//           <select 
//             value={selectedSupplyPeriod} 
//             onChange={(e) => setSelectedSupplyPeriod(e.target.value)}
//             className="w-48 p-2 border rounded bg-white"
//             >
//             <option value="">Select Supply Period</option>
//             {uniqueSupplyPeriods.map(period => (
//               <option key={period} value={period}>{period}</option>
//             ))}
//           </select>
//         </div>
//       )}

//       {/* Add Price Forecast Filters to the existing JSX*/}
//   {selectedOption === 'Price Forecast' && (
//     <div className="flex justify-center space-x-4 my-4">
//       <select 
//         value={selectedPriceStartYear} 
//         onChange={(e) => setSelectedPriceStartYear(Number(e.target.value))}
//         className="w-48 p-2 border rounded bg-white"
//       >
//         <option value="">Start Year</option>
//         {uniquePriceYears.map(year => (
//           <option key={year} value={year}>{year}</option>
//         ))}
//       </select>

//       <select 
//         value={selectedPriceEndYear} 
//         onChange={(e) => setSelectedPriceEndYear(Number(e.target.value))}
//         className="w-48 p-2 border rounded bg-white"
//       >
//         <option value="">End Year</option>
//         {uniquePriceYears.map(year => (
//           <option key={year} value={year}>{year}</option>
//         ))}
//       </select>

//       <select 
//         value={selectedPricePeriod} 
//         onChange={(e) => setSelectedPricePeriod(e.target.value)}
//         className="w-48 p-2 border rounded bg-white"
//       >
//         <option value="">Select Price Period</option>
//         {uniquePricePeriods.map(period => (
//           <option key={period} value={period}>{period}</option>
//         ))}
//       </select>
//     </div>
//   )}

//       {/* Main Content Area */}
//       <div className="container mx-auto px-4 py-6">
//         {renderDataTiles()}
//       </div>
//     </div>
//   );
// }

// export default Pricerisk;  





import React, { useState, useMemo } from 'react';
import pricer from './Data/pricer.json';
import consumptionForecast from './Data/consumptionforcast.json';
import supplyForecast from './Data/supplyforcast.json';
import priceForecast from './Data/priceforcast.json';
import vendorrisk from './Data/srs.json';
import category from './Data/category.json';
import Forecast from './Data/Forecast.json';

function Pricerisk() {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedForecastType, setSelectedForecastType] = useState('');
  const [selectedForecastStartYear, setSelectedForecastStartYear] = useState(2024);
  const [selectedForecastEndYear, setSelectedForecastEndYear] = useState(2025);
  const [selectedForecastPeriod, setSelectedForecastPeriod] = useState('');

  // Vendor Risk States
  const [vendorSearchTerm, setVendorSearchTerm] = useState('');
  const [selectedVendorProduct, setSelectedVendorProduct] = useState('All Products');

  // New state for Category Risk
  const [selectedCategoryProduct, setSelectedCategoryProduct] = useState('');

  const analysisOptions = [
    'Price Risk', 
    'Forecast', 
    'Vendor Risk',
    'Category Risk',
    //'Forecast 2'  // New option
  ];


  // Dynamic extraction of unique years and periods for Supply Forecast
  const uniqueSupplyYears = useMemo(() => {
    return [...new Set(supplyForecast.map(item => item.Year))].sort();
  }, []);

  const uniqueSupplyPeriods = useMemo(() => {
    return [...new Set(supplyForecast.map(item => item.Month))].sort();
  }, []);

  // Dynamic extraction of unique forecast years and periods
  const uniqueForecastYears = useMemo(() => {
    const years = [
      ...new Set([
        ...supplyForecast.map(item => item.Year),
        ...priceForecast.map(item => item.Year)
      ])
    ].sort();
    return years;
  }, []);

  const uniqueForecastPeriods = useMemo(() => {
    const periods = [
      ...new Set([
        ...supplyForecast.map(item => item.Month),
        ...priceForecast.map(item => item.Month)
      ])
    ].sort();
    return periods;
  }, []);

  // Dynamic product extraction for Consumption Forecast
  const uniqueConsumptionProducts = useMemo(() => {
    return Object.keys(consumptionForecast[0])
      .filter(key => key.startsWith('P') && key.endsWith('Consumption(quintal)'))
      .map(key => key.replace('Consumption(quintal)', ''));
  }, []);

  const uniqueMonths = [...new Set(pricer.map(item => item.Month))];
  const uniqueProducts = [...new Set(pricer.map(item => item['Product ID']))];

  // Dynamic product extraction for Category Risk
  const uniqueCategoryProducts = useMemo(() => {
    return [...new Set(category.map(item => item.Product))];
  }, []);


// Capacity Utilization Circle Component
const CapacityUtilizationCircle = ({ percentage }) => {
  // Ensure percentage is between 0 and 100
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

  // Determine color based on percentage
  const getColor = () => {
    if (clampedPercentage < 50) return 'text-red-500';
    if (clampedPercentage < 75) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="relative w-24 h-24">
      <svg 
        viewBox="0 0 36 36" 
        className={`w-full h-full transform -rotate-90 ${getColor()}`}
      >
        <path
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#e0e0e0"
          strokeWidth="3"
        />
        <path
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray={`${clampedPercentage}, 100`}
          className="transition-all duration-1000 ease-in-out"
        />
      </svg>
      <div 
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${getColor()}`}
      >
        <div className="text-center">
          <span className="text-xl font-bold transition-all duration-1000">
            {clampedPercentage.toFixed(0)}%
          </span>
        </div>
      </div>
    </div>
  );
};


  //srs scode
  const getSRSBadge = (srs) => {
    if (srs >= 151) {
      return (
        <span className="bg-red-100 text-red-700 font-semibold px-3 py-1 rounded-full">
          {srs}
        </span>
      );
    } else if (srs >= 51) {
      return (
        <span className="bg-yellow-100 text-yellow-700 font-semibold px-3 py-1 rounded-full">
          {srs}
        </span>
      );
    } else if (srs > 0) {
      return (
        <span className="bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full">
          {srs}
        </span>
      );
    } else {
      return (
        <span className="bg-gray-100 text-gray-700 font-semibold px-3 py-1 rounded-full">
          No Rating
        </span>
      );
    }
  };

  // Vendor Risk filtering
  const filteredVendors = useMemo(() => {
    let filtered = vendorrisk;
  
    if (vendorSearchTerm) {
      filtered = filtered.filter((supplier) =>
        supplier.Supplier.toLowerCase().includes(vendorSearchTerm.toLowerCase())
      );
    }
  
    if (selectedVendorProduct !== 'All Products') {
      filtered = filtered.filter((supplier) => supplier.Product === selectedVendorProduct);
    }
  
    return filtered;
  }, [vendorSearchTerm, selectedVendorProduct]);

  // Calculate Vendor Risk Counts
  const vendorRiskCounts = useMemo(() => {
    const counts = { low: 0, medium: 0, high: 0, noRating: 0 };
    vendorrisk.forEach((supplier) => {
      if (supplier.SRS >= 151) counts.high += 1;
      else if (supplier.SRS >= 51) counts.medium += 1;
      else if (supplier.SRS > 0) counts.low += 1;
      else counts.noRating += 1;
    });
    return counts;
  }, []);

  const getFilteredData = useMemo(() => {
    if (selectedOption === 'Price Risk') {
      return pricer.filter(item => 
        item['Bid Status'] === 'Bid Accepted' &&
        selectedMonth && 
        selectedProduct &&
        item.Month === selectedMonth &&
        item['Product ID'] === selectedProduct
      );
    }
    // if (selectedOption === 'Forecast') {
    //   const consumptionData = selectedForecastType === 'Consumption' && selectedForecastType
    //     ? consumptionForecast.filter(item => 
    //         selectedForecastPeriod ? item.Month === selectedForecastPeriod : true
    //       )
    //     : [];

    //   const supplyData = selectedForecastType === 'Supply' && selectedForecastType
    //     ? supplyForecast.filter(item => {
    //         const year = parseInt(item.Year);
    //         const month = item.Month.toLowerCase();
            
    //         const isValidYear = (year > 2024) || (year === 2024 && month === 'dec');
    //         const isWithinYearRange = 
    //           year >= selectedForecastStartYear && 
    //           year <= selectedForecastEndYear;
            
    //         const isPeriodMatch = 
    //           !selectedForecastPeriod || 
    //           month === selectedForecastPeriod;
            
    //         return isValidYear && isWithinYearRange && isPeriodMatch;
    //       })
    //     : [];

    //   const priceData = selectedForecastType === 'Price' && selectedForecastType
    //     ? priceForecast.filter(item => {
    //         const year = parseInt(item.Year);
    //         const month = item.Month.toLowerCase();
            
    //         const isValidYear = (year > 2024) || (year === 2024 && month === 'dec');
    //         const isWithinYearRange = 
    //           year >= selectedForecastStartYear && 
    //           year <= selectedForecastEndYear;
            
    //         const isPeriodMatch = 
    //           !selectedForecastPeriod || 
    //           month === selectedForecastPeriod;
            
    //         return isValidYear && isWithinYearRange && isPeriodMatch;
    //       })
    //     : [];

    //   return {
    //     consumption: consumptionData,
    //     supply: supplyData,
    //     price: priceData
    //   };
    // }

    if (selectedOption === 'Vendor Risk') {
      return (
        <div>
          <pre>{JSON.stringify(filteredVendors, null, 2)}</pre>
        </div>
      );
    }

    if (selectedOption === 'Category Risk') {
      return selectedCategoryProduct 
        ? category.filter(item => item.Product === selectedCategoryProduct)
        : [];
    }

    if (selectedOption === 'Forecast') {
      return Forecast.filter(item => {
        // Skip filtering if no date is present
        if (!item.Month) return false;
    
        const [month, year] = item.Month.split('-');
        
        const isValidYear = 
          year && 
          parseInt(year) >= selectedForecastStartYear && 
          parseInt(year) <= selectedForecastEndYear;
        
        const isPeriodMatch = 
          !selectedForecastPeriod || 
          month.toLowerCase() === selectedForecastPeriod.toLowerCase();
        
        return isValidYear && isPeriodMatch;
      });
    }
  

    return [];
  }, [
    selectedOption, 
    selectedMonth, 
    selectedProduct, 
    selectedCategoryProduct,
    selectedForecastType,
    selectedForecastStartYear, 
    selectedForecastEndYear, 
    selectedForecastPeriod
  ]);

  const renderDataTiles = () => {
    if (!selectedOption) {
      return <p className="text-gray-500 text-center">Select an Analysis Option</p>;
    }

    if (selectedOption === 'Price Risk' && (!selectedMonth || !selectedProduct)) {
      return <p className="text-gray-500 text-center">Please select both Month and Product</p>;
    }

    if (getFilteredData.length === 0) {
      return <p className="text-gray-500 text-center">No data available</p>;
    }

    if (selectedOption === 'Price Risk') {
      return (
        <div className="space-y-6">
          {getFilteredData.map((bid, index) => (
            <div key={index} className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-blue-500">
              <div className="grid grid-cols-4 gap-4">
                {/* Vendor ID Tile */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Vendor ID</div>
                  <div className="text-lg font-bold">{bid['Vendor ID']}</div>
                </div>

                {/* Vendor Address Tile */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">  Location</div>
                  <div className="text-sm font-bold">{bid['Vendor Address']}</div>
                </div>

                {/* Quoted Price Tile */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Quoted Price (INR)</div>
                  <div className="text-lg font-bold">{bid['Quoted Price(INR)']}</div>
                </div>

                {/* Consumption Tile */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Consumption (Quintal)</div>
                  <div className="text-lg font-bold">{bid['Consumption(Quintal)']}</div>
                </div>

                {/* Highest Market Price Tile */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Highest Market Price (INR)</div>
                  <div className="text-lg font-bold">{bid['Highest Market Price(INR)']}</div>
                </div>

                {/* Lowest Market Price Tile */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Lowest Market Price (INR)</div>
                  <div className="text-lg font-bold">{bid['Lowest Market Price(INR)']}</div>
                </div>

                {/* Current Cost to Client Tile */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-xs  mb-1">Current Cost to Client (INR)</div>
                  <div className="text-lg font-bold">{bid['Current Cost to Client(INR)']}</div>
                </div>

                {/* Percentage Diff Highest Market Tile */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">% Diff Highest Market</div>
                  <div className="text-lg font-bold text-green-700">{bid['Percentage Diff Highest Market']}%</div>
                </div>

                {/* Percentage Diff Lowest Market Tile */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">% Diff Lowest Market</div>
                  <div className="text-lg font-bold text-green-700">{bid['Percentage Diff Lowest Market']}%</div>
                </div>

                {/* Bid Status Tile */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Bid Status</div>
                  <div className="text-lg font-bold text-green-700">{bid['Bid Status']}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    // if (selectedOption === 'Forecast') {
    //   if (!selectedForecastType) {
    //     return <p className="text-gray-500 text-center">Select a Forecast Type</p>;
    //   }

    //   const forecastData = getFilteredData;
    //   const dataToRender = 
    //     selectedForecastType === 'Consumption' ? forecastData.consumption :
    //     selectedForecastType === 'Supply' ? forecastData.supply :
    //     selectedForecastType === 'Price' ? forecastData.price :
    //     [];

    //   if (dataToRender.length === 0) {
    //     return <p className="text-gray-500 text-center">No data available</p>;
    //   }

    //   return (
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    //       {dataToRender.map((item, index) => (
    //         <div key={index} className="bg-white shadow-md rounded-lg p-4">
    //           <div className="font-bold text-lg mb-4 border-b pb-2">
    //             {item.Year} - {item.Month}
    //           </div>
    //           {selectedForecastType === 'Consumption' && (
    //             <div className="flex justify-between border-b py-2">
    //               <span className="text-gray-600">
    //                 Consumption
    //               </span>
    //               <span className="font-semibold">
    //                 {Object.keys(item)
    //                   .filter(key => key.endsWith('Consumption(quintal)'))
    //                   .map(key => `${item[key]} Quintal`).join(', ')}
    //               </span>
    //             </div>
    //           )}
    //           {selectedForecastType === 'Supply' && (
    //             <div className="flex justify-between border-b py-2">
    //               <span className="text-gray-600">Predicted Production</span>
    //               <span className="font-semibold">
    //                 {item.Predicted_Production}
    //               </span>
    //             </div>
    //           )}
    //           {selectedForecastType === 'Price' && (
    //             <div className="flex justify-between border-b py-2">
    //               <span className="text-gray-600">Market Price</span>
    //               <span className="font-semibold">
    //                 {item['Market Price (INR per quintal)']} INR/quintal
    //               </span>
    //             </div>
    //           )}
    //         </div>
    //       ))}
    //     </div>
    //   );
    // }

    //Vendor risk

    if (selectedOption === 'Vendor Risk') {
      return (
<div className="bg-white shadow-lg rounded-xl p-6">
  {/* Search and Filter Section - Centered */}
  <div className="flex justify-center items-center mb-4 space-x-4">
    <input
      type="text"
      placeholder="Search Suppliers"
      value={vendorSearchTerm}
      onChange={(e) => setVendorSearchTerm(e.target.value)}
      className="border border-gray-300 rounded-md p-2 w-1/4"
    />
    <select
      value={selectedVendorProduct}
      onChange={(e) => setSelectedVendorProduct(e.target.value)}
      className="border border-gray-300 rounded-md p-2"
    >
      <option value="All Products">All Products</option>
      <option value="Product A">Product A</option>
      <option value="Product B">Product B</option>
      <option value="Product C">Product C</option>
    </select>
  </div>

  {/* Supplier Table */}
  <div className="overflow-x-auto">
    <table className="w-full border-collapse rounded-lg shadow border border-gray-300">
      <thead className="bg-gray-100 rounded-lg">
        <tr>
          <th className="border border-gray-300 p-3 text-left">Supplier</th>
          <th className="border border-gray-300 p-3 text-left">Vendor ID</th>
          <th className="border border-gray-300 p-3 text-left">Location</th>
          <th className="border border-gray-300 p-3 text-left">SRS</th>
          <th className="border border-gray-300 p-3 text-left">Last Update</th>
        </tr>
      </thead>
      <tbody>
        {filteredVendors.length > 0 ? (
          filteredVendors
            .sort((a, b) => a.SRS - b.SRS) // Sort by SRS from low to high
            .slice(0, 3) // Take only top 3
            .map((supplier) => (
              <tr 
                key={supplier["Vendor ID"]} 
                className={`hover:bg-gray-50 ${
                  supplier["Vendor ID"] === "V02" 
                    ? "bg-green-50 border-2 border-green-200" 
                    : ""
                }`}
              >
                <td className="border border-gray-300 p-3">{supplier.Supplier}</td>
                <td className="border border-gray-300 p-3">{supplier["Vendor ID"]}</td>
                <td className="border border-gray-300 p-3">{supplier.Location}</td>
                <td className="border border-gray-300 p-3">
                  {getSRSBadge(supplier.SRS)}
                </td>
                <td className="border border-gray-300 p-3">{supplier["Last update"]}</td>
              </tr>
            ))
        ) : (
          <tr>
            <td colSpan="5" className="border border-gray-300 p-3 text-center">
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>
      );
    }

  if (selectedOption === 'Category Risk') {
    return (
      <div className="bg-white shadow-lg rounded-xl p-6">
        {getFilteredData.map((item, index) => (
          <div 
            key={index} 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 bg-gray-50 p-4 rounded-lg"
          >
            <div className="bg-white p-3 rounded-md shadow">
              <div className="text-xs text-gray-500 mb-1">Current Price</div>
              <div className="text-lg font-bold">₹{item['Price ']}</div>
            </div>
            <div className="bg-white p-3 rounded-md shadow">
              <div className="text-xs text-gray-500 mb-1">Current Supplier</div>
              <div className="text-lg font-bold">{item['Current Supplier']}</div>
            </div>
            <div className="bg-white p-3 rounded-md shadow">
              <div className="text-xs text-gray-500 mb-1">Monthly Consumption</div>
              <div className="text-lg font-bold">{item['Current Consumption Per Month ']}</div>
            </div>
            <div className="bg-white p-3 rounded-md shadow">
              <div className="text-xs text-gray-500 mb-1">Supply To Date</div>
              <div className="text-lg font-bold">{item['Supply To date ']}(Tons)</div>
            </div>
            <div className="bg-white p-3 rounded-md shadow flex items-center justify-center">
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-2">Capacity Utilization</div>
                <CapacityUtilizationCircle percentage={item['Capacity Utilization'] * 100} />
              </div>
            </div>
            <div className="bg-white p-3 rounded-md shadow">
              <div className="text-xs text-gray-500 mb-1">Forecasted Price (Dec)</div>
              <div className="text-lg font-bold">₹{item['Forecasted Price(Dec)']}</div>
            </div>
            <div className="bg-white p-3 rounded-md shadow">
              <div className="text-xs text-gray-500 mb-1">Contract End Date</div>
              <div className="text-lg font-bold">{item['Contract End Date']}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (selectedOption === 'Forecast') {
    return (
      <div className="bg-white shadow-lg rounded-xl p-6 overflow-x-auto">
        <h1 className='text-2xl font-bold text-gray-800 mb-4 justify-between'>Forecast Summaary</h1>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-100">
              <th className="border p-3 text-left">Month</th>
              <th className="border p-3 text-left">P1 Consumption</th>
              <th className="border p-3 text-left">P2 Consumption</th>
              <th className="border p-3 text-left">P3 Consumption</th>
              <th className="border p-3 text-left">Forecasted Price</th>
              <th className="border p-3 text-left">Supply (Quintal)</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border p-3">{item.Month || 'N/A'}</td>
                <td className="border p-3">
                  {item['P1Consumption(quintal)'] !== undefined 
                    ? `${item['P1Consumption(quintal)']} Quintal` 
                    : 'N/A'}
                </td>
                <td className="border p-3">
                  {item['P2Consumption(quintal)'] !== undefined 
                    ? `${item['P2Consumption(quintal)']} Quintal` 
                    : 'N/A'}
                </td>
                <td className="border p-3">
                  {item['P3Consumption(quintal)'] !== undefined 
                    ? `${item['P3Consumption(quintal)']} Quintal` 
                    : 'N/A'}
                </td>
                <td className="border p-3">
                  {item['Total_Price '] !== undefined 
                    ? `₹${Number(item['Total_Price ']).toFixed(2)}` 
                    : 'N/A'}
                </td>
                <td className="border p-3">
                  {item.Supply !== undefined 
                    ? Number(item.Supply).toFixed(2) 
                    : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

    return null;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">Summary</h1>
          
          <div className="flex justify-center space-x-4">
            <select 
              value={selectedOption} 
              onChange={(e) => {
                setSelectedOption(e.target.value);
                // Reset all other selections when changing option
                setSelectedMonth('');
                setSelectedProduct('');
                setSelectedForecastType('');
                setSelectedForecastStartYear(2024);
                setSelectedForecastEndYear(2025);
                setSelectedForecastPeriod('');
                // Reset vendor risk filters
                setVendorSearchTerm('');
                setSelectedVendorProduct('All Products');
              }}
              className="w-48 p-2 border rounded bg-white"
            >
              <option value="">Select Analysis Type</option>
              {analysisOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      </nav>

      {/* Price Risk Filters */}
      {selectedOption === 'Price Risk' && (
        <div className="flex justify-center space-x-4 my-4">
          <select 
            value={selectedMonth} 
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-48 p-2 border rounded bg-white"
          >
            <option value="">Select Month</option>
            {uniqueMonths.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>

          <select 
            value={selectedProduct} 
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="w-48 p-2 border rounded bg-white"
          >
            <option value="">Select Product</option>
            {uniqueProducts.map(product => (
              <option key={product} value={product}>{product}</option>
            ))}
          </select>
        </div>
      )}

      {/* Forecast Filters */}
      {/* {selectedOption === 'Forecast' && (
        <div className="flex flex-col items-center space-y-4 my-4">
          <select 
            value={selectedForecastType} 
            onChange={(e) => setSelectedForecastType(e.target.value)}
            className="w-48 p-2 border rounded bg-white"
          >
            <option value="">Select Forecast Type</option>
            <option value="Consumption">Consumption Forecast</option>
            <option value="Supply">Supply Forecast</option>
            <option value="Price">Price Forecast</option>
          </select>

          <div className="flex space-x-4">
            <select 
              value={selectedForecastStartYear} 
              onChange={(e) => setSelectedForecastStartYear(Number(e.target.value))}
              className="w-48 p-2 border rounded bg-white"
            >
              <option value="">Start Year</option>
              {uniqueForecastYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            <select 
              value={selectedForecastEndYear} 
              onChange={(e) => setSelectedForecastEndYear(Number(e.target.value))}
              className="w-48 p-2 border rounded bg-white"
            >
              <option value="">End Year</option>
              {uniqueForecastYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            <select 
              value={selectedForecastPeriod} 
              onChange={(e) => setSelectedForecastPeriod(e.target.value)}
              className="w-48 p-2 border rounded bg-white"
            >
              <option value="">Select Period</option>
              {uniqueForecastPeriods.map(period => (
                <option key={period} value={period}>{period}</option>
              ))}
            </select>
          </div>
        </div>
      )} */}

            {/* Category Risk Filters */}
            {selectedOption === 'Category Risk' && (
        <div className="flex justify-center space-x-4 my-4">
          <select 
            value={selectedCategoryProduct} 
            onChange={(e) => setSelectedCategoryProduct(e.target.value)}
            className="w-48 p-2 border rounded bg-white"
          >
            <option value="">Select Category Product</option>
            {uniqueCategoryProducts.map(product => (
              <option key={product} value={product}>{product}</option>
            ))}
          </select>
        </div>
      )}


      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-6">
        {renderDataTiles()}
      </div>
    </div>
  );
}

export default Pricerisk;