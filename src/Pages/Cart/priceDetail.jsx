
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

// function PriceDetail({ totalPrice, discountPrice }) {
//   const { coupon } = useSelector((state) => state.CartReducer);
  
//   // Calculate final amount (without tax)
//   const finalAmount = discountPrice - (coupon || 0);
  
//   return (
//     <Flex
//       flexDirection={"column"}
//       boxShadow="xl"
//       border="1px solid grey"
//       borderRadius={"10px"}
//       gap="3"
//       padding={"5px"}
//       cursor={"pointer"}
//     >
//       <Flex
//         gap={"4"}
//         flexDirection="column"
//         padding={"10px"}
//         border="0px solid red"
//       >
//         <Flex
//           gap="50px"
//           border="0px solid green"
//           justifyContent="space-between"
//         >
//           <Heading
//             as="p"
//             fontSize={"16px"}
//             fontWeight="500"
//             fontFamily={"Inter"}
//           >
//             Total Price
//           </Heading>
//           <Heading
//             as="p"
//             fontSize={"15px"}
//             fontWeight="500"
//             fontFamily={"Inter"}
//             justifyContent="flex-end"
//           >
//             ₹ {totalPrice}
//           </Heading>
//         </Flex>
        
//         <Box border={"1px dashed #CECEDF"}></Box>
        
//         <Flex gap="50px" border="0px solid blue" justifyContent="space-between">
//           <Heading
//             as="p"
//             fontSize={"16px"}
//             fontWeight="500"
//             fontFamily={"Inter"}
//           >
//             Total Discount
//           </Heading>
//           <Heading
//             as="p"
//             fontSize={"15px"}
//             fontWeight="500"
//             fontFamily={"Inter"}
//             justifyContent="flex-end"
//           >
//             - ₹ {totalPrice - discountPrice}
//           </Heading>
//         </Flex>
        
//         <Box border={"1px dashed #CECEDF"}></Box>
        
//         <Flex
//           gap="50px"
//           border="0px solid grey"
//           justifyContent={"space-between"}
//         >
//           <Heading
//             as="p"
//             fontSize={"16px"}
//             fontWeight="500"
//             fontFamily={"Inter"}
//           >
//             Coupon Discount
//           </Heading>
//           <Heading
//             as="p"
//             fontSize={"15px"}
//             fontWeight="500"
//             fontFamily={"Inter"}
//             justifyContent="flex-end"
//             color="green.900"
//           >
//             {coupon ? `- ₹ ${coupon}` : "₹ 0"}
//           </Heading>
//         </Flex>
        
//         <Box border={"1px dashed #CECEDF"}></Box>
        
//         <Flex
//           gap="50px"
//           border="0px solid grey"
//           justifyContent={"space-between"}
//         >
//           <Heading
//             as="p"
//             fontSize={"16px"}
//             fontWeight="500"
//             fontFamily={"Inter"}
//           >
//             Convenience Fees
//           </Heading>
//           <Heading
//             as="p"
//             fontSize={"16px"}
//             fontWeight="500"
//             fontFamily={"Inter"}
//             justifyContent="flex-end"
//             color="#0FBD95"
//           >
//             Free
//           </Heading>
//         </Flex>
        
//         <Box border={"1px dashed #CECEDF"}></Box>
        
//         <Flex
//           gap="50px"
//           border="0px solid grey"
//           justifyContent={"space-between"}
//           bg="gray.50"
//           p={2}
//           borderRadius="md"
//         >
//           <Heading
//             as="p"
//             fontSize={"17px"}
//             fontWeight="600"
//             fontFamily={"Inter"}
//           >
//             Total payable
//           </Heading>
//           <Heading
//             as="p"
//             fontSize={"16px"}
//             fontWeight="600"
//             fontFamily={"Inter"}
//             justifyContent="flex-end"
//           >
//             ₹ {finalAmount}
//           </Heading>
//         </Flex>
//       </Flex>
//     </Flex>
//   );
// }

