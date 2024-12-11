// import React, { useState } from "react";
// import {
//   ComposedChart,
//   Bar,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   Cell,
// } from "recharts";
// import data from "./Data/pricer.json";

// const PriceAnalysisDashboard = () => {
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [selectedBidStatus, setSelectedBidStatus] = useState("");
//   const [selectedProduct, setSelectedProduct] = useState("");

//   // Filter data based on selected month, bid status, and product
//   const filteredData = data.filter((item) => {
//     return (
//       selectedMonth &&
//       selectedBidStatus &&
//       (!selectedProduct || item["Product ID"] === selectedProduct) &&
//       item["Month"] === selectedMonth &&
//       item["Bid Status"] === selectedBidStatus
//     );
//   });

//   const COLORS = {
//     highestMarket: "#A3FCF4", // Darker blue
//     lowestMarket: "#32FFC2", // Darker green
//     quotedPrice: "#EDBEAC", // Darker yellow
//     deltaHigh: "#dc2626", // Red
//     deltaLow: "#7c3aed", // Purple
//   };

//   const getPriceMetrics = (product) => {
//     const quotedPrice = Number(product["Quoted Price(INR)"]);
//     const highestMarket = Number(product["Highest Market Price(INR)"]);
//     const lowestMarket = Number(product["Lowest Market Price(INR)"]);

//     return [
//       {
//         name: "Highest Market",
//         price: highestMarket,
//         deltaHighest: highestMarket - quotedPrice,
//         deltaLowest: null,
//         fill: COLORS.highestMarket,
//       },
//       {
//         name: "Quoted Price",
//         price: quotedPrice,
//         deltaHighest: quotedPrice,
//         deltaLowest: quotedPrice,
//         fill: COLORS.quotedPrice,
//       },
//       {
//         name: "Lowest Market",
//         price: lowestMarket,
//         deltaHighest: null,
//         deltaLowest: lowestMarket - quotedPrice,
//         fill: COLORS.lowestMarket,
//       },
//     ];
//   };

//   const getCostMetrics = (product) => {
//     const currentCost = Number(product["Current Cost to Client(INR)"]);
//     const highestMarketCost = Number(product["Highest Market Cost(INR)"]);
//     const lowestMarketCost = Number(product["Lowest Market Cost(INR)"]);

//     return [
//       {
//         name: "Highest Market Cost",
//         cost: highestMarketCost,
//         deltaCostHigh: highestMarketCost - currentCost,
//         deltaCostLow: null,
//         fill: COLORS.highestMarket,
//       },
//       {
//         name: "Current Cost",
//         cost: currentCost,
//         deltaCostHigh: currentCost,
//         deltaCostLow: currentCost,
//         fill: COLORS.quotedPrice,
//       },
//       {
//         name: "Lowest Market Cost",
//         cost: lowestMarketCost,
//         deltaCostHigh: null,
//         deltaCostLow: lowestMarketCost - currentCost,
//         fill: COLORS.lowestMarket,
//       },
//     ];
//   };

//   const getProductDetails = (product) => {
//     const excludedFields = [
//       "Quoted Price(INR)",
//       "Highest Market Price(INR)",
//       "Lowest Market Price(INR)",
//       "Current Cost to Client(INR)",
//       "Highest Market Cost(INR)",
//       "Lowest Market Cost(INR)",
//     ];

//     return Object.entries(product).filter(
//       ([key]) => !excludedFields.includes(key)
//     );
//   };

//   const getPriceSummary = (product) => {
//     const quotedPrice = Number(product["Quoted Price(INR)"]);
//     const highestMarket = Number(product["Highest Market Price(INR)"]);
//     const lowestMarket = Number(product["Lowest Market Price(INR)"]);

//     return {
//       highestMarket: highestMarket,
//       quotedPrice: quotedPrice,
//       lowestMarket: lowestMarket,
//       deltaHigh: highestMarket - quotedPrice,
//       deltaLow: lowestMarket - quotedPrice,
//     };
//   };

//   const getCostSummary = (product) => {
//     const currentCost = Number(product["Current Cost to Client(INR)"]);
//     const highestMarketCost = Number(product["Highest Market Cost(INR)"]);
//     const lowestMarketCost = Number(product["Lowest Market Cost(INR)"]);
//     const diffhighest = Number(
//       product["Difference between Highest Market Cost and CTC"]
//     );
//     const difflowest = Number(
//       product["Difference between Lowest Market Cost and CTC"]
//     );

//     return {
//       highestMarketCost: highestMarketCost,
//       currentCost: currentCost,
//       lowestMarketCost: lowestMarketCost,
//       deltaCostHigh: highestMarketCost - currentCost,
//       deltaCostLow: lowestMarketCost - currentCost,
//       diffhighest: diffhighest,
//       difflowest: difflowest,
//     };
//   };

//   const uniqueMonths = [...new Set(data.map((item) => item["Month"]))];
//   const uniqueBidStatuses = [
//     ...new Set(data.map((item) => item["Bid Status"])),
//   ];
//   const uniqueProducts = [...new Set(data.map((item) => item["Product ID"]))];

//   return (
//     <div className="p-6 bg-gray-100">
//       {/* Header Section */}
//       <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
//         <h1 className="text-2xl font-bold mb-4">
//           Product Price Analysis Dashboard
//         </h1>

//         {/* Filters */}
//         <div className="flex flex-wrap gap-4 mb-6">
//           <select
//             value={selectedMonth}
//             onChange={(e) => setSelectedMonth(e.target.value)}
//             className="px-4 py-2 border rounded focus:outline-none"
//           >
//             <option value="">Select Month</option>
//             {uniqueMonths.map((month) => (
//               <option key={month} value={month}>
//                 {month}
//               </option>
//             ))}
//           </select>

//           <select
//             value={selectedProduct}
//             onChange={(e) => setSelectedProduct(e.target.value)}
//             className="px-4 py-2 border rounded focus:outline-none"
//           >
//             <option value="">Select Products</option>
//             {uniqueProducts.map((product) => (
//               <option key={product} value={product}>
//                 Product {product}
//               </option>
//             ))}
//           </select>

//           <select
//             value={selectedBidStatus}
//             onChange={(e) => setSelectedBidStatus(e.target.value)}
//             className="px-4 py-2 border rounded focus:outline-none"
//           >
//             <option value="">Select Bid Status</option>
//             {uniqueBidStatuses.map((status) => (
//               <option key={status} value={status}>
//                 {status}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Display Filtered Data */}
//       {selectedMonth && selectedBidStatus && filteredData.length > 0 ? (
//         filteredData.map((product, index) => {
//           const priceSummary = getPriceSummary(product);
//           const costSummary = getCostSummary(product);

//           return (
//             <div
//               key={index}
//               className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"
//             >
//               {/* Price Comparisons */}
//               <div className="bg-white rounded-lg shadow-lg p-6">
//                 <div className="relative">
//                   <h2 className="text-xl font-bold mb-4">
//                     Price Comparison (INR) for Product {product["Product ID"]} (
//                     {product["Bid Status"]})
//                   </h2>

