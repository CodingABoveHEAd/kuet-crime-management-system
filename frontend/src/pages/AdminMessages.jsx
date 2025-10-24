import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/pagestyles/AdminMessages.css";

function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/contact/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data);
      setMessage({ text: "", type: "" });
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMessage({ text: "Failed to load messages", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      setDeleting(messageId);
      const token = localStorage.getItem("token");

      await axios.delete(`/api/contact/${messageId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessages((prev) => prev.filter((msg) => msg._id !== messageId));

      setMessage({
        text: "Message marked as read and deleted",
        type: "success",
      });

      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    } catch (error) {
      console.error("Error deleting message:", error);
      setMessage({
        text: error.response?.data?.message || "Failed to delete message",
        type: "error",
      });
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="admin-messages">
      <h2>User Messages</h2>

      {message.text && (
        <div className={`message-notification ${message.type}`}>
          {message.text}
          <button
            className="notification-close"
            onClick={() => setMessage({ text: "", type: "" })}
          >
            ✕
          </button>
        </div>
      )}

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">Loading messages...</p>
        </div>
      ) : messages.length === 0 ? (
        <p className="no-messages">No messages yet.</p>
      ) : (
        <div className="message-list">
          {messages.map((msg) => (
            <div className="message-card" key={msg._id}>
              <div className="card-header">
                <h4>{msg.username}</h4>
                <button
                  className={`mark-read-btn ${
                    deleting === msg._id ? "deleting" : ""
                  }`}
                  onClick={() => handleDeleteMessage(msg._id)}
                  disabled={deleting === msg._id}
                  title="Mark as read and delete"
                >
                  {deleting === msg._id ? (
                    <span className="btn-spinner"></span>
                  ) : (
                      <span className="btn-text">✓ Mark as Read & Delete</span>
                  )}
                </button>
              </div>

              <div className="card-content">
                <p>
                  <strong>Email:</strong> {msg.email}
                </p>
                <div className="message-box">
                  <p>{msg.message}</p>
                </div>
                <small className="timestamp">
                  Sent:{" "}
                  {new Date(msg.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminMessages;
