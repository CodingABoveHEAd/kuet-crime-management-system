function ComplaintForm() {
  return (
    <div>
      <h2>File a Complaint</h2>
      <form>
        <input type="text" placeholder="Subject" /> <br />
        <textarea placeholder="Describe the incident..."></textarea> <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default ComplaintForm;
