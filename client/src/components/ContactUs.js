import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ContactUs.css";

const ContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/contactus", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.status > 500) {
        navigate("/errorpage");
      } else {
        res
          .json()
          .then((resData) => {
            window.alert(resData.message);
            window.location.href = "/";
          })
          .catch((err) => window.alert(err));
      }
    });
  };

  return (
    <div className="contact_form_main_container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>CONTACT ME </h2>
        <h3>
          Please fill out the form below and I will respond to your inquiry in
          1-2 business days.
        </h3>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="message">Message</label>
        <input
          type="text"
          id="message"
          name="message"
          placeholder="Your message"
          value={formData.message}
          onChange={handleInputChange}
          required
        />

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
