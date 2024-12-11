import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Component/NavBar';
import LandingPage from './Landingpage';
import Home from './Component/Home';
import Product from './Component/Product';
import Forecast from './Component/Solution/Forecast';
import Pricerisk from './Component/Solution/Pricerisk';
import Category from './Component/Solution/category';
import Vendor from './Component/Solution/Vendorrisk';
import Pricechange from './Component/Solution/Pricechange';
import PriceForecast from './Component/Forecast/Priceforecast';
import SupplyForecast from './Component/Forecast/Supplyforecast';
import ConsumptionForecast from './Component/Forecast/Consumptionforecast';
import Vender from './Component/Vendor/Vender';
import Analysis from './Component/Analysis';
import Data from './Component/Data/Data';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Landing page as default route */}
        <Route path="/" element={<LandingPage />} />

        {/* Route for vendor login */}
        <Route path="/vendor" element={<Vender />} />

        {/* Owner routes with NavBar and main application routes */}
        <Route
          path="/*"
          element={
            <div
              className="bg-no-repeat bg-cover bg-center bg-yellow-50"
              style={{
               // backgroundImage: `url('https://images.pexels.com/photos/1796698/pexels-photo-1796698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
               
               minHeight: '100vh',
                width: '100vw',
                position: 'relative',
              }}
            >
              <NavBar />
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/product" element={<Product />} />
                <Route path="/data" element={<Data />} />
                <Route path="/forecast" element={<Forecast />} />
                <Route path="/price-risk" element={<Pricerisk />} />
                <Route path="/price-change" element={<Pricechange />} />
                <Route path="/category-risk" element={<Category />} />
                <Route path="/vendor-risk" element={<Vendor />} />
                <Route path="/price-forecast" element={<PriceForecast />} />
                <Route path="/supply-forecast" element={<SupplyForecast />} />
                <Route path="/consumption-forecast" element={<ConsumptionForecast />} />
                <Route path="/analysis" element={<Analysis />} />
              </Routes>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