//                   {/* Comprehensive Summary Box */}
//                   <div className="absolute top-0 right-0 bg-gray-50 p-1 rounded-lg border border-gray-200 shadow-sm">
//                     <div className="space-y-2">
//                       {/* Prices */}
//                       <div className="grid grid-cols-3 gap-2 text-center">
//                         <div>
//                           <div
//                             className="w-3 h-3 rounded-full mx-auto mb-1"
//                             style={{ backgroundColor: COLORS.highestMarket }}
//                           ></div>
//                           <span className="text-xs font-medium">Highest</span>
//                           <p className="text-sm">
//                             ₹{priceSummary.highestMarket.toLocaleString()}
//                           </p>
//                         </div>
//                         <div>
//                           <div
//                             className="w-3 h-3 rounded-full mx-auto mb-1"
//                             style={{ backgroundColor: COLORS.quotedPrice }}
//                           ></div>
//                           <span className="text-xs font-medium">Quoted</span>
//                           <p className="text-sm">
//                             ₹{priceSummary.quotedPrice.toLocaleString()}
//                           </p>
//                         </div>
//                         <div>
//                           <div
//                             className="w-3 h-3 rounded-full mx-auto mb-1"
//                             style={{ backgroundColor: COLORS.lowestMarket }}
//                           ></div>
//                           <span className="text-xs font-medium">Lowest</span>
//                           <p className="text-sm">
//                             ₹{priceSummary.lowestMarket.toLocaleString()}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="h-80">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <ComposedChart
//                         data={getPriceMetrics(product)}
//                         margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                       >
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="name" />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         <Bar dataKey="price" name="Price">
//                           {getPriceMetrics(product).map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={entry.fill} />
//                           ))}
//                         </Bar>
//                         <Line
//                           type="monotone"
//                           dataKey="deltaHighest"
//                           stroke={COLORS.deltaHigh}
//                           strokeWidth={2}
//                           name="Delta (High)"
//                           connectNulls
//                           dot={{ r: 6 }}
//                         />
//                         <Line
//                           type="monotone"
//                           dataKey="deltaLowest"
//                           stroke={COLORS.deltaLow}
//                           strokeWidth={2}
//                           name="Delta (Low)"
//                           connectNulls
//                           dot={{ r: 6 }}
//                         />
//                       </ComposedChart>
//                     </ResponsiveContainer>
//                   </div>

                  {/* Additional Details Section */}
                  // <div className="mt-6 p-4 bg-gray-50 border rounded-lg">
                  //   <h3 className="text-lg font-semibold mb-4">
                  //     Detailed Price Metrics
                  //   </h3>
                  //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  //     <div>
                  //       <span className="font-medium">Highest Price:</span>
                  //       <p>₹{priceSummary.highestMarket.toLocaleString()}</p>
                  //     </div>
                  //     <div>
                  //       <span className="font-medium">Lowest Price:</span>
                  //       <p>₹{priceSummary.lowestMarket.toLocaleString()}</p>
                  //     </div>
                  //     <div>
                  //       <span className="font-medium">Quoted Price:</span>
                  //       <p>₹{priceSummary.quotedPrice.toLocaleString()}</p>
                  //     </div>
                  //     <div>
                  //       <span className="font-medium">
                  //         Percentage Diff Highest Market:
                  //       </span>
                  //       <p
                  //         className={`flex items-center ${
                  //           priceSummary.highestMarket -
                  //             priceSummary.quotedPrice >
                  //           0
                  //             ? "text-green-600"
                  //             : "text-red-600"
                  //         }`}
                  //       >
                  //         {(
                  //           ((priceSummary.highestMarket -
                  //             priceSummary.quotedPrice) /
                  //             priceSummary.quotedPrice) *
                  //           100
                  //         ).toFixed(2)}
                  //         %
                  //         {priceSummary.highestMarket -
                  //           priceSummary.quotedPrice >
                  //         0 ? (
                  //           <span className="ml-1">▲</span>
                  //         ) : (
                  //           <span className="ml-1">▼</span>
                  //         )}
                  //       </p>
                  //     </div>
                  //     <div>
                  //       <span className="font-medium">
                  //         Percentage Diff Lowest Market:
                  //       </span>
                  //       <p
                  //         className={`flex items-center ${
                  //           priceSummary.quotedPrice -
                  //             priceSummary.lowestMarket >
                  //           0
                  //             ? "text-green-600"
                  //             : "text-red-600"
                  //         }`}
                  //       >
                  //         {(
                  //           ((priceSummary.quotedPrice -
                  //             priceSummary.lowestMarket) /
                  //             priceSummary.quotedPrice) *
                  //           100
                  //         ).toFixed(2)}
                  //         %
                  //         {priceSummary.quotedPrice -
                  //           priceSummary.lowestMarket >
                  //         0 ? (
                  //           <span className="ml-1">▲</span>
                  //         ) : (
                  //           <span className="ml-1">▼</span>
                  //         )}
                  //       </p>
                  //     </div>
                  //     <div>
                  //       <span className="font-medium">
                  //         Difference between Highest Market Price and Quoted
                  //         Price:
                  //       </span>
                  //       <p>₹{priceSummary.deltaHigh.toLocaleString()}</p>
                  //     </div>
                  //     <div>
                  //       <span className="font-medium">
                  //         Difference between Lowest Market Price and Quoted
                  //         Price:
                  //       </span>
                  //       <p>₹{priceSummary.deltaLow.toLocaleString()}</p>
                  //     </div>
                  //   </div>
                  // </div>
               // </div>
              // </div>
//               {/* COST Comparison */}
//               <div className="bg-white rounded-lg shadow-lg p-6">
//                 <div className="relative">
//                   <h2 className="text-xl font-bold mb-4">
//                     Cost Comparison (INR) for Product {product["Product ID"]} (
//                     {product["Bid Status"]})
//                   </h2>

//                   {/* Comprehensive Cost Summary Box */}
//                   <div className="absolute top-0 right-0 bg-gray-50 p-1 rounded-lg border border-gray-200 shadow-sm">
//                     <div className="space-y-2">
//                       {/* Costs */}
//                       <div className="grid grid-cols-3 gap-2 text-center">
//                         <div>
//                           <div
//                             className="w-3 h-3 rounded-full mx-auto mb-1"
//                             style={{ backgroundColor: COLORS.highestMarket }}
//                           ></div>
//                           <span className="text-xs font-medium">Highest</span>
//                           <p className="text-sm">
//                             ₹{costSummary.highestMarketCost.toLocaleString()}
//                           </p>
//                         </div>
//                         <div>
//                           <div
//                             className="w-3 h-3 rounded-full mx-auto mb-1"
//                             style={{ backgroundColor: COLORS.quotedPrice }}
//                           ></div>
//                           <span className="text-xs font-medium">Current</span>
//                           <p className="text-sm">
//                             ₹{costSummary.currentCost.toLocaleString()}
//                           </p>
//                         </div>
//                         <div>
//                           <div
//                             className="w-3 h-3 rounded-full mx-auto mb-1"
//                             style={{ backgroundColor: COLORS.lowestMarket }}
//                           ></div>
//                           <span className="text-xs font-medium">Lowest</span>
//                           <p className="text-sm">
//                             ₹{costSummary.lowestMarketCost.toLocaleString()}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="h-80">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <ComposedChart
//                         data={getCostMetrics(product)}
//                         margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                       >
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="name" />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         <Bar dataKey="cost" name="Cost">
//                           {getCostMetrics(product).map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={entry.fill} />
//                           ))}
//                         </Bar>
//                         <Line
//                           type="monotone"
//                           dataKey="deltaCostHigh"
//                           stroke={COLORS.deltaHigh}
//                           strokeWidth={2}
//                           name="Delta (High)"
//                           connectNulls
//                           dot={{ r: 6 }}
//                         />
//                         <Line
//                           type="monotone"
//                           dataKey="deltaCostLow"
//                           stroke={COLORS.deltaLow}
//                           strokeWidth={2}
//                           name="Delta (Low)"
//                           connectNulls
//                           dot={{ r: 6 }}
//                         />
//                       </ComposedChart>
//                     </ResponsiveContainer>
//                   </div>

//                   {/* Additional Details Section for Costs */}
//                   <div className="mt-6 p-4 bg-gray-50 border rounded-lg">
//                     <h3 className="text-lg font-semibold mb-4">
//                       Detailed Cost Metrics
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                       <div>
//                         <span className="font-medium">
//                           Highest Market Cost:
//                         </span>
//                         <p>₹{costSummary.highestMarketCost.toLocaleString()}</p>
//                       </div>
//                       <div>
//                         <span className="font-medium">Lowest Market Cost:</span>
//                         <p>₹{costSummary.lowestMarketCost.toLocaleString()}</p>
//                       </div>
//                       <div>
//                         <span className="font-medium">
//                           Current Cost to Client:
//                         </span>
//                         <p>₹{costSummary.currentCost.toLocaleString()}</p>
//                       </div>
//                       <div>
//                         <span className="font-medium">
//                           Percentage Diff Highest Market Cost:
//                         </span>
//                         <p
//                           className={`flex items-center ${
//                             costSummary.highestMarketCost -
//                               costSummary.currentCost >
//                             0
//                               ? "text-green-600"
//                               : "text-red-600"
//                           }`}
//                         >
//                           {(
//                             ((costSummary.highestMarketCost -
//                               costSummary.currentCost) /
//                               costSummary.currentCost) *
//                             100
//                           ).toFixed(2)}
//                           %
//                           {costSummary.highestMarketCost -
//                             costSummary.currentCost >
//                           0 ? (
//                             <span className="ml-1">▲</span>
//                           ) : (
//                             <span className="ml-1">▼</span>
//                           )}
//                         </p>
//                       </div>
//                       <div>
//                         <span className="font-medium">
//                           Percentage Diff Lowest Market Cost:
//                         </span>
//                         <p
//                           className={`flex items-center ${
//                             costSummary.currentCost -
//                               costSummary.lowestMarketCost >
//                             0
//                               ? "text-green-600"
//                               : "text-red-600"
//                           }`}
//                         >
//                           {(
//                             ((costSummary.currentCost -
//                               costSummary.lowestMarketCost) /
//                               costSummary.currentCost) *
//                             100
//                           ).toFixed(2)}
//                           %
//                           {costSummary.currentCost -
//                             costSummary.lowestMarketCost >
//                           0 ? (
//                             <span className="ml-1">▲</span>
//                           ) : (
//                             <span className="ml-1">▼</span>
//                           )}
//                         </p>
//                       </div>
//                       <div>
//                         <span className="font-medium">
//                           Difference between Highest Market Cost and CTC:
//                         </span>
//                         <p>₹{costSummary.diffhighest.toLocaleString()}</p>
//                       </div>
//                       <div>
//                         <span className="font-medium">
//                           Difference between Lowest Market Cost and CTC :
//                         </span>
//                         <p>₹{costSummary.difflowest.toLocaleString()}</p>
//                       </div>
//                       {/* <div>
//                         <span className="font-medium">Delta High:</span>
//                         <p>₹{costSummary.deltaCostHigh.toLocaleString()}</p>
//                       </div>
//                       <div>
//                         <span className="font-medium">Delta Low:</span>
//                         <p>₹{costSummary.deltaCostLow.toLocaleString()}</p>
//                       </div> */}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-white rounded-lg shadow-lg p-6 lg:col-span-2">
//                 <h2 className="text-xl font-bold mb-4">Product Details</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {getProductDetails(product)
//                     .filter(
//                       ([key]) =>
//                         key !== "Percentage Diff Highest Market" &&
//                         key !== "Percentage Diff Lowest Market"
//                     )
//                     .map(([key, value]) => (
//                       <div key={key} className="p-4 bg-gray-50 rounded-lg">
//                         <h3 className="font-medium text-gray-700">{key}</h3>
//                         <p className="mt-1 text-gray-600">
//                           {value === null
//                             ? "N/A"
//                             : typeof value === "number"
//                             ? key.toLowerCase().includes("percentage")
//                               ? `${value.toFixed(2)}%`
//                               : key.toLowerCase().includes("price") ||
//                                 key.toLowerCase().includes("cost")
//                               ? `₹${value.toLocaleString()}`
//                               : value.toString()
//                             : value.toString()}
//                         </p>
//                       </div>
//                     ))}
//                 </div>
//               </div>
//             </div>
//           );
//         })
//       ) : (
//         <div className="bg-white rounded-lg shadow-lg p-8 text-center text-gray-500">
//           {!selectedMonth || !selectedBidStatus
//             ? "Please select both a month and a bid status to view data."
//             : "No data available for the selected filters."}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PriceAnalysisDashboard;


////////*** new code */


// import React, { useState } from "react";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import data from "./Data/pricer.json";

// const PriceAnalysisDashboard = () => {
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [selectedBidStatus, setSelectedBidStatus] = useState("");
//   const [selectedProduct, setSelectedProduct] = useState("");

//   // Filter data based on selected month, bid status, and product
//   const filteredData = data.filter((item) => {
//     return (
//       selectedMonth &&
//       selectedBidStatus &&
//       (!selectedProduct || item["Product ID"] === selectedProduct) &&
//       item["Month"] === selectedMonth &&
//       item["Bid Status"] === selectedBidStatus
//     );
//   });

//   const COLORS = {
//     highestMarket: "#A3FCF4", // Darker blue
//     lowestMarket: "#32FFC2", // Darker green
//     quotedPrice: "#EDBEAC", // Darker yellow
//     deltaHigh: "#dc2626", // Red
//     deltaLow: "#7c3aed", // Purple
//   };

//   const getPriceMetrics = (product) => {
//     const quotedPrice = Number(product["Quoted Price(INR)"]);
//     const highestMarket = Number(product["Highest Market Price(INR)"]);
//     const lowestMarket = Number(product["Lowest Market Price(INR)"]);

//     return [
//       {
//         name: "Highest Market",
//         price: highestMarket,
//         deltaHighest: highestMarket - quotedPrice,
//         deltaLowest: 0,
//         fill: COLORS.highestMarket,
//       },
//       {
//         name: "Quoted Price",
//         price: quotedPrice,
//         deltaHighest: 0,
//         deltaLowest: 0,
//         fill: COLORS.quotedPrice,
//       },
//       {
//         name: "Lowest Market",
//         price: lowestMarket,
//         deltaHighest: 0,
//         deltaLowest: quotedPrice - lowestMarket,
//         fill: COLORS.lowestMarket,
//       },
//     ];
//   };

//   const getCostMetrics = (product) => {
//     const currentCost = Number(product["Current Cost to Client(INR)"]);
//     const highestMarketCost = Number(product["Highest Market Cost(INR)"]);
//     const lowestMarketCost = Number(product["Lowest Market Cost(INR)"]);

//     return [
//       {
//         name: "Highest Market Cost",
//         cost: highestMarketCost,
//         deltaCostHigh: highestMarketCost - currentCost,
//         deltaCostLow: 0,
//         fill: COLORS.highestMarket,
//       },
//       {
//         name: "Current Cost",
//         cost: currentCost,
//         deltaCostHigh: 0,
//         deltaCostLow: 0,
//         fill: COLORS.quotedPrice,
//       },
//       {
//         name: "Lowest Market Cost",
//         cost: lowestMarketCost,
//         deltaCostHigh: 0,
//         deltaCostLow: currentCost - lowestMarketCost,
//         fill: COLORS.lowestMarket,
//       },
//     ];
//   };

//   const getProductDetails = (product) => {
//     const excludedFields = [
//       "Quoted Price(INR)",
//       "Highest Market Price(INR)",
//       "Lowest Market Price(INR)",
//       "Current Cost to Client(INR)",
//       "Highest Market Cost(INR)",
//       "Lowest Market Cost(INR)",
//     ];

//     return Object.entries(product).filter(
//       ([key]) => !excludedFields.includes(key)
//     );
//   };

//   const getPriceSummary = (product) => {
//     const quotedPrice = Number(product["Quoted Price(INR)"]);
//     const highestMarket = Number(product["Highest Market Price(INR)"]);
//     const lowestMarket = Number(product["Lowest Market Price(INR)"]);

//     return {
//       highestMarket: highestMarket,
//       quotedPrice: quotedPrice,
//       lowestMarket: lowestMarket,
//       deltaHigh: highestMarket - quotedPrice,
//       deltaLow: lowestMarket - quotedPrice,
//     };
//   };

//   const getCostSummary = (product) => {
//     const currentCost = Number(product["Current Cost to Client(INR)"]);
//     const highestMarketCost = Number(product["Highest Market Cost(INR)"]);
//     const lowestMarketCost = Number(product["Lowest Market Cost(INR)"]);
//     const diffhighest = Number(product["Difference between Highest Market Cost and CTC"]);
//     const difflowest = Number(product["Difference between Lowest Market Cost and CTC"]);

//     return {
//       highestMarketCost: highestMarketCost,
//       currentCost: currentCost,
//       lowestMarketCost: lowestMarketCost,
//       deltaCostHigh: highestMarketCost - currentCost,
//       deltaCostLow: lowestMarketCost - currentCost,
//       diffhighest: diffhighest,
//       difflowest: difflowest
//     };
//   };

//   const uniqueMonths = [...new Set(data.map((item) => item["Month"]))];
//   const uniqueBidStatuses = [
//     ...new Set(data.map((item) => item["Bid Status"])),
//   ];
//   const uniqueProducts = [...new Set(data.map((item) => item["Product ID"]))];

//   return (
//     <div className="p-6 bg-gray-100">
//       {/* Header Section */}
//       <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
//         <h1 className="text-2xl font-bold mb-4">
//           Product Price Analysis Dashboard
//         </h1>

//         {/* Filters */}
//         <div className="flex flex-wrap gap-4 mb-6">
//           <select
//             value={selectedMonth}
//             onChange={(e) => setSelectedMonth(e.target.value)}
//             className="px-4 py-2 border rounded focus:outline-none"
//           >
//             <option value="">Select Month</option>
//             {uniqueMonths.map((month) => (
//               <option key={month} value={month}>
//                 {month}
//               </option>
//             ))}
//           </select>

//           <select
//             value={selectedProduct}
//             onChange={(e) => setSelectedProduct(e.target.value)}
//             className="px-4 py-2 border rounded focus:outline-none"
//           >
//             <option value="">Select Products</option>
//             {uniqueProducts.map((product) => (
//               <option key={product} value={product}>
//                 Product {product}
//               </option>
//             ))}
//           </select>

//           <select
//             value={selectedBidStatus}
//             onChange={(e) => setSelectedBidStatus(e.target.value)}
//             className="px-4 py-2 border rounded focus:outline-none"
//           >
//             <option value="">Select Bid Status</option>
//             {uniqueBidStatuses.map((status) => (
//               <option key={status} value={status}>
//                 {status}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Display Filtered Data */}
//       {selectedMonth && selectedBidStatus && filteredData.length > 0 ? (
//         filteredData.map((product, index) => {
//           const priceSummary = getPriceSummary(product);
//           const costSummary = getCostSummary(product);

//           return (
//             <div
//               key={index}
//               className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"
//             >
//               {/* Price Comparisons */}
//               <div className="bg-white rounded-lg shadow-lg p-6">
//                 <div className="relative">
//                   <h2 className="text-xl font-bold mb-4">
//                     Price Comparison (INR) for Product {product["Product ID"]} (
//                     {product["Bid Status"]})
//                   </h2>

//                   {/* Comprehensive Summary Box */}
//                   <div className="absolute top-0 right-0 bg-gray-50 p-1 rounded-lg border border-gray-200 shadow-sm">
//                     <div className="space-y-2">
//                       {/* Prices */}
//                       <div className="grid grid-cols-3 gap-2 text-center">
//                         <div>
//                           <div
//                             className="w-3 h-3 rounded-full mx-auto mb-1"
//                             style={{ backgroundColor: COLORS.highestMarket }}
//                           ></div>
//                           <span className="text-xs font-medium">Highest</span>
//                           <p className="text-sm">
//                             ₹{priceSummary.highestMarket.toLocaleString()}
//                           </p>
//                         </div>
//                         <div>
//                           <div
//                             className="w-3 h-3 rounded-full mx-auto mb-1"
//                             style={{ backgroundColor: COLORS.quotedPrice }}
//                           ></div>
//                           <span className="text-xs font-medium">Quoted</span>
//                           <p className="text-sm">
//                             ₹{priceSummary.quotedPrice.toLocaleString()}
//                           </p>
//                         </div>
//                         <div>
//                           <div
//                             className="w-3 h-3 rounded-full mx-auto mb-1"
//                             style={{ backgroundColor: COLORS.lowestMarket }}
//                           ></div>
//                           <span className="text-xs font-medium">Lowest</span>
//                           <p className="text-sm">
//                             ₹{priceSummary.lowestMarket.toLocaleString()}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="h-80">
//                   <ResponsiveContainer width="100%" height="100%">
//   <AreaChart
//     data={getPriceMetrics(product)}
//     margin={{ top: 30, right: 40, left: 0, bottom: 30 }}
//   >
//     {/* Customized Grid */}
//     <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />

