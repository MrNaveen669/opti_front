
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios"; // Import axios
import {
  removeFromCart,
  decrement,
  increment
} from "../../redux/CartPage/action";
import {
  Flex,
  Heading,
  Button,
  Image,
  HStack, 
  Text,
  Box,
  Grid,
  useToast, // Import useToast for notifications
  VStack
} from "@chakra-ui/react";

// const CartItem = () => {
//   const dispatch = useDispatch();
//   const { cart } = useSelector((state) => state.CartReducer);
//   const toast = useToast();

//   const handleDelete = async (itemId) => {
//     try {
//       console.log("Attempting to delete item with _id:", itemId);
      
//       const response = await axios.delete(`http://localhost:5000/cart/${itemId}`);
      
//       if (response.data.status === 200 || response.status === 200) {
//         dispatch(removeFromCart(itemId));
        
//         toast({
//           title: "Item removed from cart",
//           status: "success",
//           duration: 3000,
//           isClosable: true
//         });
//       } else {
//         throw new Error("Server returned unsuccessful status code");
//       }
//     } catch (error) {
//       console.error("Error removing item from cart:", error);
//       dispatch(removeFromCart(itemId));
      
//       toast({
//         title: "Item removed from UI",
//         description: "There was an error syncing with database, but item was removed from your cart view",
//         status: "warning",
//         duration: 3000,
//         isClosable: true
//       });
//     }
//   };

//   const handleDecrementChange = async (id, qty) => {
//     if (qty <= 1) {
//         await handleDelete(id);
//     } else {
//         try {
//             await axios.patch(`http://localhost:5000/cart/${id}`, {
//                 quantity: qty - 1
//             });
            
//             dispatch(decrement(id));
//         } catch (error) {
//             console.error("Error updating quantity:", error);
//             dispatch(decrement(id));
            
//             toast({
//                 title: "Error updating quantity in database",
//                 status: "warning",
//                 duration: 3000,
//                 isClosable: true
//             });
//         }
//     }
//   };

//   const handleIncrementChange = async (id, qty) => {
//       try {
//           await axios.patch(`http://localhost:5000/cart/${id}`, {
//               quantity: qty + 1
//           });
          
//           dispatch(increment(id));
//       } catch (error) {
//           console.error("Error updating quantity:", error);
//           dispatch(increment(id));
          
//           toast({
//               title: "Error updating quantity in database",
//               status: "warning",
//               duration: 3000,
//               isClosable: true
//           });
//       }
//   };

//   return (
//     <Box>
//       {cart &&
//         cart.map((item) => (
//           <Grid
//             key={item._id}
//             templateColumns={{
//               lg: "20% 80%",
//               md: "20% 80%",
//               base: "repeat(1, 1fr)"
//             }}
//             gap={6}
//             border={"0px solid grey"}
//             borderRadius="10px"
//             boxShadow={"lg"}
//             padding={"15px"}
//             w="100%"
//             justifyContent="space-between"
//             mb={4}
//           >
//             <Image
//               w={{
//                 base: "60%",
//                 sm: "50%",
//                 md: "100%",
//                 lg: "100%",
//                 xl: "100%",
//                 "2xl": "100%"
//               }}
//               margin={{
//                 base: "auto",
//                 sm: "auto",
//                 md: "auto",
//                 lg: "unset",
//                 xl: "unset",
//                 "2xl": "unset"
//               }}
//               src={item.imageTsrc}
//               alt={item.productRefLink || "Product image"}
//             />
//             <Flex
//               flexDirection={"column"}
//               border={"0px solid blue"}
//               gap="4"
//               width={{
//                 base: "90%",
//                 sm: "90%",
//                 md: "90%",
//                 lg: "90%",
//                 xl: "90%",
//                 "2xl": "90%"
//               }}
//               margin={{
//                 base: "auto",
//                 sm: "auto",
//                 md: "auto",
//                 lg: "unset",
//                 xl: "unset",
//                 "2xl": "unset"
//               }}
//             >
//               <Flex
//                 justifyContent={"space-between"}
//                 border={"0px solid green"}
//                 gap="20"
//                 marginTop={5}
//               >
//                 <VStack align="start" spacing={2}>
//                   <Heading
//                     as="h1"
//                     fontSize={"18px"}
//                     lineHeight="22px"
//                     textTransform={"capitalize"}
//                     letterSpacing="-0.32px"
//                     fontWeight={500}
//                   >
//                     {item.productRefLink}
//                   </Heading>
                  
