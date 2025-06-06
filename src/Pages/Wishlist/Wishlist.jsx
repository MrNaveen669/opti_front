// import { useSelector, useDispatch } from "react-redux";
// import { Box, Text, Button, Heading, Grid } from "@chakra-ui/react";
// import { removeFromWishlist } from "../../redux/wishlist/wishlist.actions";
// import { addToCart } from "../../redux/CartPage/action";
// import Navbar from "../../Components/Navbar/Navbar";
// import Footer from "../../Components/Footer/Footer";
// import { useNavigate } from "react-router-dom";

// const Wishlist = () => {
//   const wishlistItems = useSelector((store) => store.wishlistManager.wishlist);
//   const { cart } = useSelector((state) => state.CartReducer);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleDelete = (item) => {
//     dispatch(removeFromWishlist(item));
//   };

//   const handleAddToCart = (data) => {
//     const existingItem = cart.findIndex((item) => item._id === data._id);
//     if (existingItem === -1) {
//       data.quantity = 1;
//       dispatch(addToCart(data));
//       dispatch(removeFromWishlist(data._id));
//       setTimeout(() => {
//         navigate("/cart");
//       }, 1000);
//     } else {
//       alert("Product Already Add in Cart");
//     }
//   };

//   return (
//     <Box>
//       <Navbar />
//       <br />
//       <br />
//       <Box
//         minHeight="635"
//         w={{ lg: "80%", md: "90%", sm: "90%", base: "95%" }}
//         m="auto"
//       >
//         <Heading
//           fontSize="25px"
//           textAlign="left"
//           p="2"
//           bg="teal.400"
//           color="whiteAlpha.900"
//           w={{ lg: "80%", md: "90%", sm: "90%", base: "95%" }}
//           m="auto"
//         >
//           Wishlist
//         </Heading>
//         {wishlistItems.length === 0 ? (
//           <Text
//             textAlign="center"
//             fontSize="28px"
//             color="gray"
//             mt="1%"
//             fontWeight="bolder"
//           >
//             Your wishlist is empty.
//           </Text>
//         ) : (
//           <Box>
//             <Grid templateColumns="repeat(1,1fr)" gap={18} w={"100%"}>
//               {wishlistItems &&
//                 wishlistItems &&
//                 wishlistItems.map((item) => (
//                   <Box
//                     key={item.id}
//                     borderWidth="1px"
//                     boxShadow="2xl"
//                     p="4"
//                     my="4"
//                     w={{ lg: "80%", md: "90%", sm: "90%", base: "95%" }}
//                     m="auto"
//                   >
//                     <Grid
//                       m="auto"
//                       templateColumns={{
//                         base: "repeat(1,1fr)",
//                         sm: "repeat(1,1fr)",
//                         md: "repeat(1,1fr)",
//                         lg: "60% 40%",
//                         xl: "70% 30%"
//                       }}
//                       justify="space-between"
//                       mb="2"
//                     >
//                       <Text
//                         fontSize="xl"
//                         fontWeight="bold"
//                         textTransform="capitalize"
//                         mb={{ sm: "4", base: "4" }}
//                       >
//                         {item.productRefLink}
//                       </Text>
//                       <Grid
//                         m={{ lg: "auto", sm: "left", base: "right" }}
//                         templateColumns={{
//                           base: "repeat(1,1fr)",
//                           sm: "repeat(2,1fr)",
//                           md: "repeat(2,1fr)",
//                           lg: "repeat(2,1fr)",
//                           xl: "repeat(2,1fr)"
//                         }}
//                         gap="4"
//                         justify="space-between"
//                         mb="2"
//                       >
//                         <Button
//                           colorScheme="red"
//                           onClick={() => handleAddToCart(item)}
//                         >
//                           Add to Cart
//                         </Button>
//                         <Button
//                           colorScheme="red"
//                           onClick={() => handleDelete(item._id)}
//                         >
//                           Remove
//                         </Button>
//                       </Grid>
//                     </Grid>

