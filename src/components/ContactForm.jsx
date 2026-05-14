// src/components/ContactForm.jsx
import React, { useState } from 'react';
import Button from './Button';
import TextInput from './inputs/input';
import TextArea from './inputs/textarea';

const ContactForm = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit', form);
    // TODO: hook up submission logic
  };

  return (
    <form
      onSubmit={handleSubmit}
      action={"https://formspree.io/f/mblkkrgr"}
      className="card bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 card-md max-w-full mx-auto md:mx-0 p-6 md:space-y-3"
    >
      {/* First & Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 lg:gap-4">
        <TextInput
          label="First Name"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          required
        />
        <TextInput
          label="Last Name"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          required
        />
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 lg:gap-4">
        <TextInput
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <TextInput
          label="Phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          required
        />
      </div>

      {/* Message */}
      <TextArea
        label="Message"
        name="message"
        rows={5}
        value={form.message}
        onChange={handleChange}
        required
      />

      {/* Submit */}
      <Button type="submit" variant="primary" className="mx-auto">
        Send Message
      </Button>
    </form>
  );
};

export default ContactForm;
