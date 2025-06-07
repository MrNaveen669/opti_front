
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
import {  CART_URL } from "../../config/api";
// Import your lens data
import lensData from '../../data/opticlairLensData.json';
import { useRef } from 'react';
const Lenses = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const toast = useToast();
    const dispatch = useDispatch();
    
    const { product } = location.state || {};
    const [selectedLens, setSelectedLens] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('single_vision');
    
    // Create refs for auto-scrolling
    const selectedSummaryRef = useRef(null);
    const addToCartRef = useRef(null);
    
    // Load lens data
    const { lensTypes, brandInfo, categories, sectionHeaders } = lensData;
    
    // Filter lenses based on selected category
    const filteredLenses = lensTypes.filter(lens => lens.category === selectedCategory);
    
    // Group lenses by section
    const groupedLenses = filteredLenses.reduce((acc, lens) => {
        const section = lens.section || 'default';
        if (!acc[section]) {
            acc[section] = [];
        }
        acc[section].push(lens);
        return acc;
    }, {});

    const handleLensSelect = (lensId) => {
        setSelectedLens(lensId);
        
        // Auto-scroll to selected summary after a short delay
        setTimeout(() => {
            if (selectedSummaryRef.current) {
                selectedSummaryRef.current.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }
        }, 100);
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
            productRefLink: product.name || `Product ${product._id}`,
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

    // Section Header Component
    const SectionHeader = ({ section }) => {
        const sectionData = sectionHeaders.find(s => s.id === section && s.category === selectedCategory);
        if (!sectionData) return null;

        return (
            <Box mb={6} textAlign="center">
                <Heading size="lg" color="white" mb={2} bg="blue.800" py={4} px={6} borderRadius="lg">
                    {sectionData.title}
                </Heading>
                <Text color="gray.600" fontSize="md">
                    {sectionData.subtitle}
                </Text>
            </Box>
        );
    };

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
                            Choose Lens Package
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
                                isDisabled={!category.available}
                                opacity={!category.available ? 0.6 : 1}
                            >
                                <Text fontWeight="bold" fontSize="md">
                                    {category.name}
                                </Text>
                                <Text fontSize="xs" opacity={0.8}>
                                    {category.available ? category.description : "Coming Soon"}
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

                {/* Selected Lens Summary - Moved to Top */}
                {selectedLensData && (
                    <Box 
                        ref={selectedSummaryRef}
                        bg="blue.50" 
                        border="2px solid" 
                        borderColor="blue.200"
                        borderRadius="lg" 
                        p={6} 
                        mb={8}
                        position="sticky"
                        top="20px"
                        zIndex="10"
                        boxShadow="lg"
                    >
                        <VStack spacing={4}>
                            <HStack spacing={4} align="center" justify="center">
                                <Icon as={CheckIcon} color="green.500" boxSize={6} />
                                <Text fontSize="xl" fontWeight="bold" color="blue.800">
                                    Selected: {selectedLensData.name}
                                </Text>
                            </HStack>
                            
                            <HStack spacing={8} justify="center" wrap="wrap">
                                <VStack spacing={1}>
                                    <Text fontSize="sm" color="gray.600">Frame Price</Text>
                                    <Text fontSize="lg" fontWeight="bold">₹{product?.price || 0}</Text>
                                </VStack>
                                
                                <Text fontSize="2xl" color="gray.400">+</Text>
                                
                                <VStack spacing={1}>
                                    <Text fontSize="sm" color="gray.600">Lens Price</Text>
                                    <Text fontSize="lg" fontWeight="bold">₹{selectedLensData.price}</Text>
                                </VStack>
                                
                                <Text fontSize="2xl" color="gray.400">=</Text>
                                
                                <VStack spacing={1}>
                                    <Text fontSize="sm" color="gray.600">Total Price</Text>
                                    <Text fontSize="2xl" fontWeight="bold" color="teal.600">
                                        ₹{(product?.price || 0) + selectedLensData.price}
                                    </Text>
                                </VStack>
                            </HStack>
                            
                            <Text fontSize="sm" color="blue.600" textAlign="center">
                                {selectedLensData.description}
                            </Text>

                            {/* Add to Cart Button - Moved to Summary */}
                            <Button
                                onClick={handleAddToCart}
                                size="lg"
                                colorScheme="blue"
                                px={12}
                                py={6}
                                fontSize="lg"
                                fontWeight="bold"
                                _hover={{
                                    transform: "translateY(-2px)",
                                    boxShadow: "lg"
                                }}
                                transition="all 0.3s ease"
                            >
                                Add to Cart - ₹{(product?.price || 0) + selectedLensData.price}
                            </Button>
                        </VStack>
                    </Box>
                )}

                {/* Lenses Grid with Sections */}
                <Box mb={8}>
                    {currentCategory?.available ? (
                        Object.entries(groupedLenses).map(([section, lensesInSection]) => (
                            <Box key={section} mb={12}>
                                <SectionHeader section={section} />
                                
                                <Text mb={4} color="blue.700" fontWeight="semibold">Exclusive Benefits Offer</Text>
                                
                                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
                                    {lensesInSection.map((lens, index) => (
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
                                                    lens.name.includes('Fully') ? 'red.600' :
                                                    lens.name.includes('Night') ? 'blue.600' :
                                                    lens.name.includes('Polarized') ? 'blue.600' : 'red.700'
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
                                                        {/* Available Features */}
                                                        {lens.features.map((feature, idx) => (
                                                            <FeatureCheck 
                                                                key={`feature-${idx}`}
                                                                hasFeature={true}
                                                                label={feature}
                                                            />
                                                        ))}
                                                        
                                                        {/* Missing Features */}
                                                        {lens.missingFeatures?.map((feature, idx) => (
                                                            <FeatureCheck 
                                                                key={`missing-${idx}`}
                                                                hasFeature={false}
                                                                label={feature}
                                                            />
                                                        ))}
                                                    </VStack>

                                                    {/* Popular Badge */}
                                                    {lens.popular && (
                                                        <Badge 
                                                            colorScheme="green" 
                                                            variant="solid"
                                                            fontSize="xs"
                                                            px={2}
                                                            py={1}
                                                        >
                                                            POPULAR CHOICE
                                                        </Badge>
                                                    )}
                                                </VStack>
                                            </CardBody>
                                        </Card>
                                    ))}
                                </SimpleGrid>
                            </Box>
                        ))
                    ) : (
                        <Box textAlign="center" py={12} bg="gray.50" borderRadius="lg">
                            <Text fontSize="lg" color="gray.600">
                                {currentCategory?.name} lenses are coming soon!
                            </Text>
                            <Text fontSize="sm" color="gray.500" mt={2}>
                                We're working on bringing you the best {currentCategory?.name.toLowerCase()} options
                            </Text>
                        </Box>
                    )}
                </Box>

                {/* Bottom Add to Cart Button - Only shown when no lens is selected */}
                {!selectedLens && (
                    <Box textAlign="center" ref={addToCartRef}>
                        <Button
                            onClick={handleAddToCart}
                            size="lg"
                            colorScheme="blue"
                            isDisabled={!selectedLens || !currentCategory?.available}
                            px={12}
                            py={6}
                            fontSize="lg"
                            fontWeight="bold"
                            _hover={{
                                transform: "translateY(-2px)",
                                boxShadow: "lg"
                            }}
                            transition="all 0.3s ease"
                        >
                            {currentCategory?.available 
                                ? "Select a Lens to Continue"
                                : "Category Coming Soon"
                            }
                        </Button>
                        
                        {currentCategory?.available && (
                            <Text fontSize="sm" color="gray.500" mt={2}>
                                Please select a lens type above to add to cart
                            </Text>
                        )}
                    </Box>
                )}
            </Container>
        </>
    );
};

export default Lenses;