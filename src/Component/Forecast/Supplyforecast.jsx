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
// import supply from './Data/supplyforcast.json';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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

//   // Get current month's supply info
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
//         supply: filteredData[filteredData.length - 1]['Predicted_Production'] || 0,
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

//     const currentSupply = currentMonthData['Predicted_Production'];
//     const previousSupply = previousMonthData ? previousMonthData['Predicted_Production'] : currentSupply;
    
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
//     .map(item => item['Predicted_Production'])
//     .filter(supply => typeof supply === 'number' && !isNaN(supply));

//   const minSupply = validSupplies.length > 0 ? Math.min(...validSupplies) : 0;
//   const maxSupply = validSupplies.length > 0 ? Math.max(...validSupplies) : 0;

//   const chartData = {
//     labels: filteredData.map((item) => `${item.Month.charAt(0).toUpperCase() + item.Month.slice(1)} ${item.Year}`),
//     datasets: [
//       {
//         label: 'Supply Trend',
//         data: filteredData.map((item) => item['Predicted_Production'] || 0),
//         borderColor: '#10B981',
//         backgroundColor: 'rgba(16, 185, 129, 0.1)', // Light green fill under the line
//         fill: true,
//         tension: 0, // Set to 0 for sharp edges (no smoothing)
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
//           label: (context) => `${context.raw.toFixed(2)} Units`,
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
//           callback: (value) => `${value.toFixed(2)}`,
//         },
//         min: Math.floor(minSupply - 0.5),
//         max: Math.ceil(maxSupply + 0.5),
//         title: {
//           display: true,
//           text: 'Predicted Supply (Units)',
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
//         {/* Supply Summary Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <div className="text-sm text-gray-500 mb-1">Current Month's Supply</div>
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
//             <div className="text-sm text-gray-500 mt-1">Supply Units</div>
//           </div>

//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <div className="text-sm text-gray-500 mb-1">Average Supply</div>
//             <div className="text-lg font-semibold text-gray-900">
//               {(validSupplies.reduce((acc, supply) => acc + supply, 0) / validSupplies.length || 0).toFixed(2)}
//             </div>
//             <div className="text-sm text-gray-500 mt-1">Per Month</div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
//           <div className="lg:col-span-3 bg-white rounded-lg shadow-sm p-6">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-lg font-semibold text-gray-900">Supply Forecast Trend</h2>
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
//               <Line data={chartData} options={chartOptions} />
//             </div>
//           </div>

//           <div className="lg:col-span-2 bg-white rounded-lg shadow-sm overflow-hidden">
//             <div className="px-6 py-4 border-b">
//               <h3 className="text-lg font-semibold text-gray-900">Supply History</h3>
//             </div>
//             <div className="overflow-y-auto" style={{ maxHeight: "600px" }}>
//               <table className="w-full">
//                 <thead className="bg-gray-50 sticky top-0">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supply (Quintals)</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {filteredData.map((item, index) => {
//                     const currentSupply = item['Predicted_Production'] || 0;
//                     const previousSupply = index > 0 ? (filteredData[index - 1]['Predicted_Production'] || 0) : currentSupply;
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

import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
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
} from 'chart.js';
import supply from './Data/supplyforcast.json';

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

