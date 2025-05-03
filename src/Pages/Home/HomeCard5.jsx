import React from "react";
import { Box, Text, Image, Grid } from "@chakra-ui/react";
import ReactPlayer from "react-player";
import offer1 from "../../assets/offer1.png";


export const HomeCard5 = () => {
  return (
    <Box w="85%" m="auto">
      <Text fontSize="30px" pb="7" fontWeight="500" textAlign="center">
        FIND THE PERFECT FIT
      </Text>
      <Grid
        templateColumns={{
          base: "repeat(1,1fr)",
          md: "repeat(2,1fr)",
          lg: "repeat(2,1fr)",
          xl: "repeat(2,1fr)",
          "2xl": "repeat(2,1fr)"
        }}
      >
        <Box>
          <Image
            src={offer1}
            alt="img"
            p="2"
          />
          <Image
            src="/assets/ZERO POWER GLASSES.png"
            alt="img"
            p="2"
          />
        </Box>
        <Box>
          <Image
            src="/assets/SUNGLASSES.png"
            alt="img"
            p="2"
          />
          <Image
            src="/assets/Computer glasses.png"
            alt="img"
            p="2"
          />
          <Image
            src="/assets/powersun.png"
            alt="img"
            p="2"
          />
        </Box>
      </Grid>
    </Box>
  );
};

export const HomeCard5a = ({ type, heading }) => {
  return (
    <Box w="85%" m="auto">
      <Text fontSize="30px" pb="7" fontWeight="500" textAlign="center">
        {heading}
      </Text>
      <Grid
        templateColumns={{
          base: "repeat(1,1fr)",
          md: "repeat(1,1fr)",
          lg: "repeat(2,1fr)",
          xl: "repeat(2,1fr)",
          "2xl": "repeat(2,1fr)"
        }}
        gap={6}
      >
        {type.map((i) => (
          <Box key={i}>
            <Image src={`${i.img}`} alt={i.caption} />
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export const HomeCard5b = ({ type, heading }) => {
  return (
    <Box w="95%" m="auto">
      <Text fontSize="30px" pb="7" fontWeight="500" textAlign="center">
        {heading}
      </Text>
      <Grid
        templateColumns={{
          base: "repeat(1,1fr)",
          md: "repeat(1,1fr)",
          lg: "repeat(2,1fr)",
          xl: "repeat(2,1fr)",
          "2xl": "repeat(2,1fr)"
        }}
        gap={6}
      >
        {type.map((i) => (
          <Box key={i}>
            <Image src={`${i.img}`} alt={i.caption} />
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export const HomeCard5c = ({ type, heading }) => {
  return (
    <Box bgColor="#fff092" pb="5%" pt="2%">
      <Box w="90%" m="auto">
        <Text
          fontSize="30px"
          pb="7"
          fontWeight="500"
          textAlign="center"
          font-family="futurastd-medium"
        >
          {heading}
        </Text>
        <Grid
          templateColumns={{
            base: "repeat(1,1fr)",
            md: "repeat(1,1fr)",
            lg: "repeat(2,1fr)",
            xl: "repeat(3,1fr)",
            "2xl": "repeat(3,1fr)"
          }}
          gap={6}
          w="100%"
        >
          {type.map((i) => (
            <Box key={i}>
              <ReactPlayer url={i.img} width="100%" height="300px" />
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
