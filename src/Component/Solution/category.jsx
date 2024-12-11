import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Package, 
  Calendar, 
  DollarSign, 
  BarChart2, 
  Layers
} from 'lucide-react';

import category from './Data/category.json';

const RiskIndicator = ({ percentage }) => {
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

  const getColorClass = () => {
    if (clampedPercentage < 50) return 'bg-red-500';
    if (clampedPercentage < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
      <div 
        className={`h-full ${getColorClass()} transition-all duration-500 ease-in-out`}
        style={{ width: `${clampedPercentage}%` }}
      />
    </div>
  );
};

const MetricTile = ({ 
  icon: Icon, 
  label, 
  value, 
  trend = null, 
  isHighlighted = false,
  entryNumber = null
}) => {
  const trendColor = trend && trend > 0 
    ? 'text-green-600' 
    : trend && trend < 0 
      ? 'text-red-600' 
      : 'text-gray-500';

  return (
    <div className={`
      ${isHighlighted ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'}
      border rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 relative
    `}>
      {/* {entryNumber !== null && (
        <div className="absolute top-2 right-2 text-xs font-bold text-gray-400">
          Entry {entryNumber + 1}
        </div>
      )} */}
      <div className="flex items-center space-x-3 mb-2">
        {Icon && <Icon className="w-5 h-5 text-blue-600 opacity-70" />}
        <span className="text-xs uppercase tracking-wider text-gray-500">{label}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold text-gray-800">{value}</span>
        {trend !== null && (
          <div className={`flex items-center text-xs ${trendColor}`}>
            {trend > 0 ? '▲' : '▼'} {Math.abs(trend.toFixed(1))}%
          </div>
        )}
      </div>
    </div>
  );
};

function CategoryRiskDashboard() {
  const [selectedProduct, setSelectedProduct] = useState('');

  const uniqueProducts = useMemo(() => {
    return [...new Set(category.map(item => item.Product))];
  }, []);

  const filteredCategoryData = useMemo(() => {
    return selectedProduct 
      ? category.filter(item => item.Product === selectedProduct)
      : [];
  }, [selectedProduct]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Product Selection */}
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <div className="max-w-md mx-auto">
              <label 
                htmlFor="product-select" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select Product Category
              </label>
              <select 
                id="product-select"
                value={selectedProduct} 
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Choose a Product Category</option>
                {uniqueProducts.map(product => (
                  <option key={product} value={product}>{product}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Risk Analysis Content */}
          {selectedProduct && filteredCategoryData.length > 0 && (
            <div className="p-6 space-y-6">
              {filteredCategoryData.map((item, index) => (
                <div 
                  key={index} 
                  className={`
                    bg-white border rounded-lg shadow-md overflow-hidden
                    ${index === 0 ? 'border-blue-300' : 'border-gray-200'}
                  `}
                >
                  <div className="grid md:grid-cols-3 gap-6 p-6">
                    {/* First Column: Financial Metrics */}
                    <div className="space-y-6">
                      <MetricTile 
                        icon={DollarSign}
                        label="Current Price"
                        value={`₹${item['Price ']}`}
                        entryNumber={index}
                      />
                      <MetricTile 
                        icon={TrendingUp}
                        label="Forecasted Price (Dec)"
                        value={`₹${item['Forecasted Price(Dec)']}`}
                        trend={((item['Forecasted Price(Dec)'] - item['Price ']) / item['Price '] * 100)}
                        entryNumber={index}
                      />
                    </div>

                    {/* Second Column: Supply Metrics */}
                    <div className="space-y-6">
                      <MetricTile 
                        icon={Package}
                        label="Monthly Consumption"
                        value={item['Current Consumption Per Month ']}
                        entryNumber={index}
                      />
                      <MetricTile 
                        icon={Layers}
                        label="Supply To Date"
                        value={`${item['Supply To date ']} Tons`}
                        entryNumber={index}
                      />
                    </div>

                    {/* Third Column: Risk and Contract Metrics */}
                    <div className="space-y-6">
                      <MetricTile 
                        icon={Calendar}
                        label="Contract End Date"
                        value={item['Contract End Date']}
                        isHighlighted
                        entryNumber={index}
                      />
                      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm relative">
                        {index !== 0 && (
                          <div className="absolute top-2 right-2 text-xs font-bold text-gray-400">
                            Entry {index + 1}
                          </div>
                        )}
                        <div className="flex items-center space-x-3 mb-2">
                          <BarChart2 className="w-5 h-5 text-blue-600 opacity-70" />
                          <span className="text-xs uppercase tracking-wider text-gray-500">
                            Capacity Utilization
                          </span>
                        </div>
                        <div className="mt-2">
                          <RiskIndicator 
                            percentage={item['Capacity Utilization'] * 100} 
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>0%</span>
                            <span>{(item['Capacity Utilization'] * 100).toFixed(0)}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Supplier Information */}
                  <div className="bg-gray-50 p-4 border-t border-gray-200">
                    <div className="flex items-center space-x-3 mb-3">
                      <TrendingDown className="w-5 h-5 text-blue-600 opacity-70" />
                      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Current Supplier Details
                      </h3>
                    </div>
                    <p className="text-gray-800">
                      {item['Current Supplier']}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Product Selected State */}
          {(!selectedProduct || filteredCategoryData.length === 0) && (
            <div className="text-center py-16 px-6">
              <Package className="mx-auto w-16 h-16 text-blue-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Select a Product Category
              </h2>
              <p className="text-gray-600">
                Choose a category to view detailed risk and performance insights
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryRiskDashboard;