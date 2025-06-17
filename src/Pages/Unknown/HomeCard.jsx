// import React from "react";
// import { Box, Grid, Text, Image, Center } from "@chakra-ui/react";

// const HomeCard = ({ type }) => {
//   return (
//     <Box mb="2" cursor="pointer" bgColor="#f5f5f5" p="4" w="100%">
//       <Grid
//         templateColumns={{
//           base: "repeat(2,1fr)",
//           md: "repeat(3,1fr)",
//           lg: "repeat(4,1fr)",
//           xl: "repeat(6,1fr)",
//           "2xl": "repeat(6,1fr)"
//         }}
//         gap={6}
//         w="99%"
//         m="auto"
//       >
//         {type.map((i) => (
//           <Box
//             key={i}
//             border="1px"
//             borderColor="white"
//             flexDirection="column"
//             borderRadius="md"
//             bgColor="white"
//             p="1"
//             pb="2.5"
//           >
//             <Center>
//               <Image src={`${i.img}`} alt={i.name} w="100%" />
//             </Center>
//             <Center>
//               <Text color="gray" fontSize="16px" fontWeight="500" p="1">
//                 {i.title}
//               </Text>
//             </Center>
//           </Box>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default HomeCard;
import React from "react";
import { Box, Grid, Text, Image, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const HomeCard = ({ type }) => {
  const navigate = useNavigate();

  // Function to standardize category names
  const standardizeCategory = (category) => {
    // Convert to lowercase for case-insensitive comparison
    const lowerCategory = category.toLowerCase();
    
    // Map of various spellings to standardized versions
    const categoryMap = {
      // Eyeglasses variations
      'eyeglasses': 'Eye Glasses',
      'eye glasses': 'Eye Glasses',
      'eye glass': 'Eye Glasses',
      'eyeglass': 'Eye Glasses',
      
      // Sunglasses variations
      'sunglasses': 'Sun Glasses',
      'sun glasses': 'Sun Glasses',
      'sunglass': 'Sun Glasses',
      
      // Computer glasses variations
      'computer glasses': 'Computer Glasses',
      'computer glass': 'Computer Glasses',
      
      // Contact lenses variations
      'contact lenses': 'Contact Lenses',
      'contact lens': 'Contact Lenses',
      
      // Power sunglasses variations
      'power sunglasses': 'Power Sunglasses',
      'power sun glasses': 'Power Sunglasses',
      
      // Progressive lenses variations
      'progressive lenses': 'Progressive Lenses',
      'progressive lens': 'Progressive Lenses',
    };
    
    // Return the standardized version or the original if not found
    return categoryMap[lowerCategory] || category;
  };

  const handleCategoryClick = (category) => {
    const standardizedCategory = standardizeCategory(category);
    // Navigate to products page with the standardized category as a filter
    navigate(`/sampleproduct?category=${encodeURIComponent(standardizedCategory)}`);
  };

  return (
    <Box mb="2" bgColor="#f5f5f5" p="4" w="100%">
      <Grid
        templateColumns={{
          base: "repeat(2,1fr)",
          md: "repeat(3,1fr)",
          lg: "repeat(4,1fr)",
          xl: "repeat(6,1fr)",
          "2xl": "repeat(6,1fr)"
        }}
        gap={6}
        w="99%"
        m="auto"
      >
        {type.map((item) => (
          <Box
            key={item.id || item.title}
            border="1px"
            borderColor="white"
            flexDirection="column"
            borderRadius="md"
            bgColor="white"
            p="1"
            pb="2.5"
            cursor="pointer"
            onClick={() => handleCategoryClick(item.category || item.title)}
            _hover={{ 
              boxShadow: "md",
              transform: "translateY(-2px)",
              transition: "all 0.3s ease"
            }}
          >
            <Center>
              <Image src={item.img} alt={item.title} w="100%" />
            </Center>
            <Center>
              <Text color="gray" fontSize="16px" fontWeight="500" p="1">
                {item.title}
              </Text>
            </Center>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default HomeCard;