"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/common/Loader";
import Message from "../components/common/Message";
import { useSelector } from "react-redux";

const BusinessVerificationPage = () => {
  const { userInfo } = useSelector((state) => state.userLogin) || {};

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (userInfo?.token) {
      fetchRequests();
    }
  }, [userInfo]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError("");
      const { data } = await axios.get("/api/verification", {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      });
      setRequests(data.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("❌ Failed to load verification requests.");
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      setLoading(true);
      await axios.put(
        `/api/verification/${id}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` }
        }
      );
      await fetchRequests();
    } catch (err) {
      console.error(err);
      setError("❌ Failed to update request status.");
      setLoading(false);
    }
  };

  /** ------------------------ Not logged in ------------------------ **/
  if (!userInfo) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <Message variant="error">⚠️ Please log in to view this page.</Message>
      </div>
    );
  }

  /** ------------------------ Everyone logged in sees this ------------------------ **/
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-pink-600">
        Business Verification Requests
      </h2>

      {loading && <Loader />}
      {error && <Message variant="error">{error}</Message>}

      {!loading && !error && requests.length === 0 && (
        <p className="text-center text-gray-500">No verification requests found.</p>
      )}

      <div className="grid gap-6">
        {requests.map((req) => (
          <div
            key={req._id}
            className="bg-white border rounded-lg p-6 shadow space-y-4"
          >
            <h3 className="text-xl font-bold text-pink-600">{req.businessName}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
              <p><strong>Website:</strong> {req.website || "N/A"}</p>
              <p><strong>Industry:</strong> {req.industry}</p>
              <p className="md:col-span-2"><strong>Description:</strong> {req.description}</p>
              <p><strong>Address:</strong> {req.address}</p>
              <p><strong>City:</strong> {req.city}</p>
              <p><strong>Province:</strong> {req.province}</p>
              <p><strong>Registration Number:</strong> {req.registrationNumber}</p>
              <p><strong>Status:</strong> <span className="font-semibold">{req.status}</span></p>
            </div>

            {req.documents && req.documents.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Uploaded Documents:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {req.documents.map((doc, idx) => (
                    <li key={idx}>
                      <a
                        href={`/uploads/${doc}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-600 underline"
                      >
                        View Document {idx + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {req.status === "pending" && (
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleStatusUpdate(req._id, "approved")}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusUpdate(req._id, "rejected")}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            )}

            {req.status === "approved" && (
              <span className="text-green-600 font-semibold">✔️ Approved</span>
            )}
            {req.status === "rejected" && (
              <span className="text-red-600 font-semibold">❌ Rejected</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessVerificationPage;
