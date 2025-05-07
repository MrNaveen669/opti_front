import React from "react";
import {
  Box,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Container,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { WarningIcon, CheckCircleIcon, TimeIcon, InfoIcon } from "@chakra-ui/icons";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";

const CancellationsAndRefunds = () => {
  return (
    <Box bg="#f0f0f0" minHeight="100vh">
      <Navbar />
      <Container maxW="container.lg" py={8}>
        <Heading as="h1" size="xl" mb={4}>
          Cancellation and Refund Policy
        </Heading>

        <Text fontWeight="bold" mb={4}>
          Last updated: April 28, 2025
        </Text>

        <Text mb={4}>
          At <strong>TUKESHWAR SAHU</strong>, we value our customers and strive to provide the best
          service possible. We have a flexible cancellation and refund policy as
          outlined below:
        </Text>

        <UnorderedList spacing={4}>
          <ListItem>
            <HStack align="start">
              <Icon as={TimeIcon} color="blue.500" mt={1} />
              <Text>
                Cancellations are allowed only if requested within <strong>7 days</strong> of placing
                the order. Cancellation requests may not be accepted if the order has already been
                processed or shipped by our vendors or merchants.
              </Text>
            </HStack>
          </ListItem>

          <ListItem>
            <HStack align="start">
              <Icon as={WarningIcon} color="red.500" mt={1} />
              <Text>
                We do not accept cancellations for perishable items such as flowers, food, or similar
                products. However, if the customer provides proof of poor product quality, a refund
                or replacement may be issued.
              </Text>
            </HStack>
          </ListItem>

          <ListItem>
            <HStack align="start">
              <Icon as={InfoIcon} color="purple.500" mt={1} />
              <Text>
                If you receive a damaged or defective product, please report it to our{" "}
                <strong>Customer Service</strong> within <strong>7 days</strong> of receipt. We will
                verify the issue with the merchant and process the request accordingly.
              </Text>
            </HStack>
          </ListItem>

          <ListItem>
            <HStack align="start">
              <Icon as={InfoIcon} color="purple.500" mt={1} />
              <Text>
                If you believe the product received differs from what was shown on the website or does
                not meet your expectations, please notify our Customer Service team within{" "}
                <strong>7 days</strong>. We will review your complaint and respond with an appropriate
                resolution.
              </Text>
            </HStack>
          </ListItem>

          <ListItem>
            <HStack align="start">
              <Icon as={CheckCircleIcon} color="green.500" mt={1} />
              <Text>
                For products covered by a manufacturer’s warranty, please contact the manufacturer
                directly for claims.
              </Text>
            </HStack>
          </ListItem>

          <ListItem>
            <HStack align="start">
              <Icon as={CheckCircleIcon} color="green.500" mt={1} />
              <Text>
                Any refunds approved by <strong>TUKESHWAR SAHU</strong> will be processed within{" "}
                <strong>9 to 15 business days</strong> to the original payment method.
              </Text>
            </HStack>
          </ListItem>
        </UnorderedList>
      </Container>
      <Footer />
    </Box>
  );
};

export default CancellationsAndRefunds;
