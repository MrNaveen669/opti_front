
// import { NavbarDetail1 } from "./NavbarDetail";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation, Link, Navigate } from "react-router-dom";
import { AuthContext } from "../../ContextApi/AuthContext";
import Login from "../../Pages/Login/Login";
import Signup from "../../Pages/Signup/Signup";
import NavbarCard5 from "./NavbarCard5";
// import { NavbarDetail1 } from "./NavbarDetail";
import { FiPhoneCall } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import { CgShoppingCart } from "react-icons/cg";
import { TriangleDownIcon, SearchIcon } from "@chakra-ui/icons";
import LogoImage from "../../assets/logo5.png"; // Adjust the path as necessary
import {
  Box,
  Text,
  Flex,
  Spacer,
  Image,
  Input,
  Button,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Icon
} from "@chakra-ui/react";


export const NavbarCard2 = () => {
  const { isAuth, setisAuth, Authdata } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  // Handle search input changes
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Real-time search - call the product search function if it exists
    if (window.handleProductSearch) {
      window.handleProductSearch(query);
    }
    
    // Update URL with search query if on product page
    if (location.pathname === '/sampleproduct' && query.trim()) {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('search', query);
      navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    } else if (location.pathname === '/sampleproduct' && !query.trim()) {
      // Remove search param if query is empty
      const searchParams = new URLSearchParams(location.search);
      searchParams.delete('search');
      const newSearch = searchParams.toString();
      navigate(`${location.pathname}${newSearch ? `?${newSearch}` : ''}`, { replace: true });
    }
  };

  // Handle search on Enter key or when user clicks search icon
  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      if (searchQuery.trim()) {
        // Navigate to product page with search query
        navigate(`/sampleproduct?search=${encodeURIComponent(searchQuery.trim())}`);
      }
    }
  };

  // Clear search when navigating away from product page
  useEffect(() => {
    if (location.pathname !== '/sampleproduct') {
      setSearchQuery("");
    } else {
      // Set search query from URL if on product page
      const searchParams = new URLSearchParams(location.search);
      const urlSearch = searchParams.get('search');
      if (urlSearch) {
        setSearchQuery(urlSearch);
      }
    }
  }, [location.pathname, location.search]);

  return (
    <Box cursor="pointer">
      <HStack m="auto">
        <Box w="20%" display="flex" justifyContent="center">
          <Link to="/">
            <Image src={LogoImage} alt="logo" w={["80px", "100px", "120px"]} />
          </Link>
        </Box>
        <HStack w="85%" m="auto">
          <Box w="15%">
            <HStack fontSize="18px" fontWeight="bold">
              <FiPhoneCall />
              <Text>9981463336</Text>
            </HStack>
          </Box>
          <Box w="55%" position="relative">
            <Input
              placeholder="What are you looking for"
              border="1px solid black"
              w="95%"
              fontSize="17px"
              h="45px"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={handleSearchSubmit}
            />
            {/* Search icon button */}
            <Box
              position="absolute"
              right="5%"
              top="50%"
              transform="translateY(-50%)"
              cursor="pointer"
              onClick={handleSearchSubmit}
              p="2"
              borderRadius="md"
              _hover={{ bg: "gray.100" }}
            >
              <Icon as={SearchIcon} color="gray.500" />
            </Box>
            
            {/* Search suggestions dropdown (optional enhancement) */}
            {searchQuery.trim() && location.pathname !== '/sampleproduct' && (
              <Box
                position="absolute"
                top="100%"
                left="0"
                right="5%"
                bg="white"
                border="1px solid"
                borderColor="gray.200"
                borderRadius="md"
                mt="1"
                zIndex="10"
                boxShadow="md"
              >
                <Box
                  p="3"
                  _hover={{ bg: "gray.50" }}
                  cursor="pointer"
                  onClick={() => navigate(`/sampleproduct?search=${encodeURIComponent(searchQuery.trim())}`)}
                >
                  <Text fontSize="sm">
                    Search for "{searchQuery}" in products
                  </Text>
                </Box>
              </Box>
            )}
          </Box>
          <HStack w="35%">
            <Button
              size="lg"
              bg="whiteAlpha.900"
              fontSize="14px"
              fontWeight="400"
              onClick={() => navigate("/orderhistory")}
            >
              Track Order
            </Button>
            {isAuth === true ? (
              <Popover trigger="hover">
                <PopoverTrigger>
                  <Box
                    fontWeight={"600"}
                    fontSize="15px"
                    m="auto"
                    mt="-2px"
                    w="90px"
                    textAlign="center"
                  >
                    {Authdata[0].first_name}
                    <TriangleDownIcon
                      ml="2px"
                      fontSize={"9px"}
                      _hover={{ transform: "rotate(180deg)" }}
                    />
                  </Box>
                </PopoverTrigger>
                <PopoverContent
                  w="120px"
                  boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
                >
                  <PopoverBody
                    h={"40px"}
                    pl="6"
                    fontSize="15px"
                    _hover={{ fontWeight: "bold" }}
                  >
                    <Box
                      color="#333368"
                      onClick={() => {
                        setisAuth(false);
                        return <Navigate to="/" />;
                      }}
                    >
                      Sign Out
                    </Box>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            ) : (
              <Box display={"flex"}>
                <Login />
                <Signup />
              </Box>
            )}
            <Button
              leftIcon={<CiHeart />}
              size="lg"
              bg="whiteAlpha.900"
              fontSize="14px"
              fontWeight="400"
              onClick={() => navigate("/wishlist")}
            >
              Wishlist
            </Button>
            <Link to="/cart">
              <Button
                leftIcon={<CgShoppingCart />}
                size="lg"
                bg="whiteAlpha.900"
                fontSize="14px"
                fontWeight="400"
              >
                Cart
              </Button>
            </Link>
          </HStack>
        </HStack>
      </HStack>
    </Box>
  );
};

export const NavbarCard4 = () => {
  return (
    <Box cursor="pointer" bg="#fbf9f7" p={2.5}>
      <Flex gap={4} pl={5} pt={2} justifyContent="space-between">
        <NavbarCard5 />
      </Flex>
    </Box>
  );
};
