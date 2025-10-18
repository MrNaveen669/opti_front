import React, { useState } from "react";
import axios from "axios";
import { APPOINTMENTS_URL } from "../../config/api";
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
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  useBreakpointValue,
} from "@chakra-ui/react";
import { CheckCircleIcon, CalendarIcon } from "@chakra-ui/icons";

const AppointmentBooking = () => {
  const [form, setForm] = useState({ name: "", phone: "", date: "", time: "" });
  const [successData, setSuccessData] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const toast = useToast();

  // Responsive values
  const containerPadding = useBreakpointValue({ base: 4, md: 6 });
  const containerMargin = useBreakpointValue({ base: 4, md: 10 });
  const headingSize = useBreakpointValue({ base: "lg", md: "xl" });
  const buttonSize = useBreakpointValue({ base: "md", md: "lg" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessData(null);
    setShowAnimation(false);

    try {
      // Make API call to backend using the configured URL
      const response = await axios.post(APPOINTMENTS_URL, {
        name: form.name,
        phone: form.phone,
        date: form.date,
        time: form.time
      });
      
      setSuccessData(response.data);
      setForm({ name: "", phone: "", date: "", time: "" });
      setShowAnimation(true);

      toast({
        title: "Appointment booked!",
        description: "Your appointment has been confirmed.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setTimeout(() => setShowAnimation(false), 5000);
    } catch (err) {
      console.error(err);
      toast({
        title: "An error occurred",
        description: err.response?.data?.error || "Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      maxW={{ base: "90%", sm: "400px", md: "500px" }}
      mx="auto"
      mt={containerMargin}
      p={containerPadding}
      borderWidth={1}
      borderRadius="lg"
      shadow="md"
    >
      <Heading mb={6} size={headingSize} textAlign="center">
        Book an Appointment
      </Heading>

      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>Full Name</FormLabel>
            <Input
              placeholder="Enter your full name"
              name="name"
              value={form.name}
              onChange={handleChange}
              size={buttonSize}
              focusBorderColor="teal.500"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>Phone Number</FormLabel>
            <Input
              placeholder="Enter your phone number"
              name="phone"
              type="tel"
              pattern="[0-9]{10}"
              value={form.phone}
              onChange={handleChange}
              size={buttonSize}
              focusBorderColor="teal.500"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>Appointment Date</FormLabel>
            <InputGroup>
              <Input
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                size={buttonSize}
                focusBorderColor="teal.500"
                sx={{
                  '::-webkit-calendar-picker-indicator': {
                    background: 'transparent',
                    bottom: 0,
                    color: 'transparent',
                    cursor: 'pointer',
                    height: 'auto',
                    left: 0,
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    width: 'auto',
                  }
                }}
              />
              <InputRightElement
                pointerEvents="none"
                height={buttonSize === "lg" ? "48px" : "40px"}
              >
                <CalendarIcon color="gray.400" />
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>Appointment Time</FormLabel>
            <InputGroup>
              <Input
                name="time"
                type="time"
                value={form.time}
                onChange={handleChange}
                size={buttonSize}
                focusBorderColor="teal.500"
                sx={{
                  '::-webkit-calendar-picker-indicator': {
                    background: 'transparent',
                    bottom: 0,
                    color: 'transparent',
                    cursor: 'pointer',
                    height: 'auto',
                    left: 0,
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    width: 'auto',
                  }
                }}
              />
              <InputRightElement
                pointerEvents="none"
                height={buttonSize === "lg" ? "48px" : "40px"}
              >
                <Icon viewBox="0 0 24 24" color="gray.400">
                  <path
                    fill="currentColor"
                    d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"
                  />
                </Icon>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button
            type="submit"
            colorScheme="teal"
            width="100%"
            size={buttonSize}
            height={{ base: "48px", md: "52px" }}
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="semibold"
            _hover={{
              transform: "translateY(-2px)",
              shadow: "lg",
            }}
            transition="all 0.2s"
          >
            Book Appointment
          </Button>
        </VStack>
      </form>

      <Fade in={showAnimation}>
        {successData && (
          <VStack mt={8} spacing={4} align="center">
            <Icon as={CheckCircleIcon} w={10} h={10} color="green.400" />
            <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" textAlign="center">
              Appointment Booked Successfully!
            </Text>
            <Box
              p={4}
              borderWidth="1px"
              borderRadius="md"
              width="100%"
              bg="gray.50"
              shadow="sm"
            >
              <VStack align="start" spacing={2}>
                <Text fontSize={{ base: "sm", md: "md" }}>
                  <Text as="span" fontWeight="bold">Name:</Text> {successData.name}
                </Text>
                <Text fontSize={{ base: "sm", md: "md" }}>
                  <Text as="span" fontWeight="bold">Phone:</Text> {successData.phone}
                </Text>
                <Text fontSize={{ base: "sm", md: "md" }}>
                  <Text as="span" fontWeight="bold">Date:</Text> {successData.date}
                </Text>
                <Text fontSize={{ base: "sm", md: "md" }}>
                  <Text as="span" fontWeight="bold">Time:</Text> {successData.time}
                </Text>
              </VStack>
            </Box>
          </VStack>
        )}
      </Fade>
    </Box>
  );
};

export default AppointmentBooking;
