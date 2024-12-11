import React, { useState, useMemo } from 'react';
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
import consumptionData from './Data/consumptionforcast.json';
import demandData from './Data/marketdemand.json';

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

const ConsumptionForecast = () => {
  // State to track selected data type (Consumption or Market Demand)
  const [selectedDataType, setSelectedDataType] = useState('Consumption');

  // Determine which data to use based on selected view
  const currentData = selectedDataType === 'Consumption' ? consumptionData : demandData;

  // Dynamic current month detection
  const getCurrentMonthData = () => {
    const currentDate = new Date();
    const monthAbbreviations = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    // Format to match the data: '28-MonthAbbr'
    const currentMonthStr = `28-${monthAbbreviations[currentDate.getMonth()]}`;

    return currentMonthStr;
  };

  // Dynamically extract products
  const products = Object.keys(currentData[0])
    .filter(key => key.startsWith('P') && key.endsWith(
      selectedDataType === 'Consumption' 
        ? 'Consumption(quintal)' 
        : 'Demand(quintal)'
    ))
    .map(key => key.replace(
      selectedDataType === 'Consumption' 
        ? 'Consumption(quintal)' 
        : 'Demand(quintal)', 
      ''
    ));

  // Default to first product when products are available
  const [selectedProduct, setSelectedProduct] = useState(products.length > 0 ? products[0] : null);

  // Reset product selection when data type changes
  React.useEffect(() => {
    if (products.length > 0) {
      setSelectedProduct(products[0]);
    }
  }, [selectedDataType]);

  // Filter data for selected product and data type
  const productData = useMemo(() => {
    if (!selectedProduct || !selectedDataType) return [];

    return currentData.map(item => ({
      month: item.Month,
      value: item[`${selectedProduct}${
        selectedDataType === 'Consumption' 
          ? 'Consumption(quintal)' 
          : 'Demand(quintal)'
      }`] || 0
    }));
  }, [selectedProduct, selectedDataType]);

  // Calculate statistics
  const validValues = productData.map(item => item.value);
  const minValue = validValues.length > 0 ? Math.min(...validValues) : 0;
  const maxValue = validValues.length > 0 ? Math.max(...validValues) : 0;
  const avgValue = validValues.length > 0 
    ? validValues.reduce((sum, val) => sum + val, 0) / validValues.length 
    : 0;

  // Current month's data info
  const getCurrentMonthInfo = () => {
    if (productData.length === 0) return {
      value: 0,
      change: 0,
      date: getCurrentMonthData()
    };

    const currentMonthStr = getCurrentMonthData();

    // Find current month's data
    const currentMonthData = productData.find(item => item.month === currentMonthStr);
    
    if (!currentMonthData) return {
      value: 0,
      change: 0,
      date: currentMonthStr
    };

    // Get previous month by finding its index and subtracting
    const currentIndex = productData.findIndex(item => item.month === currentMonthStr);
    const previousMonthData = currentIndex > 0 
      ? productData[currentIndex - 1] 
      : null;
    
    const currentValue = currentMonthData.value;
    const previousValue = previousMonthData ? previousMonthData.value : currentValue;
    
    const change = previousValue 
      ? ((currentValue - previousValue) / previousValue * 100) 
      : 0;

    return {
      value: currentValue,
      change: change,
      date: currentMonthStr
    };
  };

  const currentMonthInfo = getCurrentMonthInfo();

  const chartData = {
    labels: productData.map((item) => item.month),
    datasets: [
      {
        label: `${selectedProduct} ${selectedDataType} Trend`,
        data: productData.map((item) => item.value),
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.3)',
        fill: true,
        tension: 0.1,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: '#10B981',
        pointBorderColor: 'white',
        pointHoverBackgroundColor: '#059669',
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
        borderColor: '#10B981', 
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) => `${selectedDataType}: ${context.raw.toFixed(2)} Quintals`,
        },
      },
    },
    scales: {
      x: {
        grid: { 
          display: true, 
          color: 'rgba(16, 185, 129, 0.1)', 
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
          color: 'Black',
          font: { size: 12, weight: 'bold' },
        },
      },
      y: {
        grid: { 
          color: 'rgba(16, 185, 129, 0.1)', 
          drawBorder: false,
          borderDash: [5, 5] 
        },
        ticks: {
          color: '#6B7280',
          font: { size: 11 },
          padding: 10, 
          callback: (value) => `${value.toFixed(0)} Q`,
          stepSize: 20
        },
        title: {
          display: true,
          text: `${selectedDataType} (Quintals)`,
          color: 'Black',
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Navbar with Data Type and Product Selection */}
      <div className="bg-white shadow-sm rounded-lg mb-6 p-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSelectedDataType('Consumption')}
              className={`px-4 py-2 rounded-md transition duration-300 ${
                selectedDataType === 'Consumption' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Consumption
            </button>
            <button 
              onClick={() => setSelectedDataType('Market Demand')}
              className={`px-4 py-2 rounded-md transition duration-300 ${
                selectedDataType === 'Market Demand' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Market Demand
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <label htmlFor="product-select" className="text-sm font-medium text-gray-700">
              Select Product:
            </label>
            <select 
              id="product-select"
              value={selectedProduct} 
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="block w-[200px] pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
            >
              {products.map((product) => (
                <option key={product} value={product}>
                  {product}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-sm text-gray-500 mb-1">Current {selectedDataType}</div>
          <div className="text-2xl font-semibold text-gray-900">
            {currentMonthInfo.value.toFixed(2)} Quintals
          </div>
          <div className="text-sm text-gray-500 mt-1">{currentMonthInfo.date}</div>
          <div className={`text-sm mt-2 ${currentMonthInfo.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {currentMonthInfo.change >= 0 ? '↑' : '↓'} {Math.abs(currentMonthInfo.change).toFixed(2)}% from last month
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-sm text-gray-500 mb-1">{selectedDataType} Range</div>
          <div className="text-lg font-semibold text-gray-900">
            {minValue.toFixed(2)} - {maxValue.toFixed(2)} Quintals
          </div>
          <div className="text-sm text-gray-500 mt-1">Monthly Variation</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-sm text-gray-500 mb-1">Average {selectedDataType}</div>
          <div className="text-lg font-semibold text-gray-900">
            {avgValue.toFixed(2)} Quintals
          </div>
          <div className="text-sm text-gray-500 mt-1">per month</div>
        </div>
      </div>

      {/* Full-Width Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            {selectedProduct} {selectedDataType} Forecast
          </h2>
        </div>

        <div className="h-[400px] w-full">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Full-Width Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden ">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            {selectedProduct} {selectedDataType} History
          </h3>
        </div>
        <div className="overflow-x-auto max-h-[500px]">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {selectedDataType} (Quintals)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {productData.map((item, index) => {
                const currentValue = item.value;
                const previousValue = index > 0 ? productData[index - 1].value : currentValue;
                const change = ((currentValue - previousValue) / previousValue) * 100;
                
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {item.month}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {currentValue.toFixed(2)}
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
  );
};

export default ConsumptionForecast;