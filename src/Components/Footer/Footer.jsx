
import React from "react";
import { Box, Grid, Center,Text } from "@chakra-ui/react";
import { FooterCard1, FooterCard2, FooterCard } from "./FooterCard";
import { services, about, Location, Contact } from "./FooterDetails";

const Footer = () => {
  return (
    <Box
      bgColor="#010002"
      color="whiteAlpha.900"
      p={{ lg: "0", md: "5", base: "5" }}
    >
      <Grid
        templateColumns={{
          base: "repeat(1,1fr)",
          sm: "repeat(1,1fr)",
          md: "repeat(2,1fr)",
          lg: "repeat(2,1fr)"
        }}
        justifyContent="space-between"
        textAlign="left"
        ml="2%"
      >
        <Box w="60%" pl="5">
          <Grid
            templateColumns={{
              base: "repeat(1,1fr)",
              sm: "repeat(2,1fr)",
              md: "repeat(2,1fr)",
              lg: "repeat(3,1fr)"
            }}
            gap="5"
          >
            <FooterCard1 type={services} heading="Services" />
            <FooterCard1 type={about} heading="About Us" />
            <FooterCard1 type={Location} heading="Location" />
            {/* <FooterCard1 type={Contact} heading="Contact Us" /> */}
          </Grid>
        </Box>
        <Center>
          <FooterCard2 />
        </Center>
      </Grid>
      <hr />
      <FooterCard />
{/* ✅ Developed by WebAksh line with ⚡ */}
      <Center mt="6">
        <Text fontSize="15px" color="whiteAlpha.700">
          Developed by{" "}
          <a
            href="https://webaksh.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontWeight: "600",
              color: "#00bfff",
              textDecoration: "none",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#1e90ff")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#00bfff")}
          >
            ⚡ WebAksh
          </a>
        </Text>
      </Center>
    </Box>
  );
};

export default Footer;
