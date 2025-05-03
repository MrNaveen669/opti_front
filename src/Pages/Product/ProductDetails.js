
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/CartPage/action";
import { addToWishlist } from "../../redux/wishlist/wishlist.actions";
import Navbar from "../../Components/Navbar/Navbar";
import { AuthContext } from "../../ContextApi/AuthContext";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import { Box, Button, Grid, GridItem, Image, Text, VStack, useToast, useDisclosure } from "@chakra-ui/react";
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

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`${PRODUCT_URL}/${id}`);
                setProduct(res.data);
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

    return (
        <>
            <Navbar />
            <Box p={6} maxW="1200px" m="auto">
                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6} alignItems="center">
                    {/* Product Images Section */}
                    <GridItem>
                        <Image 
                            src={product.image} 
                            alt={product.name} 
                            borderRadius="md" 
                            boxSize="400px" 
                            objectFit="cover"
                            fallbackSrc="https://via.placeholder.com/400" // Fallback image
                        />
                        <Grid templateColumns="repeat(4, 1fr)" gap={2} mt={4}>
                            {product.images?.map((img, index) => (
                                <Image 
                                    key={index} 
                                    src={img} 
                                    alt={`Product image ${index}`} 
                                    boxSize="100px" 
                                    objectFit="cover" 
                                    borderRadius="md"
                                    fallbackSrc="https://via.placeholder.com/100"
                                />
                            ))}
                        </Grid>
                    </GridItem>

                    {/* Product Info Section */}
                    <GridItem>
                        <VStack align="start" spacing={4}>
                            <Text fontSize="2xl" fontWeight="bold">{product.name}</Text>
                            <Text fontSize="lg" color="gray.600">{product.description}</Text>
                            <Text><strong>Category:</strong> {product.category}</Text>
                            <Text><strong>Price:</strong> ₹{product.price}</Text>
                            <Text><strong>Stock:</strong> {product.stock}</Text>
                            {product.sizes && <Text><strong>Available Sizes:</strong> {product.sizes.join(", ")}</Text>}
                            {product.frameMaterial && <Text><strong>Frame Material:</strong> {product.frameMaterial}</Text>}
                            {product.lensMaterial && <Text><strong>Lens Material:</strong> {product.lensMaterial}</Text>}
                            
                            {/* Action Buttons */}
                            <Button colorScheme="blue" onClick={handleAddToCart} width="100%">Add to Cart</Button>
                            <Button colorScheme="pink" onClick={handleAddToWishlist} width="100%">Add to Wishlist</Button>
                        </VStack>
                    </GridItem>
                </Grid>
            </Box>
            
            {/* Include Login modal component */}
            <Login isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
            
            <Footer />
        </>
    );
};

export default ProductDetails;