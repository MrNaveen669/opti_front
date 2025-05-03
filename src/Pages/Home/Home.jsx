
import React from "react";
import HomeCard from "./HomeCard";
import HomeCard1 from "./HomeCard1";
import HomeCard2 from "./HomeCard2";
import { HomeCard4, HomeCard4a, HomeCard4b } from "./HomeCard4";
import { HomeCard5, HomeCard5a, HomeCard5b, HomeCard5c } from "./HomeCard5";
import HomeCard6 from "./HomeCard6";
import HomeCard7 from "./HomeCard7";
import HomeCard8 from "./HomeCard8";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";


import {
  HomeDetails,
  HomeDetails1,
  HomeDetails2,
  // HomeDetails4,
  HomeDetails5,
  HomeDetails6,
  HomeDetails7,
  HomeDetails8,
  HomeDetails9,
  HomeDetails10,
  HomeDetails11,
  HomeDetails12,
  // HomeDetails14,
  HomeDetails15
} from "./HomeDetails";
import { Image, Box } from "@chakra-ui/react";
import seeclear from "../../assets/seeclear.png";
import get1 from "../../assets/get1.gif";
import offer2 from "../../assets/offer2.gif"
import Luxury from "../../assets/Luxury.png"
import kidwear from "../../assets/kidwear.png"
const Home = () => {
  return (
    <Box>
      <Navbar />
      <HomeCard type={HomeDetails} />
      <HomeCard1 type={HomeDetails1} />
      <Image
        src={seeclear}
        alt="img"
        mt="10"
      />
      <HomeCard2 type={HomeDetails2} src="https://i.imgur.com/Gry0Q5D.png" />
      <br />
      <br />
      <br />
      <br />
      <HomeCard4
        text="BUY 1 GET 1 FREE"
        src={get1}
      />
      <br />
      <br />
      <br />
      <br />
      <HomeCard4
        text="As Seen On"
        src={Luxury}
      />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <HomeCard4
        text="Trending Eyewear"
        src={offer2}
      />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <HomeCard5 />
      <br />
      <br />
      <br />
      <br />
      <HomeCard4a
        text="Kids Eyewear"
        src={kidwear}
      />
      <br />
      <br />
      <br />
      <br />
      <HomeCard5b type={HomeDetails5} heading="BUY IT YOUR WAY" />
      <br />
      <br />
      <br />
      <br />
      <HomeCard4b
        text="OUR BRANDS"
        src="/assets/Eyewear.png"
      />
      <br />
      <br />
      <br />
      <br />
      <HomeCard6 type={HomeDetails6} heading="EYEGLASSES" />
      <br />
      <br />
      <br />
      <br />
      <HomeCard6 type={HomeDetails7} heading="SUNGLASSES" />
      <br />
      <br />
      <br />
      <br />
      <HomeCard4b
        text=""
        src="/assets/offer4.png"
      />
      {/* <br />
      <br />
      <br />
      <br />
      <HomeCard6 type={HomeDetails6} heading="EYEGLASSES" />
      <br />
      <br />
      <br />
      <br />
      <HomeCard6 type={HomeDetails7} heading="SUNGLASSES" /> */}
      {/* <br />
      <br />
      <br />
      <br /> */}
      {/* <HomeCard4b
        text=""
        // src="https://static1.lenskart.com/media/desktop/img/Aug21/25-Aug/LK-AIR-Banner.jpg"
      /> */}
      {/* <br />
      <br />
      <br />
      <br />
      <HomeCard6 type={HomeDetails6} heading="EYEGLASSES" /> */}
      {/* <br />
      <br />
      <br />
      <br /> */}
      {/* <HomeCard4b
        text=""
        src="https://static1.lenskart.com/media/desktop/img/Aug21/25-Aug/LK-Readers-Banner.jpg"
      /> */}
      {/* <br />
      <br />
      <br />
      <br /> */}
      {/* <HomeCard6 type={HomeDetails10} heading="EYEGLASSES" />
      <br />
      <br />
      <br />
      <br /> */}
      <HomeCard4b
        text=""
        src="https://www.dropbox.com/scl/fi/dw6oe0q1a47z8505zyjev/IMG_2317.JPG?rlkey=l2box51va8er9qyogf02bfyxc&st=xe3ym9q8&dl=0"
      />
      <br />
      <br />
      <br />
      <br />
      <HomeCard6 type={HomeDetails8} heading="WITH POWER COMPUTER BLU LENSES" />
      <br />
      <br />
      <br />
      <br />
      <HomeCard6
        type={HomeDetails9}
        heading="WITH ZERO POWER COMPUTER BLU LENSES"
      />
      <br />
      <br />
      <br />
      <br />
      
      {/* <HomeCard5c type={HomeDetails14} heading="MEET OUR HAPPY CUSTOMERS" /> */}
      <HomeCard7 />
      <HomeCard8 type={HomeDetails15} />
      <Footer />
    </Box>
  );
};

export default Home;
