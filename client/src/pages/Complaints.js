import React, { useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import './Complaints.css';

export default function Complaints() {
  const [formData, setFormData] = useState({
    name: '',
    nic: '',
    email: '',
    mobilenumber: '',
    department: '',
    subject: '',
    reportcontent: '',
    priority: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5004/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      alert(result.message || 'Complaint submitted');
    } catch (error) {
      console.error('Error submitting complaint:', error);
      alert('Error submitting complaint');
    }
  };

  return (
    <div>
      <Navbar />
      <div>
        <h2>Complaints Form</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Your Name</label><br />
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>NIC</label><br />
            <input
              type="text"
              placeholder="NIC"
              name="nic"
              value={formData.nic}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Mobile Number</label><br />
            <input
              type="text"
              placeholder="Mobile Number"
              name="mobilenumber"
              value={formData.mobilenumber}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Email</label><br />
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Select Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              <option value="Ministry of Defence">Ministry of Defence</option>
              <option value="Ministry of Finance, Economic Stabilization and National Policies">
                Ministry of Finance, Economic Stabilization and National Policies
              </option>
              <option value="Ministry of Technology">Ministry of Technology</option>
              <option value="Ministry of Women, Child Affairs and Social Empowerment">
                Ministry of Women, Child Affairs and Social Empowerment
              </option>
              <option value="Ministry of Ports, Shipping and Aviation">
                Ministry of Ports, Shipping and Aviation
              </option>
              <option value="Ministry of Investment Promotion">
                Ministry of Investment Promotion
              </option>
            </select>
          </div>

          <div>
            <label>Subject</label><br />
            <input
              type="text"
              placeholder="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Report Content</label><br />
            <textarea
              name="reportcontent"
              placeholder="Report Content"
              value={formData.reportcontent}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Select Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
            >
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </select>
          </div>

          <p>Response time: 10 working days</p>
          <button type="submit">Make Complaint</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