//                     <Grid
//                       m="auto"
//                       templateColumns={{
//                         base: "repeat(1,1fr)",
//                         sm: "40% 50%",
//                         md: "30% 60%",
//                         lg: "30% 60%",
//                         xl: "20% 60%"
//                       }}
//                       align="center"
//                       mb="1"
//                     >
//                       <img
//                         src={item.imageTsrc}
//                         alt={item.name}
//                         boxSize="180px"
//                         m="auto"
//                       />

//                       <Box
//                         ml="4"
//                         textAlign={{
//                           lg: "left",
//                           md: "left",
//                           sm: "left",
//                           base: "center"
//                         }}
//                       >
//                         <Text
//                           fontSize="lg"
//                           fontWeight="bold"
//                           textTransform="capitalize"
//                         >
//                           {item.name}
//                         </Text>
//                         <Text fontSize="lg" fontWeight="bold">
//                           Price : ₹ {item.price}.00 /-
//                         </Text>
//                         <Text
//                           fontSize="lg"
//                           fontWeight="bold"
//                           color="gray.600"
//                           textTransform="capitalize"
//                         >
//                           {item.productType}
//                         </Text>
//                         <Text
//                           fontSize="lg"
//                           fontWeight="bold"
//                           color="gray.600"
//                           textTransform="capitalize"
//                         >
//                           Colour : {item.colors}
//                         </Text>{" "}
//                         <Text
//                           fontSize="md"
//                           fontWeight="600"
//                           color="gray.600"
//                           textTransform="capitalize"
//                         >
//                           Shape : {item.shape}
//                         </Text>
//                       </Box>
//                     </Grid>
//                   </Box>
//                 ))}
//             </Grid>
//           </Box>
//         )}
//       </Box>
//       <Footer />
//     </Box>
//   );
// };

