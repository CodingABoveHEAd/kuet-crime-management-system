import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/pagestyles/AdminMessages.css";

function AdminMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("/api/contact/all");
        setMessages(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMessages();
  }, []);

  return (
    <div className="admin-messages">
      <h2>💬 User Messages</h2>
      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <div className="message-list">
          {messages.map((msg) => (
            <div className="message-card" key={msg._id}>
              <h4>{msg.username}</h4>
              <p><strong>Email:</strong> {msg.email}</p>
              <p>{msg.message}</p>
              <small>Sent: {new Date(msg.createdAt).toLocaleString()}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminMessages;
