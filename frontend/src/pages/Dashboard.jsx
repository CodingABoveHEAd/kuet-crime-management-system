import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import "../styles/pagestyles/Dashboard.css";

// Add this CSS directly in your Dashboard.css file

function Dashboard() {
  const { token, user } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImages, setSelectedImages] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Filter & Sort states
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSort, setSelectedSort] = useState("newest");
  
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    underReview: 0,
    resolved: 0
  });

  // Categories for filter dropdown
  const categories = [
    "Theft",
    "Vandalism",
    "Fraud",
    "Assault",
    "Harassment",
    "Other"
  ];

  useEffect(() => {
    fetchComplaints();
  }, [token, user, selectedCategory, selectedSort]);

  const fetchComplaints = async () => {
    if (!user) return;

    try {
      const endpoint =
        user.role === "admin" || user.role === "authority"
          ? "/api/complaints/all"
          : "/api/complaints/my";

      // Build query params
      const params = {};
      if (selectedCategory) params.category = selectedCategory;
      if (selectedSort) params.sortBy = selectedSort;

      const res = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token || localStorage.getItem("token")}`,
        },
        params: params
      });

      setComplaints(res.data);
      calculateStats(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to fetch complaints");
      setLoading(false);
    }
  };

  const calculateStats = (complaintsData) => {
    const total = complaintsData.length;
    const pending = complaintsData.filter(c => c.status === "Pending").length;
    const underReview = complaintsData.filter(c => c.status === "Under Review").length;
    const resolved = complaintsData.filter(c => c.status === "Resolved").length;
    
    setStats({ total, pending, underReview, resolved });
  };

  const handleStatusChange = async (complaintId, newStatus) => {
    try {
      await axios.put(
        `/api/complaints/${complaintId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token || localStorage.getItem("token")}`,
          },
        }
      );

      const updatedComplaints = complaints.map((c) =>
        c._id === complaintId ? { ...c, status: newStatus } : c
      );
      setComplaints(updatedComplaints);
      calculateStats(updatedComplaints);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setLoading(true);
  };

  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
    setLoading(true);
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedSort("newest");
    setLoading(true);
  };

  // Handle multiple images - enhanced logic
  const getComplaintImages = (complaint) => {
    const images = [];
    
    if (complaint.evidence && Array.isArray(complaint.evidence) && complaint.evidence.length > 0) {
      images.push(...complaint.evidence);
    }
    
    if (complaint.images && Array.isArray(complaint.images) && complaint.images.length > 0) {
      complaint.images.forEach(img => {
        if (!images.includes(img)) {
          images.push(img);
        }
      });
    }
    
    if (complaint.image && typeof complaint.image === 'string' && complaint.image.trim() !== '') {
      if (!images.includes(complaint.image)) {
        images.push(complaint.image);
      }
    }
    
    return images.filter(img => img && typeof img === 'string' && img.trim() !== '' && img.startsWith('http'));
  };

  const openImageModal = (images, startIndex = 0) => {
    if (images && images.length > 0) {
      setSelectedImages(images);
      setCurrentImageIndex(startIndex);
    }
  };

  const closeImageModal = () => {
    setSelectedImages(null);
    setCurrentImageIndex(0);
  };

  const nextImage = (e) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev < selectedImages.length - 1 ? prev + 1 : 0
    );
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev > 0 ? prev - 1 : selectedImages.length - 1
    );
  };

  const goToImage = (index, e) => {
    e?.stopPropagation();
    setCurrentImageIndex(index);
  };

  const renderImageGallery = (complaint) => {
    const images = getComplaintImages(complaint);
    
    if (images.length === 0) {
      return (
        <div className="no-image-placeholder">
          <span>📷</span>
        </div>
      );
    }

    if (images.length === 1) {
      return (
        <div className="complaint-images-gallery single">
          <img
            src={images[0]}
            alt="Complaint Evidence"
            className="complaint-image"
            onClick={() => openImageModal(images, 0)}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<div class="no-image-placeholder"><span>📷</span></div>';
            }}
          />
        </div>
      );
    }

    if (images.length <= 3) {
      return (
        <div className={`complaint-images-gallery grid-${images.length}`}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Evidence ${index + 1}`}
              className="complaint-image"
              onClick={() => openImageModal(images, index)}
              onError={(e) => {
                e.target.style.opacity = '0.3';
                e.target.style.border = '2px dashed #ccc';
              }}
            />
          ))}
        </div>
      );
    }

    return (
      <div className="complaint-images-gallery grid-more">
        {images.slice(0, 3).map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Evidence ${index + 1}`}
            className="complaint-image"
            onClick={() => openImageModal(images, index)}
            onError={(e) => {
              e.target.style.opacity = '0.3';
              e.target.style.border = '2px dashed #ccc';
            }}
          />
        ))}
        <div 
          className="images-counter"
          onClick={() => openImageModal(images, 3)}
          title={`View all ${images.length} images`}
        >
          <span>+{images.length - 3}</span>
          <small>more</small>
        </div>
      </div>
    );
  };

  const getPriorityClass = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high": return "priority-high";
      case "medium": return "priority-medium";
      case "low": return "priority-low";
      default: return "priority-medium";
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (selectedImages) {
        switch (e.key) {
          case 'ArrowLeft':
            prevImage();
            break;
          case 'ArrowRight':
            nextImage();
            break;
          case 'Escape':
            closeImageModal();
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [selectedImages, currentImageIndex]);

  if (!user) return (
    <div className="dashboard-container">
      <p>🔐Please Login or Register first</p>
    </div>
  );

  if (loading) return (
    <div className="dashboard-container">
      <p>⏳ Loading dashboard data...</p>
    </div>
  );

  if (error) return (
    <div className="dashboard-container">
      <p>❌ {error}</p>
    </div>
  );

  return (
    <div className="dashboard-container">
      <h2>Crime Management Dashboard</h2>
      <p>
        Welcome back, <strong>{user.name || "User"}</strong> • Role: {user.role.toUpperCase()}
      </p>

      {/* Statistics Cards */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>{stats.total}</h3>
          <p>Total Complaints</p>
        </div>
        <div className="stat-card">
          <h3>{stats.pending}</h3>
          <p>Pending Review</p>
        </div>
        <div className="stat-card">
          <h3>{stats.underReview}</h3>
          <p>Under Investigation</p>
        </div>
        <div className="stat-card">
          <h3>{stats.resolved}</h3>
          <p>Resolved Cases</p>
        </div>
      </div>

      {/* Filter & Sort Controls - Only for Admin/Authority */}
      {(user.role === "admin" || user.role === "authority") && (
        <div className="filter-sort-controls">
          <div className="filter-group">
            <label htmlFor="category-filter">
              <span className="filter-icon">🏷️</span>
              Filter by Category:
            </label>
            <select 
              id="category-filter"
              value={selectedCategory} 
              onChange={handleCategoryChange}
              className="filter-select"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="sort-select">
              <span className="filter-icon">🔄</span>
              Sort by:
            </label>
            <select 
              id="sort-select"
              value={selectedSort} 
              onChange={handleSortChange}
              className="filter-select"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="status">Status</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>

          {(selectedCategory || selectedSort !== "newest") && (
            <button 
              className="clear-filters-btn" 
              onClick={clearFilters}
              title="Clear all filters"
            >
              ✖ Clear Filters
            </button>
          )}
        </div>
      )}

      {complaints.length === 0 ? (
        <p>📝 No complaints found. {selectedCategory && "Try changing your filter settings."}</p>
      ) : (
        <table className="complaints-table">
          <thead>
            <tr>
              <th>Evidence</th>
              <th>Title</th>
              <th>Description</th>
              <th>Category</th>
              <th>Status</th>
              <th>Submitted By</th>
              <th>Date & Time</th>
              {(user.role === "admin" || user.role === "authority") && <th>⚙️ Actions</th>}
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => {
              const imageCount = getComplaintImages(complaint).length;
              return (
                <tr key={complaint._id}>
                  <td className="complaint-image-cell" data-label="Evidence">
                    {renderImageGallery(complaint)}
                    {imageCount > 1 && (
                      <div className="image-count-badge">{imageCount} photos</div>
                    )}
                  </td>
                  <td data-label="Title">
                    {complaint.priority && (
                      <span className={`priority-indicator ${getPriorityClass(complaint.priority)}`}>
                        {complaint.priority}
                      </span>
                    )}
                    {complaint.title}
                  </td>
                  <td data-label="Description">{complaint.description}</td>
                  <td data-label="Category">{complaint.category}</td>
                  <td data-label="Status" data-status={complaint.status}>{complaint.status}</td>
                  <td data-label="Submitted By">{complaint.user?.name || user.name}</td>
                  <td data-label="Date & Time">{formatDate(complaint.createdAt)}</td>
                  {(user.role === "admin" || user.role === "authority") && (
                    <td data-label="Actions">
                      <select
                        value={complaint.status}
                        onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Enhanced Image Modal with Navigation */}
      {selectedImages && (
        <div 
          className={`image-modal ${selectedImages ? 'active' : ''}`} 
          onClick={closeImageModal}
        >
          <button 
            className="image-modal-close" 
            onClick={closeImageModal}
            aria-label="Close modal"
          >
            ×
          </button>
          
          <div className="image-modal-wrapper" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImages[currentImageIndex]}
              alt={`Evidence ${currentImageIndex + 1} of ${selectedImages.length}`}
              className="image-modal-content"
            />
          </div>
          
          {selectedImages.length > 1 && (
            <>
              <div className="image-modal-nav" onClick={(e) => e.stopPropagation()}>
                <button 
                  className="nav-btn prev-btn"
                  onClick={prevImage}
                  aria-label="Previous image"
                >
                  ← Previous
                </button>
                <span className="image-modal-counter">
                  {currentImageIndex + 1} / {selectedImages.length}
                </span>
                <button 
                  className="nav-btn next-btn"
                  onClick={nextImage}
                  aria-label="Next image"
                >
                  Next →
                </button>
              </div>
              
              <div className="image-modal-thumbnails" onClick={(e) => e.stopPropagation()}>
                {selectedImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className={`image-modal-thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={(e) => goToImage(index, e)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;