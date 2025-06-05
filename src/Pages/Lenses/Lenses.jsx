import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Box, Grid, Text, Image, Button, VStack, HStack, Flex,
    Badge, Container, Heading, Card, CardBody, Radio, RadioGroup,
    Divider, useToast, SimpleGrid, Icon
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addToCart } from "../../redux/CartPage/action";
import {  CART_URL } from "../../config/api";// Adjust the import path as necessary
// Import your lens data
// import lensData from '../../data/opticlairLensData.json';
import lensData from '../../data/opticlairLensData.json'; // Adjust the import path as 
const Lenses = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const toast = useToast();
    const dispatch = useDispatch();
    
    const { product } = location.state || {};
    const [selectedLens, setSelectedLens] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('budget');
    
    // Load lens data
    const { lensTypes, brandInfo, categories } = lensData;
    
    // Filter lenses based on selected category
    const filteredLenses = lensTypes.filter(lens => lens.category === selectedCategory);

    const handleLensSelect = (lensId) => {
        setSelectedLens(lensId);
    };

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
        setSelectedLens(''); // Reset lens selection when category changes
    };

    const handleAddToCart = async () => {
        if (!selectedLens) {
            toast({
                title: "Please select a lens type",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

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

        const selectedLensData = lensTypes.find(lens => lens.id === selectedLens);
        const totalPrice = (product?.price || 0) + selectedLensData.price;

        // Create cart item with lens details
        const cartItem = {
            userId: user._id,
            imageTsrc: product.image,
            productRefLink: `${product.name || `Product ${product._id}`}`,
            rating: product.rating || "0",
            colors: product.colors || "",
            price: totalPrice.toString(),
            mPrice: product.mPrice || totalPrice.toString(),
            name: `${product.name} (with ${selectedLensData.name})`,
            shape: product.shape || "",
            gender: product.gender || "",
            style: product.style || "",
            dimension: product.dimension || "",
            productType: product.category || "",
            productId: product._id,
            userRated: "0",
            quantity: 1,
            withLens: true,
            lensDetails: {
                lensId: selectedLensData.id,
                lensName: selectedLensData.name,
                lensPrice: selectedLensData.price,
                totalLensPrice: selectedLensData.price,
                features: selectedLensData.features || []
            },
            isContactLens: false
        };

        try {
            const response = await axios.post(CART_URL, cartItem);
            
            if (response.status === 201 || response.status === 200) {
                dispatch(addToCart({ 
                    ...cartItem, 
                    _id: response.data._id
                }));
                
                toast({
                    title: "Added to Cart!",
                    description: `${product?.name || 'Frame'} with ${selectedLensData.name} - ₹${totalPrice}`,
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                });

                navigate('/cart');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const errorMsg = error.response.data.msg || "Error adding to cart";
                toast({
                    title: errorMsg,
                    description: error.response.data.details || "Please try again",
                    status: "info",
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                console.error("Error adding to cart:", error);
                toast({
                    title: "Failed to add product to cart",
                    description: "There was an error adding this product to your cart",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
    };

    const selectedLensData = lensTypes.find(lens => lens.id === selectedLens);

    // Get current category data
    const currentCategory = categories.find(cat => cat.id === selectedCategory);

    // Feature check component
    const FeatureCheck = ({ hasFeature, label }) => (
        <HStack justify="space-between" w="full" py={1}>
            <Text fontSize="sm" color="gray.700">{label}</Text>
            <Icon 
                as={hasFeature ? CheckIcon : CloseIcon} 
                color={hasFeature ? "green.500" : "red.500"}
                boxSize={4}
            />
        </HStack>
    );

    return (
        <>
            <Navbar />
            <Container maxW="1200px" py={8}>
                {/* Header Section */}
                <VStack spacing={6} mb={8}>
                    <HStack spacing={4} align="center">
                        <Image 
                            src="/api/placeholder/120/60"
                            alt="OptiClair"
                            height="60px"
                            fallback={
                                <Text fontSize="3xl" fontWeight="bold" color="white" bg="blue.800" px={6} py={3} borderRadius="md">
                                    OptiClair°
                                </Text>
                            }
                        />
                        <Heading size="xl" color="gray.800">
                            {currentCategory?.name || "Lenses"}
                        </Heading>
                    </HStack>
                    
                    {product && (
                        <HStack spacing={4} bg="gray.50" p={4} borderRadius="lg" w="full" maxW="500px">
                            <Image 
                                src={product.image} 
                                alt={product.name}
                                boxSize="60px"
                                objectFit="contain"
                                borderRadius="md"
                            />
                            <VStack align="start" spacing={1}>
                                <Text fontWeight="bold">{product.name}</Text>
                                <Text color="gray.600">Frame Price: ₹{product.price}</Text>
                            </VStack>
                        </HStack>
                    )}
                </VStack>

                {/* Category Selection Tabs */}
                <Box mb={8}>
                    <Heading size="md" mb={4} color="gray.800">Select Lens Category</Heading>
                    <HStack spacing={4} overflowX="auto" pb={2}>
                        {categories.map((category) => (
                            <Button
                                key={category.id}
                                onClick={() => handleCategoryChange(category.id)}
                                variant={selectedCategory === category.id ? "solid" : "outline"}
                                colorScheme={selectedCategory === category.id ? "blue" : "gray"}
                                size="lg"
                                minW="fit-content"
                                whiteSpace="normal"
                                textAlign="center"
                                height="auto"
                                py={4}
                                px={6}
                                flexDirection="column"
                                gap={1}
                            >
                                <Text fontWeight="bold" fontSize="md">
                                    {category.name}
                                </Text>
                                <Text fontSize="xs" opacity={0.8}>
                                    {category.description}
                                </Text>
                            </Button>
                        ))}
                    </HStack>
                    
                    {/* Category Description */}
                    <Box mt={4} p={4} bg="blue.50" borderRadius="lg" border="1px solid" borderColor="blue.200">
                        <Text color="blue.700" fontWeight="semibold" mb={2}>
                            {currentCategory?.name}
                        </Text>
                        <Text color="blue.600" fontSize="sm">
                            {currentCategory?.description}
                        </Text>
                        <Text color="blue.500" fontSize="xs" mt={2}>
                            {filteredLenses.length} lens options available
                        </Text>
                    </Box>
                </Box>

                {/* Lenses Grid */}
                <Box mb={8}>
                    <HStack mb={6} align="center">
                        <Text fontSize="lg" color="blue.800" fontWeight="bold">Single Vision</Text>
                        <Text fontSize="lg" color="blue.800" fontWeight="bold">Lenses</Text>
                        <Badge colorScheme="red" variant="solid">STOCK</Badge>
                        <Badge colorScheme="blue" variant="outline">
                            {filteredLenses.length} Options
                        </Badge>
                    </HStack>
                    
                    <Text mb={4} color="blue.700" fontWeight="semibold">Exclusive Benefits Offer</Text>
                    
                    {filteredLenses.length === 0 ? (
                        <Box textAlign="center" py={12} bg="gray.50" borderRadius="lg">
                            <Text fontSize="lg" color="gray.600">
                                No lenses available in this category
                            </Text>
                            <Text fontSize="sm" color="gray.500" mt={2}>
                                Please try a different category
                            </Text>
                        </Box>
                    ) : (
                        <SimpleGrid columns={{ base: 1, md: 2, lg: selectedCategory === 'budget' ? 4 : 4 }} spacing={6}>
                            {filteredLenses.map((lens, index) => (
                                <Card 
                                    key={lens.id}
                                    cursor="pointer"
                                    onClick={() => handleLensSelect(lens.id)}
                                    border={selectedLens === lens.id ? "3px solid" : "2px solid"}
                                    borderColor={
                                        selectedLens === lens.id 
                                            ? "blue.500" 
                                            : lens.highlighted 
                                                ? "teal.400" 
                                                : "gray.200"
                                    }
                                    _hover={{ 
                                        transform: "translateY(-4px)",
                                        boxShadow: "xl"
                                    }}
                                    transition="all 0.3s ease"
                                    position="relative"
                                    bg="white"
                                    height="auto"
                                >
                                    {/* Premium Badge */}
                                    {lens.premium && (
                                        <Badge 
                                            position="absolute" 
                                            top="2" 
                                            right="2" 
                                            colorScheme="purple" 
                                            variant="solid"
                                            zIndex="1"
                                        >
                                            PREMIUM
                                        </Badge>
                                    )}
                                    
                                    {/* Highlighted Badge */}
                                    {lens.highlighted && !lens.premium && (
                                        <Badge 
                                            position="absolute" 
                                            top="2" 
                                            right="2" 
                                            colorScheme="teal" 
                                            variant="solid"
                                            zIndex="1"
                                        >
                                            FEATURED
                                        </Badge>
                                    )}

                                    {/* Header with Logo and Type */}
                                    <Box bg="white" p={4} textAlign="center" borderBottom="1px solid" borderColor="gray.200">
                                        <Text fontSize="2xl" fontWeight="bold" color="blue.800" mb={1}>
                                            OptiClair°
                                        </Text>
                                        <Text fontSize="lg" fontWeight="bold" color={
                                            lens.name.includes('Basic') ? 'blue.600' : 
                                            lens.name.includes('Essential') ? 'red.500' :
                                            lens.name.includes('Premium') ? 'red.600' : 
                                            lens.name.includes('Dual') ? 'red.700' :
                                            lens.name.includes('Fully') ? 'purple.600' :
                                            lens.name.includes('Night') ? 'indigo.600' :
                                            lens.name.includes('Polarized') ? 'green.600' : 'red.700'
                                        }>
                                            {lens.name.replace('OptiClair ', '')}
                                        </Text>
                                        <Text fontSize="sm" color="blue.600">
                                            {lens.subtitle}
                                        </Text>
                                        <Text fontSize="xs" color="gray.600" mt={1}>
                                            {lens.index}
                                        </Text>
                                    </Box>

                                    <CardBody p={4}>
                                        <VStack spacing={4}>
                                            {/* Price */}
                                            <VStack spacing={1}>
                                                <Text fontSize="3xl" fontWeight="bold" color="teal.600">
                                                    ₹{lens.price}
                                                </Text>
                                                {lens.offer && (
                                                    <Badge colorScheme="orange" fontSize="sm">
                                                        {lens.offer}
                                                    </Badge>
                                                )}
                                            </VStack>

                                            {/* Power Range */}
                                            <Box textAlign="center">
                                                <Text fontSize="sm" fontWeight="bold" color="blue.700" mb={1}>
                                                    POWER RANGE
                                                </Text>
                                                <Text fontSize="lg" fontWeight="bold" color="gray.800">
                                                    {lens.powerRange}
                                                </Text>
                                            </Box>

                                            {/* Features List */}
                                            <VStack spacing={2} w="full">
                                                <FeatureCheck 
                                                    hasFeature={lens.features.includes('Anti-glare')} 
                                                    label="Anti-glare" 
                                                />
                                                <FeatureCheck 
                                                    hasFeature={lens.features.includes('UV 420 • Sun Protection')} 
                                                    label="UV 420 • Sun Protection" 
                                                />
                                                <FeatureCheck 
                                                    hasFeature={lens.features.includes('Scratch Resistant')} 
                                                    label="Scratch Resistant" 
                                                />
                                                <FeatureCheck 
                                                    hasFeature={lens.features.includes('Blue Light Block')} 
                                                    label="Blue Light Block" 
                                                />
                                                <FeatureCheck 
                                                    hasFeature={lens.features.includes('Smudge Resistance')} 
                                                    label="Smudge Resistance" 
                                                />
                                                {/* Additional features for premium lenses */}
                                                {lens.features.includes('Water & Dust Repellent') && (
                                                    <FeatureCheck 
                                                        hasFeature={true} 
                                                        label="Water & Dust Repellent" 
                                                    />
                                                )}
                                            </VStack>

                                            {/* Color Options for Polarized */}
                                            {lens.colorOptions && (
                                                <Box textAlign="center" w="full">
                                                    <Text fontSize="sm" fontWeight="bold" color="blue.700" mb={2}>
                                                        Available Colors
                                                    </Text>
                                                    <HStack justify="center" spacing={2}>
                                                        {lens.colorOptions.map((color) => (
                                                            <Badge key={color} variant="outline" colorScheme="blue">
                                                                {color}
                                                            </Badge>
                                                        ))}
                                                    </HStack>
                                                </Box>
                                            )}

                                            {/* Single Price */}
                                            <Box textAlign="center" pt={2} borderTop="1px solid" borderColor="gray.200" w="full">
                                                <Text fontSize="sm" fontWeight="bold" color="blue.700">
                                                    For Single price
                                                </Text>
                                                <Text fontSize="lg" fontWeight="bold" color="gray.800">
                                                    ₹{lens.singlePrice}/-
                                                </Text>
                                            </Box>
                                        </VStack>
                                    </CardBody>
                                </Card>
                            ))}
                        </SimpleGrid>
                    )}
                </Box>

                {/* Summary and Checkout */}
                {selectedLens && (
                    <Box 
                        position="sticky" 
                        bottom="0" 
                        bg="white" 
                        borderTop="2px solid" 
                        borderColor="gray.200"
                        p={6}
                        boxShadow="2xl"
                        zIndex="10"
                    >
                        <Flex 
                            justify="space-between" 
                            align="center" 
                            maxW="1200px" 
                            mx="auto"
                            direction={{ base: "column", md: "row" }}
                            gap={4}
                        >
                            <VStack align={{ base: "center", md: "start" }} spacing={2}>
                                <Text fontWeight="bold" fontSize="xl" color="gray.800">
                                    Selected: {selectedLensData?.name}
                                </Text>
                                <Text fontSize="md" color="gray.600">
                                    {selectedLensData?.index}
                                </Text>
                                <HStack spacing={4} fontSize="lg" color="gray.700">
                                    <Text>Frame: ₹{product?.price || 0}</Text>
                                    <Text>+</Text>
                                    <Text>Lens: ₹{selectedLensData?.price || 0}</Text>
                                    <Text>=</Text>
                                    <Text fontWeight="bold" color="teal.600" fontSize="2xl">
                                        Total: ₹{(product?.price || 0) + (selectedLensData?.price || 0)}
                                    </Text>
                                </HStack>
                                {selectedLensData?.offer && (
                                    <Badge colorScheme="green" fontSize="sm">
                                        🎁 {selectedLensData.offer}
                                    </Badge>
                                )}
                            </VStack>
                            
                            <HStack spacing={4}>
                                <Button 
                                    variant="outline" 
                                    onClick={() => navigate(-1)}
                                    size="lg"
                                    colorScheme="gray"
                                >
                                    Back
                                </Button>
                                <Button 
                                    colorScheme="teal" 
                                    onClick={handleAddToCart}
                                    size="lg"
                                    minW="180px"
                                    fontSize="lg"
                                >
                                    Add to Cart
                                </Button>
                            </HStack>
                        </Flex>
                    </Box>
                )}
            </Container>
            <Footer />
        </>
    );
};

export default Lenses;