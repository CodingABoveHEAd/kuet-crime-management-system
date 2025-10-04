import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../styles/pagestyles/AdminMap.css"; // Import the new CSS file

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function AdminMap() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("/api/complaints/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setComplaints(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  const validComplaints = complaints.filter(
    (c) => c.location && c.location.latitude && c.location.longitude
  );

  return (
    <div className="admin-map-page">
      <div className="admin-map-container">
        <div className="admin-map-header">
          <h2>
            <span>📍</span> Crime Locations Map
          </h2>
          <div className="map-stats">
            <div className="stat-item">
              Total Complaints: <strong>{complaints.length}</strong>
            </div>
            <div className="stat-item">
              Mapped Locations: <strong>{validComplaints.length}</strong>
            </div>
          </div>
        </div>

        <div className="map-wrapper">
          {loading ? (
            <div className="map-loading">
              <div className="loading-spinner"></div>
              Loading map data...
            </div>
          ) : validComplaints.length === 0 ? (
            <div className="map-empty-state">
              <div className="map-empty-state-icon">🗺️</div>
              <h3>No Complaints with Location Data</h3>
              <p>
                Complaints with location information will appear on this map.
              </p>
            </div>
          ) : (
            <MapContainer
              center={[22.816, 89.54]}
              zoom={12}
              scrollWheelZoom={true}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {validComplaints.map((c) => (
                <Marker
                  key={c._id}
                  position={[c.location.latitude, c.location.longitude]}
                >
                  <Popup>
                    <strong>{c.title}</strong>
                    <br />
                    {c.description}
                    <br />
                    Status: {c.status}
                    <br />
                    Category: {c.category}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminMap;
