
// import { Link } from "react-router-dom";
// import { Box, Flex, Grid, GridItem, Text, Image } from "@chakra-ui/react";
// import { AiFillStar } from "react-icons/ai";

// const ProductCard = ({ products }) => {
//     return (
//         <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
//             {products.map((product) => (
//                 <GridItem key={product._id}>
//                     <Box
//                         border="1px solid"
//                         borderColor="gray.200"
//                         borderRadius="10px"
//                         p="15px"
//                         _hover={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
//                     >
//                         <Link to={`/sampleproduct/${product._id}`}>
//                             <Image
//                                 src={product.image || "https://via.placeholder.com/150"}
//                                 alt={product.name}
//                                 width="100%"
//                                 height="200px"
//                                 objectFit="cover"
//                                 borderRadius="8px"
//                                 _hover={{ transform: "scale(1.05)" }}
//                             />
//                         </Link>

//                         <Box p="10px">
//                             <Flex justifyContent="space-between">
//                                 <Text fontSize="18px" fontWeight="bold">{product.name}</Text>
//                                 <Flex bgColor="#eeeef5" p="5px" borderRadius="20px" alignItems="center">
//                                     <Text>{(Math.random() * (5 - 1) + 1).toFixed(1)}</Text>
//                                     <AiFillStar size="15px" color="#0fbd95" />
//                                 </Flex>
//                             </Flex>
//                             <Text color="gray.500" fontSize="14px">{product.description}</Text>
//                             <Text fontWeight="500">Category: <strong>{product.category}</strong></Text>
//                             <Text fontWeight="bold" fontSize="18px">Rs.{product.price}</Text>
//                         </Box>
//                     </Box>
//                 </GridItem>
//             ))}
//         </Grid>
//     );
// };

// export default ProductCard;
import { Link } from "react-router-dom";
import { Box, Flex, Grid, GridItem, Text, Image } from "@chakra-ui/react";
// import { AiFillStar } from "react-icons/ai";

const ProductCard = ({ products }) => {
  return (
    <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
      {products.map((product) => (
        <GridItem key={product._id}>
          <Box
            border="1px solid"
            borderColor="gray.200"
            borderRadius="10px"
            p="15px"
            _hover={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
            transition="all 0.3s ease"
            height="100%"
            display="flex"
            flexDirection="column"
          >
            <Link to={`/sampleproduct/${product._id}`}>
              <Box 
                position="relative" 
                paddingTop="75%" 
                width="100%" 
                overflow="hidden" 
                borderRadius="8px"
              >
                <Image
                  src={product.image || "https://via.placeholder.com/150"}
                  alt={product.name}
                  position="absolute"
                  top="0"
                  left="0"
                  width="100%"
                  height="100%"
                  objectFit="contain"
                  borderRadius="8px"
                  _hover={{ transform: "scale(1.05)" }}
                  transition="transform 0.3s ease"
                />
              </Box>
            </Link>

            <Box p="10px" flex="1" display="flex" flexDirection="column">
              <Flex justifyContent="space-between" mb={2}>
                <Text fontSize="18px" fontWeight="bold" noOfLines={1}>{product.name}</Text>
                <Flex bgColor="#eeeef5" p="5px" borderRadius="20px" alignItems="center">
                  {/* <Text>{(Math.random() * (5 - 1) + 1).toFixed(1)}</Text> */}
                  {/* <AiFillStar size="15px" color="#0fbd95" /> */}
                </Flex>
              </Flex>
              
              {/* Truncated description with ellipsis */}
              <Text 
                color="gray.500" 
                fontSize="14px" 
                noOfLines={2} 
                mb={2}
                title={product.description} // Shows full text on hover
              >
                {product.description}
              </Text>
              
              <Text fontWeight="500">Category: <strong>{product.category}</strong></Text>
              <Text fontWeight="bold" fontSize="18px" mt="auto">Rs.{product.price}</Text>
            </Box>
          </Box>
        </GridItem>
      ))}
    </Grid>
  );
};

export default ProductCard;