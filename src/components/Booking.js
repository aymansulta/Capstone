import React from "react";
import BookingForm from "./BookingForm";

const Booking = (props) => {
    return (

        <BookingForm dispatch={props.dispatch} submitForm={props.submitForm} availableTimes={props.availableTimes} />

    )
}

export default Booking;