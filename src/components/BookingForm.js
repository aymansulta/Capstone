import React, { useState } from "react";

const BookingForm = (props) => {

    const [date, setDate] = useState("");
    const [time, settime] = useState("");
    const [guests, setGuests] = useState("");
    const [occasion, setOccasion] = useState("");

    const handleChange = (e) => {
        setDate(e);
        props.dispatch(e);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.submitForm(e);
    }

    const getFormValid = () => {
        return (
        date &&
        time &&
        guests &&
        occasion
        )
    }

    return (
        <header>
            <section>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <div>
                            <label htmlFor="book-date">Choose Date:</label>
                            <input id="book-date" value={date} onChange={(e) => handleChange(e.target.value)} type="date" required />
                        </div>

                        <div>
                            <label htmlFor="book-time">Choose Time:</label>
                            <select id="book-time" value={time} onChange={(e) => settime(e.target.value)} type="time" required>
                                <option value="">Select a Time</option>
                                {
                                    props.availableTimes.availableTimes.map(availableTimes => {
                                        return (
                                            <option key={availableTimes}>{availableTimes}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div>
                            <label htmlFor="book-guests">Number of Guests:</label>
                            <input id="book-guests" value={guests} type="number" min={1} max={10} onChange={(e) => setGuests(e.target.value)} required/>
                        </div>

                        <div>
                            <label htmlFor="book-occasion">Occasion:</label>
                            <select id="book-occasion" key={occasion} value={occasion} onChange={(e) => setOccasion(e.target.value)} required>
                                <option>Birthday</option>
                                <option>Anniversary</option>
                            </select>
                        </div>

                        <div className="btnReceive">
                            <button aria-label="on Click" type="submit" value={"Make Your Reservation"} disabled={!getFormValid()}>Make Your Reservation</button>
                        </div>
                    </fieldset>
                </form>
            </section>
        </header>
    )
}

export default BookingForm;