//                   {/* Show lens details if available */}
//                   {item.lensDetails && (
//                     <VStack align="start" spacing={1} mt={2}>
//                       <Text fontSize="14px" color="blue.600" fontWeight="600">
//                         Lens: {item.lensDetails.lensName}
//                       </Text>
//                       <Text fontSize="12px" color="gray.600">
//                         Power: {item.lensDetails.powerType}
//                       </Text>
//                       {item.lensDetails.features && item.lensDetails.features.length > 0 && (
//                         <Text fontSize="12px" color="gray.600">
//                           Features: {item.lensDetails.features.slice(0, 2).join(', ')}
//                           {item.lensDetails.features.length > 2 && '...'}
//                         </Text>
//                       )}
//                       {item.lensDetails.index && (
//                         <Text fontSize="12px" color="gray.600">
//                           Index: {item.lensDetails.index}
//                         </Text>
//                       )}
//                     </VStack>
//                   )}
//                 </VStack>
                
//                 <Flex gap={"2"}>
//                   <Text fontSize={"18px"} fontWeight="500" color="gray.600">
//                     ₹{item.mPrice}
//                   </Text>
//                 </Flex>
//               </Flex>
              
//               {/* Show price breakdown if lens details exist */}
//               {item.lensDetails && (
//                 <VStack align="start" spacing={1} fontSize="12px" color="gray.500">
//                   <Text>Frame: ₹{item.lensDetails.framePrice}</Text>
//                   <Text>Lens: ₹{item.lensDetails.lensPrice}</Text>
//                 </VStack>
//               )}
              
//               <Box border={"1px dashed #CECEDF"}></Box>
//               <Flex justifyContent={"space-between"}>
//                 <Heading
//                   as="h1"
//                   fontSize={"18px"}
//                   lineHeight="22px"
//                   textTransform={"capitalize"}
//                   fontWeight={500}
//                 >
//                   Final Price
//                 </Heading>
//                 <Flex gap={"2"}>
//                   <Text fontSize={"18px"} fontWeight="500" color="gray.600">
//                     ₹{item.mPrice}
//                   </Text>
//                 </Flex>
//               </Flex>
//               <Box border={"1px dashed #CECEDF"}></Box>
//               <Flex
//                 border={"0px solid grey"}
//                 gap="5"
//                 justifyContent="space-between"
//               >
//                 <Button
//                   backgroundColor={"white"}
//                   _hover={{ backgroundColor: "white" }}
//                   textDecoration="underline"
//                   fontSize={"18"}
//                   ml="-1.5"
//                   onClick={() => handleDelete(item._id)}
//                 >
//                   Remove
//                 </Button>

//                 <Flex
//                   align="center"
//                   border="1px"
//                   borderColor="gray.400"
//                   borderRadius="3xl"
//                 >
//                   <Button
//                     bg="whiteAlpha.900"
//                     size="md"
//                     borderRadius="50%"
//                     fontSize="20px"
//                     onClick={() =>
//                       handleDecrementChange(item._id, item.quantity)
//                     }
//                   >
//                     -
//                   </Button>

//                   <Box mx="2">{item.quantity}</Box>
//                   <Button
//                     bg="whiteAlpha.900"
//                     borderRadius="50%"
//                     fontSize="20px"
//                     size="md"
//                     onClick={() => handleIncrementChange(item._id, item.quantity)}
//                   >
//                     +
//                   </Button>
//                 </Flex>
//               </Flex>
//             </Flex>
//           </Grid>
//         ))}
//     </Box>
//   );
// };

