import React from "react";
import { Box, Text, Image, Flex, Center, Grid } from "@chakra-ui/react";
import { AiFillFacebook, AiOutlineInstagram, AiFillYoutube } from "react-icons/ai"; // ✅ Added YouTube, removed TfiTwitter
import { Link } from "react-router-dom"; // ✅ make sure to import Link

export const FooterCard1 = ({ type, heading }) => {
  return (
    <Box cursor="pointer">
      <Text fontSize="25px">{heading}</Text>
      <Box lineHeight="8">
        {type.map((i, index) => (
          <Box key={index}>
            <Text
              fontSize="15px"
              _hover={{ color: "whiteAlpha.600" }}
              lineHeight="2"
            >
              {i.labels}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export const FooterCard2 = () => {
  return (
    <Box cursor="pointer" textAlign="center" m="auto">
      <Center>
        <Grid
          gap="2"
          templateColumns={{
            base: "repeat(1,1fr)",
            md: "repeat(2,1fr)",
            lg: "repeat(2,1fr)",
            xl: "repeat(2,1fr)",
            "2xl": "repeat(2,1fr)"
          }}
        >
          {/* <Image src="..." /> */}
        </Grid>
      </Center>
      <br />
      <Center w="60%" m="auto" fontSize="14px">
        <Text>
          Visit Opticlair.in to buy Eyeglasses, Sunglasses and Contact Lenses
        </Text>
      </Center>
    </Box>
  );
};

export const FooterCard = () => {
  return (
    <Grid
      templateColumns="repeat(2,1fr)"
      justifyContent="space-between"
      m="auto"
    >
      <Grid
        templateColumns={{
          base: "repeat(1,1fr)",
          md: "repeat(4, 1fr)", // updated to 4 columns
          lg: "repeat(3,1fr)",
          xl: "repeat(3,1fr)",
          "2xl": "repeat(3,1fr)"
        }}
        cursor="pointer"
        p="2%"
        pl="6%"
        w="35%"
        lineHeight="10"
        gap="10%"
        pb={{ lg: "2%", sm: "4%", base: "10%" }}
      >
        <Link to="/terms-and-conditions">
          <Text fontSize="14px">T&C</Text>
        </Link>
        <Link to="/privacy-policy">
          <Text fontSize="14px">Privacy</Text>
        </Link>
        <Link to="/cancellations-and-refunds">
          <Text fontSize="14px">C&R</Text>
        </Link>
        
      </Grid>
      <Grid
        templateColumns={{
          base: "repeat(1,1fr)",
          md: "repeat(2,1fr)",
          lg: "repeat(2,1fr)"
        }}
        m="auto"
        color="white"
        gap="2"
        textAlign="left"
      >
        <Text fontSize="16px" fontWeight="500">
          FOLLOW US AT
        </Text>
        <Flex gap="2">
          <a href="facebook.com/profile.php?id=61570011819545" target="_blank" rel="noopener noreferrer">
            <AiFillFacebook size="30px" />
          </a>
          <a href="https://www.instagram.com/opti.clair/" target="_blank" rel="noopener noreferrer">
            <AiOutlineInstagram size="30px" />
          </a>
          <a href="https://www.youtube.com/@OptiClair" target="_blank" rel="noopener noreferrer">
            <AiFillYoutube size="30px" /> {/* ✅ replaced Twitter with YouTube */}
          </a>
        </Flex>
      </Grid>
    </Grid>
  );
};
