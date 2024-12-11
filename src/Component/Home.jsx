import React, { useEffect, useState } from "react";
import img1 from "./image/img1.jpg";
import img2 from "./image/img2.jpg";

function Home() {
  const [sectionsInView, setSectionsInView] = useState({
    section1: false,
    section2: false,
    section3: false,
  });

  // Intersection Observer callback to detect visibility
  const handleScroll = (entries, observer) => {
    entries.forEach((entry) => {
      // Check if the section is in the viewport
      if (entry.isIntersecting) {
        setSectionsInView((prevState) => ({
          ...prevState,
          [entry.target.id]: true, // Set the specific section as visible
        }));
      } else {
        setSectionsInView((prevState) => ({
          ...prevState,
          [entry.target.id]: false, // Reset to not visible when out of view
        }));
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleScroll, {
      threshold: 0.5, // Trigger when 50% of the section is visible
      rootMargin: "100px 0px", // Add a small margin around the viewport
    });

    const sections = document.querySelectorAll(".section");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect(); // Cleanup observer
  }, []);

  return (
    <div className="flex justify-center items-start min-h-screen p-4">
      <div className="bg-white bg-opacity-50 p-8 shadow-lg backdrop-filter backdrop-blur-lg w-full rounded-lg">
        <h1 className="text-6xl font-bold text-center mb-12 text-gray-800">
          Welcome to Our Platform
        </h1>

        {/* Section 1 */}
        <div
          id="section1"
          className={`section grid grid-cols-2 gap-8 mb-12 transition-all duration-1000 ease-in-out transform ${
            sectionsInView.section1
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-10"
          }`}
        >
          <div className="flex justify-center">
            <img
              src={img1}
              alt="Product Search"
              className="rounded-lg shadow-lg transition-all duration-1000 ease-in-out"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-5xl font-bold mb-10 text-gray-800">
              Product Search and Vendor Listing
            </h2>
            <p className="text-xl text-gray-700">
              Our platform offers a comprehensive solution where you can search
              for a wide range of products. You'll have access to an extensive
              list of vendors selling the desired items, allowing you to compare
              prices, availability, and shipping options. With advanced
              filtering options, you can narrow down your search to find exactly
              what you're looking for. Whether you're searching for the latest
              electronics, clothing, or home appliances, our platform ensures
              you can easily make informed decisions. You’ll be able to view
              detailed product descriptions, customer reviews, and ratings to
              help guide your purchasing decisions.
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div
          id="section2"
          className={`section grid grid-cols-2 gap-8 mb-12 transition-all duration-1000 ease-in-out transform ${
            sectionsInView.section2
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-10"
          }`}
        >
          <div className="flex flex-col justify-center">
            <h2 className="text-5xl font-bold mb-10 text-gray-800">
              Predictive Analysis and Future Forecasting
            </h2>
            <p className="text-xl text-gray-700">
              Our advanced predictive analysis tool uses machine learning
              algorithms to forecast future price trends, helping you make
              informed purchasing decisions. By analyzing historical data,
              market trends, and seasonal fluctuations, our system can predict
              the best times to buy. This feature gives you a competitive edge,
              ensuring you purchase items at the optimal price point. The
              predictive analysis tool is designed to be user-friendly,
              providing easy-to-understand graphs and recommendations on price
              fluctuations. Stay ahead of the market with accurate, real-time
              forecasting that allows you to plan your purchases more
              effectively and save money.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Predictive Analysis"
              className="rounded-lg shadow-lg transition-all duration-1000 ease-in-out"
            />
          </div>
        </div>

        {/* Section 3 */}
        <div
          id="section3"
          className={`section grid grid-cols-2 gap-8 mb-12 transition-all duration-1000 ease-in-out transform ${
            sectionsInView.section3
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-10"
          }`}
        >
          <div className="flex justify-center">
            <img
              src={img2}
              alt="Price Alerts"
              className="rounded-lg shadow-lg transition-all duration-1000 ease-in-out"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-5xl font-bold mb-10 text-gray-800">
              Price Alerts and Notifications
            </h2>
            <p className="text-xl text-gray-700">
              Set your preferred price for any product, and our smart alert
              system will notify you when the price drops to your desired level.
              Whether you're watching a specific product or tracking a sale
              event, you'll never miss out on a great deal again. With real-time
              notifications sent directly to your device, you can act fast when
              prices reach your target. The price alert system is customizable,
              allowing you to set alerts for multiple items at once and choose
              the type of notifications you receive, including email or push
              notifications. This feature ensures that you get the best deals
              without constantly checking the platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
