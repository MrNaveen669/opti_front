
// import React, { useState, useEffect, useContext } from 'react';
// import { useSelector } from 'react-redux';
// import {
//   Box,
//   Container,
//   Heading,
//   Text,
//   VStack,
//   HStack,
//   Badge,
//   Button,
//   Spinner,
//   Center,
//   Icon,
//   Flex,
//   Divider,
//   useDisclosure,
//   useToast,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Grid,
//   GridItem,
//   Image,
//   Card,
//   CardBody,
//   CardHeader
// } from '@chakra-ui/react';
// import {
//   FaBox,
//   FaShippingFast,
//   FaCheckCircle,
//   FaClock,
//   FaTimesCircle,
//   FaBoxOpen,
//   FaLock,
  
//   FaArrowLeft,
//   FaEye,
  
  


// } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { AuthContext } from '../../ContextApi/AuthContext';
// // } from "react-icons/fa";
// import Navbar from "../../Components/Navbar/Navbar";
// import Footer from "../../Components/Footer/Footer";
// // import { AuthContext } from "../../ContextApi/AuthContext"; // Import AuthContext
// import Login from "../../Pages/Login/Login"; // Import Login component


// const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

// const OrderHistory = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const loginModal = useDisclosure();
//   const toast = useToast();
//   const { isAuth } = useContext(AuthContext);
  
//   // Function to load orders from database
//   const loadOrders = async () => {
//     if (!isAuth) {
//       setLoading(false);
//       return;
//     }
    
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setLoading(false);
//         return;
//       }

//       const response = await axios.get(`${BASE_URL}/orders/user-orders`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         params: {
//           limit: 50 // Get more orders at once
//         }
//       });

//       if (response.data.success) {
//         setOrders(response.data.orders);
//       } else {
//         throw new Error('Failed to fetch orders');
//       }
//     } catch (error) {
//       console.error('Error loading orders:', error);
//       toast({
//         title: "Error loading orders",
//         description: error.response?.data?.message || "Could not load your orders",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   // Load orders on component mount and when auth state changes
//   useEffect(() => {
//     loadOrders();
//   }, [isAuth]);
  
//   // Get status badge
//   const getStatusBadge = (status) => {
//     if (!status) return <Badge colorScheme="gray">Processing</Badge>;
    
//     switch (status.toLowerCase()) {
//       case 'delivered':
//         return <Badge colorScheme="green">Delivered</Badge>;
//       case 'shipped':
//         return <Badge colorScheme="blue">Shipped</Badge>;
//       case 'processing':
//         return <Badge colorScheme="purple">Processing</Badge>;
//       case 'cancelled':
//         return <Badge colorScheme="red">Cancelled</Badge>;
//       default:
//         return <Badge colorScheme="gray">Processing</Badge>;
//     }
//   };
  
//   // Get status icon
//   const getStatusIcon = (status) => {
//     if (!status) return FaClock;
    
//     switch (status.toLowerCase()) {
//       case 'delivered':
//         return FaCheckCircle;
//       case 'shipped':
//         return FaShippingFast;
//       case 'processing':
//         return FaBox;
//       case 'cancelled':
//         return FaTimesCircle;
//       default:
//         return FaClock;
//     }
//   };
  
