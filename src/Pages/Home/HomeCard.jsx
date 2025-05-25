
// import React from "react";
// import { Box, Grid, Text, Image, Center } from "@chakra-ui/react";
// import { Link } from "react-router-dom"; // ✅ Add this

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
//         {type.map((item, index) => (
//           <Link to={item.link || "#"} key={index}>
//             <Box
//               border="1px"
//               borderColor="white"
//               flexDirection="column"
//               borderRadius="md"
//               bgColor="white"
//               p="1"
//               pb="2.5"
//               _hover={{ boxShadow: "lg", transform: "scale(1.03)" }}
//               transition="all 0.2s"
//             >
//               <Center>
//                 <Image src={item.img} alt={item.title} w="100%" />
//               </Center>
//               <Center>
//                 <Text color="gray" fontSize="16px" fontWeight="500" p="1">
//                   {item.title}
//                 </Text>
//               </Center>
//             </Box>
//           </Link>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default HomeCard;
 

import React from "react";
import { Box, Grid, Text, Image, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const HomeCard = ({ type }) => {
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
        {type.map((item, index) => (
          <Link to={item.link || "#"} key={index}>
            <Box
              border="1px"
              borderColor="white"
              borderRadius="md"
              bgColor="white"
              p="1"
              pb="2.5"
              transition="all 0.2s"
              _hover={{ boxShadow: "lg", transform: "scale(1.03)" }}
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
          </Link>
        ))}
      </Grid>
    </Box>
  );
};

export default HomeCard;
