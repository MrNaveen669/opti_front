
// import React, { useState, useEffect, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../../redux/CartPage/action";
// import { addToWishlist } from "../../redux/wishlist/wishlist.actions";
// import Navbar from "../../Components/Navbar/Navbar";
// import { AuthContext } from "../../ContextApi/AuthContext";
// import Footer from "../../Components/Footer/Footer";
// import axios from "axios";
// import { Box, Button, Grid, GridItem, Image, Text, VStack, useToast, useDisclosure } from "@chakra-ui/react";
// import Login from "../Login/Login"; 
// import { PRODUCT_URL, CART_URL } from "../../config/api"; 
// const ProductDetails = () => {
//     const { id } = useParams();
//     const [product, setProduct] = useState({});
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { cart } = useSelector((state) => state.CartReducer);
//     const toast = useToast();
//     const { isAuth } = useContext(AuthContext);
//     const { isOpen, onOpen, onClose } = useDisclosure(); // For login modal

//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 const res = await axios.get(`${PRODUCT_URL}/${id}`);
//                 setProduct(res.data);
//             } catch (err) {
//                 console.error("Error fetching product:", err);
//                 toast({
//                     title: "Error fetching product",
//                     description: "Could not load product details",
//                     status: "error",
//                     duration: 3000,
//                     isClosable: true,
//                 });
//             }
//         };
        
//         fetchProduct();
//     }, [id, toast]);

//     const handleAddToCart = async () => {
//         // Check if the user is logged in
//         const user = JSON.parse(localStorage.getItem("user")) || {};
//         if (!isAuth || !user._id) {
//             toast({
//                 title: "Please sign in first",
//                 description: "You need to be logged in to add items to cart",
//                 status: "warning",
//                 duration: 3000,
//                 isClosable: true,
//             });
//             onOpen();
//             return;
//         }

//         // Create a cart item object that matches your cart schema
//         const cartItem = {
//             userId: user._id,
//             imageTsrc: product.image,
//             productRefLink: product.name || `Product ${product._id}`,
//             rating: product.rating || "0",
//             colors: product.colors || "",
//             price: product.price?.toString() || "0",
//             mPrice: product.mPrice || product.price?.toString() || "0",
//             name: product.name,
//             shape: product.shape || "",
//             gender: product.gender || "",
//             style: product.style || "",
//             dimension: product.dimension || "",
//             productType: product.category || "",
//             productId: product._id, // This is important for the compound index
//             userRated: "0",
//             quantity: 1,
//         };

//         try {
//             // First add to the database
//             const response = await axios.post(CART_URL, cartItem);
            
//             // If successful, update Redux store
//             if (response.status === 201 || response.status === 200) {
//                 // Include the database _id in the dispatched object
//                 dispatch(addToCart({ 
//                     ...cartItem, 
//                     _id: response.data._id // Use the MongoDB-generated _id
//                 }));
                
//                 toast({
//                     title: "Product added to cart",
//                     status: "success",
//                     duration: 3000,
//                     isClosable: true,
//                 });
                
//                 navigate("/cart");
//             }
//         } catch (error) {
//             if (error.response && error.response.status === 400 && error.response.data.msg === "Item already in cart") {
//                 toast({
//                     title: "Product already in cart",
//                     status: "info",
//                     duration: 3000,
//                     isClosable: true,
//                 });
//             } else {
//                 console.error("Error adding to cart:", error);
//                 toast({
//                     title: "Failed to add product to cart",
//                     description: error.response?.data?.msg || "There was an error adding this product to your cart",
//                     status: "error",
//                     duration: 3000,
//                     isClosable: true,
//                 });
//             }
//         }
//     };

//     const handleAddToWishlist = async () => {
//         // Check if the user is logged in
//         const user = JSON.parse(localStorage.getItem("user")) || {};
//         if (!isAuth || !user._id) {
//             toast({
//                 title: "Please sign in first",
//                 description: "You need to be logged in to add items to wishlist",
//                 status: "warning",
//                 duration: 3000,
//                 isClosable: true,
//             });
//             onOpen();
//             return;
//         }

//         // Call the async action creator for adding to wishlist
//         const success = await dispatch(addToWishlist(product));
        