// export default PriceDetail;
function PriceDetail({ totalPrice, discountPrice }) {
  const { coupon, cart } = useSelector((state) => state.CartReducer);
  
  // Calculate final amount (without tax)
  const finalAmount = discountPrice - (coupon || 0);
  
  // Calculate total frame and lens prices for better breakdown
  const calculatePriceBreakdown = () => {
    let totalFramePrice = 0;
    let totalLensPrice = 0;
    
    cart?.forEach(item => {
      const quantity = item.quantity || 1;
      
      if (item.lensDetails) {
        // Item with lens
        const framePrice = parseFloat(item.price) - item.lensDetails.totalLensPrice;
        totalFramePrice += framePrice * quantity;
        totalLensPrice += item.lensDetails.totalLensPrice * quantity;
      } else {
        // Frame only item
        totalFramePrice += parseFloat(item.price) * quantity;
      }
    });
    
    return { totalFramePrice, totalLensPrice };
  };
  
  const { totalFramePrice, totalLensPrice } = calculatePriceBreakdown();
  const hasLensItems = totalLensPrice > 0;
  
  return (
    <Flex
      flexDirection={"column"}
      boxShadow="xl"
      border="1px solid grey"
      borderRadius={"10px"}
      gap="3"
      padding={"5px"}
      cursor={"pointer"}
    >
      <Flex
        gap={"4"}
        flexDirection="column"
        padding={"10px"}
        border="0px solid red"
      >
        {/* Show detailed breakdown if there are lens items */}
        {hasLensItems && (
          <>
            <Flex
              gap="50px"
              border="0px solid green"
              justifyContent="space-between"
            >
              <Heading
                as="p"
                fontSize={"15px"}
                fontWeight="500"
                fontFamily={"Inter"}
                color="gray.600"
              >
                Frames Total
              </Heading>
              <Heading
                as="p"
                fontSize={"14px"}
                fontWeight="500"
                fontFamily={"Inter"}
                justifyContent="flex-end"
                color="gray.600"
              >
                ₹ {totalFramePrice}
              </Heading>
            </Flex>
            
            <Flex
              gap="50px"
              border="0px solid green"
              justifyContent="space-between"
            >
              <Heading
                as="p"
                fontSize={"15px"}
                fontWeight="500"
                fontFamily={"Inter"}
                color="blue.600"
              >
                Lenses Total
              </Heading>
              <Heading
                as="p"
                fontSize={"14px"}
                fontWeight="500"
                fontFamily={"Inter"}
                justifyContent="flex-end"
                color="blue.600"
              >
                ₹ {totalLensPrice}
              </Heading>
            </Flex>
            
            <Box border={"1px dashed #CECEDF"}></Box>
          </>
        )}
        
        <Flex
          gap="50px"
          border="0px solid green"
          justifyContent="space-between"
        >
          <Heading
            as="p"
            fontSize={"16px"}
            fontWeight="500"
            fontFamily={"Inter"}
          >
            Total Price
          </Heading>
          <Heading
            as="p"
            fontSize={"15px"}
            fontWeight="500"
            fontFamily={"Inter"}
            justifyContent="flex-end"
          >
            ₹ {totalPrice}
          </Heading>
        </Flex>
        
        <Box border={"1px dashed #CECEDF"}></Box>
        
        <Flex gap="50px" border="0px solid blue" justifyContent="space-between">
          <Heading
            as="p"
            fontSize={"16px"}
            fontWeight="500"
            fontFamily={"Inter"}
          >
            Total Discount
          </Heading>
          <Heading
            as="p"
            fontSize={"15px"}
            fontWeight="500"
            fontFamily={"Inter"}
            justifyContent="flex-end"
          >
            - ₹ {totalPrice - discountPrice}
          </Heading>
        </Flex>
        
        <Box border={"1px dashed #CECEDF"}></Box>
        
        <Flex
          gap="50px"
          border="0px solid grey"
          justifyContent={"space-between"}
        >
          <Heading
            as="p"
            fontSize={"16px"}
            fontWeight="500"
            fontFamily={"Inter"}
          >
            Coupon Discount
          </Heading>
          <Heading
            as="p"
            fontSize={"15px"}
            fontWeight="500"
            fontFamily={"Inter"}
            justifyContent="flex-end"
            color="green.900"
          >
            {coupon ? `- ₹ ${coupon}` : "₹ 0"}
          </Heading>
        </Flex>
        
        <Box border={"1px dashed #CECEDF"}></Box>
        
        <Flex
          gap="50px"
          border="0px solid grey"
          justifyContent={"space-between"}
        >
          <Heading
            as="p"
            fontSize={"16px"}
            fontWeight="500"
            fontFamily={"Inter"}
          >
            Convenience Fees
          </Heading>
          <Heading
            as="p"
            fontSize={"16px"}
            fontWeight="500"
            fontFamily={"Inter"}
            justifyContent="flex-end"
            color="#0FBD95"
          >
            Free
          </Heading>
        </Flex>
        
        <Box border={"1px dashed #CECEDF"}></Box>
        
        <Flex
          gap="50px"
          border="0px solid grey"
          justifyContent={"space-between"}
          bg="gray.50"
          p={2}
          borderRadius="md"
        >
          <Heading
            as="p"
            fontSize={"17px"}
            fontWeight="600"
            fontFamily={"Inter"}
          >
            Total payable
          </Heading>
          <Heading
            as="p"
            fontSize={"16px"}
            fontWeight="600"
            fontFamily={"Inter"}
            justifyContent="flex-end"
          >
            ₹ {finalAmount}
          </Heading>
        </Flex>
        
        {/* Show savings if there are lens items */}
        {hasLensItems && (
          <Flex
            gap="50px"
            border="0px solid grey"
            justifyContent={"center"}
            mt={2}
          >
            <Text
              fontSize={"13px"}
              color="green.600"
              fontWeight="500"
              textAlign="center"
            >
              🎉 You're getting frames + lenses in one convenient package!
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

export default PriceDetail;