import { useState } from "react";
import axios from "axios";
import "../styles/pagestyles/ComplaintForm.css";

function ComplaintForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Harassment");
  const [evidence, setEvidence] = useState([]); // ✅ multiple files

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      return alert("You must be logged in to submit a complaint");
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      evidence.forEach((file) => formData.append("evidence", file)); // ✅ multiple

      const res = await axios.post("/api/complaints/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert(res.data.message);
      setTitle("");
      setDescription("");
      setCategory("Harassment");
      setEvidence([]);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to submit complaint");
    }
  };

  return (
    <div className="complaint-page">
      <div className="complaint-container">
        <h2 className="complaint-title">Submit Complaint</h2>
        <form className="complaint-form" onSubmit={handleSubmit}>
          <input
            className="form-input"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <br />
          <textarea
            className="form-textarea"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <br />
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Harassment">Harassment</option>
            <option value="Bullying">Bullying</option>
            <option value="Ragging">Ragging</option>
            <option value="Eve-teasing">Eve-teasing</option>
            <option value="Theft">Theft</option>
            <option value="Other">Other</option>
          </select>
          <br />
          <input
            type="file"
            accept="image/*"
            multiple // ✅ multiple selection
            onChange={(e) => setEvidence(Array.from(e.target.files))}
          />
          <br />
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ComplaintForm;
