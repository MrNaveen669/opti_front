// import React from "react";
// import { Box, Flex, Image } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../../Components/Navbar/Navbar";
// import Footer from "../../Components/Footer/Footer";

// export const Confirm = () => {
//   const navigate = useNavigate();
//   setTimeout(() => {
//     navigate("/orderhistory");
//   }, 3000);

//   return (
//     <>
//       <Navbar />
//       <br />
//       <Flex
//         flexDirection={"column"}
//         justifyContent="center"
//         alignItems={"center"}
//         fontWeight="700"
//         fontSize={30}
//         m="auto"
//         mb="50"
//         textAlign="center"
//         w={{ lg: "100%", sm: "90%", base: "905" }}
//       >
//         <Box w={400}>
//           <Image src="https://static.vecteezy.com/system/resources/previews/006/900/704/original/green-tick-checkbox-illustration-isolated-on-white-background-free-vector.jpg" />
//         </Box>
//         <h1>Your order has been placed successfully</h1>
//       </Flex>
//       <br />

//       <Footer />
//     </>
//   );
// };

// export default Confirm;


import React, { useEffect } from "react";
import { 
  Box, 
  Flex, 
  Image, 
  Text, 
  Heading, 
  VStack, 
  HStack, 
  Badge, 
  Divider,
  Icon,
  Button,
  useToast
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCheckCircle, FaShippingFast, FaBox, FaCalendarAlt, FaHistory } from "react-icons/fa";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const Confirm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const { paymentId, orderItems } = location.state || { paymentId: "", orderItems: [] };
  
  useEffect(() => {
    // If no order items present in state, show toast and redirect to order history
    if (!orderItems || orderItems.length === 0) {
      toast({
        title: "No order details found",
        description: "Redirecting to your order history",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
      
      const timer = setTimeout(() => {
        navigate("/orderhistory");
      }, 3000);
      
      return () => clearTimeout(timer);
    }
    
    // Verify that the orderItems were properly saved to localStorage
    try {
      const localOrders = JSON.parse(localStorage.getItem('orderHistory') || '[]');
      const orderSaved = localOrders.some(order => 
        order.paymentId === paymentId || 
        (orderItems[0] && order.orderId === orderItems[0].orderId)
      );
      
      if (!orderSaved && orderItems && orderItems.length > 0) {
        // If orders weren't saved, save them now
        const existingOrders = JSON.parse(localStorage.getItem('orderHistory') || '[]');
        localStorage.setItem('orderHistory', JSON.stringify([...existingOrders, ...orderItems]));
        
        toast({
          title: "Order saved",
          description: "Your order has been saved to your order history",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error verifying order storage:", error);
    }
  }, [orderItems, navigate, paymentId, toast]);
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const currentDate = new Date().toLocaleDateString();
  
  return (
    <>
      <Navbar />
      <Box 
        bg="gray.50" 
        minH="80vh" 
        py={8}
      >
        <Box 
          maxW="800px" 
          mx="auto" 
          bg="white" 
          boxShadow="md" 
          borderRadius="lg" 
          overflow="hidden"
        >
          {/* Success Header */}
          <Flex 
            bg="green.500" 
            color="white" 
            p={6} 
            direction="column" 
            align="center"
          >
            <Icon as={FaCheckCircle} boxSize={16} mb={4} />
            <Heading size="lg">Order Placed Successfully!</Heading>
            <Text mt={2}>Your order has been confirmed and will be shipping soon</Text>
          </Flex>
          
          {/* Order Details */}
          <Box p={6}>
            <VStack spacing={6} align="stretch">
              {/* Payment Info */}
              <Box>
                <Heading size="md" mb={3}>Payment Information</Heading>
                <HStack spacing={4}>
                  <Badge colorScheme="green" fontSize="md" px={2} py={1}>PAID</Badge>
                  <Text>Payment ID: {paymentId}</Text>
                </HStack>
              </Box>
              
              <Divider />
              
              {/* Order Summary */}
              <Box>
                <Heading size="md" mb={3}>Order Summary</Heading>
                <HStack spacing={8} wrap="wrap">
                  <VStack align="start">
                    <Text color="gray.500">Order Date</Text>
                    <Text fontWeight="medium">{currentDate}</Text>
                  </VStack>
                  
                  <VStack align="start">
                    <Text color="gray.500">Order Status</Text>
                    <Badge colorScheme="blue">Processing</Badge>
                  </VStack>
                  
                  <VStack align="start">
                    <Text color="gray.500">Est. Delivery Date</Text>
                    <Text fontWeight="medium">
                      {orderItems[0]?.estimatedDelivery || "7-10 business days"}
                    </Text>
                  </VStack>
                </HStack>
              </Box>
              
              <Divider />
              
              {/* Items Ordered */}
              <Box>
                <Heading size="md" mb={4}>Items Ordered</Heading>
                <VStack spacing={4} align="stretch">
                  {orderItems && orderItems.length > 0 ? (
                    orderItems.map((item, index) => (
                      <HStack 
                        key={index} 
                        spacing={4} 
                        p={4} 
                        borderWidth="1px" 
                        borderRadius="md"
                      >
                        {item.imageTsrc && (
                          <Image 
                            src={item.imageTsrc} 
                            alt={item.name} 
                            boxSize="60px" 
                            objectFit="contain"
                          />
                        )}
                        <Box flex="1">
                          <Text fontWeight="bold">{item.name || item.productRefLink}</Text>
                          <Text>Quantity: {item.quantity}</Text>
                          {item.colors && <Text>Color: {item.colors}</Text>}
                          {item.size && <Text>Size: {item.size}</Text>}
                        </Box>
                        <Box>
                          <Text fontWeight="bold">₹{item.price}</Text>
                        </Box>
                      </HStack>
                    ))
                  ) : (
                    <Text>No items in this order.</Text>
                  )}
                </VStack>
              </Box>
              
              {/* Shipping Status */}
              <Box 
                bg="gray.50" 
                p={5} 
                borderRadius="md"
              >
                <Heading size="sm" mb={4}>Order Timeline</Heading>
                <Flex justify="space-between" align="center">
                  <VStack>
                    <Icon as={FaCheckCircle} color="green.500" boxSize={6} />
                    <Text fontSize="sm" fontWeight="medium">Order Placed</Text>
                    <Text fontSize="xs" color="gray.500">{currentDate}</Text>
                  </VStack>
                  
                  <Divider orientation="horizontal" w="15%" borderColor="green.500" />
                  
                  <VStack>
                    <Icon as={FaBox} color="blue.500" boxSize={6} />
                    <Text fontSize="sm" fontWeight="medium">Processing</Text>
                    <Text fontSize="xs" color="gray.500">In progress</Text>
                  </VStack>
                  
                  <Divider orientation="horizontal" w="15%" borderColor="gray.300" />
                  
                  <VStack>
                    <Icon as={FaShippingFast} color="gray.400" boxSize={6} />
                    <Text fontSize="sm" fontWeight="medium">Shipped</Text>
                    <Text fontSize="xs" color="gray.500">Soon</Text>
                  </VStack>
                  
                  <Divider orientation="horizontal" w="15%" borderColor="gray.300" />
                  
                  <VStack>
                    <Icon as={FaCalendarAlt} color="gray.400" boxSize={6} />
                    <Text fontSize="sm" fontWeight="medium">Delivered</Text>
                    <Text fontSize="xs" color="gray.500">Expected in 7 days</Text>
                  </VStack>
                </Flex>
              </Box>
            </VStack>
            
            {/* Action Buttons */}
            <Flex mt={8} justify="center" gap={4} flexWrap="wrap">
              <Button 
                colorScheme="teal" 
                leftIcon={<FaHistory />}
                onClick={() => navigate("/orderhistory")}
                size={{ base: "md", md: "lg" }}
                minW={{ base: "full", sm: "auto" }}
              >
                View All Orders
              </Button>
              <Button 
                variant="outline" 
                colorScheme="teal"
                onClick={() => navigate("/")}
                size={{ base: "md", md: "lg" }}
                minW={{ base: "full", sm: "auto" }}
              >
                Continue Shopping
              </Button>
            </Flex>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Confirm;