// export default Wishlist;
import { 
  Box, 
  Text, 
  Heading, 
  Grid, 
  Button, 
  useDisclosure, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalCloseButton, 
  ModalBody, 
  VStack, 
  Divider, 
  Icon 
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai";
import { FaEye, FaGlasses } from "react-icons/fa";
import { removeFromWishlist } from "../../redux/wishlist/wishlist.actions";
import { addToCart } from "../../redux/CartPage/action";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// const CART_URL = process.env.REACT_APP_CART_URL || "http://localhost:5000/cart";
const CART_URL = process.env.REACT_APP_CART_URL;

const Wishlist = () => {
  const wishlistItems = useSelector((store) => store.wishlistManager.wishlist);
  const { cart } = useSelector((state) => state.CartReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  
  // For lens selection modal
  const { isOpen: isLensModalOpen, onOpen: onLensModalOpen, onClose: onLensModalClose } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleDelete = async (item) => {
    const success = await dispatch(removeFromWishlist(item._id));
    if (success) {
      toast({
        title: "Item removed from wishlist",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Failed to remove item",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAddToCart = (item) => {
    // Check if the user is logged in first
    const user = JSON.parse(localStorage.getItem("user")) || {};
    if (!user._id) {
      toast({
        title: "Please sign in first",
        description: "You need to be logged in to add items to cart",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Check if product is already in cart using productId
    const existingItem = cart.find((cartItem) => cartItem.productId === item.productId);
    if (existingItem) {
      toast({
        title: "Product already in cart",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Check if product category is "Contact Lens" - if yes, add directly to cart
    if (item.productType && item.productType.toLowerCase().includes("contact lens")) {
      addProductToCart(item, false, true); // false for withLens, true for isContactLens
      return;
    }

    // For other products, open the lens selection modal
    setSelectedProduct(item);
    onLensModalOpen();
  };

  const addProductToCart = async (product, withLens = false, isContactLens = false) => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    
    // For wishlist items, use the stored price
    const basePrice = parseFloat(product.price) || 0;
    const totalPrice = basePrice;

    const cartItem = {
      userId: user._id,
      imageTsrc: product.imageTsrc,
      productRefLink: product.productRefLink || product.name || `Product ${product.productId}`,
      rating: product.rating || "0",
      colors: product.colors || "",
      price: totalPrice.toString(),
      mPrice: product.mPrice || totalPrice.toString(),
      name: isContactLens ? product.name : product.name + (withLens ? " (with Lens)" : " (Frame Only)"),
      shape: product.shape || "",
      gender: product.gender || "",
      style: product.style || "",
      dimension: product.dimension || "",
      productType: product.productType || "",
      productId: product.productId, // Use productId, not _id
      userRated: "0",
      quantity: 1,
      withLens: isContactLens ? null : withLens,
    };

    try {
      console.log("Adding to cart:", cartItem);
      console.log("Cart URL:", CART_URL);
      
      const response = await axios.post(CART_URL, cartItem);
      
      if (response.status === 201 || response.status === 200) {
        dispatch(addToCart({ 
          ...cartItem, 
          _id: response.data._id
        }));
        
        // Remove from wishlist after successful addition to cart
        const removeSuccess = await dispatch(removeFromWishlist(product._id));
        
        const successMessage = isContactLens 
          ? "Contact lens added to cart"
          : `Product added to cart ${withLens ? 'with lens' : 'as frame only'}`;
        
        toast({
          title: successMessage,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        
        if (!isContactLens) {
          onLensModalClose();
        }
        
        // Navigate to cart immediately for frame-only option
        if (!withLens && !isContactLens) {
          setTimeout(() => {
            navigate("/cart");
          }, 500);
        } else {
          // Navigate to cart after a short delay for other options
          setTimeout(() => {
            navigate("/cart");
          }, 1000);
        }
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      console.error("Error response:", error.response);
      
      if (error.response && error.response.status === 400 && error.response.data.msg === "Item already in cart") {
        toast({
          title: "Product already in cart",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Failed to add product to cart",
          description: error.response?.data?.msg || error.message || "There was an error adding this product to your cart",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Box>
      <Navbar />
      <br />
      <br />
      <Box
        minHeight="635"
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
        >
          Wishlist
        </Heading>
        {wishlistItems.length === 0 ? (
          <Text
            textAlign="center"
            fontSize="28px"
            color="gray"
            mt="1%"
            fontWeight="bolder"
          >
            Your wishlist is empty.
          </Text>
        ) : (
          <Box>
            <Grid templateColumns="repeat(1,1fr)" gap={18} w={"100%"}>
              {wishlistItems.map((item) => (
                <Box
                  key={item._id}
                  borderWidth="1px"
                  boxShadow="2xl"
                  p="4"
                  my="4"
                  w={{ lg: "80%", md: "90%", sm: "90%", base: "95%" }}
                  m="auto"
                >
                  <Grid
                    m="auto"
                    templateColumns={{
                      base: "repeat(1,1fr)",
                      sm: "repeat(1,1fr)",
                      md: "repeat(1,1fr)",
                      lg: "60% 40%",
                      xl: "70% 30%"
                    }}
                    justify="space-between"
                    mb="2"
                  >
                    <Text
                      fontSize="xl"
                      fontWeight="bold"
                      textTransform="capitalize"
                      mb={{ sm: "4", base: "4" }}
                    >
                      {item.productRefLink || item.name}
                    </Text>
                    <Grid
                      m={{ lg: "auto", sm: "left", base: "right" }}
                      templateColumns={{
                        base: "repeat(1,1fr)",
                        sm: "repeat(2,1fr)",
                        md: "repeat(2,1fr)",
                        lg: "repeat(2,1fr)",
                        xl: "repeat(2,1fr)"
                      }}
                      gap="4"
                      justify="space-between"
                      mb="2"
                    >
                      <Button
                        colorScheme="red"
                        onClick={() => handleAddToCart(item)}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => handleDelete(item)}
                      >
                        Remove
                      </Button>
                    </Grid>
                  </Grid>

                  <Grid
                    m="auto"
                    templateColumns={{
                      base: "repeat(1,1fr)",
                      sm: "40% 50%",
                      md: "30% 60%",
                      lg: "30% 60%",
                      xl: "20% 60%"
                    }}
                    align="center"
                    mb="1"
                  >
                    <img
                      src={item.imageTsrc}
                      alt={item.name}
                      boxSize="180px"
                      m="auto"
                      style={{ maxWidth: "180px", height: "auto" }}
                    />

                    <Box
                      ml="4"
                      textAlign={{
                        lg: "left",
                        md: "left",
                        sm: "left",
                        base: "center"
                      }}
                    >
                      <Text
                        fontSize="lg"
                        fontWeight="bold"
                        textTransform="capitalize"
                      >
                        {item.name}
                      </Text>
                      <Text fontSize="lg" fontWeight="bold">
                        Price : ₹ {item.price}.00 /-
                      </Text>
                      <Text
                        fontSize="lg"
                        fontWeight="bold"
                        color="gray.600"
                        textTransform="capitalize"
                      >
                        {item.productType}
                      </Text>
                      <Text
                        fontSize="lg"
                        fontWeight="bold"
                        color="gray.600"
                        textTransform="capitalize"
                      >
                        Colour : {item.colors}
                      </Text>
                      <Text
                        fontSize="md"
                        fontWeight="600"
                        color="gray.600"
                        textTransform="capitalize"
                      >
                        Shape : {item.shape}
                      </Text>
                    </Box>
                  </Grid>
                </Box>
              ))}
            </Grid>
          </Box>
        )}
      </Box>

      {/* Lens Selection Modal - Only shows for non-contact lens products */}
      <Modal isOpen={isLensModalOpen} onClose={onLensModalClose} size="md" isCentered>
        <ModalOverlay bg="blackAlpha.600" />
        <ModalContent mx={4}>
          <ModalCloseButton />
          <ModalBody p={8}>
            <VStack spacing={6} align="center">
              {/* Header with icon */}
              <Box 
                bg="cyan.100" 
                p={4} 
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={AiFillStar} boxSize={8} color="cyan.600" />
              </Box>
              
              <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                Add Lenses
              </Text>
              
              <Text fontSize="md" color="gray.600" textAlign="center">
                You have chosen a sized frame
                <br />
                for <Text as="span" fontWeight="bold" color="black">₹{selectedProduct?.price}</Text>
              </Text>
              
              <Divider />
              
              {/* Buy with Lens Option */}
              <Button
                size="lg"
                width="100%"
                colorScheme="teal"
                bg="gray.800"
                color="white"
                _hover={{ bg: "gray.700" }}
                onClick={() => {
                  onLensModalClose();
                  // Create a product object for lens navigation
                  const productForLens = {
                    _id: selectedProduct.productId, // Use productId for navigation
                    name: selectedProduct.name,
                    price: selectedProduct.price,
                    image: selectedProduct.imageTsrc,
                    category: selectedProduct.productType,
                    colors: selectedProduct.colors,
                    shape: selectedProduct.shape,
                    gender: selectedProduct.gender,
                    style: selectedProduct.style,
                    dimension: selectedProduct.dimension,
                    rating: selectedProduct.rating,
                    mPrice: selectedProduct.mPrice
                  };
                  navigate('/lenses', { state: { product: productForLens } });
                }}
                leftIcon={<FaEye />}
              >
                <VStack spacing={1}>
                  <Text fontWeight="bold">Buy With Lens</Text>
                  <Text fontSize="sm">Choose from various lens options</Text>
                </VStack>
              </Button>
              
              {/* Frame Only Option */}
              <Button
                size="lg"
                width="100%"
                variant="outline"
                colorScheme="gray"
                onClick={() => addProductToCart(selectedProduct, false)}
                leftIcon={<FaGlasses />}
              >
                <VStack spacing={1}>
                  <Text fontWeight="bold" color="gray.600">I need only frames</Text>
                  <Text fontSize="sm" color="gray.500">₹{selectedProduct?.price}</Text>
                </VStack>
              </Button>
              
              <Text fontSize="xs" color="gray.500" textAlign="center">
                Lens prices may vary based on power requirements
              </Text>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Footer />
    </Box>
  );
};

export default Wishlist;