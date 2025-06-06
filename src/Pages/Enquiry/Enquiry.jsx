
import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  VStack,
  Text,
  useColorModeValue,
  Spinner,
  Card,
  CardBody,
  InputGroup,
  InputLeftElement,
  Icon,
  Flex
} from '@chakra-ui/react';
import { PhoneIcon, EmailIcon } from '@chakra-ui/icons';
import { FaUser, FaQuestionCircle } from 'react-icons/fa';
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const Enquiry = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    query: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // Chakra UI color mode values
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setMessageType('');

    try {
      const response = await fetch(`${BASE_URL}/enquiry/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Enquiry submitted successfully! We will get back to you soon.');
        setMessageType('success');
        setFormData({ name: '', mobile: '', query: '' });
      } else {
        setMessage(data.message || 'Failed to submit enquiry. Please try again.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error submitting enquiry. Please check your connection and try again.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box bg={bgColor} minHeight="100vh">
      <Navbar />
      
      <Container 
        maxW="container.lg" 
        py={{ base: 8, md: 12 }}
        px={{ base: 4, md: 8 }}
      >
        {/* Header Section */}
        <Box mb={8}>
          <Heading
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            textAlign="center"
            color="teal.600"
            mb={4}
            fontWeight="bold"
          >
            Get In Touch With Us
          </Heading>
          <Text
            textAlign="center"
            fontSize={{ base: "md", md: "lg" }}
            color="gray.600"
            maxW="2xl"
            mx="auto"
          >
            Have a question or need assistance? We're here to help! Fill out the form below 
            and our team will get back to you as soon as possible.
          </Text>
        </Box>

        {/* Main Content */}
        <Flex
          direction={{ base: "column", lg: "row" }}
          gap={8}
          align="flex-start"
        >
          {/* Form Section */}
          <Box flex="2">
            <Card 
              shadow="xl" 
              borderRadius="xl"
              bg={cardBg}
              border="1px"
              borderColor={borderColor}
            >
              <CardBody p={{ base: 6, md: 8 }}>
                <Heading
                  size="lg"
                  mb={6}
                  color="teal.600"
                  textAlign="center"
                >
                  Submit Your Enquiry
                </Heading>

                <form onSubmit={handleSubmit}>
                  <VStack spacing={6} align="stretch">
                    {/* Name Field */}
                    <FormControl isRequired>
                      <FormLabel 
                        htmlFor="name"
                        fontSize="md"
                        fontWeight="semibold"
                        color="gray.700"
                      >
                        Full Name
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <Icon as={FaUser} color="gray.400" />
                        </InputLeftElement>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          size="lg"
                          borderRadius="md"
                          _focus={{
                            borderColor: "teal.400",
                            boxShadow: "0 0 0 1px teal.400"
                          }}
                        />
                      </InputGroup>
                    </FormControl>

                    {/* Mobile Field */}
                    <FormControl isRequired>
                      <FormLabel 
                        htmlFor="mobile"
                        fontSize="md"
                        fontWeight="semibold"
                        color="gray.700"
                      >
                        Mobile Number
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <PhoneIcon color="gray.400" />
                        </InputLeftElement>
                        <Input
                          id="mobile"
                          name="mobile"
                          type="tel"
                          value={formData.mobile}
                          onChange={handleChange}
                          placeholder="Enter your 10-digit mobile number"
                          size="lg"
                          borderRadius="md"
                          pattern="[0-9]{10}"
                          _focus={{
                            borderColor: "teal.400",
                            boxShadow: "0 0 0 1px teal.400"
                          }}
                        />
                      </InputGroup>
                    </FormControl>

                    {/* Query Field */}
                    <FormControl isRequired>
                      <FormLabel 
                        htmlFor="query"
                        fontSize="md"
                        fontWeight="semibold"
                        color="gray.700"
                      >
                        Your Query
                      </FormLabel>
                      <Textarea
                        id="query"
                        name="query"
                        value={formData.query}
                        onChange={handleChange}
                        placeholder="Please describe your query or message in detail..."
                        rows={6}
                        size="lg"
                        borderRadius="md"
                        resize="vertical"
                        _focus={{
                          borderColor: "teal.400",
                          boxShadow: "0 0 0 1px teal.400"
                        }}
                      />
                    </FormControl>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      colorScheme="teal"
                      size="lg"
                      width="full"
                      isLoading={loading}
                      loadingText="Submitting..."
                      spinner={<Spinner size="sm" />}
                      borderRadius="md"
                      _hover={{
                        transform: "translateY(-2px)",
                        boxShadow: "lg"
                      }}
                      transition="all 0.2s"
                    >
                      Submit Enquiry
                    </Button>
                  </VStack>
                </form>

                {/* Message Display */}
                {message && (
                  <Box mt={6}>
                    <Alert
                      status={messageType}
                      borderRadius="md"
                      variant="subtle"
                    >
                      <AlertIcon />
                      <Box>
                        <AlertTitle>
                          {messageType === 'success' ? 'Success!' : 'Error!'}
                        </AlertTitle>
                        <AlertDescription>{message}</AlertDescription>
                      </Box>
                    </Alert>
                  </Box>
                )}
              </CardBody>
            </Card>
          </Box>

          {/* Contact Information Sidebar */}
          <Box flex="1">
            <Card 
              shadow="lg" 
              borderRadius="xl"
              bg={cardBg}
              border="1px"
              borderColor={borderColor}
            >
              <CardBody p={6}>
                <Heading
                  size="md"
                  mb={4}
                  color="teal.600"
                  textAlign="center"
                >
                  Contact Information
                </Heading>
                
                <VStack spacing={4} align="start">
                  <Box>
                    <Text fontWeight="semibold" color="gray.700" mb={2}>
                      📧 Email Response Time
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      We typically respond within 24 hours
                    </Text>
                  </Box>
                  
                  <Box>
                    <Text fontWeight="semibold" color="gray.700" mb={2}>
                      📞 Phone Support
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      Available Monday - Friday, 9 AM - 6 PM
                    </Text>
                  </Box>
                  
                  <Box>
                    <Text fontWeight="semibold" color="gray.700" mb={2}>
                      💬 Query Types
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      Product inquiries, Support, Technical questions, General feedback
                    </Text>
                  </Box>
                </VStack>
              </CardBody>
            </Card>
          </Box>
        </Flex>
      </Container>

      <Footer />
    </Box>
  );
};

export default Enquiry;