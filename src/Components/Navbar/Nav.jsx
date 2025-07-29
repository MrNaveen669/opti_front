import React, { useContext, useState, useEffect } from "react";
import Login from "../../Pages/Login/Login";
import Signup from "../../Pages/Signup/Signup";
import { AuthContext } from "../../ContextApi/AuthContext";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import LogoImage from "../../assets/logo5.png"; // Adjust the path as necessary
import {
  DrawerCloseButton,
  Button,
  Box,
  useDisclosure,
  HStack,
  Image,
  Input,
  Drawer,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerFooter,
  DrawerBody,
  Heading,
  Avatar,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex,
  Icon
} from "@chakra-ui/react";

function Nav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
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

  // Function to handle navigation with filters (same as NavbarCard5)
  const handleNavigation = (filterParams) => {
    // Construct the query string from filter parameters
    const queryString = new URLSearchParams(filterParams).toString();
    navigate(`/sampleproduct?${queryString}`);
    onClose(); // Close the drawer after navigation
  };

  return (
    <Box
      display={{ lg: "inherit", xl: "none" }}
      cursor="pointer"
      bg="#fbf9f7"
      p={2.5}
    >
      <HStack m="auto" justifyContent="space-between">
        <Box w={{ lg: "20%", md: "20%", sm: "22%", base: "30%" }}>
          <Link to="/">
            <Image src={LogoImage} alt="logo" w={{ lg: "75%", md: "100%", sm: "100%", base: "100%" }} />
          </Link>
        </Box>
        <Box w="70%" display={{ sm: "inherit", base: "none" }} position="relative">
          <Input
            placeholder="What are you looking for"
            border="1px solid black"
            w="90%"
            fontSize="16px"   
            h="35px"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={handleSearchSubmit}
          />
          {/* Search icon button */}
          <Box
            position="absolute"
            right="12%"
            top="50%"
            transform="translateY(-50%)"
            cursor="pointer"
            onClick={handleSearchSubmit}
            p="1"
            borderRadius="md"
            _hover={{ bg: "gray.100" }}
          >
            <Icon as={SearchIcon} color="gray.500" boxSize="4" />
          </Box>
          
          {/* Search suggestions dropdown (optional enhancement) */}
          {searchQuery.trim() && location.pathname !== '/sampleproduct' && (
            <Box
              position="absolute"
              top="100%"
              left="0"
              right="10%"
              bg="white"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="md"
              mt="1"
              zIndex="10"
              boxShadow="md"
            >
              <Box
                p="2"
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

        <Box>
          <Button colorScheme="blue" p="0" onClick={onOpen}>
            <HamburgerIcon fontSize="20px" />
          </Button>
          <Drawer
            size="xs"
            isOpen={isOpen}
            placement="right"
            initialFocusRef={firstField}
            onClose={onClose}
          >
            <DrawerOverlay />
            <DrawerContent color="blackAlpha.900">
              <DrawerCloseButton />
              <DrawerHeader bg="whiteAlpha.900">
                {/* Mobile Search Input - Always visible in drawer */}
                <Box mb="4" position="relative">
                  <Input
                    placeholder="What are you looking for"
                    border="1px solid black"
                    w="100%"
                    fontSize="14px"   
                    h="35px"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyPress={handleSearchSubmit}
                  />
                  {/* Search icon button for mobile */}
                  <Box
                    position="absolute"
                    right="2"
                    top="50%"
                    transform="translateY(-50%)"
                    cursor="pointer"
                    onClick={handleSearchSubmit}
                    p="1"
                    borderRadius="md"
                    _hover={{ bg: "gray.100" }}
                  >
                    <Icon as={SearchIcon} color="gray.500" boxSize="4" />
                  </Box>
                  
                  {/* Mobile search suggestions */}
                  {searchQuery.trim() && location.pathname !== '/sampleproduct' && (
                    <Box
                      position="absolute"
                      top="100%"
                      left="0"
                      right="0"
                      bg="white"
                      border="1px solid"
                      borderColor="gray.200"
                      borderRadius="md"
                      mt="1"
                      zIndex="10"
                      boxShadow="md"
                    >
                      <Box
                        p="2"
                        _hover={{ bg: "gray.50" }}
                        cursor="pointer"
                        onClick={() => {
                          navigate(`/sampleproduct?search=${encodeURIComponent(searchQuery.trim())}`);
                          onClose(); // Close drawer after search
                        }}
                      >
                        <Text fontSize="sm">
                          Search for "{searchQuery}" in products
                        </Text>
                      </Box>
                    </Box>
                  )}
                </Box>

                {isAuth ? (
                  <Flex
                    borderBottom="2px solid #18CFA8"
                    p="5%"
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    w="100%"
                  >
                    <Flex w="100%">
                      <Avatar
                        src="https://bit.ly/broken-link"
                        size="lg"
                        mr="2"
                      />
                      <Flex
                        direction="column"
                        justifyContent="center"
                        alignItems="flex-start"
                      >
                        <Text mt="10px" fontSize="20px" color="blackAlpha.900">
                          {Authdata[0].first_name}
                        </Text>
                        <Text color="gray.500" mt="5%" fontSize="sm">
                          Enjoy Buy 1 Get 1 offer for 365 days
                        </Text>
                      </Flex>
                    </Flex>
                    <Button
                      w="100%"
                      h="35px"
                      mt="5%"
                      colorScheme="blue"
                      fontSize="15px"
                      _hover={{ bg: "blue.400" }}
                    >
                      GET GOLD MEMBERSHIP
                    </Button>
                  </Flex>
                ) : (
                  <Box
                    style={{
                      padding: "5%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%"
                    }}
                  >
                    <Box
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-evenly",
                        marginBottom: "-6%"
                      }}
                    >
                      <Box
                        bg="blue.500"
                        p="10px 15px"
                        rounded="lg"
                        _hover={{ bg: "blue.200" }}
                      >
                        <Login />
                      </Box>
                      <Box
                        bg="blue.500"
                        p="10px 15px"
                        rounded="lg"
                        _hover={{ bg: "blue.200" }}
                      >
                        <Signup />
                      </Box>
                    </Box>
                  </Box>
                )}
              </DrawerHeader>
              <DrawerBody borderBottomWidth="1px" bg="whiteAlpha.900">
                <Box display="flex" flexDirection="column" fontSize="16px">
                  <Link to="/orderhistory">
                    <Box
                      borderBottom="0.1px solid gray"
                      fontSize="15px"
                      p="4% 0%"
                      color="black"
                      _hover={{ fontWeight: "bold" }}
                      onClick={() => navigate("/orderhistory")}
                    >
                      My Orders
                    </Box>
                  </Link>
                  <Link to="/cart">
                    <Box
                      borderBottom="0.1px solid gray"
                      fontSize="15px"
                      p="4% 0%"
                      color="black"
                      _hover={{ fontWeight: "bold" }}
                    >
                      Cart
                    </Box>
                  </Link>
                  <Link to="/wishlist">
                    <Box
                      borderBottom="0.1px solid gray"
                      fontSize="15px"
                      p="4% 0%"
                      color="black"
                      _hover={{ fontWeight: "bold" }}
                    >
                      Wishlist
                    </Box>
                  </Link>
                  <Link to="/book-appointment">
                    <Box
                      borderBottom="0.1px solid gray"
                      fontSize="15px"
                      p="4% 0%"
                      color="black"
                      _hover={{ fontWeight: "bold" }}
                    >
                      Book Appointment
                    </Box>
                  </Link>
                  <Link to="/enquiry">
                    <Box
                      borderBottom="1px solid white"
                      fontSize="15px"
                      p="4% 0%"
                      color="black"
                      _hover={{ fontWeight: "bold" }}
                    >
                      Contact Us
                    </Box>
                  </Link>
                </Box>

                <Heading mt="15%" color="black" fontSize="15px" mb="5%">
                  SHOP NOW
                </Heading>
                <Box display="flex" flexDirection="column" fontSize="16px">
                  <Accordion defaultIndex={[0]} allowMultiple w="100%" m="auto">
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box
                            as="span"
                            flex="1"
                            textAlign="left"
                            fontWeight="500"
                          >
                            Men
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <Box>
                          <Text 
                            pb="2" 
                            cursor="pointer"
                            _hover={{ fontWeight: "bold", color: "blue.500" }}
                            onClick={() => handleNavigation({ category: "Eye Glasses", gender: "Male" })}
                          >
                            EYEGLASSES
                          </Text>
                          <Text 
                            pb="2" 
                            cursor="pointer"
                            _hover={{ fontWeight: "bold", color: "blue.500" }}
                            onClick={() => handleNavigation({ category: "Computer Glasses", gender: "Male" })}
                          >
                            COMPUTER GLASSES
                          </Text>
                          <Text 
                            pb="2" 
                            cursor="pointer"
                            _hover={{ fontWeight: "bold", color: "blue.500" }}
                            onClick={() => handleNavigation({ category: "Contact Lenses", gender: "Male" })}
                          >
                            CONTACT LENSES
                          </Text>
                          <Text 
                            pb="2" 
                            cursor="pointer"
                            _hover={{ fontWeight: "bold", color: "blue.500" }}
                            onClick={() => handleNavigation({ category: "Sunglasses", gender: "Male" })}
                          >
                            SUN GLASSES
                          </Text>
                        </Box>
                      </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box
                            as="span"
                            flex="1"
                            textAlign="left"
                            fontWeight="500"
                          >
                            Women
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={5}>
                        <Box>
                          <Text 
                            pb="2" 
                            cursor="pointer"
                            _hover={{ fontWeight: "bold", color: "blue.500" }}
                            onClick={() => handleNavigation({ category: "Eye Glasses", gender: "Female" })}
                          >
                            EYEGLASSES
                          </Text>
                          <Text 
                            pb="2" 
                            cursor="pointer"
                            _hover={{ fontWeight: "bold", color: "blue.500" }}
                            onClick={() => handleNavigation({ category: "Computer Glasses", gender: "Female" })}
                          >
                            COMPUTER GLASSES
                          </Text>
                          <Text 
                            pb="2" 
                            cursor="pointer"
                            _hover={{ fontWeight: "bold", color: "blue.500" }}
                            onClick={() => handleNavigation({ category: "Contact Lenses", gender: "Female" })}
                          >
                            CONTACT LENSES
                          </Text>
                          <Text 
                            pb="2" 
                            cursor="pointer"
                            _hover={{ fontWeight: "bold", color: "blue.500" }}
                            onClick={() => handleNavigation({ category: "Sunglasses", gender: "Female" })}
                          >
                            SUN GLASSES
                          </Text>
                        </Box>
                      </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box
                            as="span"
                            flex="1"
                            textAlign="left"
                            fontWeight="500"
                          >
                            Kids
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <Box>
                          <Text 
                            pb="2" 
                            cursor="pointer"
                            _hover={{ fontWeight: "bold", color: "blue.500" }}
                            onClick={() => handleNavigation({ category: "Eye Glasses", gender: "Kids" })}
                          >
                            EYEGLASSES
                          </Text>
                          <Text 
                            pb="2" 
                            cursor="pointer"
                            _hover={{ fontWeight: "bold", color: "blue.500" }}
                            onClick={() => handleNavigation({ category: "Computer Glasses", gender: "Kids" })}
                          >
                            COMPUTER GLASSES
                          </Text>
                          <Text 
                            pb="2" 
                            cursor="pointer"
                            _hover={{ fontWeight: "bold", color: "blue.500" }}
                            onClick={() => handleNavigation({ category: "Contact Lenses", gender: "Kids" })}
                          >
                            CONTACT LENSES
                          </Text>
                          <Text 
                            pb="2" 
                            cursor="pointer"
                            _hover={{ fontWeight: "bold", color: "blue.500" }}
                            onClick={() => handleNavigation({ category: "Sunglasses", gender: "Kids" })}
                          >
                            SUN GLASSES
                          </Text>
                        </Box>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </Box>
                <Heading mt="15%" color="black" fontSize="15px" mb="5%">
                  Our Services
                </Heading>
              
                
                <Box display="flex" flexDirection="column" fontSize="16px">
                  <Link>
                    <Box
                      borderBottom="0.1px solid gray"
                      p="5% 0%"
                      color="black"
                      _hover={{ fontWeight: "bold" }}
                      fontSize="15px"
                    >
                      Check Frame Size
                    </Box>
                  </Link>
                  <Link>
                    <Box
                      borderBottom="0.1px solid gray"
                      p="5% 0%"
                      color="black"
                      _hover={{ fontWeight: "bold" }}
                      fontSize="15px"
                    >
                      Gold Membership
                    </Box>
                  </Link>
                </Box>
               
                 <Heading mt="15%" color="black" fontSize="15px" mb="5%">
                  Our Services
                </Heading>
                <Box display="flex" flexDirection="column" fontSize="16px">

                  <Link>
                    <Box
                      borderBottom="0.1px solid gray"
                      p="5% 0%"
                      color="black"
                      _hover={{ fontWeight: "bold" }}
                      fontSize="15px"
                    >
                      Eye check-up
                    </Box>
                  </Link>
                  <Link>
                    <Box
                      borderBottom="0.1px solid gray"
                      p="5% 0%"
                      color="black"
                      _hover={{ fontWeight: "bold" }}
                      fontSize="15px"
                    >
                      Store Locator
                    </Box>
                  </Link>
                </Box>
                <Box display="flex" flexDirection="column" fontSize="16px">
                  <Link>
                    <Box
                      borderBottom="0.1px solid gray"
                      p="5% 0%"
                      color="black"
                      _hover={{ fontWeight: "bold" }}
                      fontSize="15px"
                    >
                      Check Frame Size
                    </Box>
                  </Link>
                  <Link>
                    <Box
                      borderBottom="0.1px solid gray"
                      p="5% 0%"
                      color="black"
                      _hover={{ fontWeight: "bold" }}
                      fontSize="15px"
                    >
                      Gold Membership
                    </Box>
                  </Link>
                </Box>
                 <Heading mt="15%" color="black" fontSize="15px" mb="5%">
                  FAQ's & POLICIES
                </Heading>
                <Box display="flex" flexDirection="column" fontSize="16px">
                  <Link>
                    <Box
                      borderBottom="0.1px solid gray"
                      p="5% 0%"
                      color="black"
                      _hover={{ fontWeight: "bold" }}
                      fontSize="15px"
                    >
                    </Box>
                  </Link>
                  <Link to="/cancellations-and-refunds">
                    <Box
                      borderBottom="0.1px solid gray"
                      p="5% 0%"
                      color="black"
                      _hover={{ fontWeight: "bold" }}
                      fontSize="15px"
                    >
                      Cancellation & Return Policy
                    </Box>
                  </Link>
                  {/* <Link>
                    <Box
                      p="5% 0%"
                      color="black"
                      _hover={{ fontWeight: "bold" }}
                      fontSize="15px"
                    >
                      Cobrowsing
                    </Box>
                  </Link> */}
                </Box>

                <Accordion allowMultiple></Accordion>
              </DrawerBody>
              {isAuth && (
                <DrawerFooter bg="whiteAlpha.900">
                  <Button
                    mt="5%"
                    fontSize="18px"
                    colorScheme="blue"
                    borderBottom="1px solid #526171"
                    p="6% 15%"
                    _hover={{ bg: "blue.200" }}
                    onClick={() => {
                      setisAuth(false);
                      return <Navigate to="/" />;
                    }}
                  >
                    Sign Out
                  </Button>
                </DrawerFooter>
              )}
            </DrawerContent>
          </Drawer>
        </Box>
      </HStack>
    </Box>
  );
}

export default Nav;