//   // Format date
//   const formatDate = (dateString) => {
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) {
//         return dateString;
//       }
      
//       const options = { year: 'numeric', month: 'long', day: 'numeric' };
//       return date.toLocaleDateString(undefined, options);
//     } catch (e) {
//       return dateString || "N/A";
//     }
//   };
  
//   // Get username from shipping details
//   const getUserIdentifier = (order) => {
//     if (!order || !order.shippingAddress) return "Guest User";
    
//     const { first_name, last_name, email } = order.shippingAddress;
    
//     if (first_name && last_name) {
//       return `${first_name} ${last_name}`;
//     } else if (email) {
//       return email;
//     } else {
//       return "Guest User";
//     }
//   };
  
//   // View order details
//   const viewOrderDetails = (order) => {
//     setSelectedOrder(order);
//     onOpen();
//   };

//   // Cancel order function
//   const cancelOrder = async (orderId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.patch(
//         `${BASE_URL}/orders/cancel/${orderId}`,
//         { reason: 'Cancelled by user' },
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       if (response.data.success) {
//         toast({
//           title: "Order cancelled",
//           description: "Your order has been cancelled successfully",
//           status: "success",
//           duration: 3000,
//           isClosable: true,
//         });
        
//         // Reload orders
//         loadOrders();
//         onClose();
//       }
//     } catch (error) {
//       toast({
//         title: "Error cancelling order",
//         description: error.response?.data?.message || "Could not cancel order",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//       });
//     }
//   };
  
//   // Timeline component for order status
//   const OrderTimeline = ({ status }) => {
//     const isDelivered = status?.toLowerCase() === 'delivered';
//     const isShipped = ['shipped', 'delivered'].includes(status?.toLowerCase());
//     const isProcessing = ['processing', 'shipped', 'delivered'].includes(status?.toLowerCase());
//     const isCancelled = status?.toLowerCase() === 'cancelled';
    
//     if (isCancelled) {
//       return (
//         <Flex justify="center" align="center" my={3}>
//           <Icon as={FaTimesCircle} color="red.500" boxSize={6} />
//           <Text ml={2} color="red.500" fontWeight="medium">Order Cancelled</Text>
//         </Flex>
//       );
//     }
    
//     return (
//       <Flex justify="space-between" align="center" w="full" px={4} py={2}>
//         <VStack>
//           <Icon as={FaCheckCircle} color="green.500" boxSize={5} />
//           <Text fontSize="xs" fontWeight="medium">Ordered</Text>
//         </VStack>
        
//         <Divider orientation="horizontal" w="15%" borderColor={isProcessing ? "green.500" : "gray.300"} />
        
//         <VStack>
//           <Icon as={FaBox} color={isProcessing ? "green.500" : "gray.400"} boxSize={5} />
//           <Text fontSize="xs" fontWeight="medium">Processing</Text>
//         </VStack>
        
//         <Divider orientation="horizontal" w="15%" borderColor={isShipped ? "green.500" : "gray.300"} />
        
//         <VStack>
//           <Icon as={FaShippingFast} color={isShipped ? "green.500" : "gray.400"} boxSize={5} />
//           <Text fontSize="xs" fontWeight="medium">Shipped</Text>
//         </VStack>
        
//         <Divider orientation="horizontal" w="15%" borderColor={isDelivered ? "green.500" : "gray.300"} />
        
//         <VStack>
//           <Icon as={FaCheckCircle} color={isDelivered ? "green.500" : "gray.400"} boxSize={5} />
//           <Text fontSize="xs" fontWeight="medium">Delivered</Text>
//         </VStack>
//       </Flex>
//     );
//   };
  
//   // Not logged in state component
//   const NotLoggedInState = () => (
//     <Center py={10} flexDirection="column">
//       <Icon as={FaLock} boxSize={16} color="gray.400" mb={4} />
//       <Heading size="md" mb={2} textAlign="center">Please Sign In</Heading>
//       <Text color="gray.500" textAlign="center" mb={6}>
//         You need to be logged in to view your order history.
//       </Text>
//       <Button 
//         colorScheme="teal" 
//         onClick={loginModal.onOpen}
//       >
//         Sign In
//       </Button>
//     </Center>
//   );
  
//   // Empty state component
//   const EmptyOrdersState = () => (
//     <Center py={10} flexDirection="column">
//       <Icon as={FaBoxOpen} boxSize={16} color="gray.400" mb={4} />
//       <Heading size="md" mb={2} textAlign="center">No Orders Yet</Heading>
//       <Text color="gray.500" textAlign="center" mb={6}>
//         You haven't placed any orders yet.
//       </Text>
//       <Button 
//         as={Link} 
//         to="/" 
//         colorScheme="teal" 
//         leftIcon={<FaArrowLeft />}
//       >
//         Start Shopping
//       </Button>
//     </Center>
//   );

//   // Order details modal component
//   const OrderDetailsModal = () => {
//     if (!selectedOrder) return null;
    
//     const canCancel = selectedOrder.status === 'Processing';
    
//     return (
//       <Modal isOpen={isOpen} onClose={onClose} size="xl">
//         <ModalOverlay />
//         <ModalContent maxW="800px">
//           <ModalHeader>
//             <HStack>
//               <Text>Order Details</Text>
//               {getStatusBadge(selectedOrder.status)}
//             </HStack>
//           </ModalHeader>
//           <ModalCloseButton />
          
//           <ModalBody>
//             <VStack align="stretch" spacing={6}>
//               {/* Order Info */}
//               <Grid templateColumns="repeat(2, 1fr)" gap={4}>
//                 <GridItem>
//                   <Text fontWeight="bold">Order ID:</Text>
//                   <Text>{selectedOrder.orderId}</Text>
//                 </GridItem>
//                 <GridItem>
//                   <Text fontWeight="bold">Order Date:</Text>
//                   <Text>{formatDate(selectedOrder.orderDate)}</Text>
//                 </GridItem>
//                 <GridItem>
//                   <Text fontWeight="bold">Total Amount:</Text>
//                   <Text fontWeight="bold" color="green.500">₹{selectedOrder.totalAmount}</Text>
//                 </GridItem>
//                 <GridItem>
//                   <Text fontWeight="bold">Payment ID:</Text>
//                   <Text fontSize="sm">{selectedOrder.paymentId}</Text>
//                 </GridItem>
//               </Grid>

//               {/* Timeline */}
//               <Box>
//                 <Text fontWeight="bold" mb={2}>Order Status</Text>
//                 <OrderTimeline status={selectedOrder.status} />
//               </Box>

//               {/* Items */}
//               <Box>
//                 <Text fontWeight="bold" mb={3}>Items ({selectedOrder.items?.length || 0})</Text>
//                 <VStack spacing={3}>
//                   {selectedOrder.items?.map((item, index) => (
//                     <HStack key={index} w="full" p={3} border="1px" borderColor="gray.200" rounded="md">
//                       {item.imageTsrc && (
//                         <Image 
//                           src={item.imageTsrc} 
//                           alt={item.name} 
//                           boxSize="60px" 
//                           objectFit="cover"
//                           rounded="md"
//                         />
//                       )}
//                       <VStack align="start" flex={1}>
//                         <Text fontWeight="medium">{item.name}</Text>
//                         <HStack>
//                           <Text fontSize="sm" color="gray.600">Qty: {item.quantity}</Text>
//                           {item.size && <Text fontSize="sm" color="gray.600">Size: {item.size}</Text>}
//                           {item.colors && <Text fontSize="sm" color="gray.600">Color: {item.colors}</Text>}
//                         </HStack>
//                       </VStack>
//                       <Text fontWeight="bold">₹{item.price * item.quantity}</Text>
//                     </HStack>
//                   ))}
//                 </VStack>
//               </Box>

//               {/* Shipping Address */}
//               <Box>
//                 <Text fontWeight="bold" mb={2}>Shipping Address</Text>
//                 <Box p={3} bg="gray.50" rounded="md">
//                   <Text>{selectedOrder.shippingAddress?.first_name} {selectedOrder.shippingAddress?.last_name}</Text>
//                   <Text>{selectedOrder.shippingAddress?.address}</Text>
//                   <Text>{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} - {selectedOrder.shippingAddress?.pincode}</Text>
//                   <Text>{selectedOrder.shippingAddress?.phone}</Text>
//                   <Text>{selectedOrder.shippingAddress?.email}</Text>
//                 </Box>
//               </Box>
//             </VStack>
//           </ModalBody>

//           <ModalFooter>
//             <HStack spacing={3}>
//               {canCancel && (
//                 <Button 
//                   colorScheme="red" 
//                   variant="outline"
//                   onClick={() => cancelOrder(selectedOrder.orderId)}
//                 >
//                   Cancel Order
//                 </Button>
//               )}
//               <Button onClick={onClose}>Close</Button>
//             </HStack>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     );
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <Container maxW="container.xl" py={8}>
//         <Center>
//           <VStack>
//             <Spinner size="xl" color="teal.500" />
//             <Text>Loading your orders...</Text>
//           </VStack>
//         </Center>
//       </Container>
//     );
//   }

//   // Not authenticated state
//   if (!isAuth) {
//     return (
//       <Container maxW="container.xl" py={8}>
//         <NotLoggedInState />
//       </Container>
//     );
//   }

//   // Empty orders state
//   if (orders.length === 0) {
//     return (
//       <Container maxW="container.xl" py={8}>
//         <EmptyOrdersState />
//       </Container>
//     );
//   }

//   return (
//     <Container maxW="container.xl" py={8}>
//       <VStack align="stretch" spacing={6}>
//         <Heading size="lg" textAlign="center">Order History</Heading>
        
//         {/* Orders List */}
//         <VStack spacing={4}>
//           {orders.map((order) => (
//             <Card key={order._id} w="full" variant="outline">
//               <CardHeader>
//                 <HStack justify="space-between">
//                   <VStack align="start" spacing={1}>
//                     <Text fontWeight="bold" fontSize="lg">Order #{order.orderId}</Text>
//                     <Text color="gray.600" fontSize="sm">
//                       Placed on {formatDate(order.orderDate)}
//                     </Text>
//                   </VStack>
//                   <VStack align="end" spacing={1}>
//                     {getStatusBadge(order.status)}
//                     <Text fontWeight="bold" color="green.500">₹{order.totalAmount}</Text>
//                   </VStack>
//                 </HStack>
//               </CardHeader>
              
//               <CardBody pt={0}>
//                 <VStack align="stretch" spacing={3}>
//                   <HStack justify="space-between">
//                     <Text color="gray.600">
//                       {order.items?.length || 0} item(s) • {getUserIdentifier(order)}
//                     </Text>
//                     <Button 
//                       size="sm" 
//                       leftIcon={<FaEye />}
//                       onClick={() => viewOrderDetails(order)}
//                     >
//                       View Details
//                     </Button>
//                   </HStack>
                  
//                   <OrderTimeline status={order.status} />
//                 </VStack>
//               </CardBody>
//             </Card>
//           ))}
//         </VStack>
//       </VStack>

//       {/* Order Details Modal */}
//       <OrderDetailsModal />
//     </Container>
//   );
// };

// export default OrderHistory;
import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Button,
  Spinner,
  Center,
  Icon,
  Flex,
  Divider,
  useDisclosure,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Grid,
  GridItem,
  Image,
  Card,
  CardBody,
  CardHeader,
  useColorModeValue
} from '@chakra-ui/react';
import {
  FaBox,
  FaShippingFast,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaBoxOpen,
  FaLock,
  FaArrowLeft,
  FaEye,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../ContextApi/AuthContext';
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Login from "../../Pages/Login/Login";

const BASE_URL = process.env.REACT_APP_BASE_URL || process.env.REACT_APP_BACKEND_URL;

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const loginModal = useDisclosure();
  const toast = useToast();
  const { isAuth } = useContext(AuthContext);
  
  // Chakra UI color mode values
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  // Function to load orders from database
  const loadOrders = async () => {
    if (!isAuth) {
      setLoading(false);
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await axios.get(`${BASE_URL}/orders/user-orders`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        params: {
          limit: 50 // Get more orders at once
        }
      });

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        throw new Error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error loading orders:', error);
      toast({
        title: "Error loading orders",
        description: error.response?.data?.message || "Could not load your orders",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Load orders on component mount and when auth state changes
  useEffect(() => {
    loadOrders();
  }, [isAuth]);
  
  // Get status badge
  const getStatusBadge = (status) => {
    if (!status) return <Badge colorScheme="gray">Processing</Badge>;
    
    switch (status.toLowerCase()) {
      case 'delivered':
        return <Badge colorScheme="green">Delivered</Badge>;
      case 'shipped':
        return <Badge colorScheme="blue">Shipped</Badge>;
      case 'processing':
        return <Badge colorScheme="purple">Processing</Badge>;
      case 'cancelled':
        return <Badge colorScheme="red">Cancelled</Badge>;
      default:
        return <Badge colorScheme="gray">Processing</Badge>;
    }
  };
  
  // Get status icon
  const getStatusIcon = (status) => {
    if (!status) return FaClock;
    
    switch (status.toLowerCase()) {
      case 'delivered':
        return FaCheckCircle;
      case 'shipped':
        return FaShippingFast;
      case 'processing':
        return FaBox;
      case 'cancelled':
        return FaTimesCircle;
      default:
        return FaClock;
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString;
      }
      
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    } catch (e) {
      return dateString || "N/A";
    }
  };
  
  // Get username from shipping details
  const getUserIdentifier = (order) => {
    if (!order || !order.shippingAddress) return "Guest User";
    
    const { first_name, last_name, email } = order.shippingAddress;
    
    if (first_name && last_name) {
      return `${first_name} ${last_name}`;
    } else if (email) {
      return email;
    } else {
      return "Guest User";
    }
  };
  
  // View order details
  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    onOpen();
  };

  // Cancel order function
  const cancelOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `${BASE_URL}/orders/cancel/${orderId}`,
        { reason: 'Cancelled by user' },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        toast({
          title: "Order cancelled",
          description: "Your order has been cancelled successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        
        // Reload orders
        loadOrders();
        onClose();
      }
    } catch (error) {
      toast({
        title: "Error cancelling order",
        description: error.response?.data?.message || "Could not cancel order",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  
  // Timeline component for order status
  const OrderTimeline = ({ status }) => {
    const isDelivered = status?.toLowerCase() === 'delivered';
    const isShipped = ['shipped', 'delivered'].includes(status?.toLowerCase());
    const isProcessing = ['processing', 'shipped', 'delivered'].includes(status?.toLowerCase());
    const isCancelled = status?.toLowerCase() === 'cancelled';
    
    if (isCancelled) {
      return (
        <Flex justify="center" align="center" my={3}>
          <Icon as={FaTimesCircle} color="red.500" boxSize={6} />
          <Text ml={2} color="red.500" fontWeight="medium">Order Cancelled</Text>
        </Flex>
      );
    }
    
    return (
      <Flex justify="space-between" align="center" w="full" px={4} py={2}>
        <VStack>
          <Icon as={FaCheckCircle} color="green.500" boxSize={5} />
          <Text fontSize="xs" fontWeight="medium">Ordered</Text>
        </VStack>
        
        <Divider orientation="horizontal" w="15%" borderColor={isProcessing ? "green.500" : "gray.300"} />
        
        <VStack>
          <Icon as={FaBox} color={isProcessing ? "green.500" : "gray.400"} boxSize={5} />
          <Text fontSize="xs" fontWeight="medium">Processing</Text>
        </VStack>
        
        <Divider orientation="horizontal" w="15%" borderColor={isShipped ? "green.500" : "gray.300"} />
        
        <VStack>
          <Icon as={FaShippingFast} color={isShipped ? "green.500" : "gray.400"} boxSize={5} />
          <Text fontSize="xs" fontWeight="medium">Shipped</Text>
        </VStack>
        
        <Divider orientation="horizontal" w="15%" borderColor={isDelivered ? "green.500" : "gray.300"} />
        
        <VStack>
          <Icon as={FaCheckCircle} color={isDelivered ? "green.500" : "gray.400"} boxSize={5} />
          <Text fontSize="xs" fontWeight="medium">Delivered</Text>
        </VStack>
      </Flex>
    );
  };
  
  // Not logged in state component
  const NotLoggedInState = () => (
    <Center py={10} flexDirection="column">
      <Icon as={FaLock} boxSize={16} color="gray.400" mb={4} />
      <Heading size="md" mb={2} textAlign="center">Please Sign In</Heading>
      <Text color="gray.500" textAlign="center" mb={6}>
        You need to be logged in to view your order history.
      </Text>
      <Button 
        colorScheme="teal" 
        onClick={loginModal.onOpen}
      >
        Sign In
      </Button>
    </Center>
  );
  
  // Empty state component
  const EmptyOrdersState = () => (
    <Center py={10} flexDirection="column">
      <Icon as={FaBoxOpen} boxSize={16} color="gray.400" mb={4} />
      <Heading size="md" mb={2} textAlign="center">No Orders Yet</Heading>
      <Text color="gray.500" textAlign="center" mb={6}>
        You haven't placed any orders yet.
      </Text>
      <Button 
        as={Link} 
        to="/" 
        colorScheme="teal" 
        leftIcon={<FaArrowLeft />}
      >
        Start Shopping
      </Button>
    </Center>
  );

  // Order details modal component
  const OrderDetailsModal = () => {
    if (!selectedOrder) return null;
    
    const canCancel = selectedOrder.status === 'Processing';
    
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent maxW="800px">
          <ModalHeader>
            <HStack>
              <Text>Order Details</Text>
              {getStatusBadge(selectedOrder.status)}
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>
            <VStack align="stretch" spacing={6}>
              {/* Order Info */}
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <GridItem>
                  <Text fontWeight="bold">Order ID:</Text>
                  <Text>{selectedOrder.orderId}</Text>
                </GridItem>
                <GridItem>
                  <Text fontWeight="bold">Order Date:</Text>
                  <Text>{formatDate(selectedOrder.orderDate)}</Text>
                </GridItem>
                <GridItem>
                  <Text fontWeight="bold">Total Amount:</Text>
                  <Text fontWeight="bold" color="green.500">₹{selectedOrder.totalAmount}</Text>
                </GridItem>
                <GridItem>
                  <Text fontWeight="bold">Payment ID:</Text>
                  <Text fontSize="sm">{selectedOrder.paymentId}</Text>
                </GridItem>
              </Grid>

              {/* Timeline */}
              <Box>
                <Text fontWeight="bold" mb={2}>Order Status</Text>
                <OrderTimeline status={selectedOrder.status} />
              </Box>

              {/* Items */}
              <Box>
                <Text fontWeight="bold" mb={3}>Items ({selectedOrder.items?.length || 0})</Text>
                <VStack spacing={3}>
                  {selectedOrder.items?.map((item, index) => (
                    <HStack key={index} w="full" p={3} border="1px" borderColor="gray.200" rounded="md">
                      {item.imageTsrc && (
                        <Image 
                          src={item.imageTsrc} 
                          alt={item.name} 
                          boxSize="60px" 
                          objectFit="cover"
                          rounded="md"
                        />
                      )}
                      <VStack align="start" flex={1}>
                        <Text fontWeight="medium">{item.name}</Text>
                        <HStack>
                          <Text fontSize="sm" color="gray.600">Qty: {item.quantity}</Text>
                          {item.size && <Text fontSize="sm" color="gray.600">Size: {item.size}</Text>}
                          {item.colors && <Text fontSize="sm" color="gray.600">Color: {item.colors}</Text>}
                        </HStack>
                      </VStack>
                      <Text fontWeight="bold">₹{item.price * item.quantity}</Text>
                    </HStack>
                  ))}
                </VStack>
              </Box>

              {/* Shipping Address */}
              <Box>
                <Text fontWeight="bold" mb={2}>Shipping Address</Text>
                <Box p={3} bg="gray.50" rounded="md">
                  <Text>{selectedOrder.shippingAddress?.first_name} {selectedOrder.shippingAddress?.last_name}</Text>
                  <Text>{selectedOrder.shippingAddress?.address}</Text>
                  <Text>{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} - {selectedOrder.shippingAddress?.pincode}</Text>
                  <Text>{selectedOrder.shippingAddress?.phone}</Text>
                  <Text>{selectedOrder.shippingAddress?.email}</Text>
                </Box>
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <HStack spacing={3}>
              {canCancel && (
                <Button 
                  colorScheme="red" 
                  variant="outline"
                  onClick={() => cancelOrder(selectedOrder.orderId)}
                >
                  Cancel Order
                </Button>
              )}
              <Button onClick={onClose}>Close</Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  // Loading state
  if (loading) {
    return (
      <Box bg={bgColor} minHeight="100vh">
        <Navbar />
        <br />
        <br />
        <Container maxW="container.xl" py={8}>
          <Center>
            <VStack>
              <Spinner size="xl" color="teal.500" />
              <Text>Loading your orders...</Text>
            </VStack>
          </Center>
        </Container>
        <Footer />
      </Box>
    );
  }

  // Not authenticated state
  if (!isAuth) {
    return (
      <Box bg={bgColor} minHeight="100vh">
        <Navbar />
        <br />
        <br />
        <Box
          minHeight="635px"
          w={{ lg: "80%", md: "90%", sm: "90%", base: "95%" }}
          m="auto"
        >
          <Heading
            fontSize="25px"
            textAlign="center"
            p="2"
            bg="teal.400"
            color="whiteAlpha.900"
          
            w={{ lg: "80%", md: "90%", sm: "90%", base: "95%" }}
            m="auto"
            mb={4}
          >
            Order History
          </Heading>
          <NotLoggedInState />
        </Box>
        <Footer />
      </Box>
    );
  }

  // Empty orders state
  if (orders.length === 0) {
    return (
      <Box bg={bgColor} minHeight="100vh">
        <Navbar />
        <br />
        <br />
        <Box
          minHeight="635px"
          w={{ lg: "80%", md: "90%", sm: "90%", base: "95%" }}
          m="auto"
        >
          <Heading
            fontSize="25px"
            textAlign="left"
            p="2"
            bg="teal.400"
            color="whiteAlpha.900"
            w={{ lg: "80%", md: "90%", sm: "90%", base: "95%" }}
            m="auto"
            mb={4}
          >
            Order History
          </Heading>
          <EmptyOrdersState />
        </Box>
        <Footer />
      </Box>
    );
  }

  return (
    <Box bg={bgColor} minHeight="100vh">
      <Navbar />
      <br />
      <br />
      <Box
        minHeight="635px"
        w={{ lg: "80%", md: "90%", sm: "90%", base: "95%" }}
        m="auto"
      >
        <Heading
          fontSize="25px"
          textAlign="left"
          p="2"
          bg="teal.400"
          color="whiteAlpha.900"
          w={{ lg: "80%", md: "90%", sm: "90%", base: "95%" }}
          m="auto"
          mb={4}
        >
          Order History
        </Heading>
        
        {/* Orders List */}
        <VStack spacing={4} p={4}>
          {orders.map((order) => (
            <Card 
              key={order._id} 
              w="full" 
              variant="outline"
              boxShadow="2xl"
              bg={cardBg}
              border="1px"
              borderColor={borderColor}
            >
              <CardHeader>
                <HStack justify="space-between">
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="bold" fontSize="lg">Order #{order.orderId}</Text>
                    <Text color="gray.600" fontSize="sm">
                      Placed on {formatDate(order.orderDate)}
                    </Text>
                  </VStack>
                  <VStack align="end" spacing={1}>
                    {getStatusBadge(order.status)}
                    <Text fontWeight="bold" color="green.500">₹{order.totalAmount}</Text>
                  </VStack>
                </HStack>
              </CardHeader>
              
              <CardBody pt={0}>
                <VStack align="stretch" spacing={3}>
                  <HStack justify="space-between">
                    <Text color="gray.600">
                      {order.items?.length || 0} item(s) • {getUserIdentifier(order)}
                    </Text>
                    <Button 
                      size="sm" 
                      leftIcon={<FaEye />}
                      colorScheme="teal"
                      onClick={() => viewOrderDetails(order)}
                    >
                      View Details
                    </Button>
                  </HStack>
                  
                  <OrderTimeline status={order.status} />
                </VStack>
              </CardBody>
            </Card>
          ))}
        </VStack>
      </Box>

      {/* Order Details Modal */}
      <OrderDetailsModal />
      
      {/* Login Modal */}
      <Modal isOpen={loginModal.isOpen} onClose={loginModal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <Login />
        </ModalContent>
      </Modal>
      
      <Footer />
    </Box>
  );
};

export default OrderHistory;