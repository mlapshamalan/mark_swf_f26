import { useState, useEffect } from 'react';
import bgHiring from '../assets/images/bg-hiring.png';

export default function Hiring() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        position: 'Boiler Technician',
        experienceYears: '',
        coverNote: '',
    });

    const [errors, setErrors] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        document.body.className = 'hiring-page';
        return () => {
            document.body.className = '';
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = [];

        if (!formData.fullName.trim() || formData.fullName.length > 25) {
            newErrors.push('Full Name is required (25 characters maximum).');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim() || !emailRegex.test(formData.email)) {
            newErrors.push('A valid steam-telegraph email address is required.');
        }

        if (!formData.experienceYears || Number(formData.experienceYears) < 0) {
            newErrors.push('Please specify valid years of mechanical or culinary experience.');
        }

        if (formData.coverNote.length > 50) {
            newErrors.push('Qualifications note must not exceed 50 characters.');
        }

        if (newErrors.length > 0) {
            setErrors(newErrors);
            setSubmitted(false);
        } else {
            setErrors([]);
            setSubmitted(true);
            console.log('Enlistment Application Transmitted as JSON:', JSON.stringify(formData, null, 2));
            setFormData({
                fullName: '',
                email: '',
                position: 'Boiler Technician',
                experienceYears: '',
                coverNote: '',
            });
        }
    };

    return (
        <div className="flex-grow-1 d-flex flex-column"
             style={{
                 background: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${bgHiring}) no-repeat center center fixed`,
                 backgroundSize: 'cover'
             }}
        >
        <main className="container my-5 flex-grow-1">
            <section className="p-4 border border-warning rounded shadow-lg bg-dark text-light mx-auto" style={{ maxWidth: '750px' }}>
                <h1 className="text-warning mb-2 h2 page-heading">Enlist in the Depot Crew</h1>
                <p className="text-secondary mb-4">Submit your credentials for high-pressure culinary operations.</p>

                {errors.length > 0 && (
                    <div className="alert alert-danger" role="alert">
                        {errors.map((err, idx) => (
                            <div key={idx}>{err}</div>
                        ))}
                    </div>
                )}

                {submitted && (
                    <div className="alert alert-success" role="alert">
                        Enlistment Transmitted! Review developer console for raw JSON output.
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-3">
                        <label className="form-label"><i className="fa-solid fa-user text-warning me-1"></i> Candidate Name</label>
                        <input
                            type="text"
                            name="fullName"
                            maxLength="25"
                            className="form-control bg-dark text-light border-warning"
                            value={formData.fullName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label"><i className="fa-solid fa-envelope text-warning me-1"></i> Dispatch Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control bg-dark text-light border-warning"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="row g-3 mb-3">
                        <div className="col-md-6">
                            <label className="form-label"><i className="fa-solid fa-briefcase text-warning me-1"></i> Desired Role</label>
                            <select name="position" className="form-select bg-dark text-light border-warning" value={formData.position} onChange={handleChange}>
                                <option value="Boiler Technician">Boiler Technician</option>
                                <option value="Pneumatic Dispatcher">Pneumatic Dispatcher</option>
                                <option value="Bento Assembler">Bento Assembler</option>
                                <option value="Hound Handler">Hound Handler</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label"><i className="fa-solid fa-clock text-warning me-1"></i> Experience (Years)</label>
                            <input
                                type="number"
                                name="experienceYears"
                                min="0"
                                max="50"
                                className="form-control bg-dark text-light border-warning"
                                value={formData.experienceYears}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="form-label d-flex justify-content-between">
                            <span>Qualifications Summary (Optional)</span>
                            <small>Remaining: <span className="text-warning fw-bold">{50 - formData.coverNote.length}</span></small>
                        </label>
                        <input
                            type="text"
                            name="coverNote"
                            maxLength="50"
                            className="form-control bg-dark text-light border-warning"
                            value={formData.coverNote}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-warning text-dark fw-bold px-4">Transmit Application</button>
                </form>
            </section>
        </main>
        </div>
    );
}