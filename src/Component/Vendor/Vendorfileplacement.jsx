// import React, { useState } from 'react';

// function Vendorfileplacement() {
//   const [VendorName, setVendorName] = useState('');
//   const [productName, setProductName] = useState('');
//   const [productDescription, setProductDescription] = useState('');
//   const [price, setPrice] = useState('');
//   const [document, setDocument] = useState(null);

//   const handleFileChange = (e) => {
//     setDocument(e.target.files[0]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add form submission logic here, e.g., API call
//     console.log({
//       VendorName,
//       productName,
//       productDescription,
//       price,
//       document,
//     });
//     // Clear form after submission
//     setVendorName("");
//     setProductName('');
//     setProductDescription('');
//     setPrice('');
//     setDocument(null);
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-6">
//       <h2 className="text-2xl font-bold mb-4">Vendor Product Details</h2>
//       <form onSubmit={handleSubmit}>
//       <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">Vendor Name</label>
//           <input
//             type="text"
//             value={VendorName}
//             onChange={(e) => setVendorName(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">Product Name</label>
//           <input
//             type="text"
//             value={productName}
//             onChange={(e) => setProductName(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">Product Description</label>
//           <textarea
//             value={productDescription}
//             onChange={(e) => setProductDescription(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
//             rows="4"
//             required
//           ></textarea>
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">Price</label>
//           <input
//             type="number"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">Upload Document</label>
//           <input
//             type="file"
//             onChange={handleFileChange}
//             className="w-full"
//             required
//           />
//         </div>

//         <div className="flex justify-end">
//           <button
//             type="submit"
//             className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500"
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Vendorfileplacement;


import React, { useState } from 'react';

function Vendorfileplacement() {
  const [VendorName, setVendorName] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [Vendorid, setVendorid] = useState('');
  const [Vendoremail, setVendoremail] = useState('');
  const [document, setDocument] = useState(null); // <-- Add this line to handle the file input

  const handleFileChange = (e) => {
    setDocument(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      VendorName,
      productName,
      productDescription,
      Vendorid,
      Vendoremail,
      document, // You can include the document in the form data if needed
    });
    setVendorName('');
    setProductName('');
    setProductDescription('');
    setVendorid('');
    setVendoremail('');
    setDocument(null); // Reset the document state after form submission
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">Vendor Product Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Vendor Name</label>
          <input
            type="text"
            value={VendorName}
            onChange={(e) => setVendorName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Product Description</label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Vendor Id</label>
          <input
            value={Vendorid}
            onChange={(e) => setVendorid(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Vendor Email</label>
          <input
            type="email"
            placeholder="abc@gmail.com"
            value={Vendoremail}
            onChange={(e) => setVendoremail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Upload Document</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full"
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Vendorfileplacement;
