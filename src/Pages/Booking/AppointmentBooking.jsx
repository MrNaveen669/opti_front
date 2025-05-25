// import React, { useState } from "react";

// const AppointmentBooking = () => {
//   const [formData, setFormData] = useState({ name: "", email: "", date: "", time: "" });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("/api/appointments", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData)
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage("Appointment booked successfully!");
//         setFormData({ name: "", email: "", date: "", time: "" });
//       } else {
//         setMessage(data.error || "Failed to book appointment.");
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage("Server error");
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
//       <h2>Book an Appointment</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required /><br /><br />
//         <input name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} required /><br /><br />
//         <input name="date" type="date" value={formData.date} onChange={handleChange} required /><br /><br />
//         <input name="time" type="time" value={formData.time} onChange={handleChange} required /><br /><br />
//         <button type="submit">Book</button>
//       </form>
//       <p>{message}</p>
//     </div>
//   );
// };

// export default AppointmentBooking;

import React, { useState } from "react";
import { Box, Button, Input, Heading, Text } from "@chakra-ui/react";

const AppointmentBooking = () => {
  const [form, setForm] = useState({ name: "", email: "", date: "", time: "" });
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    try {
      const res = await fetch("http://localhost:5000/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSuccess("Appointment booked successfully!");
        setForm({ name: "", email: "", date: "", time: "" });
      } else {
        setSuccess("Failed to book appointment.");
      }
    } catch (err) {
      console.error(err);
      setSuccess("An error occurred.");
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="lg">
      <Heading mb={4}>Book an Appointment</Heading>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Your Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          mb={3}
          required
        />
        <Input
          placeholder="Your Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          mb={3}
          required
        />
        <Input
          placeholder="Date (YYYY-MM-DD)"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          mb={3}
          required
        />
        <Input
          placeholder="Time"
          name="time"
          type="time"
          value={form.time}
          onChange={handleChange}
          mb={3}
          required
        />
        <Button type="submit" colorScheme="teal" width="100%">
          Book Appointment
        </Button>
        {success && <Text mt={4}>{success}</Text>}
      </form>
    </Box>
  );
};

export default AppointmentBooking;
