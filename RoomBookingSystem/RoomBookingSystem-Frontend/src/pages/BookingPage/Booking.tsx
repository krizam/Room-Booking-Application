import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../css/Booking.css";


const Booking: React.FC = () => {
    const [formData, setFormData] = useState({
        userId: '',
        roomId: '',
        fullName: '',
        email: '',
        phoneNumber: '',
        startDate: '',
        endDate: ''
    });

    const [isRoomBooked, setIsRoomBooked] = useState(false);

    useEffect(() => {
        // Fetch booked rooms data from the API when the selected room changes
        if (formData.roomId) {
            const fetchBookedStatus = async () => {
                try {
                    const response = await axios.get(`/api/room/${formData.roomId}/booked`);
                    setIsRoomBooked(response.data.booked);
                } catch (error) {
                    console.error('Error fetching room booking status:', error);
                    setIsRoomBooked(false); // Assume room is not booked if there's an error
                }
            };
            fetchBookedStatus();
        }
    }, [formData.roomId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isRoomBooked) {
            alert('This room is already booked. Please select another room.');
            return;
        }

        try {
            // Send the formData to the backend
            const response = await axios.post('http://localhost:8080/booking/save', formData);
            // Handle success
            alert('Booking saved successfully!');
            setFormData({
                userId: '',
                roomId: '',
                fullName: '',
                email: '',
                phoneNumber: '',
                startDate: '',
                endDate: ''
            });
        } catch (error) {
            // Handle error
            console.error('Error saving booking:', error);
            alert('Room Is Already Booked!!.');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="booking-container">
            <h2 className="booking-title">Booking Form</h2>
            <form className="booking-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">User ID:</label>
                    <input className="form-control" type="text" name="userId" value={formData.userId} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label">Room ID:</label>
                    <input className="form-control" type="text" name="roomId" value={formData.roomId} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label">Full Name:</label>
                    <input className="form-control" type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label">Email:</label>
                    <input className="form-control" type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label">Phone Number:</label>
                    <input className="form-control" type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label">Start Date:</label>
                    <input className="form-control" type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label">End Date:</label>
                    <input className="form-control" type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
                </div>
                <button className="btn-submit" type="submit">Book Room</button>
            </form>
            {isRoomBooked && <p>This room is already booked. Please select another room.</p>}
        </div>
    );
};

export default Booking;