//         if (success) {
//             toast({
//                 title: "Product added to wishlist",
//                 status: "success",
//                 duration: 3000,
//                 isClosable: true,
//             });
//             navigate("/wishlist");
//         } else {
//             toast({
//                 title: "Failed to add product to wishlist",
//                 description: "Product might already be in your wishlist",
//                 status: "error",
//                 duration: 3000,
//                 isClosable: true,
//             });
//         }
//     };

//     // Show loading state if product data isn't available yet
//     if (!product || Object.keys(product).length === 0) {
//         return (
//             <>
//                 <Navbar />
//                 <Box textAlign="center" py={10}>
//                     <Text fontSize="xl">Loading product details...</Text>
//                 </Box>
//                 <Footer />
//             </>
//         );
//     }

//     return (
//         <>
//             <Navbar />
//             <Box p={6} maxW="1200px" m="auto">
//                 <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6} alignItems="center">
//                     {/* Product Images Section */}
//                     <GridItem>
//                         <Image 
//                             src={product.image} 
//                             alt={product.name} 
//                             borderRadius="md" 
//                             boxSize="400px" 
//                             objectFit="cover"
//                             fallbackSrc="https://via.placeholder.com/400" // Fallback image
//                         />
//                         <Grid templateColumns="repeat(4, 1fr)" gap={2} mt={4}>
//                             {product.images?.map((img, index) => (
//                                 <Image 
//                                     key={index} 
//                                     src={img} 
//                                     alt={`Product image ${index}`} 
//                                     boxSize="100px" 
//                                     objectFit="cover" 
//                                     borderRadius="md"
//                                     fallbackSrc="https://via.placeholder.com/100"
//                                 />
//                             ))}
//                         </Grid>
//                     </GridItem>

//                     {/* Product Info Section */}
//                     <GridItem>
//                         <VStack align="start" spacing={4}>
//                             <Text fontSize="2xl" fontWeight="bold">{product.name}</Text>
//                             <Text fontSize="lg" color="gray.600">{product.description}</Text>
//                             <Text><strong>Category:</strong> {product.category}</Text>
//                             <Text><strong>Price:</strong> ₹{product.price}</Text>
//                             <Text><strong>Stock:</strong> {product.stock}</Text>
//                             {product.sizes && <Text><strong>Available Sizes:</strong> {product.sizes.join(", ")}</Text>}
//                             {product.frameMaterial && <Text><strong>Frame Material:</strong> {product.frameMaterial}</Text>}
//                             {product.lensMaterial && <Text><strong>Lens Material:</strong> {product.lensMaterial}</Text>}
                            
//                             {/* Action Buttons */}
//                             <Button colorScheme="blue" onClick={handleAddToCart} width="100%">Add to Cart</Button>
//                             <Button colorScheme="pink" onClick={handleAddToWishlist} width="100%">Add to Wishlist</Button>
//                         </VStack>
//                     </GridItem>
//                 </Grid>
//             </Box>
            
//             {/* Include Login modal component */}
//             <Login isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
            
//             <Footer />
//         </>
//     );
// };

// export default ProductDetails;