const SupplyForecast = () => {
  const [activeTab, setActiveTab] = useState('Market Supply');
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const toggleFilters = () => setFiltersVisible(!filtersVisible);

  // Ensure data exists and is an array
  const validData = Array.isArray(supply) ? supply : [];

  const filteredData = validData.filter((item) => {
    if (!item || !item.Year || !item.Month) return false;
    const date = new Date(`${item.Year}-${item.Month}-01`);
    const startDate = dateRange.start ? new Date(dateRange.start) : null;
    const endDate = dateRange.end ? new Date(dateRange.end) : null;
    return (!startDate || date >= startDate) && (!endDate || date <= endDate);
  });

  // Get current month's supply info 
  const getCurrentMonthSupplyInfo = () => {
    if (filteredData.length === 0) return {
      supply: 0,
      change: 0,
      date: new Date().toLocaleDateString('en-IN')
    };

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Find the supply for the current month
    const currentMonthData = filteredData.find(item => 
      item.Year === currentYear && 
      item.Month.toLowerCase() === new Date(currentDate.getFullYear(), currentMonth).toLocaleString('default', { month: 'short' }).toLowerCase()
    );

    // If no current month data, use the latest available data
    if (!currentMonthData) {
      return {
        supply: filteredData[filteredData.length - 1]['Predicted_Production'] || 0,
        change: 0,
        date: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
      };
    }

    // Find previous month's data for comparison
    const previousMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
    const previousMonthData = filteredData.find(item => 
      item.Year === previousMonthDate.getFullYear() && 
      item.Month.toLowerCase() === new Date(previousMonthDate.getFullYear(), previousMonthDate.getMonth()).toLocaleString('default', { month: 'short' }).toLowerCase()
    );

    const currentSupply = currentMonthData['Predicted_Production'];
    const previousSupply = previousMonthData ? previousMonthData['Predicted_Production'] : currentSupply;
    
    const change = previousSupply ? 
      ((currentSupply - previousSupply) / previousSupply * 100) : 0;
    
    return {
      supply: currentSupply || 0,
      change: change || 0,
      date: `${currentMonthData.Month} ${currentMonthData.Year}`
    };
  };

  const currentMonthInfo = getCurrentMonthSupplyInfo();

  // Calculate min and max supplies with null checks
  const validSupplies = filteredData
    .map(item => item['Predicted_Production'])
    .filter(supply => typeof supply === 'number' && !isNaN(supply));

  const minSupply = validSupplies.length > 0 ? Math.min(...validSupplies) : 0;
  const maxSupply = validSupplies.length > 0 ? Math.max(...validSupplies) : 0;

  const chartData = {
    labels: filteredData.map((item) => `${item.Month.charAt(0).toUpperCase() + item.Month.slice(1)} ${item.Year}`),
    datasets: [
      {
        label: 'Supply Trend',
        data: filteredData.map((item) => item['Predicted_Production'] || 0),
        borderColor: '#3B82F6', // Bright blue border
        backgroundColor: 'rgba(59, 130, 246, 0.3)', // Lighter, more transparent fill
        fill: true,
        tension: 0.1,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: 'white',
        pointHoverBackgroundColor: '#2563EB',
        pointHoverBorderColor: 'white',
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'white',
        titleColor: '#1F2937',
        bodyColor: '#1F2937',
        borderColor: '#3B82F6', 
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) => `Supply: ${context.raw.toFixed(2)} Units`,
        },
      },
    },
    scales: {
      x: {
        grid: { 
          display: true, 
          color: 'rgba(59, 130, 246, 0.1)', 
          drawBorder: false 
        },
        ticks: { 
          color: '#6B7280', 
          font: { size: 11 },
          padding: 10 
        },
        title: {
          display: true,
          text: 'Forecast Period',
          color: '#3B82F6',
          font: { size: 12, weight: 'bold' },
        },
      },
      y: {
        grid: { 
          color: 'rgba(59, 130, 246, 0.1)', 
          drawBorder: false,
          borderDash: [5, 5] 
        },
        ticks: {
          color: '#6B7280',
          font: { size: 11 },
          padding: 10, 
          callback: (value) => `${value.toFixed(0)}`,
          stepSize: 1000
        },
        min: 0,
        max: 10000,
        title: {
          display: true,
          text: 'Predicted Supply (Units)',
          color: '#3B82F6',
          font: { size: 12, weight: 'bold' },
        },
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
  };
  
  // If no data is available, show a message
  if (filteredData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-900">No data available</h2>
          <p className="text-gray-500 mt-2">Please check your data source or try adjusting the filters.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-[1920px] mx-auto px-6 py-4 flex flex-col items-center justify-center space-y-4">
          <div className="text-2xl font-bold text-gray-900 mb-4">Supply Forecast</div>
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('Market Supply')}
              className={`px-6 py-3 text-lg rounded-lg font-semibold transition-colors duration-200 w-48 ${
                activeTab === 'Market Supply' 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Market Supply
            </button>
            {/* <button
              onClick={() => setActiveTab('Vendor Supply')}
              className={`px-6 py-3 text-lg rounded-lg font-semibold transition-colors duration-200 w-48 ${
                activeTab === 'Vendor Supply' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Vendor Supply
            </button> */}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-[1920px] mx-auto p-6">
        {(activeTab === 'Market Supply' || activeTab === 'Vendor Supply') && (
          <div className="space-y-6">
            {/* Supply Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-sm text-gray-500 mb-1">Current Month's Supply</div>
                <div className="text-2xl font-semibold text-gray-900">
                  {currentMonthInfo.supply.toFixed(2)}
                </div>
                <div className="text-sm text-gray-500 mt-1">{currentMonthInfo.date}</div>
                <div className={`text-sm mt-2 ${currentMonthInfo.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {currentMonthInfo.change >= 0 ? '↑' : '↓'} {Math.abs(currentMonthInfo.change).toFixed(2)}% from last month
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-sm text-gray-500 mb-1">Range</div>
                <div className="text-lg font-semibold text-gray-900">
                  {minSupply.toFixed(2)} - {maxSupply.toFixed(2)}
                </div>
                <div className="text-sm text-gray-500 mt-1">Supply Units</div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-sm text-gray-500 mb-1">Average Supply</div>
                <div className="text-lg font-semibold text-gray-900">
                  {(validSupplies.reduce((acc, supply) => acc + supply, 0) / validSupplies.length || 0).toFixed(2)}
                </div>
                <div className="text-sm text-gray-500 mt-1">Per Month</div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Full Width Chart Container */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {activeTab} Forecast Trend
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

                {filtersVisible && (
                  <div className="flex gap-4 mb-6 p-4 bg-gray-50 rounded-md">
                    <div className="flex gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Start Date</label>
                        <input
                          type="month"
                          value={dateRange.start ? dateRange.start : ''}
                          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                          className="px-2 py-1 border rounded-md text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">End Date</label>
                        <input
                          type="month"
                          value={dateRange.end ? dateRange.end : ''}
                          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
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

              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {activeTab} Supply History
                  </h3>
                </div>
                <div className="overflow-y-auto" style={{ maxHeight: "400px" }}>
                  <table className="w-full">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supply (Quintals)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredData.map((item, index) => {
                        const currentSupply = item['Predicted_Production'] || 0;
                        const previousSupply = index > 0 ? (filteredData[index - 1]['Predicted_Production'] || 0) : currentSupply;
                        const change = ((currentSupply - previousSupply) / previousSupply) * 100;
                        
                        return (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {item.Month.charAt(0).toUpperCase() + item.Month.slice(1)} {item.Year}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {currentSupply.toFixed(2)}
                            </td>
                            <td className={`px-6 py-4 text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                              {change >= 0 ? '+' : ''}{change.toFixed(2)}%
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplyForecast;