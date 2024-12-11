import React, { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import srm from "./Data/srs.json";

const SupplierRiskOverview = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("All Products");
  const [riskCounts, setRiskCounts] = useState({
    low: 0,
    medium: 0,
    high: 0,
    noRating: 0,
  });

  useEffect(() => {
    setSuppliers(srm);
    setFilteredSuppliers(srm);
    calculateRiskCounts(srm);
  }, []);

  const calculateRiskCounts = (data) => {
    const counts = { low: 0, medium: 0, high: 0, noRating: 0 };
    data.forEach((supplier) => {
      if (supplier.SRS >= 151) counts.high += 1;
      else if (supplier.SRS >= 51) counts.medium += 1;
      else if (supplier.SRS > 0) counts.low += 1;
      else counts.noRating += 1;
    });
    setRiskCounts(counts);
  };

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    filterSuppliers(e.target.value, selectedProduct);
  };

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
    filterSuppliers(searchTerm, e.target.value);
  };

  const filterSuppliers = (searchTerm, product) => {
    let filtered = suppliers;

    if (searchTerm) {
      filtered = filtered.filter((supplier) =>
        supplier.Supplier.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (product !== "All Products") {
      filtered = filtered.filter((supplier) => supplier.Product === product);
    }

    setFilteredSuppliers(filtered);
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-100 p-4">
      {/* Outer Container */}
      <div className="bg-white w-full max-w-6xl rounded-lg shadow-lg p-6">
        {/* Main Heading */}
        <h1 className="text-2xl font-bold text-center mb-6">
          Supplier Risk Overview
        </h1>

        {/* Search and Filter Section */}
        <div className="flex justify-center items-center mb-4 space-x-4">
          <input
            type="text"
            placeholder="Search Suppliers"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded-md p-2 w-1/4"
          />
          <select
            value={selectedProduct}
            onChange={handleProductChange}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="All Products">All Products</option>
            <option value="Product A">Product A</option>
            <option value="Product B">Product B</option>
            <option value="Product C">Product C</option>
            {/* Add more products as needed */}
          </select>
        </div>

        {/* Risk Level Container */}
        <div className="flex justify-center items-center mb-8">
          <div className="flex space-x-8">
            {/* High Risk */}
            <div className="flex flex-col items-center">
              <CircularProgressbar
                value={riskCounts.high}
                text={`${riskCounts.high}`}
                styles={{
                  path: { stroke: "red" },
                  text: { fill: "red", fontSize: "16px", fontWeight: "bold" },
                }}
                strokeWidth={12}
                className="w-24 h-24"
              />
              <span className="mt-2 text-sm text-gray-600">High Risk</span>
            </div>

            {/* Medium Risk */}
            <div className="flex flex-col items-center">
              <CircularProgressbar
                value={riskCounts.medium}
                text={`${riskCounts.medium}`}
                styles={{
                  path: { stroke: "orange" },
                  text: {
                    fill: "orange",
                    fontSize: "16px",
                    fontWeight: "bold",
                  },
                }}
                strokeWidth={12}
                className="w-24 h-24"
              />
              <span className="mt-2 text-sm text-gray-600">Medium Risk</span>
            </div>

            {/* Low Risk */}
            <div className="flex flex-col items-center">
              <CircularProgressbar
                value={riskCounts.low}
                text={`${riskCounts.low}`}
                styles={{
                  path: { stroke: "green" },
                  text: { fill: "green", fontSize: "16px", fontWeight: "bold" },
                }}
                strokeWidth={12}
                className="w-24 h-24"
              />
              <span className="mt-2 text-sm text-gray-600">Low Risk</span>
            </div>

            {/* No Rating */}
            <div className="flex flex-col items-center">
              <CircularProgressbar
                value={riskCounts.noRating}
                text={`${riskCounts.noRating}`}
                styles={{
                  path: { stroke: "gray" },
                  text: { fill: "gray", fontSize: "16px", fontWeight: "bold" },
                }}
                strokeWidth={12}
                className="w-24 h-24"
              />
              <span className="mt-2 text-sm text-gray-600">No Rating</span>
            </div>
          </div>
        </div>

        {/* Supplier List Heading */}
        <h3 className="text-lg font-bold text-left mb-4">Supplier List</h3>

        {/* Supplier Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg shadow border border-gray-300">
            <thead className="bg-gray-100 rounded-lg">
              <tr>
                <th className="border border-gray-300 p-3 text-left">
                  Product
                </th>
                <th className="border border-gray-300 p-3 text-left">
                  Vendor ID
                </th>
                <th className="border border-gray-300 p-3 text-left">
                  Location
                </th>
                <th className="border border-gray-300 p-3 text-left">SRS</th>
                <th className="border border-gray-300 p-3 text-left">
                  Last Update
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.length > 0 ? (
                filteredSuppliers.map((supplier) => (
                  <tr key={supplier["Vendor ID"]} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-3">
                      {supplier.Supplier}
                    </td>
                    <td className="border border-gray-300 p-3">
                      {supplier["Vendor ID"]}
                    </td>
                    <td className="border border-gray-300 p-3">
                      {supplier.Location}
                    </td>
                    <td className="border border-gray-300 p-3">
                      {getSRSBadge(supplier.SRS)}
                    </td>
                    <td className="border border-gray-300 p-3">
                      {supplier["Last update"]}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="border border-gray-300 p-3 text-center"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SupplierRiskOverview;
