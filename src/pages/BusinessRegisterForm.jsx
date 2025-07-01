"use client";

import React, { useState } from 'react';
import axios from 'axios';

const BusinessRegisterForm = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    website: '',
    address: '',
    city: '',
    province: '',
    industry: '',
    description: '',
    registrationNumber: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(true);   // 👈 Added to toggle visibility

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (!userInfo || !userInfo.token) {
        setError('⚠️ You must be logged in!');
        return;
      }

      const res = await axios.post('/api/verification', formData, {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      });

      if (res.data.success) {
        setMessage('✅ Verification request submitted! Awaiting admin approval.');
        setError('');
        setFormData({
          businessName: '',
          website: '',
          address: '',
          city: '',
          province: '',
          industry: '',
          description: '',
          registrationNumber: '',
        });
      } else {
        setError('❌ Submission failed.');
        setMessage('');
      }
    } catch (err) {
      setError('❌ Error while submitting verification request.');
      setMessage('');
    }
  };

  if (!visible) return null; // 👈 If closed, don't render anything

  return (
    <div className="relative max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg border border-gray-200 overflow-y-auto max-h-[90vh]">
      {/* Close Button */}
      <button
        onClick={() => setVisible(false)}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
        aria-label="Close"
      >
        ✖️
      </button>

      <h2 className="text-2xl font-bold mb-6 text-center text-pink-600">
        Register Your Business (Pakistan)
      </h2>

      {message && <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">{message}</div>}
      {error && <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Business Name</label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Website (Optional)</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Industry</label>
          <input
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Province</label>
            <input
              type="text"
              name="province"
              value={formData.province}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Registration Number</label>
          <input
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-pink-600 text-white rounded hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400 mt-4"
        >
          Register Business
        </button>
      </form>
    </div>
  );
};

export default BusinessRegisterForm;
