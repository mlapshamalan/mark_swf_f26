import React from 'react';

export default function Reservations() {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Reservations</h1>
            <p>Book a table with us!</p>
            <form onSubmit={(e) => e.preventDefault()}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Name: </label>
                    <input type="text" placeholder="Your Name" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Date: </label>
                    <input type="date" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Guests: </label>
                    <input type="number" min="1" defaultValue="2" />
                </div>
                <button type="submit">Reserve Now</button>
            </form>
        </div>
    );
}