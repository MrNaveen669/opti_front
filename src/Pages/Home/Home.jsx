import React from "react";
import { Helmet } from "react-helmet";
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
import { Link, useNavigate } from "react-router-dom";
import { Button, Image, Box } from "@chakra-ui/react";

import {
  HomeDetails,
  HomeDetails1,
  HomeDetails2,
  HomeDetails5,
  HomeDetails6,
  HomeDetails7,
  HomeDetails8,
  HomeDetails9,
  HomeDetails10,
  HomeDetails11,
  HomeDetails12,
  HomeDetails15,
} from "./HomeDetails";

import seeclear from "../../assets/seeclear.png";
import get1 from "../../assets/get1.gif";
import offer2 from "../../assets/offer2.gif";
import Luxury from "../../assets/Luxury.png";
import kidwear from "../../assets/kidwear.png";
import book from "../../assets/book.png";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = (filterParams) => {
    const queryString = new URLSearchParams(filterParams).toString();
    navigate(`/sampleproduct?${queryString}`);
  };

  return (
    <Box>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Best Optical Store in Raipur | Opticlair Eyewear</title>
        <meta
          name="description"
          content="Visit Opticlair – Raipur's best optical shop for stylish glasses, sunglasses, and eye checkups. Located in Raipur Chhattisgarh's eyewear and chasma market."
        />
        <meta
          name="keywords"
          content="optical store in raipur, raipur chasma market, best eyewear shop in raipur, sunglasses shop raipur, optical showroom in raipur, optician raipur"
        />
        <meta property="og:title" content="Top Eyewear Store in Raipur | Opticlair" />
        <meta
          property="og:description"
          content="Stylish spectacles, sunglasses, and frames at Opticlair – trusted optical shop in Raipur, Chhattisgarh."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dl28vjim6/image/upload/v1749190143/favicon_ava6yq.ico"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.opticlair.in" />
      </Helmet>

      {/* Local SEO Content */}
      <Navbar />
      {/* <Box p={5} textAlign="center" bg="#f7f7f7" fontSize="18px">   
        <h1>Welcome to Opticlair – Best Optical Shop in Raipur</h1>
        <p>
          Looking for the <strong>top eyewear shop in Raipur</strong>? We’re located in the heart of the{" "}
          <strong>Raipur chasma market</strong> offering premium <strong>eyeglasses</strong>,{" "}
          <strong>sunglasses</strong>, and <strong>eye care</strong> solutions at the best prices.
        </p>
      </Box> */}

      {/* Home Page UI Components */}
      <HomeCard type={HomeDetails} />
      <Link to="/sampleproduct">
        <HomeCard1 type={HomeDetails1} />
      </Link>
      <Link to="/book-appointment">
        <Box textAlign="center" my={10}>
          <Image src={book} alt="Book Appointment with Opticlair" mt="10" />
        </Box>
      </Link>
      
      
      <HomeCard2 type={HomeDetails2} src="https://i.imgur.com/Gry0Q5D.png" />
      <Image src={seeclear} alt="See Clearly with Opticlair Eyewear" mt="10" />
      <br /><br /><br /><br />
      

      <Link to="/sampleproduct">
        <HomeCard4 text="BUY 1 GET 1 FREE" src={get1} />
      </Link>
      <br /><br /><br /><br />

      <Link to="/sampleproduct">
        <HomeCard4 text="As Seen On" src={Luxury} />
      </Link>
      <br /><br /><br /><br /><br /><br />

      <HomeCard4 text="Trending Eyewear" src={offer2} />
      <br /><br /><br /><br /><br /><br />

      <HomeCard5 />
      <br /><br /><br /><br />

      <Link to="" onClick={() => handleNavigation({ gender: "Kids" })}>
        <HomeCard4a text="Kids Eyewear" src={kidwear} />
      </Link>

      <br /><br /><br /><br />
      <HomeCard5b type={HomeDetails5} heading="BUY IT YOUR WAY" />
      <br /><br /><br /><br />

      <HomeCard4b text="OUR BRANDS" src="/assets/Eyewear.png" />
      <br /><br /><br /><br />

      <HomeCard6 type={HomeDetails6} heading="EYEGLASSES" category="Eye Glasses" />
      <br /><br /><br /><br />

      <HomeCard6 type={HomeDetails7} heading="SUNGLASSES" category="Sunglasses" />
      <br /><br /><br /><br />

      <HomeCard4b text="" src="/assets/offer4.png" />
      <HomeCard4b text="" src="https://www.dropbox.com/scl/fi/dw6oe0q1a47z8505zyjev/IMG_2317.JPG?rlkey=l2box51va8er9qyogf02bfyxc&st=xe3ym9q8&dl=0" />
      <br /><br /><br /><br />

      <HomeCard6 type={HomeDetails8} heading="COMPUTER GLASSES" category="Computer Glasses" />
      <br /><br /><br /><br />

      <HomeCard7 />
      <HomeCard8 type={HomeDetails15} />
      <Footer />
    </Box>
  );
};

export default Home;
