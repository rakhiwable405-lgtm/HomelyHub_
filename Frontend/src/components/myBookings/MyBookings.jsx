import React, { useEffect } from "react";
import "../../css/MyBookings.css";
import ProgressSteps from "../ProgressSteps";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchBookingDetails,
  fetchUserBookings,
} from "../../store/Booking/booking-action";

const MyBookings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fix 1: Destructure `loading` (not `loadings`) with safe default fallbacks
  const { bookings = [], loading = false } = useSelector(
    (state) => state.booking || {}
  );

  useEffect(() => {
    // Fetch the user bookings on component mount
    dispatch(fetchUserBookings());
  }, [dispatch]);

  const handleBookingClick = (bookingId) => {
    // Fix 2: Corrected function call to match imported `fetchBookingDetails`
    dispatch(fetchBookingDetails(bookingId));
    navigate(`/user/myBookings/${bookingId}`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!loading && bookings.length === 0) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <h3>Nothing booked yet</h3>
      </div>
    );
  }

  return (
    <>
      <ProgressSteps />
      <div className="wow">
        {bookings.map((booking) => (
          <div
            className="main-container"
            onClick={() => handleBookingClick(booking._id)}
            key={booking._id}
          >
            <div className="mybookings-container row">
              <div className="image-container col-lg-3 col-md-3">
                <img
                  className="booking-img"
                  src={
                    booking.property?.images &&
                    booking.property.images.length > 0
                      ? booking.property.images[0].url
                      : ""
                  }
                  alt="bookings"
                />
              </div>
              <div className="booking-information col-lg-9 col-md-9">
                <h6 className="hotel-name">
                  {booking.property?.propertyName || "Property Name N/A"}
                </h6>
                <div className="stay-information">
                  <span className="info">
                    <span className="material-symbols-outlined icon">
                      bedtime
                    </span>
                    {booking.numberOfnights} nights
                  </span>
                  <span className="info">
                    <span className="material-symbols-outlined icon">
                      calendar_month
                    </span>
                    {new Date(booking.fromDate).toLocaleDateString()}
                  </span>
                  {/* Fix 3: Replaced class with className */}
                  <span className="material-symbols-outlined icon">
                    arrow_forward
                  </span>
                  <span className="info">
                    <span className="material-symbols-outlined icon">
                      calendar_month
                    </span>
                    {new Date(booking.toDate).toLocaleDateString()}
                  </span>
                </div>
                <h5 className="booking-price">
                  {/* Fix 3: Replaced class with className */}
                  <span className="material-symbols-outlined">payments</span>{" "}
                  Total Price :&#8377; {booking.price}
                </h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyBookings;