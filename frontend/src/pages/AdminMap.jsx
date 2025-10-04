import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

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
      }
    };
    fetchComplaints();
  }, []);

  return (
    <div>
      <h2>📍 Crime Locations Map</h2>
      <MapContainer center={[22.816, 89.540]} zoom={12} style={{ height: "600px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {complaints.
        filter((c) => c.location && c.location.latitude && c.location.longitude).
        map((c) => (
          <Marker key={c._id} position={[c.location.latitude, c.location.longitude]}>
            <Popup>
              <strong>{c.title}</strong><br />
              {c.description}<br />
              Status: {c.status}<br />
              Category: {c.category}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default AdminMap;
