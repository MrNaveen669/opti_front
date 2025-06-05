// src/Pages/NotFound/NotFound.jsx
import React from 'react';
import { Box, Image, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      px={4}
    >
      <VStack spacing={6} textAlign="center">
        <Image
          src="https://cdn.svgator.com/images/2024/04/broken-plug-animation-404--page-not-found.gif"
          alt="404 - Page Not Found"
          maxW="400px"
          w="100%"
        />
        <Heading as="h1" size="xl">
          Oops! Page Not Found
        </Heading>
        <Text fontSize="lg" color="gray.600">
          The page you're looking for doesn't exist or has been moved.
        </Text>
        <Button as={Link} to="/" colorScheme="blue">
          Go to Home
        </Button>
      </VStack>
    </Box>
  );
};

export default NotFound;