// export default CartItem;
const CartItem = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.CartReducer);
  const toast = useToast();

  // Add safety check for cart array
  const safeCart = Array.isArray(cart) ? cart : [];

  const handleDelete = async (itemId) => {
    try {
      console.log("Attempting to delete item with _id:", itemId);
      
      const response = await axios.delete(`http://localhost:5000/cart/${itemId}`);
      
      if (response.data.status === 200 || response.status === 200) {
        dispatch(removeFromCart(itemId));
        
        toast({
          title: "Item removed from cart",
          status: "success",
          duration: 3000,
          isClosable: true
        });
      } else {
        throw new Error("Server returned unsuccessful status code");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      dispatch(removeFromCart(itemId));
      
      toast({
        title: "Item removed from UI",
        description: "There was an error syncing with database, but item was removed from your cart view",
        status: "warning",
        duration: 3000,
        isClosable: true
      });
    }
  };

  const handleDecrementChange = async (id, qty) => {
    if (qty <= 1) {
        await handleDelete(id);
    } else {
        try {
            await axios.patch(`http://localhost:5000/cart/${id}`, {
                quantity: qty - 1
            });
            
            dispatch(decrement(id));
        } catch (error) {
            console.error("Error updating quantity:", error);
            dispatch(decrement(id));
            
            toast({
                title: "Error updating quantity in database",
                status: "warning",
                duration: 3000,
                isClosable: true
            });
        }
    }
  };

  const handleIncrementChange = async (id, qty) => {
      try {
          await axios.patch(`http://localhost:5000/cart/${id}`, {
              quantity: qty + 1
          });
          
          dispatch(increment(id));
      } catch (error) {
          console.error("Error updating quantity:", error);
          dispatch(increment(id));
          
          toast({
              title: "Error updating quantity in database",
              status: "warning",
              duration: 3000,
              isClosable: true
          });
      }
  };

  // Early return if no cart items
  if (safeCart.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Text>No items in cart</Text>
      </Box>
    );
  }

  return (
    <Box>
      {safeCart.map((item) => {
        // Calculate frame price for items with lens
        const framePrice = item.lensDetails 
          ? parseFloat(item.price || 0) - (item.lensDetails.totalLensPrice || 0)
          : parseFloat(item.price || 0);
        
        return (
          <Grid
            key={item._id}
            templateColumns={{
              lg: "20% 80%",
              md: "20% 80%",
              base: "repeat(1, 1fr)"
            }}
            gap={6}
            border={"0px solid grey"}
            borderRadius="10px"
            boxShadow={"lg"}
            padding={"15px"}
            w="100%"
            justifyContent="space-between"
            mb={4}
          >
            <Image
              w={{
                base: "60%",
                sm: "50%",
                md: "100%",
                lg: "100%",
                xl: "100%",
                "2xl": "100%"
              }}
              margin={{
                base: "auto",
                sm: "auto",
                md: "auto",
                lg: "unset",
                xl: "unset",
                "2xl": "unset"
              }}
              src={item.imageTsrc}
              alt={item.productRefLink || "Product image"}
            />
            <Flex
              flexDirection={"column"}
              border={"0px solid blue"}
              gap="4"
              width={{
                base: "90%",
                sm: "90%",
                md: "90%",
                lg: "90%",
                xl: "90%",
                "2xl": "90%"
              }}
              margin={{
                base: "auto",
                sm: "auto",
                md: "auto",
                lg: "unset",
                xl: "unset",
                "2xl": "unset"
              }}
            >
              <Flex
                justifyContent={"space-between"}
                border={"0px solid green"}
                gap="20"
                marginTop={5}
              >
                <VStack align="start" spacing={2}>
                  <Heading
                    as="h1"
                    fontSize={"18px"}
                    lineHeight="22px"
                    textTransform={"capitalize"}
                    letterSpacing="-0.32px"
                    fontWeight={500}
                  >
                    {item.productRefLink}
                  </Heading>
                  
                  {/* Show lens details if available */}
                  {item.lensDetails && (
                    <VStack align="start" spacing={1} mt={2} p={3} bg="blue.50" borderRadius="md" w="full">
                      <Text fontSize="14px" color="blue.700" fontWeight="600">
                        🔍 Lens: {item.lensDetails.lensName}
                      </Text>
                      <Text fontSize="12px" color="gray.600">
                        Power: {item.lensDetails.powerLabel}
                      </Text>
                      {item.lensDetails.features && item.lensDetails.features.length > 0 && (
                        <Text fontSize="12px" color="gray.600">
                          Features: {item.lensDetails.features.slice(0, 2).join(', ')}
                          {item.lensDetails.features.length > 2 && '...'}
                        </Text>
                      )}
                    </VStack>
                  )}
                </VStack>
                
                <Flex gap={"2"}>
                  <Text fontSize={"18px"} fontWeight="500" color="gray.600">
                    ₹{item.price}
                  </Text>
                </Flex>
              </Flex>
              
              {/* Show price breakdown if lens details exist */}
              {item.lensDetails && (
                <>
                  <Box border={"1px dashed #CECEDF"}></Box>
                  <VStack align="start" spacing={2} bg="gray.50" p={3} borderRadius="md">
                    <Text fontSize="14px" fontWeight="600" color="gray.700">Price Breakdown:</Text>
                    <HStack justify="space-between" w="full">
                      <Text fontSize="13px" color="gray.600">Frame Price:</Text>
                      <Text fontSize="13px" fontWeight="500">₹{framePrice}</Text>
                    </HStack>
                    <HStack justify="space-between" w="full">
                      <Text fontSize="13px" color="gray.600">Lens ({item.lensDetails.lensName}):</Text>
                      <Text fontSize="13px" fontWeight="500">₹{item.lensDetails.lensPrice}</Text>
                    </HStack>
                    {item.lensDetails.powerPrice > 0 && (
                      <HStack justify="space-between" w="full">
                        <Text fontSize="13px" color="gray.600">Power ({item.lensDetails.powerLabel}):</Text>
                        <Text fontSize="13px" fontWeight="500">₹{item.lensDetails.powerPrice}</Text>
                      </HStack>
                    )}
                    <Box border={"1px dashed #CECEDF"} w="full"></Box>
                    <HStack justify="space-between" w="full">
                      <Text fontSize="14px" fontWeight="600" color="blue.700">Total Lens Cost:</Text>
                      <Text fontSize="14px" fontWeight="600" color="blue.700">₹{item.lensDetails.totalLensPrice}</Text>
                    </HStack>
                  </VStack>
                </>
              )}
              
              <Box border={"1px dashed #CECEDF"}></Box>
              <Flex justifyContent={"space-between"}>
                <Heading
                  as="h1"
                  fontSize={"18px"}
                  lineHeight="22px"
                  textTransform={"capitalize"}
                  fontWeight={500}
                >
                  Final Price
                </Heading>
                <Flex gap={"2"}>
                  <Text fontSize={"18px"} fontWeight="500" color="green.600">
                    ₹{item.price}
                  </Text>
                </Flex>
              </Flex>
              <Box border={"1px dashed #CECEDF"}></Box>
              <Flex
                border={"0px solid grey"}
                gap="5"
                justifyContent="space-between"
              >
                <Button
                  backgroundColor={"white"}
                  _hover={{ backgroundColor: "white" }}
                  textDecoration="underline"
                  fontSize={"18"}
                  ml="-1.5"
                  onClick={() => handleDelete(item._id)}
                >
                  Remove
                </Button>

                <Flex
                  align="center"
                  border="1px"
                  borderColor="gray.400"
                  borderRadius="3xl"
                >
                  <Button
                    bg="whiteAlpha.900"
                    size="md"
                    borderRadius="50%"
                    fontSize="20px"
                    onClick={() =>
                      handleDecrementChange(item._id, item.quantity)
                    }
                  >
                    -
                  </Button>

                  <Box mx="2">{item.quantity}</Box>
                  <Button
                    bg="whiteAlpha.900"
                    borderRadius="50%"
                    fontSize="20px"
                    size="md"
                    onClick={() => handleIncrementChange(item._id, item.quantity)}
                  >
                    +
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </Grid>
        );
      })}
    </Box>
  );
};

export default CartItem;