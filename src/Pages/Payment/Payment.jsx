
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
import { RAZORPAY_CONFIG } from "../../config/payment"; 
import "../../App.css";
const BASE_URL = process.env.REACT_APP_BASE_URL || process.env.REACT_APP_BACKEND_URL;


const Payment = () => {
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.CartReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  
  useEffect(() => {
    // Check if cart is empty and redirect to cart page
    if (!cart || cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before proceeding to payment",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      navigate("/cart");
      return;
    }
    
    // Load Razorpay script when component mounts
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Only remove the script if it exists to avoid errors
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [cart, navigate, toast]);

  // Calculate total price
  const getTotalPrice = () => {
    if (!cart || cart.length === 0) return 0;
    const totalPrice = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    return Math.round(totalPrice); // Adding tax
  };

  // Get subtotal
  const getSubtotal = () => {
    if (!cart || cart.length === 0) return 0;
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
  setLoading(true);
  
  try {
    // Verify payment on backend first
    const { data } = await axios.post(`${PAYMENT_URL}/verify`, {
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
      cart: cart,
      amount: getTotalPrice()
    });
    
    if (!data.success) {
      throw new Error("Payment verification failed");
    }
    
    // Get shipping details and user info
    const shippingDetails = JSON.parse(localStorage.getItem('shippingDetails') || '{}');
    const user = JSON.parse(localStorage.getItem("user")) || {};
    
    // Validate required data
    if (!shippingDetails.first_name || !shippingDetails.email || !user._id) {
      throw new Error("Missing required shipping or user information");
    }
    
    // Prepare order data for database
    const orderData = {
      items: cart.map(item => ({
        productId: item._id || null, // Handle missing productId
        name: item.name || 'Unknown Item',
        price: Number(item.price) || 0,
        quantity: Number(item.quantity) || 1,
        size: item.size || '',
        colors: item.colors || '',
        imageTsrc: item.imageTsrc || ''
      })),
      shippingAddress: {
        ...shippingDetails,
        userId: user._id
      },
      totalAmount: Number(getTotalPrice()),
      paymentId: response.razorpay_payment_id,
      paymentMethod: "Razorpay",
      estimatedDelivery: getEstimatedDeliveryDate()
    };

    // Save order to database with timeout
    const orderResponse = await Promise.race([
      axios.post(`${BASE_URL}/orders/create`, orderData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        timeout: 15000 // 15 second timeout
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 15000)
      )
    ]);

    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message || "Failed to save order to database");
    }
    
    const savedOrder = orderResponse.data.order;
    
    // For backward compatibility, also save to Redux (optional)
    const orderItems = [{
      ...savedOrder,
      orderId: savedOrder.orderId,
      orderDate: savedOrder.orderDate || new Date().toISOString(),
      status: savedOrder.status || 'Processing',
      paymentId: savedOrder.paymentId,
      shippingAddress: savedOrder.shippingAddress,
      estimatedDelivery: savedOrder.estimatedDelivery,
    }];
    
    dispatch(addToOrder(orderItems));
    
    toast({
      title: "Order placed successfully!",
      description: `Order ID: ${savedOrder.orderId}`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    
    // Navigate to confirmation page
    navigate("/confirm", { 
      state: { 
        paymentId: response.razorpay_payment_id,
        orderItems: [savedOrder],
        orderId: savedOrder.orderId
      }
    });
    
    // Clear cart
    dispatch(cartReset());
    
  } catch (error) {
    console.error("Payment/Order error:", error);
    
    // Specific error handling
    let errorMessage = "Could not process your order";
    let errorTitle = "Order processing failed";
    
    if (error.code === 'ECONNABORTED' || error.message === 'Request timeout') {
      errorMessage = "Request timed out. Please check your order status in Order History.";
      errorTitle = "Connection timeout";
    } else if (error.response?.status === 401) {
      errorMessage = "Please log in again to complete your order";
      errorTitle = "Authentication required";
    } else if (error.response?.status === 400) {
      errorMessage = error.response.data?.message || "Invalid order data";
      errorTitle = "Order validation failed";
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }
    
    toast({
      title: errorTitle,
      description: errorMessage,
      status: "error",
      duration: 8000,
      isClosable: true,
    });
  } finally {
    setLoading(false);
  }
};

// Helper function to check if user is properly authenticated
const validateUserAuth = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem("user") || '{}');
  
  return token && user._id;
};

// Enhanced Razorpay options to minimize fingerprint errors
const getRazorpayOptions = (order, amount) => {
  return {
    key: process.env.REACT_APP_RAZORPAY_KEY_ID || "your_razorpay_key",
    amount: amount * 100,
    currency: "INR",
    name: "Your Store Name",
    description: "Purchase from Your Store",
    image: "/logo.png", // Add your logo
    order_id: order.id,
    handler: handlePaymentSuccess,
    prefill: {
      name: JSON.parse(localStorage.getItem('shippingDetails') || '{}').first_name || '',
      email: JSON.parse(localStorage.getItem('shippingDetails') || '{}').email || '',
      contact: JSON.parse(localStorage.getItem('shippingDetails') || '{}').phone || ''
    },
    notes: {
      address: "Corporate Office"
    },
    theme: {
      color: "#3399cc"
    },
    modal: {
      ondismiss: () => {
        setLoading(false);
        console.log("Payment cancelled by user");
      }
    },
    // Disable analytics to reduce fingerprint errors
    config: {
      display: {
        blocks: {
          banks: {
            name: 'Most Used Methods',
            instruments: [
              {
                method: 'card'
              },
              {
                method: 'upi'
              }
            ],
          },
        },
        sequence: ['block.banks'],
        preferences: {
          show_default_blocks: true,
        }
      }
    }
  };
};

// Helper function to calculate estimated delivery date
const getEstimatedDeliveryDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date.toISOString();
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
      
      {cart && cart.length > 0 ? (
        cart.map((item, index) => (
          <Flex key={index} justify="space-between" mb="3">
            <Text>
              {item.name} x {item.quantity}
              {item.size && <Text as="span" fontSize="sm" color="gray.500"> ({item.size})</Text>}
            </Text>
            <Text fontWeight="medium">₹{item.price * item.quantity}</Text>
          </Flex>
        ))
      ) : (
        <Text color="gray.500">No items in cart</Text>
      )}
      
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
          <Badge colorScheme="teal" variant="subtle" fontSize="sm">RECOMMENDED</Badge>
        </Flex>
        
        <Text fontSize="sm" color="gray.600" mb="4">
          Pay securely using your preferred payment method with Razorpay
        </Text>
        
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
          isDisabled={!cart || cart.length === 0}
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
          <Text fontSize="sm" fontWeight="medium">7-Day Easy Replace</Text>
        </Box>
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