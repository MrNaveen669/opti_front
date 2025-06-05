import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Heading,
  Text,
  VStack,
  useToast,
  Fade,
  Icon,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { APPOINTMENTS_URL } from "../../config/api"; // Adjust the import path as necessary

const AppointmentBooking = () => {
  const [form, setForm] = useState({ name: "", email: "", date: "", time: "" });
  const [successData, setSuccessData] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessData(null);
    setShowAnimation(false);

    try {
      const res = await fetch(`${APPOINTMENTS_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const data = await res.json(); // assuming backend returns saved appointment
        setSuccessData(data);
        setForm({ name: "", email: "", date: "", time: "" });
        setShowAnimation(true);

        toast({
          title: "Appointment booked!",
          description: "Your appointment has been confirmed.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        // Optional: hide animation after 5 seconds
        setTimeout(() => setShowAnimation(false), 5000);
      } else {
        toast({
          title: "Failed to book appointment",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "An error occurred",
        description: "Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
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
      </form>

      {/* ✅ Success Animation and Info */}
      <Fade in={showAnimation}>
        {successData && (
          <VStack mt={6} spacing={4} align="center">
            <Icon as={CheckCircleIcon} w={10} h={10} color="green.400" />
            <Text fontSize="xl" fontWeight="bold">
              Appointment Booked Successfully!
            </Text>
            <Box
              p={4}
              borderWidth="1px"
              borderRadius="md"
              width="100%"
              bg="gray.50"
            >
              <Text><strong>Name:</strong> {successData.name}</Text>
              <Text><strong>Email:</strong> {successData.email}</Text>
              <Text><strong>Date:</strong> {successData.date}</Text>
              <Text><strong>Time:</strong> {successData.time}</Text>
            </Box>
          </VStack>
        )}
      </Fade>
    </Box>
  );
};

export default AppointmentBooking;
