
// External libraries
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";


// Chakra UI
import {
  Box, Grid, GridItem, Text, Image, Button, VStack, Flex,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton,
  useToast, useDisclosure, Badge, HStack, Icon, Divider
} from '@chakra-ui/react';
import { AiFillStar } from 'react-icons/ai';
import { FaEye, FaGlasses } from 'react-icons/fa';
import { UnorderedList,ListItem } from "@chakra-ui/react";
// Internal components & context
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Login from "../Login/Login";
import { AuthContext } from "../../ContextApi/AuthContext";

// Redux actions
import { addToCart } from "../../redux/CartPage/action";
import { addToWishlist } from "../../redux/wishlist/wishlist.actions";

// Config
import { PRODUCT_URL, CART_URL } from "../../config/api";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.CartReducer);
    const toast = useToast();
    const { isAuth } = useContext(AuthContext);
    const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();
    
    // For lens selection modal
    const { isOpen: isLensModalOpen, onOpen: onLensModalOpen, onClose: onLensModalClose } = useDisclosure();
    
    // For image zoom functionality
    const [selectedImage, setSelectedImage] = useState("");
    const { isOpen: isImageModalOpen, onOpen: onImageModalOpen, onClose: onImageModalClose } = useDisclosure();
    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`${PRODUCT_URL}/${id}`);
                setProduct(res.data);
                
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

    const handleAddToCart = () => {
        // Check if the user is logged in first
        const user = JSON.parse(localStorage.getItem("user")) || {};
        if (!isAuth || !user._id) {
            toast({
                title: "Please sign in first",
                description: "You need to be logged in to add items to cart",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            onLoginOpen();
            return;
        }

        // Check if product category is "Contact Lens" - if yes, add directly to cart
        if (product.category && product.category.toLowerCase().includes("contact lens")) {
            addProductToCart(false, true); // false for withLens, true for isContactLens
            return;
        }

        // For other products, open the lens selection modal
        onLensModalOpen();
    };

    const addProductToCart = async (withLens = false, isContactLens = false) => {
        const user = JSON.parse(localStorage.getItem("user")) || {};
        
        // Calculate price based on lens selection (not applicable for contact lenses)
        const basePrice = parseFloat(product.price) || 0;
        const lensPrice = (withLens && !isContactLens) ? 800 : 0; // ₹800 for lens as shown in your screenshot
        const totalPrice = basePrice + lensPrice;

        const cartItem = {
            userId: user._id,
            imageTsrc: product.image,
            productRefLink: product.name || `Product ${product._id}`,
            rating: product.rating || "0",
            colors: product.colors || "",
            price: totalPrice.toString(),
            mPrice: product.mPrice || totalPrice.toString(),
            name: isContactLens ? product.name : product.name + (withLens ? " (with Lens)" : " (Frame Only)"),
            shape: product.shape || "",
            gender: product.gender || "",
            style: product.style || "",
            dimension: product.dimension || "",
            productType: product.category || "",
            productId: product._id,
            userRated: "0",
            quantity: 1,
            withLens: isContactLens ? null : withLens, // Add this field to track lens selection, null for contact lenses
        };

        try {
            const response = await axios.post(CART_URL, cartItem);
            
            if (response.status === 201 || response.status === 200) {
                dispatch(addToCart({ 
                    ...cartItem, 
                    _id: response.data._id
                }));
                
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
    const user = JSON.parse(localStorage.getItem("user")) || {};
    if (!isAuth || !user._id) {
        toast({
            title: "Please sign in first",
            description: "You need to be logged in to add items to wishlist",
            status: "warning",
            duration: 3000,
            isClosable: true,
        });
        onLoginOpen();
        return;
    }

    // Show loading toast
    const loadingToast = toast({
        title: "Adding to wishlist...",
        status: "loading",
        duration: null,
        isClosable: false,
    });

    try {
        const success = await dispatch(addToWishlist(product));
        
        // Close loading toast
        toast.close(loadingToast);
        
        if (success) {
            toast({
                title: "Product added to wishlist",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            // Optional: navigate to wishlist after successful addition
            // navigate("/wishlist");
        } else {
            toast({
                title: "Product already in wishlist",
                description: "This item is already saved in your wishlist",
                status: "info",
                duration: 3000,
                isClosable: true,
            });
        }
    } catch (error) {
        // Close loading toast
        toast.close(loadingToast);
        
        toast({
            title: "Failed to add product to wishlist",
            description: "Please try again later",
            status: "error",
            duration: 3000,
            isClosable: true,
        });
    }
};
    
    const openImageModal = (imageUrl) => {
        setSelectedImage(imageUrl);
        onImageModalOpen();
    };

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

    const imagesToDisplay = [
        product.image,
        ...(product.images || []).slice(0, 3)
    ].filter(Boolean);

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
                    objectFit="contain"
                    fallbackSrc="https://via.placeholder.com/400"
                    transition="transform 0.3s ease-in-out"
                    _hover={{ transform: "scale(1.05)" }}
                />
            </Box>
            
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
                
                <Text fontSize="md" color="gray.700">
                    {product.description}
                </Text>
                
                {/* Special Features Section for Blue Light or Contact Lenses */}
                {(product.description?.toLowerCase().includes("blue light") || product.category === "Contact Lenses") && (
                    <Box bg={product.category === "Contact Lenses" ? "purple.50" : "blue.50"} p={4} borderRadius="md" width="100%">
                        <Text fontWeight="bold" mb={2}>
                            {product.category === "Contact Lenses" ? "Contact Lens Features:" : "Feature Highlights:"}
                        </Text>
                        <Grid templateColumns="1fr 1fr" gap={3}>
                            {product.category === "Contact Lenses" ? (
                                <>
                                    {product.brand && (
                                        <Flex alignItems="center">
                                            <Box w="4px" h="4px" borderRadius="full" bg="purple.500" mr={2}></Box>
                                            <Text fontSize="sm">Brand: {product.brand}</Text>
                                        </Flex>
                                    )}
                                    {product.power && (
                                        <Flex alignItems="center">
                                            <Box w="4px" h="4px" borderRadius="full" bg="purple.500" mr={2}></Box>
                                            <Text fontSize="sm">Power: {product.power}</Text>
                                        </Flex>
                                    )}
                                    {product.color && (
                                        <Flex alignItems="center">
                                            <Box w="4px" h="4px" borderRadius="full" bg="purple.500" mr={2}></Box>
                                            <Text fontSize="sm">Color: {product.color}</Text>
                                        </Flex>
                                    )}
                                    <Flex alignItems="center">
                                        <Box w="4px" h="4px" borderRadius="full" bg="purple.500" mr={2}></Box>
                                        <Text fontSize="sm">Comfortable Wear</Text>
                                    </Flex>
                                </>
                            ) : (
                                <>
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
                                </>
                            )}
                        </Grid>
                    </Box>
                )}
                
                {/* Product Details Grid */}
                <Grid templateColumns="1fr 1fr" gap={4} width="100%">
                    <Box>
                        <Text fontWeight="bold" mb={1}>Category</Text>
                        <Text>{product.category}</Text>
                    </Box>
                    <Box>
                        <Text fontWeight="bold" mb={1}>Price</Text>
                        <Text fontSize="xl" color="blue.600">
                            ₹{product.price}
                            {product.discount && product.discount !== "0" && (
                                <Badge ml={2} colorScheme="red" fontSize="xs">
                                    {product.discount}% OFF
                                </Badge>
                            )}
                        </Text>
                    </Box>
                    
                    {/* Contact Lens Specific Fields */}
                    {product.category === "Contact Lenses" && (
                        <>
                            {product.brand && (
                                <Box>
                                    <Text fontWeight="bold" mb={1} color="blue.600">Brand</Text>
                                    <Text color="blue.600" fontWeight="semibold">{product.brand}</Text>
                                </Box>
                            )}
                            {product.power && (
                                <Box>
                                    <Text fontWeight="bold" mb={1} color="green.600">Power</Text>
                                    <Text color="green.600" fontWeight="semibold">{product.power}</Text>
                                </Box>
                            )}
                            {product.color && (
                                <Box>
                                    <Text fontWeight="bold" mb={1} color="purple.600">Color</Text>
                                    <Text color="purple.600" fontWeight="semibold">{product.color}</Text>
                                </Box>
                            )}
                        </>
                    )}
                    
                    {/* Non-Contact Lens Fields */}
                    {product.category !== "Contact Lenses" && (
                        <>
                            {product.subCategory && (
                                <Box>
                                    <Text fontWeight="bold" mb={1}>Sub-Category</Text>
                                    <Text>{product.subCategory}</Text>
                                </Box>
                            )}
                            {product.gender && (
                                <Box>
                                    <Text fontWeight="bold" mb={1}>Gender</Text>
                                    <Text>{product.gender}</Text>
                                </Box>
                            )}
                        </>
                    )}
                    
                    {product.stock && (
                        <Box>
                            <Text fontWeight="bold" mb={1}>Stock</Text>
                            <Badge colorScheme={product.stock === "Available" ? "green" : "red"}>
                                {product.stock === "Available" ? "In Stock" : "Out of Stock"}
                            </Badge>
                        </Box>
                    )}
                </Grid>
                
                {/* Material Information */}
                {product.category !== "Contact Lenses" && (
                    <>
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
                    </>
                )}
                
                {/* Available Sizes/Powers */}
                {product.sizes && product.sizes.length > 0 && (
                    <Box width="100%">
                        <Text fontWeight="bold" mb={1}>
                            {product.category === "Contact Lenses" ? "Available Powers/Variants" : "Available Sizes"}
                        </Text>
                        <Text>{Array.isArray(product.sizes) ? product.sizes.join(", ") : product.sizes}</Text>
                    </Box>
                )}
                
                {/* Features */}
                {product.features && product.features.length > 0 && (
                    <Box width="100%">
                        <Text fontWeight="bold" mb={2}>
                            {product.category === "Contact Lenses" ? "Features/Benefits" : "Features"}
                        </Text>
                        <Box bg="gray.50" p={3} borderRadius="md">
                            <UnorderedList spacing={1}>
                                {Array.isArray(product.features) 
                                    ? product.features.map((feature, index) => (
                                        <ListItem key={index} fontSize="sm">{feature}</ListItem>
                                    ))
                                    : product.features.split(',').map((feature, index) => (
                                        <ListItem key={index} fontSize="sm">{feature.trim()}</ListItem>
                                    ))
                                }
                            </UnorderedList>
                        </Box>
                    </Box>
                )}
                
                {/* Action Buttons */}
                <Box width="100%" mt={4}>
                    <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap={4}>
                        <Button colorScheme="blue" onClick={handleAddToCart} size="lg">
                            Buy Now
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
                                for <Text as="span" fontWeight="bold" color="black">₹{product.price}</Text>
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
                                    navigate('/lenses', { state: { product } });
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
                                onClick={() => addProductToCart(false)}
                                leftIcon={<FaGlasses />}
                            >
                                <VStack spacing={1}>
                                    <Text fontWeight="bold" color="gray.600">I need only frames</Text>
                                    <Text fontSize="sm" color="gray.500">₹{product.price}</Text>
                                </VStack>
                            </Button>
                            
                            <Text fontSize="xs" color="gray.500" textAlign="center">
                                Lens prices may vary based on power requirements
                            </Text>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
            
            {/* Image Zoom Modal */}
            <Modal isOpen={isImageModalOpen} onClose={onImageModalClose} size="xl">
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
            
            {/* Login modal component */}
            <Login isOpen={isLoginOpen} onOpen={onLoginOpen} onClose={onLoginClose} />
            
            <Footer />
        </>
    );
};

export default ProductDetails;