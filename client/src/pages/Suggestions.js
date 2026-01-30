import React, { useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import './Suggestions.css';

export default function Suggestions() {
  const [formData, setFormData] = useState({
    name: '',
    nic: '',
    email: '',
    mobilenumber: '',
    department: '',
    subject: '',
    suggestioncontent: '',
    priority: '',
    attachments: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files && files.length > 0 ? files[0] : null,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div>
      <Navbar />
      <div>
        <h2>Suggestion Form</h2>
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
            <label>Suggestion Content</label><br />
            <textarea
              name="suggestioncontent"
              placeholder="Suggestion Content"
              value={formData.suggestioncontent}
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

          <div>
            <label>Attach prototype</label>
            <input
              type="file"
              name="attachments"
              onChange={handleChange}
            />
          </div>

          <p>Response time: 10 working days</p>

          <button type="submit">Make Suggestion</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
