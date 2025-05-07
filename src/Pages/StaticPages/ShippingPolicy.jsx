import React from "react";
import { Box, Text, Heading, VStack, HStack, Icon } from "@chakra-ui/react";
import { MdLocalShipping, MdAccessTime, MdInfo } from "react-icons/md";
import { PhoneIcon, EmailIcon } from "@chakra-ui/icons";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";

const ShippingPolicy = () => {
    return (
        <Box>
            <Navbar />
            <Box maxW="800px" mx="auto" mt={10} p={8} borderWidth="1px" borderRadius="lg" boxShadow="lg">
                <Heading textAlign="center" mb={6}>Shipping Policy</Heading>
                <VStack spacing={5} align="start">
                    <HStack align="flex-start">
                        <Icon as={MdLocalShipping} color="teal.500" mt={1} />
                        <Text fontSize="md">
                            <strong>Shipping Charges:</strong> Free shipping on orders above ₹899 within India.
                            Orders below ₹899 will incur a flat ₹50 shipping fee.
                        </Text>
                    </HStack>

                    <HStack align="flex-start">
                        <Icon as={MdAccessTime} color="teal.500" mt={1} />
                        <Text fontSize="md">
                            <strong>Delivery Timeline:</strong> Orders are processed within 1-2 business days.
                            Minimum delivery time: <strong>3 business days</strong>, maximum delivery time: <strong>7 business days</strong>
                            from the date of dispatch. Delivery may take longer for remote areas.
                        </Text>
                    </HStack>

                    <HStack align="flex-start">
                        <Icon as={MdInfo} color="teal.500" mt={1} />
                        <Text fontSize="md">
                            <strong>How Shipping Works:</strong> Once your order is confirmed, we dispatch it using trusted courier
                            partners. A tracking number will be shared via email/SMS to monitor your shipment.
                        </Text>
                    </HStack>

                    <HStack align="flex-start">
                        <Icon as={MdInfo} color="teal.500" mt={1} />
                        <Text fontSize="md">
                            <strong>Delivery Area:</strong> We currently ship only within India. International shipping is not available.
                        </Text>
                    </HStack>

                    <HStack align="flex-start">
                        <Icon as={MdInfo} color="teal.500" mt={1} />
                        <Text fontSize="md">
                            <strong>Delays:</strong> We are not responsible for delays caused by couriers, weather, strikes,
                            or other unforeseen circumstances beyond our control.
                        </Text>
                    </HStack>

                    <HStack align="flex-start">
                        <Icon as={MdInfo} color="teal.500" mt={1} />
                        <Text fontSize="md">
                            <strong>Damaged/Lost Packages:</strong> If your order is damaged or lost in transit, please contact us within 48 hours at
                            <br />

                            <Icon as={PhoneIcon} color="teal.500" />
                            <Text as="span" ml="2"><strong>Phone:</strong> +91 9981463336</Text><br />

                            <Icon as={EmailIcon} color="teal.500" />
                            <Text as="span" ml="2"><strong>Email:</strong> clearvisionoptical.r@gmail.com</Text>

                        </Text>
                    </HStack>
                </VStack>
            </Box>
            <Footer />
        </Box>
    );
};

export default ShippingPolicy;
