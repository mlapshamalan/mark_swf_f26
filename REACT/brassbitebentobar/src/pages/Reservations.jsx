import { useState } from 'react';
import bgReservations from '../assets/images/bg-Reservations.png';

export default function Reservations() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        partySize: '',
        date: '',
        time: '',
        seating: 'Indoor Steam Parlor',
        dietaryNotes: '',
        newsletter: false,
    });

    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = [];

        if (!formData.name.trim() || formData.name.length > 20) {
            newErrors.push('Full Name is required and must be 20 characters or fewer.');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim() || !emailRegex.test(formData.email)) {
            newErrors.push('A valid telegraph email address is required.');
        }

        if (!formData.partySize) newErrors.push('Please select a party size (1–8).');
        if (!formData.date) newErrors.push('Reservation date is required.');
        if (!formData.time) newErrors.push('Reservation time is required.');
        if (!formData.seating) newErrors.push('Please select a seating preference.');
        if (formData.dietaryNotes.length > 30) newErrors.push('Dietary notes must not exceed 30 characters.');

        if (newErrors.length > 0) {
            setErrors(newErrors);
            setSuccess(false);
        } else {
            setErrors([]);
            setSuccess(true);
            console.log('Reservation Submitted as JSON:', JSON.stringify(formData, null, 2));
            setFormData({
                name: '',
                email: '',
                partySize: '',
                date: '',
                time: '',
                seating: 'Indoor Steam Parlor',
                dietaryNotes: '',
                newsletter: false,
            });
        }
    };

    return (
        <div
            className="flex-grow-1 d-flex flex-column"
            style={{
                background: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${bgReservations}) no-repeat center center fixed`,
                backgroundSize: 'cover',
            }}
            >
            <main className="container my-5 flex-grow-1">
            <section className="form-section p-4 border border-warning rounded shadow-lg bg-dark text-light mx-auto" style={{ maxWidth: '800px' }}>
                <h1 className="text-warning mb-3 h2">Table Dispatch Request</h1>

                {errors.length > 0 && (
                    <div className="alert alert-danger" role="alert">
                        {errors.map((err, idx) => (
                            <div key={idx}>{err}</div>
                        ))}
                    </div>
                )}

                {success && (
                    <div className="alert alert-success" role="alert">
                        Dispatch Confirmed! Check developer console to view transmitted JSON.
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                    <div className="form-group mb-3">
                        <label className="form-label"><i className="fa-solid fa-user text-warning me-1"></i> Full Name</label>
                        <input type="text" name="name" className="form-control bg-dark text-light border-warning" value={formData.name} onChange={handleChange} />
                    </div>

                    <div className="form-group mb-3">
                        <label className="form-label"><i className="fa-solid fa-envelope text-warning me-1"></i> Email Address</label>
                        <input type="email" name="email" className="form-control bg-dark text-light border-warning" value={formData.email} onChange={handleChange} />
                    </div>

                    <div className="row g-3 mb-3">
                        <div className="col-md-4">
                            <label className="form-label"><i className="fa-solid fa-users text-warning me-1"></i> Party Size</label>
                            <select name="partySize" className="form-select bg-dark text-light border-warning" value={formData.partySize} onChange={handleChange}>
                                <option value="">Select size...</option>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                    <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label"><i className="fa-solid fa-calendar text-warning me-1"></i> Date</label>
                            <input type="date" name="date" className="form-control bg-dark text-light border-warning" value={formData.date} onChange={handleChange} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label"><i className="fa-solid fa-clock text-warning me-1"></i> Time</label>
                            <input type="time" name="time" className="form-control bg-dark text-light border-warning" value={formData.time} onChange={handleChange} />
                        </div>
                    </div>

                    <fieldset className="form-fieldset mb-3 p-3 border border-warning rounded">
                        <legend className="float-none w-auto px-2 fs-6 fw-bold text-warning">Seating Preference</legend>
                        {['Indoor Steam Parlor', 'Airship Deck', 'Courier Bar'].map((seat) => (
                            <div className="form-check form-check-inline" key={seat}>
                                <input
                                    type="radio"
                                    name="seating"
                                    value={seat}
                                    className="form-check-input"
                                    checked={formData.seating === seat}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label">{seat}</label>
                            </div>
                        ))}
                    </fieldset>

                    <div className="form-group mb-3">
                        <label className="form-label d-flex justify-content-between">
                            <span>Dietary Notes (Optional)</span>
                            <small>Remaining: <span className="text-warning fw-bold">{30 - formData.dietaryNotes.length}</span></small>
                        </label>
                        <input type="text" name="dietaryNotes" maxLength="30" className="form-control bg-dark text-light border-warning" value={formData.dietaryNotes} onChange={handleChange} />
                    </div>

                    <div className="form-check mb-4">
                        <input type="checkbox" name="newsletter" className="form-check-input" checked={formData.newsletter} onChange={handleChange} />
                        <label className="form-check-label">Dispatch weekly steam-courier menu updates</label>
                    </div>

                    <div className="button-group d-flex gap-3">
                        <button type="submit" className="btn btn-warning text-dark fw-bold">Transmit Request</button>
                        <button type="reset" className="btn btn-outline-secondary text-light" onClick={() => setFormData({ name: '', email: '', partySize: '', date: '', time: '', seating: 'Indoor Steam Parlor', dietaryNotes: '', newsletter: false })}>Reset Form</button>
                    </div>
                </form>
            </section>
        </main>
        </div>
    );
}