//     {/* Axes */}
//     <XAxis 
//       dataKey="name" 
//       tick={{ fontSize: 12, fill: "#334155" }} 
//       tickLine={false} 
//       axisLine={{ stroke: "#cbd5e1" }}
//     />
//     <YAxis 
//       tick={{ fontSize: 12, fill: "#334155" }} 
//       tickLine={false} 
//       axisLine={{ stroke: "#cbd5e1" }}
//     />

//     {/* Tooltip */}
//     <Tooltip 
//       contentStyle={{ backgroundColor: "#ffffff", borderRadius: "8px", border: "1px solid #e2e8f0" }} 
//       labelStyle={{ color: "#334155", fontWeight: "bold" }} 
//       itemStyle={{ color: "#1e293b" }} 
//     />

//     {/* Legend */}
//     <Legend 
//       verticalAlign="top" 
//       align="right" 
//       wrapperStyle={{ paddingTop: "10px", color: "#334155", fontSize: "14px" }} 
//     />

//     {/* Gradient for Area */}
//     <defs>
//       <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
//         <stop offset="5%" stopColor={COLORS.quotedPrice} stopOpacity={0.8} />
//         <stop offset="95%" stopColor={COLORS.quotedPrice} stopOpacity={0} />
//       </linearGradient>
//       <linearGradient id="colorDeltaHigh" x1="0" y1="0" x2="0" y2="1">
//         <stop offset="5%" stopColor={COLORS.deltaHigh} stopOpacity={0.8} />
//         <stop offset="95%" stopColor={COLORS.deltaHigh} stopOpacity={0} />
//       </linearGradient>
//       <linearGradient id="colorDeltaLow" x1="0" y1="0" x2="0" y2="1">
//         <stop offset="5%" stopColor={COLORS.deltaLow} stopOpacity={0.8} />
//         <stop offset="95%" stopColor={COLORS.deltaLow} stopOpacity={0} />
//       </linearGradient>
//     </defs>

//     {/* Area for Prices */}
//     <Area
//       type="monotone"
//       dataKey="price"
//       name="Price"
//       stroke={COLORS.quotedPrice}
//       fill="url(#colorPrice)"
//       strokeWidth={2}
//       animationDuration={800}
//     />
//     <Area
//       type="monotone"
//       dataKey="deltaHighest"
//       name="Delta (High)"
//       stroke={COLORS.deltaHigh}
//       fill="url(#colorDeltaHigh)"
//       strokeWidth={2}
//       animationDuration={800}
//     />
//     <Area
//       type="monotone"
//       dataKey="deltaLowest"
//       name="Delta (Low)"
//       stroke={COLORS.deltaLow}
//       fill="url(#colorDeltaLow)"
//       strokeWidth={2}
//       animationDuration={800}
//     />
//   </AreaChart>
// </ResponsiveContainer>

//                   </div>

//                   {/* Additional Details Section */}
//                   <div className="mt-6 p-4 bg-gray-50 border rounded-lg">
//                     <h3 className="text-lg font-semibold mb-4">
//                       Detailed Price Metrics
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                       {/* Price metrics details remain the same as in the original code */}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Cost Comparison */}
//               <div className="bg-white rounded-lg shadow-lg p-6">
//                 <div className="relative">
//                   <h2 className="text-xl font-bold mb-4">
//                     Cost Comparison (INR) for Product {product["Product ID"]} (
//                     {product["Bid Status"]})
//                   </h2>

//                   {/* Comprehensive Cost Summary Box */}
//                   <div className="absolute top-0 right-0 bg-gray-50 p-1 rounded-lg border border-gray-200 shadow-sm">
//                     <div className="space-y-2">
//                       {/* Costs */}
//                       <div className="grid grid-cols-3 gap-2 text-center">
//                         <div>
//                           <div
//                             className="w-3 h-3 rounded-full mx-auto mb-1"
//                             style={{ backgroundColor: COLORS.highestMarket }}
//                           ></div>
//                           <span className="text-xs font-medium">Highest</span>
//                           <p className="text-sm">
//                             ₹{costSummary.highestMarketCost.toLocaleString()}
//                           </p>
//                         </div>
//                         <div>
//                           <div
//                             className="w-3 h-3 rounded-full mx-auto mb-1"
//                             style={{ backgroundColor: COLORS.quotedPrice }}
//                           ></div>
//                           <span className="text-xs font-medium">Current</span>
//                           <p className="text-sm">
//                             ₹{costSummary.currentCost.toLocaleString()}
//                           </p>
//                         </div>
//                         <div>
//                           <div
//                             className="w-3 h-3 rounded-full mx-auto mb-1"
//                             style={{ backgroundColor: COLORS.lowestMarket }}
//                           ></div>
//                           <span className="text-xs font-medium">Lowest</span>
//                           <p className="text-sm">
//                             ₹{costSummary.lowestMarketCost.toLocaleString()}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="h-80">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <AreaChart
//                         data={getCostMetrics(product)}
//                         margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                       >
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="name" />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         <Area
//                           type="monotone"
//                           dataKey="cost"
//                           name="Cost"
//                           stroke={COLORS.quotedPrice}
//                           fill={COLORS.quotedPrice}
//                           fillOpacity={0.3}
//                         />
//                         <Area
//                           type="monotone"
//                           dataKey="deltaCostHigh"
//                           name="Delta (High)"
//                           stroke={COLORS.deltaHigh}
//                           fill={COLORS.deltaHigh}
//                           fillOpacity={0.3}
//                         />
//                         <Area
//                           type="monotone"
//                           dataKey="deltaCostLow"
//                           name="Delta (Low)"
//                           stroke={COLORS.deltaLow}
//                           fill={COLORS.deltaLow}
//                           fillOpacity={0.3}
//                         />
//                       </AreaChart>
//                     </ResponsiveContainer>
//                   </div>
                  
//                   {/* Additional Details Section for Costs */}
//                   <div className="mt-6 p-4 bg-gray-50 border rounded-lg">
//                     <h3 className="text-lg font-semibold mb-4">
//                       Detailed Cost Metrics
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                       <div>
//                         <span className="font-medium">
//                           Highest Market Cost:
//                         </span>
//                         <p>₹{costSummary.highestMarketCost.toLocaleString()}</p>
//                       </div>
//                       <div>
//                         <span className="font-medium">Lowest Market Cost:</span>
//                         <p>₹{costSummary.lowestMarketCost.toLocaleString()}</p>
//                       </div>
//                       <div>
//                         <span className="font-medium">
//                           Current Cost to Client:
//                         </span>
//                         <p>₹{costSummary.currentCost.toLocaleString()}</p>
//                       </div>
//                       <div>
//                         <span className="font-medium">
//                           Percentage Diff Highest Market Cost:
//                         </span>
//                         <p
//                           className={`flex items-center ${
//                             costSummary.highestMarketCost -
//                               costSummary.currentCost >
//                             0
//                               ? "text-green-600"
//                               : "text-red-600"
//                           }`}
//                         >
//                           {(
//                             ((costSummary.highestMarketCost -
//                               costSummary.currentCost) /
//                               costSummary.currentCost) *
//                             100
//                           ).toFixed(2)}
//                           %
//                           {costSummary.highestMarketCost -
//                             costSummary.currentCost >
//                           0 ? (
//                             <span className="ml-1">▲</span>
//                           ) : (
//                             <span className="ml-1">▼</span>
//                           )}
//                         </p>
//                       </div>
//                       <div>
//                         <span className="font-medium">
//                           Percentage Diff Lowest Market Cost:
//                         </span>
//                         <p
//                           className={`flex items-center ${
//                             costSummary.currentCost -
//                               costSummary.lowestMarketCost >
//                             0
//                               ? "text-green-600"
//                               : "text-red-600"
//                           }`}
//                         >
//                           {(
//                             ((costSummary.currentCost -
//                               costSummary.lowestMarketCost) /
//                               costSummary.currentCost) *
//                             100
//                           ).toFixed(2)}
//                           %
//                           {costSummary.currentCost -
//                             costSummary.lowestMarketCost >
//                           0 ? (
//                             <span className="ml-1">▲</span>
//                           ) : (
//                             <span className="ml-1">▼</span>
//                           )}
//                         </p>
//                       </div>
//                       <div>
//                         <span className="font-medium">
//                           Difference between Highest Market Cost and CTC:
//                         </span>
//                         <p>₹{costSummary.diffhighest.toLocaleString()}</p>
//                       </div>
//                       <div>
//                         <span className="font-medium">
//                           Difference between Lowest Market Cost and CTC :
//                         </span>
//                         <p>₹{costSummary.difflowest.toLocaleString()}</p>
//                       </div>
//                       {/* <div>
//                         <span className="font-medium">Delta High:</span>
//                         <p>₹{costSummary.deltaCostHigh.toLocaleString()}</p>
//                       </div>
//                       <div>
//                         <span className="font-medium">Delta Low:</span>
//                         <p>₹{costSummary.deltaCostLow.toLocaleString()}</p>
//                       </div> */}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-white rounded-lg shadow-lg p-6 lg:col-span-2">
//                 <h2 className="text-xl font-bold mb-4">Product Details</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {getProductDetails(product)
//                     .filter(
//                       ([key]) =>
//                         key !== "Percentage Diff Highest Market" &&
//                         key !== "Percentage Diff Lowest Market"
//                     )
//                     .map(([key, value]) => (
//                       <div key={key} className="p-4 bg-gray-50 rounded-lg">
//                         <h3 className="font-medium text-gray-700">{key}</h3>
//                         <p className="mt-1 text-gray-600">
//                           {value === null
//                             ? "N/A"
//                             : typeof value === "number"
//                             ? key.toLowerCase().includes("percentage")
//                               ? `${value.toFixed(2)}%`
//                               : key.toLowerCase().includes("price") ||
//                                 key.toLowerCase().includes("cost")
//                               ? `₹${value.toLocaleString()}`
//                               : value.toString()
//                             : value.toString()}
//                         </p>
//                       </div>
//                     ))}
//                 </div>
//               </div>
//             </div>
//           );
//         })
//       ) : (
//         <div className="bg-white rounded-lg shadow-lg p-8 text-center text-gray-500">
//           {!selectedMonth || !selectedBidStatus
//             ? "Please select both a month and a bid status to view data."
//             : "No data available for the selected filters."}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PriceAnalysisDashboard;




import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line
} from "recharts";
import data from "./Data/pricer.json";

const PriceAnalysisDashboard = () => {
  // Data processing
  const processedData = data.map((item) => ({
    month: item["Month"],
    productId: item["Product ID"],
    vendorid: item["Vendor ID"],
    vendoraddress: item["Vendor Address"],
    contactduration: item["Contract Duration(Months)"],
    consumption: item["Consumption(Quintal)"],
    bidStatus: item["Bid Status"],
    quotedPrice: Number(item["Quoted Price(INR)"]),
    highestMarketPrice: Number(item["Highest Market Price(INR)"]),
    lowestMarketPrice: Number(item["Lowest Market Price(INR)"]),
    currentCost: Number(item["Current Cost to Client(INR)"]),
    highestMarketCost: Number(item["Highest Market Cost(INR)"]),
    lowestMarketCost: Number(item["Lowest Market Cost(INR)"]),
    percentagediffhighestmarket: Number(item["Percentage Diff Highest Market"]),
    percentagedifflowestmarket: Number(item["Percentage Diff Lowest Market"]),
    differencebetweenhighestmarketpriceandctc: Number(
      item["Difference between Highest Market Price and CTC"]
    ),
    differencebetweenlowestmarketpriceandctc: Number(
      item["Difference between Lowest Market Price and CTC"]
    ),
    ctcdiffwithacceptedbid: Number(item["CTC Diff with Accepted Bid (INR)"]),
    maxquant: item["Max_Quant"],
    quantity: item["Quantity_slab"],
  }));

  // State
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedcontract, setSelectedcontract] = useState("");
  const [selectedquantity, setSelectedquantity] = useState("");

  // Get unique values for filters
  const uniqueProductIds = [...new Set(data.map((item) => item["Product ID"]))];
  const uniqueMonths = [...new Set(data.map((item) => item["Month"]))];
  const uniquecontract = [
    ...new Set(data.map((item) => item["Contract Duration(Months)"])),
  ];
  const uniquequantity = [
    ...new Set(data.map((item) => item["Quantity_slab"])),
  ];

  // Modify the filter for vendor details to only use product and month
  const vendorDetailsData = processedData.filter(
    (item) =>
      (!selectedProductId || item.productId === selectedProductId) &&
      (!selectedMonth || item.month === selectedMonth)
  );

  // Filter data based on selection
  const filteredData = processedData.filter(
    (item) =>
      (!selectedProductId || item.productId === selectedProductId) &&
      (!selectedMonth || item.month === selectedMonth) &&
      (!selectedcontract || item.contactduration === selectedcontract) &&
      (!selectedquantity || item.quantity === selectedquantity)
  );

  const capitalizeFieldName = (field) => {
    return field
      .split(/(?=[A-Z])/)
      .join(" ")
      .replace(/^\w/, (c) => c.toUpperCase());
  };

  // Colors for charts
  const COLORS = {
    highest: "#77DE96",
    //  lowest"",
    quotedPrice: "#797991",
    highestMarketPrice: "#D2F4DC",
    lowestMarketPrice: "#A4D3F6",
    currentCost: "#008080",
    highestMarketCost: "#DC143C",
    lowestMarketCost: "#DC143C",
  };

  const selectedProductDetails = filteredData[0];

  return (
    <div className="p-6 bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">
          Comprehensive Price and Cost Analysis
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">
              Product
            </label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="px-4 py-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="">Select Product</option>
              {uniqueProductIds.map((productId) => (
                <option key={productId} value={productId}>
                  Product {productId}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">
              Month
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-4 py-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="">Select Month</option>
              {uniqueMonths.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">
              Contract Duration
            </label>
            <select
              value={selectedcontract}
              onChange={(e) => setSelectedcontract(e.target.value)}
              className="px-4 py-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="">Select Contract</option>
              {uniquecontract.map((contactduration) => (
                <option key={contactduration} value={contactduration}>
                  {contactduration}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">
              Quantity
            </label>
            <select
              value={selectedquantity}
              onChange={(e) => setSelectedquantity(e.target.value)}
              className="px-4 py-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="">Select Quantity</option>
              {uniquequantity.map((quantity) => (
                <option key={quantity} value={quantity}>
                  {quantity}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Charts and Metrics */}
        {selectedProductId &&
          selectedMonth &&
          selectedcontract &&
          selectedquantity && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Price chart section */}
              <div className="flex space-x-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-4">Price Analysis</h2>

                  {/* Additional Details Section */}
                  <div className="mt-6 mb-4 p-4 bg-gray-50 border rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">
                      Detailed Price Metrics
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="border rounded-lg p-4 shadow-md">
                        <span className="font-medium">Highest Price:</span>
                        <p>
                          ₹
                          {selectedProductDetails?.highestMarketPrice?.toLocaleString()}
                        </p>
                      </div>
                      <div className="border rounded-lg p-4 shadow-md">
                        <span className="font-medium">Lowest Price:</span>
                        <p>
                          ₹
                          {selectedProductDetails?.lowestMarketPrice?.toLocaleString()}
                        </p>
                      </div>
                      <div className="border rounded-lg p-4 shadow-md">
                        <span className="font-medium">Quoted Price:</span>
                        <p>
                          ₹
                          {selectedProductDetails?.quotedPrice?.toLocaleString()}
                        </p>
                      </div>
                      <div className="border rounded-lg p-4 shadow-md">
                        <span className="font-medium">
                          Percentage Diff Highest Market:
                        </span>
                        <p
                          className={`flex items-center font-semibold ${
                            selectedProductDetails?.percentagediffhighestmarket >=
                            0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {selectedProductDetails?.percentagediffhighestmarket?.toFixed(
                            2
                          )}
                          %
                          {selectedProductDetails?.percentagediffhighestmarket >=
                          0 ? (
                            <span className="ml-1">▲</span>
                          ) : (
                            <span className="ml-1">▼</span>
                          )}
                        </p>
                      </div>
                      <div className="border rounded-lg p-4 shadow-md">
                        <span className="font-medium">
                          Percentage Diff Lowest Market:
                        </span>
                        <p
                          className={`flex items-center font-semibold ${
                            selectedProductDetails?.percentagedifflowestmarket >=
                            0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {selectedProductDetails?.percentagedifflowestmarket?.toFixed(
                            2
                          )}
                          %
                          {selectedProductDetails?.percentagedifflowestmarket >=
                          0 ? (
                            <span className="ml-1">▲</span>
                          ) : (
                            <span className="ml-1">▼</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Chart Section */}
                  {filteredData.length > 0 ? (
                    <div className="h-96">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={filteredData}
                          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="month"
                            label={{
                              value: "Month",
                              position: "insideBottomRight",
                              offset: 0,
                            }}
                            interval={0}
                            ticks={[
                              "Week 1 Nov -24",
                              "Week 2 Nov -24",
                              "Week 3 Nov -24",
                              "Week 4 Nov -24",
                            ]}
                            tickFormatter={(value) => `${value}`}
                          />
                          <YAxis
                            tickCount={5}
                            domain={[3000, 5000]}
                            label={{
                              value: "Price (INR)",
                              angle: -90,
                              position: "insideLeft",
                            }}
                            ticks={[3000, 3400, 3800, 4200, 4600, 5000]}
                            tickFormatter={(value) => `${value}`}
                          />
                          <Tooltip
                            formatter={(value, name, props) => [
                              `₹${Number(value).toLocaleString()}`,
                              `${capitalizeFieldName(name)} (${
                                props.payload.productId
                              } - ${props.payload.bidStatus} - ${
                                props.payload.vendorid
                              })`,
                            ]}
                            labelFormatter={(label) => `Month: ${label}`}
                          />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="quotedPrice"
                            stroke={COLORS.quotedPrice}
                            fill={COLORS.quotedPrice}
                            fillOpacity={0.3}
                            strokeWidth={2}
                            name={capitalizeFieldName("quotedPrice")}
                          />
                          <Area
                            type="monotone"
                            dataKey="highestMarketPrice"
                            stroke={COLORS.highest}
                            fill={COLORS.highestMarketPrice}
                            fillOpacity={0.3}
                            strokeWidth={2}
                            name={capitalizeFieldName("highestMarketPrice")}
                          />
                          <Area
                            type="monotone"
                            dataKey="lowestMarketPrice"
                            stroke={COLORS.lowestMarketPrice}
                            fill={COLORS.lowestMarketPrice}
                            strokeWidth={2}
                            fillOpacity={0.3}
                            name={capitalizeFieldName("lowestMarketPrice")}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <p className="text-center text-gray-500">
                      No data available for the selected Vendor
                    </p>
                  )}
                </div>
              </div>

              {/* Cost chart */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">Cost Analysis</h2>
                {/* Additional Details Section */}
                <div className="mt-6 mb-4 p-4 bg-gray-50 border rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">
                    Detailed Price Metrics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <box className="border rounded-lg p-4 shadow-md">
                      <span className="font-medium">
                        Highest Market Cost:
                      </span>
                      <p>
                        ₹
                        {selectedProductDetails?.highestMarketCost?.toLocaleString()}
                      </p>
                    </box>
                    <div className="border rounded-lg p-4 z-2 shadow-md">
                      <span className="font-medium">
                        Lowest Market Cost:
                      </span>
                      <p>
                        ₹
                        {selectedProductDetails?.lowestMarketCost?.toLocaleString()}
                      </p>
                    </div>
                    <div className="border rounded-lg p-4 shadow-md">
                      <span className="font-medium">
                        Total Cost:
                      </span>
                      <p>
                        ₹{selectedProductDetails?.currentCost?.toLocaleString()}
                      </p>
                    </div>
                    <div className="border rounded-lg p-4 shadow-md">
                      <span className="font-medium">
                        Difference between HMP and CTC:
                      </span>
                      <p>
                        ₹
                        {selectedProductDetails?.differencebetweenhighestmarketpriceandctc?.toLocaleString()}
                      </p>
                    </div>
                    <div className="border rounded-lg p-4 shadow-md">
                      <span className="font-medium">
                        Difference between LMP and CTC:
                      </span>
                      <p>
                        ₹
                        {selectedProductDetails?.differencebetweenlowestmarketpriceandctc?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {filteredData.length > 0 ? (
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={filteredData}
                        margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="month"
                          label={{
                            value: "Month",
                            position: "insideBottomRight",
                            offset: 0,
                          }}
                          interval={0}
                          ticks={[
                            "Week 1 Nov -24",
                            "Week 2 Nov -24",
                            "Week 3 Nov -24",
                            "Week 4 Nov -24",
                          ]}
                          tickFormatter={(value) => `${value}`}
                        />
                        <YAxis
                          tickCount={6}
                          domain={[580000, 780000]}
                          label={{
                            value: "COST (INR)",
                            angle: -90,
                            position: "insideLeft",
                            offset: 20,
                          }}
                          width={100}
                          tickFormatter={(value) => `${value.toLocaleString()}`}
                          ticks={[
                            580000,
                            620000,
                            660000,
                            700000,
                            740000,
                            780000,
                          ]}
                        />
                        <Tooltip
                          formatter={(value, name, props) => [
                            `₹${Number(value).toLocaleString()}`,
                            `${capitalizeFieldName(name)} (${
                              props.payload.productId
                            } - ${props.payload.bidStatus} - ${
                              props.payload.vendorid
                            })`,
                          ]}
                          labelFormatter={(label) => `Month: ${label}`}
                        />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="currentCost"
                          stroke={COLORS.quotedPrice}
                          fill={COLORS.quotedPrice}
                          fillOpacity={0.3}
                          strokeWidth={2}
                          name={capitalizeFieldName("Total Cost")}
                        />
                        <Area
                          type="monotone"
                          dataKey="highestMarketCost"
                          stroke={COLORS.highestMarketPrice}
                          fill={COLORS.highestMarketPrice}
                          fillOpacity={0.3}
                          strokeWidth={2}
                          name={capitalizeFieldName("highestMarketCost")}
                        />
                        <Area
                          type="monotone"
                          dataKey="lowestMarketCost"
                          stroke={COLORS.lowestMarketPrice}
                          fill={COLORS.lowestMarketPrice}
                          fillOpacity={0.3}
                          strokeWidth={2}
                          name={capitalizeFieldName("lowestMarketCost")}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <p className="text-center text-gray-500">
                    No data available for the selected Vendor
                  </p>
                )}
              </div>
            </div>
          )}

        {selectedProductId &&
          selectedMonth &&
          selectedcontract &&
          selectedquantity && (
            <div className="space-y-6">
              {/* Vendor Comparison Chart - Full Width */}
              <div className="bg-white rounded-lg shadow-lg p-6 w-full">
                <h2 className="text-xl font-bold mb-4">
                  Vendor Price Comparison
                </h2>

                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={filteredData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="vendorid"
                        label={{
                          value: "Vendors",
                          position: "insideBottomRight",
                          offset: 0,
                        }}
                      />
                      <YAxis
                        label={{
                          value: "Price (INR)",
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />
                      <Tooltip
                        formatter={(value, name) => [
                          `₹${Number(value).toLocaleString()}`,
                          name,
                        ]}
                      />
                      <Legend />

                      <Bar
                        dataKey="quotedPrice"
                        name="Vendor Quoted Price"
                        barSize={30}
                        fill="#91918c"
                      />

                      <Line
                        type="monotone"
                        dataKey="highestMarketPrice"
                        name="Highest Market Price"
                        stroke="#D2F4DC"
                        strokeWidth={3}
                      />

                      <Line
                        type="monotone"
                        dataKey="lowestMarketPrice"
                        name="Lowest Market Price"
                        stroke="#A4D3F6"
                        strokeWidth={3}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Accepted Bid Vendor Details - Full Width, Horizontal Layout */}
              {selectedProductId && selectedMonth && (
                <div className="bg-white rounded-lg shadow-lg p-6 w-full mb-4">
                  <h2 className="text-xl font-bold mb-4">
                    Accepted Bid Vendor Details
                  </h2>

                  {(() => {
                    const acceptedBidVendor = vendorDetailsData.find(
                      (item) => item.bidStatus === "Bid Accepted"
                    );

                    return acceptedBidVendor ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <div className="border rounded-lg p-4 shadow-md">
                          <span className="font-medium block mb-2">
                            Vendor ID
                          </span>
                          <p>{acceptedBidVendor.vendorid}</p>
                        </div>
                        <div className="border rounded-lg p-4 shadow-md">
                          <span className="font-medium block mb-2">
                            Vendor Location
                          </span>
                          <p>{acceptedBidVendor.vendoraddress}</p>
                        </div>
                        <div className="border rounded-lg p-4 shadow-md">
                          <span className="font-medium block mb-2">
                            Contract Duration
                          </span>
                          <p>{acceptedBidVendor.contactduration}</p>
                        </div>
                        <div className="border rounded-lg p-4 shadow-md">
                          <span className="font-medium block mb-2">
                            Quoted Price
                          </span>
                          <p>
                            ₹{acceptedBidVendor.quotedPrice.toLocaleString()}
                          </p>
                        </div>
                        <div className="border rounded-lg p-4 shadow-md">
                          <span className="font-medium block mb-2">
                            Consumption
                          </span>
                          <p>{acceptedBidVendor.consumption} Quintal</p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500">
                        No vendor with accepted bid found
                      </p>
                    );
                  })()}
                </div>
              )}
            </div>
          )}

          { selectedcontract &&
          selectedquantity &&  (
        <div className="bg-white rounded-lg shadow-lg p-6 mt-4 w-full">
          <h2 className="text-xl font-bold mb-4">
            Vendor Price Comparison Table
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">Vendor ID</th>
                  <th className="border p-3 text-left">Vendor Address</th>
                  <th className="border p-3 text-left">Contract Duration</th>
                  <th className="border p-3 text-left">Quoted Price (₹)</th>
                  <th className="border p-3 text-left">Bid Status</th>
                  {/* <th className="border p-3 text-left">Quantity</th> */}
                </tr>
              </thead>
              <tbody>
                {vendorDetailsData
                  .filter(
                    (vendor) =>
                      vendor.productId === selectedProductId &&
                      vendor.month === selectedMonth &&
                      vendor.contactduration === selectedcontract &&
                      vendor.quantity === selectedquantity
                  )
                  .map((vendor, index) => (
                    <tr
                      key={index}
                      className={`${
                        vendor.bidStatus === "Bid Accepted"
                          ? "bg-green-50"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <td className="border p-3">{vendor.vendorid}</td>
                      <td className="border p-3">{vendor.vendoraddress}</td>
                      <td className="border p-3">{vendor.contactduration}</td>
                      <td className="border p-3">
                        ₹{vendor.quotedPrice.toLocaleString()}
                      </td>
                      <td className="border p-3">
                        <span
                          className={`
                          px-2 py-1 rounded text-xs font-medium
                          ${
                            vendor.bidStatus === "Bid Accepted"
                              ? "bg-green-200 text-green-800"
                              : vendor.bidStatus === "Bid Rejected"
                              ? "bg-red-200 text-red-800"
                              : "bg-gray-200 text-gray-800"
                          }
                        `}
                        >
                          {vendor.bidStatus}
                        </span>
                      </td>
                      {/* <td className="border p-3">{vendor.quantity}</td> */}
                    </tr>
                  ))}
              </tbody>
            </table>

            {vendorDetailsData.filter(
              (vendor) =>
                vendor.productId === selectedProductId &&
                vendor.month === selectedMonth &&
                vendor.contactduration === selectedcontract &&
                vendor.quantity === selectedquantity
            ).length === 0 && (
              <p className="text-center text-gray-500 p-4">
                No vendors found for the selected filters
              </p>
            )}
          </div>
        </div>
          )}
      </div>
    </div>
  );
};

export default PriceAnalysisDashboard;
