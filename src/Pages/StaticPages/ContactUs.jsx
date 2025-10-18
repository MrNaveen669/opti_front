import React from "react";
import { Box, Text, Heading, VStack, HStack, Icon } from "@chakra-ui/react";
import { PhoneIcon, EmailIcon } from "@chakra-ui/icons";
import { MdLocationOn } from "react-icons/md";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";

const ContactUs = () => {
  return (
    <Box>
      <Navbar />
      <Box maxW="600px" mx="auto" mt={10} p={8} borderWidth="1px" borderRadius="lg" boxShadow="lg">
        <Heading textAlign="center" mb={6}>Contact Us</Heading>
        <VStack spacing={4} align="start">
          <HStack>
            <Icon as={PhoneIcon} color="teal.500" />
            <Text fontSize="lg"><strong>Phone:</strong>+91 9981463336</Text>
          </HStack>
          <HStack>
            <Icon as={EmailIcon} color="teal.500" />
            <Text fontSize="lg"><strong>Email:</strong> helloopticlair@gmail.com</Text>
          </HStack>
          <HStack align="flex-start">
            <Icon as={MdLocationOn} color="teal.500" mt={1} />
            <Text fontSize="lg">
              <strong>Location:</strong> In Front of New Vivekanand Park, <br />Budha Para Raipur (C.G.), India.
            </Text>
          </HStack>
        </VStack>
      </Box>
      <Footer />
    </Box>
  );
};

export default ContactUs;
