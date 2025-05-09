


import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cartReset } from "../../redux/CartPage/action";
import { addToOrder } from "../../redux/order/order.actions";
import { 
  Box, 
  Button, 
  Flex, 
  Image, 
  Grid, 
  Text, 
  useToast, 
  Heading,
  Stack,
  Divider,
  HStack,
  Icon,
  Badge,
  SimpleGrid
} from "@chakra-ui/react";
import { FaLock, FaCheckCircle, FaShieldAlt, FaCreditCard } from "react-icons/fa";
import axios from "axios";
import { PAYMENT_URL } from "../../config/api"; // Import API endpoint from config
import { RAZORPAY_CONFIG } from "../../config/payment"; // Import Razorpay config
import "../../App.css";

const Payment = () => {
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.CartReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  
  useEffect(() => {
    // Load Razorpay script when component mounts
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Calculate total price
  const getTotalPrice = () => {
    const totalPrice = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    return Math.round(totalPrice ); // Adding tax
  };

  // Get subtotal
  const getSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  // Get tax amount
  const getTaxAmount = () => {
    return Math.round(getSubtotal() * 0);
  };

  // Handle Razorpay Payment
  const handleRazorpayPayment = async () => {
    setLoading(true);
    
    try {
      const orderData = {
        amount: getTotalPrice(),
        currency: "INR",
        receipt: `receipt_${Date.now()}`
      };
      
      console.log("Sending order request:", orderData);
      
      const { data } = await axios.post(`${PAYMENT_URL}/create-order`, orderData);
      console.log("Order response:", data);
      
      // Configure Razorpay options
      const options = {
        key: RAZORPAY_CONFIG.KEY_ID,
        amount: data.amount, // Amount from server in paisa
        currency: data.currency,
        name: RAZORPAY_CONFIG.MERCHANT_NAME,
        description: RAZORPAY_CONFIG.DESCRIPTION,
        order_id: data.id,
        image: RAZORPAY_CONFIG.LOGO_URL,
        handler: function(response) {
          // Payment successful
          handlePaymentSuccess(response);
        },
        prefill: {
          name: RAZORPAY_CONFIG.PREFILL.name,
          email: RAZORPAY_CONFIG.PREFILL.email,
          contact: RAZORPAY_CONFIG.PREFILL.contact
        },
        notes: {
          address: RAZORPAY_CONFIG.NOTES.address
        },
        theme: {
          color: RAZORPAY_CONFIG.THEME.color
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
            toast({
              title: "Payment cancelled",
              description: "You closed the payment window",
              status: "warning",
              duration: 5000,
              isClosable: true,
            });
          }
        }
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
      
    } catch (error) {
      console.error("Payment error:", error);
      setLoading(false);
      toast({
        title: "Payment failed",
        description: error.response?.data?.message || "There was an error processing your payment",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handlePaymentSuccess = async (response) => {
    try {
      // Verify payment on backend
      const { data } = await axios.post(`${PAYMENT_URL}/verify`, {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
        cart: cart,
        amount: getTotalPrice()
      });
      
      if (data.success) {
        // Save order details to redux
        dispatch(addToOrder(cart));
        
        toast({
          title: "Payment successful!",
          description: `Payment ID: ${response.razorpay_payment_id}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        
        // Navigate to confirmation page
        navigate("/confirm");
        
        // Clear cart
        dispatch(cartReset());
      } else {
        throw new Error("Payment verification failed");
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast({
        title: "Verification failed",
        description: error.response?.data?.message || "Could not verify your payment",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Order summary section
  const OrderSummary = () => (
    <Box
      borderRadius="lg"
      bg="white"
      boxShadow="md"
      p="6"
      mb="6"
    >
      <Heading size="md" mb="4">Order Summary</Heading>
      <Divider mb="4" />
      
      {cart.map((item, index) => (
        <Flex key={index} justify="space-between" mb="3">
          <Text>
            {item.name} x {item.quantity}
            {item.size && <Text as="span" fontSize="sm" color="gray.500"> ({item.size})</Text>}
          </Text>
          <Text fontWeight="medium">₹{item.price * item.quantity}</Text>
        </Flex>
      ))}
      
      <Divider my="4" />
      
      <Flex justify="space-between" mb="2">
        <Text>Subtotal</Text>
        <Text>₹{getSubtotal()}</Text>
      </Flex>
      
      <Flex justify="space-between" mb="2">
        <Text>Tax (0)</Text>
        <Text>₹{getTaxAmount()}</Text>
      </Flex>
      
      <Divider my="3" />
      
      <Flex justify="space-between" fontWeight="bold" fontSize="lg">
        <Text>Total</Text>
        <Text color="teal.600">₹{getTotalPrice()}</Text>
      </Flex>
    </Box>
  );

  // Payment methods section
  const PaymentMethodSection = () => (
    <Box
      borderRadius="lg"
      bg="white"
      boxShadow="md"
      p="6"
    >
      <Flex align="center" mb="4">
        <Icon as={FaCreditCard} mr="2" color="teal.500" />
        <Heading size="md">Payment Method</Heading>
      </Flex>
      
      <Box 
        p="5" 
        borderRadius="md" 
        bg="gray.50" 
        border="1px solid" 
        borderColor="teal.300"
        mb="4"
      >
        <Flex align="center" mb="3">
          {/* <Image 
            src="https://cdn.razorpay.com/static/assets/logo/rzp-logo-primary.svg" 
            h="8" 
            mr="3" 
            alt="Razorpay"
          /> */}
          <Badge colorScheme="teal" variant="subtle" fontSize="sm">RECOMMENDED</Badge>
        </Flex>
        
        <Text fontSize="sm" color="gray.600" mb="4">
          Pay securely using your preferred payment method with Razorpay
        </Text>
        
        {/* <SimpleGrid columns={3} spacing={4} mb="6">
          <Image src="https://i.imgur.com/uiFIbY6.png" h="6" alt="Cards" />
          <Image src="https://i.imgur.com/3C2NNRA.png" h="6" alt="UPI" />
          <Image src="https://i.imgur.com/9RQnibr.png" h="6" alt="NetBanking" />
        </SimpleGrid> */}
        
        <Button
          w="full"
          bg="#3395FF"
          color="white"
          _hover={{ bg: "#2980b9" }}
          onClick={handleRazorpayPayment}
          isLoading={loading}
          loadingText="Processing"
          size="lg"
          h="14"
          fontSize="md"
          leftIcon={<FaLock />}
        >
          Proceed to Pay ₹{getTotalPrice()}
        </Button>
      </Box>
      
      <HStack spacing={3} justify="center" mt="6">
        <Icon as={FaShieldAlt} color="gray.500" />
        <Text fontSize="sm" color="gray.500">100% Secure Payments</Text>
      </HStack>
    </Box>
  );
  
  // OptiClair Assurance Section
  const AssuranceSection = () => (
    <Box mt="8" bg="white" borderRadius="lg" boxShadow="md" p="6">
      <Heading size="md" mb="4" color="gray.700">OptiClair Assurance</Heading>
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
        <Box textAlign="center">
          <Icon as={FaCheckCircle} color="teal.500" boxSize="8" mb="2" />
          <Text fontSize="sm" fontWeight="medium">100% Original Products</Text>
        </Box>
        <Box textAlign="center">
          <Icon as={FaCheckCircle} color="teal.500" boxSize="8" mb="2" />
          <Text fontSize="sm" fontWeight="medium">7-Day Easy Returns</Text>
        </Box>
        {/* <Box textAlign="center">
          <Icon as={FaCheckCircle} color="teal.500" boxSize="8" mb="2" />
          <Text fontSize="sm" fontWeight="medium">Free Shipping</Text>
        </Box> */}
        <Box textAlign="center">
          <Icon as={FaCheckCircle} color="teal.500" boxSize="8" mb="2" />
          <Text fontSize="sm" fontWeight="medium">Secure Payments</Text>
        </Box>
      </SimpleGrid>
    </Box>
  );

  return (
    <>
      <Navbar />
      <Box bg="gray.50" minH="100vh" py="8">
        <Box 
          w={{ base: "95%", sm: "90%", md: "90%", lg: "80%", xl: "75%" }}
          maxW="1200px"
          mx="auto"
        >
          {/* Page Header */}
          <Flex 
            direction="column" 
            align="center" 
            mb="6"
          >
            <Heading 
              size="lg" 
              mb="2" 
              color="teal.600"
            >
              Checkout
            </Heading>
            <HStack spacing={4} justify="center">
              <Text color="gray.500">Cart</Text>
              <Text color="gray.500">→</Text>
              <Text fontWeight="bold" color="teal.500">Payment</Text>
              <Text color="gray.500">→</Text>
              <Text color="gray.500">Confirmation</Text>
            </HStack>
          </Flex>
          
          {/* Secure Checkout Banner */}
          <Flex 
            bg="white" 
            p="4" 
            borderRadius="lg" 
            mb="6" 
            boxShadow="sm"
            align="center"
            justify="center"
          >
            <Icon as={FaLock} color="teal.600" mr="2" />
            <Text fontWeight="medium" color="teal.600" mr="4">Secure Checkout</Text>
            <Image 
              h="8"
              src="https://static5.lenskart.com/images/cust_mailer/Mar-03/CheckoutStrip.png"
              alt="Payment Security"
            />
          </Flex>
          
          {/* Two Column Layout for Desktop */}
          <Grid 
            templateColumns={{ base: "1fr", lg: "1fr 1.5fr" }} 
            gap={6}
          >
            {/* Left Column - Order Summary */}
            <Box>
              <OrderSummary />
              <AssuranceSection />
            </Box>
            
            {/* Right Column - Payment Methods */}
            <Box>
              <PaymentMethodSection />
            </Box>
          </Grid>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Payment;