import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/CartPage/action";
import { addToWishlist } from "../../redux/wishlist/wishlist.actions";
import Navbar from "../../Components/Navbar/Navbar";
import { AuthContext } from "../../ContextApi/AuthContext";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import { 
    Box, 
    Button, 
    Grid, 
    GridItem, 
    Image, 
    Text, 
    VStack, 
    useToast, 
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    Flex
} from "@chakra-ui/react";
import Login from "../Login/Login"; 
import { PRODUCT_URL, CART_URL } from "../../config/api"; 

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.CartReducer);
    const toast = useToast();
    const { isAuth } = useContext(AuthContext);
    const { isOpen, onOpen, onClose } = useDisclosure(); // For login modal
    
    // For image zoom functionality
    const [selectedImage, setSelectedImage] = useState("");
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`${PRODUCT_URL}/${id}`);
                setProduct(res.data);
                
                // Set the main image as the selected image initially
                if (res.data.image) {
                    setSelectedImage(res.data.image);
                }
            } catch (err) {
                console.error("Error fetching product:", err);
                toast({
                    title: "Error fetching product",
                    description: "Could not load product details",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        };
        
        fetchProduct();
    }, [id, toast]);

    const handleAddToCart = async () => {
        // Check if the user is logged in
        const user = JSON.parse(localStorage.getItem("user")) || {};
        if (!isAuth || !user._id) {
            toast({
                title: "Please sign in first",
                description: "You need to be logged in to add items to cart",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            onOpen();
            return;
        }

        // Create a cart item object that matches your cart schema
        const cartItem = {
            userId: user._id,
            imageTsrc: product.image,
            productRefLink: product.name || `Product ${product._id}`,
            rating: product.rating || "0",
            colors: product.colors || "",
            price: product.price?.toString() || "0",
            mPrice: product.mPrice || product.price?.toString() || "0",
            name: product.name,
            shape: product.shape || "",
            gender: product.gender || "",
            style: product.style || "",
            dimension: product.dimension || "",
            productType: product.category || "",
            productId: product._id, // This is important for the compound index
            userRated: "0",
            quantity: 1,
        };

        try {
            // First add to the database
            const response = await axios.post(CART_URL, cartItem);
            
            // If successful, update Redux store
            if (response.status === 201 || response.status === 200) {
                // Include the database _id in the dispatched object
                dispatch(addToCart({ 
                    ...cartItem, 
                    _id: response.data._id // Use the MongoDB-generated _id
                }));
                
                toast({
                    title: "Product added to cart",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                
                navigate("/cart");
            }
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data.msg === "Item already in cart") {
                toast({
                    title: "Product already in cart",
                    status: "info",
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                console.error("Error adding to cart:", error);
                toast({
                    title: "Failed to add product to cart",
                    description: error.response?.data?.msg || "There was an error adding this product to your cart",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
    };

    const handleAddToWishlist = async () => {
        // Check if the user is logged in
        const user = JSON.parse(localStorage.getItem("user")) || {};
        if (!isAuth || !user._id) {
            toast({
                title: "Please sign in first",
                description: "You need to be logged in to add items to wishlist",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            onOpen();
            return;
        }

        // Call the async action creator for adding to wishlist
        const success = await dispatch(addToWishlist(product));
        
        if (success) {
            toast({
                title: "Product added to wishlist",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            navigate("/wishlist");
        } else {
            toast({
                title: "Failed to add product to wishlist",
                description: "Product might already be in your wishlist",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };
    
    // Function to open image modal with the selected image
    const openImageModal = (imageUrl) => {
        setSelectedImage(imageUrl);
        setIsImageModalOpen(true);
    };

    // Show loading state if product data isn't available yet
    if (!product || Object.keys(product).length === 0) {
        return (
            <>
                <Navbar />
                <Box textAlign="center" py={10}>
                    <Text fontSize="xl">Loading product details...</Text>
                </Box>
                <Footer />
            </>
        );
    }

    // Create an array of images to display in the thumbnail grid
    const imagesToDisplay = [
        product.image,
        ...(product.images || []).slice(0, 3) // Limit to first 3 additional images
    ].filter(Boolean); // Remove any null/undefined values

    return (
        <>
            <Navbar />
            <Box p={6} maxW="1200px" m="auto">
                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8} alignItems="start">
                    {/* Product Images Section */}
                    <GridItem>
                        <Box 
                            borderRadius="md" 
                            overflow="hidden"
                            boxShadow="md"
                            cursor="pointer"
                            onClick={() => openImageModal(selectedImage)}
                            position="relative"
                            height="400px"
                            mb={4}
                        >
                            <Image 
                                src={selectedImage || product.image} 
                                alt={product.name} 
                                width="100%"
                                height="100%"
                                objectFit="contain" // Changed to contain to prevent cutting off
                                fallbackSrc="https://via.placeholder.com/400"
                                transition="transform 0.3s ease-in-out"
                                _hover={{ transform: "scale(1.05)" }}
                            />
                            {/* <Text 
                                position="absolute" 
                                bottom="10px" 
                                right="10px" 
                                bg="blackAlpha.600" 
                                color="white" 
                                p="2" 
                                borderRadius="md" 
                                fontSize="sm"
                            >
                                Click to zoom
                            </Text> */}
                        </Box>
                        
                        {/* Thumbnail Images */}
                        <Grid templateColumns="repeat(4, 1fr)" gap={2} mt={4}>
                            {imagesToDisplay.map((img, index) => (
                                <Box 
                                    key={index}
                                    borderRadius="md"
                                    overflow="hidden"
                                    cursor="pointer"
                                    onClick={() => setSelectedImage(img)}
                                    border={selectedImage === img ? "2px solid #3182CE" : "1px solid #E2E8F0"}
                                    transition="all 0.2s"
                                    _hover={{ boxShadow: "md" }}
                                >
                                    <Image 
                                        src={img} 
                                        alt={`Product image ${index}`} 
                                        boxSize="80px" 
                                        objectFit="contain" 
                                        borderRadius="md"
                                        fallbackSrc="https://via.placeholder.com/80"
                                    />
                                </Box>
                            ))}
                        </Grid>
                    </GridItem>

                    {/* Product Info Section */}
                    <GridItem>
                        <VStack align="start" spacing={4}>
                            <Text fontSize="2xl" fontWeight="bold">{product.name}</Text>
                            
                            {/* Display the full description without truncation */}
                            <Text fontSize="md" color="gray.700">
                                {product.description}
                            </Text>
                            
                            {/* Display feature highlights if there's blue light filtering */}
                            {product.description?.toLowerCase().includes("blue light") && (
                                <Box bg="blue.50" p={4} borderRadius="md" width="100%">
                                    <Text fontWeight="bold" mb={2}>Feature Highlights:</Text>
                                    <Grid templateColumns="1fr 1fr" gap={3}>
                                        <Flex alignItems="center">
                                            <Box w="4px" h="4px" borderRadius="full" bg="blue.500" mr={2}></Box>
                                            <Text fontSize="sm">Blue Light Protection</Text>
                                        </Flex>
                                        <Flex alignItems="center">
                                            <Box w="4px" h="4px" borderRadius="full" bg="blue.500" mr={2}></Box>
                                            <Text fontSize="sm">Reduced Eye Strain</Text>
                                        </Flex>
                                        <Flex alignItems="center">
                                            <Box w="4px" h="4px" borderRadius="full" bg="blue.500" mr={2}></Box>
                                            <Text fontSize="sm">UV Protection</Text>
                                        </Flex>
                                        <Flex alignItems="center">
                                            <Box w="4px" h="4px" borderRadius="full" bg="blue.500" mr={2}></Box>
                                            <Text fontSize="sm">Scratch Resistant</Text>
                                        </Flex>
                                    </Grid>
                                </Box>
                            )}
                            
                            <Grid templateColumns="1fr 1fr" gap={4} width="100%">
                                <Box>
                                    <Text fontWeight="bold" mb={1}>Category</Text>
                                    <Text>{product.category}</Text>
                                </Box>
                                <Box>
                                    <Text fontWeight="bold" mb={1}>Price</Text>
                                    <Text fontSize="xl" color="blue.600">₹{product.price}</Text>
                                </Box>
                                {product.stock && (
                                    <Box>
                                        <Text fontWeight="bold" mb={1}>Stock</Text>
                                        <Text>{product.stock > 0 ? "In Stock" : "Out of Stock"}</Text>
                                    </Box>
                                )}
                                {product.gender && (
                                    <Box>
                                        <Text fontWeight="bold" mb={1}>Gender</Text>
                                        <Text>{product.gender}</Text>
                                    </Box>
                                )}
                            </Grid>
                            
                            {product.frameMaterial && (
                                <Box width="100%">
                                    <Text fontWeight="bold" mb={1}>Frame Material</Text>
                                    <Text>{product.frameMaterial}</Text>
                                </Box>
                            )}
                            
                            {product.lensMaterial && (
                                <Box width="100%">
                                    <Text fontWeight="bold" mb={1}>Lens Material</Text>
                                    <Text>{product.lensMaterial}</Text>
                                </Box>
                            )}
                            
                            {/* Action Buttons */}
                            <Box width="100%" mt={4}>
                                <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap={4}>
                                    <Button colorScheme="blue" onClick={handleAddToCart} size="lg">
                                        Add to Cart
                                    </Button>
                                    <Button colorScheme="pink" onClick={handleAddToWishlist} size="lg" variant="outline">
                                        Add to Wishlist
                                    </Button>
                                </Grid>
                            </Box>
                        </VStack>
                    </GridItem>
                </Grid>
            </Box>
            
            {/* Image Zoom Modal */}
            <Modal isOpen={isImageModalOpen} onClose={() => setIsImageModalOpen(false)} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton zIndex="2" />
                    <ModalBody p={0}>
                        <Image 
                            src={selectedImage} 
                            alt={product.name}
                            width="100%"
                            objectFit="contain"
                            borderRadius="md"
                            height="600px"
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
            
            {/* Include Login modal component */}
            <Login isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
            
            <Footer />
        </>
    );
};

export default ProductDetails;