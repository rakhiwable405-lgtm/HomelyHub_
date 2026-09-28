import React, { useState } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../LoadingSpinner";
import { axiosInstance } from "../../utils/axios";

const INTEREST_OPTIONS = [
  "Beach",
  "Food",
  "Nightlife",
  "Nature",
  "Adventure",
  "Shopping",
  "History",
  "Relaxation",
];

// FIXED: Changed endpoint to /v1/rent/trip to eliminate duplicate /api/api
const getTripPlan = async (trip) => {
  const { data } = await axiosInstance.post("/v1/rent/trip", trip);
  return data.data;
};

const AiTripPlanner = () => {
  const [destination, setDestination] = useState("mumbai");
  const [budget, setBudget] = useState("10000");
  const [days, setDays] = useState("2");
  const [people, setPeople] = useState("3");
  // Default selected interests
  const [selectedInterests, setSelectedInterests] = useState(["Beach", "Food", "Nature"]);

  const [loading, setLoading] = useState(false);
  const [tripPlan, setTripPlan] = useState(null);

  // Toggle interest selection
  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleGeneratePlan = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTripPlan(null);

    try {
      const plan = await getTripPlan({
        destination,
        budget,
        days,
        people,
        interests: selectedInterests,
      });

      setTripPlan(plan);
      toast.success("Trip plan generated!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to generate trip plan."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="text-center mb-4">
        <h2>✨ Trip Genie</h2>
        <p className="text-muted">
          Tell us where you're going, and Trip Genie will create a personalized day-by-day plan.
        </p>
      </div>

      <div className="card p-4 shadow-sm rounded-4 border-0 mb-4">
        <form onSubmit={handleGeneratePlan}>
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label fw-bold">Destination</label>
              <input
                type="text"
                className="form-control"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              />
            </div>

            <div className="col-md-3">
              <label className="form-label fw-bold">Budget (Rs)</label>
              <input
                type="number"
                className="form-control"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
              />
            </div>

            <div className="col-md-3">
              <label className="form-label fw-bold">Days</label>
              <input
                type="number"
                className="form-control"
                min="1"
                max="10"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                required
              />
            </div>

            <div className="col-md-3">
              <label className="form-label fw-bold">People</label>
              <input
                type="number"
                className="form-control"
                min="1"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Interest Chips with Clear Visual Toggle */}
          <div className="mt-4">
            <label className="form-label fw-bold d-block">Interests</label>
            <div className="d-flex flex-wrap gap-2">
              {INTEREST_OPTIONS.map((interest) => {
                const isSelected = selectedInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    className={`btn btn-sm rounded-pill px-3 ${
                      isSelected ? "btn-success text-white fw-bold" : "btn-outline-secondary"
                    }`}
                    onClick={() => toggleInterest(interest)}
                  >
                    {isSelected ? `✓ ${interest}` : interest}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="btn btn-success w-100 py-3 rounded-3 fw-bold"
              disabled={loading}
            >
              {loading ? "Generating Your Plan..." : "✨ Generate Trip Plan"}
            </button>
          </div>
        </form>
      </div>

      {loading && (
        <div className="text-center my-5">
          <LoadingSpinner />
          <p className="mt-3 text-muted">Asking Trip Genie to craft your itinerary...</p>
        </div>
      )}

      {tripPlan && !loading && (
        <div className="card p-4 shadow-sm rounded-4 border-0 mt-4">
          <h3 className="text-success mb-3">{tripPlan.tripTitle || "Your Trip Plan"}</h3>
          <p className="lead">{tripPlan.summary}</p>
          <hr />

          <h4 className="mt-3 mb-3">📅 Day-by-Day Itinerary</h4>
          {tripPlan.itinerary?.map((dayItem, index) => (
            <div key={index} className="mb-4 p-3 bg-light rounded-3">
              <h5 className="text-primary">
                Day {dayItem.day}: {dayItem.title}
              </h5>
              <ul className="list-group list-group-flush mt-2">
                {dayItem.activities?.map((activity, actIdx) => (
                  <li key={actIdx} className="list-group-item bg-transparent">
                    <strong>{activity.time}:</strong> {activity.description}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {tripPlan.recommendedStayTypes && (
            <div className="alert alert-info mt-3">
              <h5>🏠 HomelyHub Stay Recommendations:</h5>
              <p className="mb-0">{tripPlan.recommendedStayTypes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AiTripPlanner;