import React, { useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../styles/pagestyles/ComplaintForm.css";

// Fix Leaflet marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Location Picker Component
function LocationPicker({ latitude, longitude, setLatitude, setLongitude }) {
  const MarkerSetter = () => {
    useMapEvents({
      click(e) {
        setLatitude(e.latlng.lat);
        setLongitude(e.latlng.lng);
      },
    });
    return latitude && longitude ? <Marker position={[latitude, longitude]} /> : null;
  };

  return (
    <MapContainer
      center={[22.816, 89.540]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerSetter />
    </MapContainer>
  );
}

// Main Complaint Form Component
function ComplaintForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Theft");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!latitude || !longitude) {
      setMessage({ type: "error", text: "Please select a location on the map" });
      return;
    }

    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    
    // Append all files
    files.forEach((file) => {
      formData.append("evidence", file);
    });

    const token = localStorage.getItem("token");

    try {
      await axios.post("/api/complaints", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage({ type: "success", text: "Complaint submitted successfully!" });
      
      // Reset form
      setTitle("");
      setDescription("");
      setCategory("Theft");
      setLatitude(null);
      setLongitude(null);
      setFiles([]);
      
      // Reset file input
      const fileInput = document.getElementById("file-input");
      if (fileInput) fileInput.value = "";

    } catch (error) {
      console.error("Submission error:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to submit complaint. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="complaint-page">
      <div className="complaint-container">
        <h2 className="complaint-title">Submit a Complaint</h2>
        <p className="complaint-subtitle">
          Report your concerns safely and confidentially
        </p>

        {message.text && (
          <div className={`alert-message ${message.type}`}>
            <span className="alert-icon">
              {message.type === "success" ? "✓" : "⚠"}
            </span>
            <span>{message.text}</span>
          </div>
        )}

        <form className="complaint-form" onSubmit={handleSubmit}>
          {/* Title Input */}
          <div className="form-group">
            <label className="form-label">
              <span className="form-label-icon">📋</span>
              Complaint Title
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter a brief title for your complaint"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={100}
            />
          </div>

          {/* Description Textarea */}
          <div className="form-group">
            <label className="form-label">
              <span className="form-label-icon">📝</span>
              Description
            </label>
            <textarea
              className="form-textarea"
              placeholder="Provide detailed information about the incident..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              maxLength={1000}
            />
          </div>

          {/* Category Select */}
          <div className="form-group">
            <label className="form-label">
              <span className="form-label-icon">🏷️</span>
              Category
            </label>
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="Theft">Theft</option>
              <option value="Harassment">Harassment</option>
              <option value="Assault">Assault</option>
              <option value="Vandalism">Vandalism</option>
              <option value="Fraud">Fraud</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Location Map */}
          <div className="form-group">
            <label className="form-label">
              <span className="form-label-icon">📍</span>
              Crime Location
            </label>
            <div className="map-section">
              <div className="map-container">
                <LocationPicker
                  latitude={latitude}
                  longitude={longitude}
                  setLatitude={setLatitude}
                  setLongitude={setLongitude}
                />
              </div>
              <p className="map-instruction">
                 Click on the map to mark the location where the incident occurred
              </p>
              {latitude && longitude && (
                <div className="location-info">
                  <span className="location-info-icon">✓</span>
                  <p>
                    Selected: <span>{latitude.toFixed(5)}, {longitude.toFixed(5)}</span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* File Upload */}
          <div className="form-group">
            <label className="form-label">
              <span className="form-label-icon">📎</span>
              Evidence / Attachments (Optional)
            </label>
            <div className="file-upload-section">
              <div className="file-input-wrapper">
                <input
                  type="file"
                  id="file-input"
                  className="file-input"
                  multiple
                  accept="image/*,video/*,.pdf"
                  onChange={handleFileChange}
                />
                <label htmlFor="file-input" className="file-input-label">
                  <span className="upload-icon">📁</span>
                  <span>
                    {files.length > 0
                      ? `${files.length} file(s) selected`
                      : "Click to upload photos or documents"}
                  </span>
                </label>
              </div>

              {files.length > 0 && (
                <div className="selected-files">
                  {files.map((file, index) => (
                    <div key={index} className="file-chip">
                      <span className="file-chip-icon">📄</span>
                      <span>{file.name.length > 20 ? file.name.substring(0, 20) + "..." : file.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`submit-btn ${isSubmitting ? "loading" : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Complaint"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ComplaintForm;