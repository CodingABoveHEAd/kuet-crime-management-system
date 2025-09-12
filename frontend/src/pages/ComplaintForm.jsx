import { useState } from "react";
import axios from "axios";

function ComplaintForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Harresment");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in to submit a complaint");

    try {
      const res = await axios.post(
        "/api/complaints/",
        { title, description, category },
        { headers: { Authorization: `Bearer ${token}` } } // send token in header
      );

      alert(res.data.message);
      setTitle("");
      setDescription("");
      setCategory("Harresment");
    } catch (error) {
      // console.error("❌ Complaint error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to submit complaint");
    }
  };

  return (
    <div>
      <h2>Submit Complaint</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Harassment">Harassment</option>
          <option value="Harassment">Harassment</option>
          <option value="Bullying">Bullyig</option>
          <option value="Ragging">Ragging</option>
          <option value="Eve-teasing">Eve-teasing</option>
          <option value="Theft">Theft</option>
          <option value="Other">Other</option>
        </select>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ComplaintForm;
