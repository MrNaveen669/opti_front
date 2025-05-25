
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios"; // Import axios
import { CART_URL } from "../../config/api";
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
  Text,
  Box,
  Grid,
  useToast // Import useToast for notifications
} from "@chakra-ui/react";

const CartItem = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.CartReducer);
  const toast = useToast(); // Initialize toast

  const handleDelete = async (itemId) => {
    try {
      console.log("Attempting to delete item with _id:", itemId);
      
      // Delete from database first
      const response = await axios.delete(`${CART_URL}/${itemId}`);
      
      // Check if deletion was successful
      if (response.data.status === 200 || response.status === 200) {
        // If successful, remove from Redux store
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
      // Still remove from Redux store in case of DB error (optimistic UI)
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
        // If quantity would go below 1, remove the item
        await handleDelete(id);
    } else {
        try {
            // First update in the database
            await axios.patch(`${CART_URL}/${id}`, {
                quantity: qty - 1
            });
            
            // Then update in the Redux store
            dispatch(decrement(id));
        } catch (error) {
            console.error("Error updating quantity:", error);
            // Still update Redux store for better user experience
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
        // First update in the database
        await axios.patch(`${CART_URL}/${id}`, {
            quantity: qty + 1
        });
        
        // Then update in the Redux store
        dispatch(increment(id));
    } catch (error) {
        console.error("Error updating quantity:", error);
        // Still update Redux store for better user experience
        dispatch(increment(id));
        
        toast({
            title: "Error updating quantity in database",
            status: "warning",
            duration: 3000,
            isClosable: true
        });
    }
};

  return (
    <Box>
      {cart &&
        cart.map((item) => (
          <Grid
            key={item._id} // Add a key for React list rendering
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
            mb={4} // Add margin bottom for spacing between items
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
              alt={item.productRefLink || "Product image"} // Add alt for accessibility
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
                <Flex gap={"2"}>
                  <Text fontSize={"18px"} fontWeight="500" color="gray.600">
                    ₹{item.mPrice}
                  </Text>
                </Flex>
              </Flex>
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
                  <Text fontSize={"18px"} fontWeight="500" color="gray.600">
                    ₹{item.mPrice}
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
                  _hover={{ backgroundColor: "white" }} // Fix syntax
                  textDecoration="underline"
                  fontSize={"18"}
                  ml="-1.5"
                  onClick={() => handleDelete(item._id)} // Use _id not id for MongoDB
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
                      handleDecrementChange(item._id, item.quantity) // Use _id not id for MongoDB
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
                    onClick={() => handleIncrementChange(item._id)} // Use _id not id for MongoDB
                  >
                    +
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </Grid>
        ))}
    </Box>
  );
};

export default CartItem;