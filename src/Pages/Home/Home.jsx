
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
import { Link } from "react-router-dom"; // ✅ make sure to import Link
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";


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
  const navigate = useNavigate();

  // Function to handle navigation with filters
  const handleNavigation = (filterParams) => {
    // Construct the query string from filter parameters
    const queryString = new URLSearchParams(filterParams).toString();
    navigate(`/sampleproduct?${queryString}`);
  };

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
      <Box textAlign="center" my={10}>
        <Button
          colorScheme="teal"
          size="lg"
          onClick={() => navigate("/book-appointment")}
        >
          Visit Store / Book Appointment
        </Button>
      </Box>
      <HomeCard2 type={HomeDetails2} src="https://i.imgur.com/Gry0Q5D.png" />
      <br />
      <br />
      <br />
      <br />
      <Link to="/sampleproduct">
        <HomeCard4
          text="BUY 1 GET 1 FREE"
          src={get1} />
      </Link>

      <br />
      <br />
      <br />
      <br />
      <Link to="/sampleproduct">
        <HomeCard4
          text="As Seen On"
          src={Luxury}
        /></Link>
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
      <Link to="" onClick={() => handleNavigation({ gender: 'Kids' })} >
        <HomeCard4a
          text="Kids Eyewear"
          src={kidwear}
        // onClick={() => handleNavigation({ category: "Eye Glasses", gender: 'Kids' })}
        />
      </Link>

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
      <HomeCard6 type={HomeDetails6} heading="EYEGLASSES"
        category="Eye Glasses" />
      <br />
      <br />
      <br />
      <br />
      <HomeCard6 type={HomeDetails7} heading="SUNGLASSES"
        category="Sunglasses" />
      <br />
      <br />
      <br />
      <br />
      <HomeCard4b
        text=""
        src="/assets/offer4.png"
      />

      <HomeCard4b
        text=""
        src="https://www.dropbox.com/scl/fi/dw6oe0q1a47z8505zyjev/IMG_2317.JPG?rlkey=l2box51va8er9qyogf02bfyxc&st=xe3ym9q8&dl=0"
      />
      <br />
      <br />
      <br />
      <br />
      <HomeCard6 type={HomeDetails8} heading="COMPUTER GLASSES"
        category="Computer Glasses" />
      <br />
      <br />
      <br />
      <br />
      {/* <HomeCard6
        type={HomeDetails9}
        heading="WITH ZERO POWER COMPUTER BLU LENSES"
        category="Computer Glasses" />
      <br />
      <br />
      <br />
      <br /> */}

      {/* <HomeCard5c type={HomeDetails14} heading="MEET OUR HAPPY CUSTOMERS" /> */}
      <HomeCard7 />
      <HomeCard8 type={HomeDetails15} />
      <Footer />
    </Box>
  );
};

export default Home;
