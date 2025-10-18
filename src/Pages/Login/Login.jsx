import React, { useContext, useState } from "react";
import { AuthContext } from "../../ContextApi/AuthContext";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { setCartItems } from "../../redux/CartPage/action";
import { useDispatch } from "react-redux";
import { cartReset } from "../../redux/CartPage/action";
import { USERS_URL, LOGIN_URL, CART_URL } from "../../config/api";
import { REGISTER_URL } from "../../config/api";

import { loadWishlistItems } from "../../redux/wishlist/wishlist.actions";
import axios from "axios";
import {
  Checkbox,
  useDisclosure,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
  Box,
  Text,
  InputLeftAddon,
  Heading,
  Input,
  HStack,
  Flex,
  Center,
  InputGroup,
  InputRightElement,
  useToast
} from "@chakra-ui/react";

// Modified to accept isOpen, onOpen, onClose props
const Login = ({ isOpen: externalIsOpen, onOpen: externalOnOpen, onClose: externalOnClose }) => {
  const [loading, setLoading] = useState(false);
  const [btn, setbtn] = useState();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [pass, setpass] = useState(false);
  const [show, setShow] = useState(false);
  
  // Use internal state for modal if props are not provided
  const internalModal = useDisclosure();
  const { isOpen = externalIsOpen || internalModal.isOpen, 
          onOpen = externalOnOpen || internalModal.onOpen, 
          onClose = externalOnClose || internalModal.onClose } = {};
  
  // Signup modal state
  const { isOpen: isSignupOpen, onOpen: onSignupOpen, onClose: onSignupClose } = useDisclosure();
  
  // Forgot Password modal state
  const { isOpen: isForgotPasswordOpen, onOpen: onForgotPasswordOpen, onClose: onForgotPasswordClose } = useDisclosure();
  
  const { setisAuth, setAuthData } = useContext(AuthContext);
  const [incorrect, setinCorrect] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  let res1 = [];

  // Forgot Password states
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetStep, setResetStep] = useState(1); // 1: Email input, 2: Code verification, 3: New password
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Signup states
  const init = {
    first_name: "",
    last_name: "",
    ph_no: "",
    email: "",
    password: ""
  };
  const [userData, setUserData] = useState(init);
  const [first, setFirst] = useState();
  const [last, setLast] = useState();
  const [ph, setPh] = useState();
  const [mail, setMail] = useState();
  const [passSignup, setPassSignup] = useState();
  const [loadingSignup, setLoadingSignup] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [Auth, setAuth] = useState();
  const [exist, setExist] = useState(false);
  var flag = false;

  const Required = (props) => {
    return (
      <Box
        fontSize={"14px"}
        m="3px 0px 3px 0px"
        color={"#ff1f1f"}
        fontWeight="500"
        letterSpacing={"-0.4px"}
      >
        {props.info}
      </Box>
    );
  };

  const handleChange = (e) => {
    setinCorrect(false);
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });

    const buton = (
      <Box
        fontSize={"14px"}
        mt="5px"
        color={"#ff1f1f"}
        fontWeight="500"
        letterSpacing={"-0.4px"}
      >
        Please enter a valid Email or Mobile Number.
      </Box>
    );
    setbtn(buton);
  };

  // Forgot Password Functions
  const handleForgotPasswordClick = () => {
    onClose(); // Close login modal
    onForgotPasswordOpen(); // Open forgot password modal
    setResetStep(1); // Reset to first step
    setForgotPasswordEmail("");
    setResetCode("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSendResetCode = async () => {
    if (!forgotPasswordEmail || !forgotPasswordEmail.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setForgotPasswordLoading(true);
    
    try {
      // Check if user exists
      const response = await fetch(USERS_URL);
      const users = await response.json();
      const userExists = users.find(u => u.email === forgotPasswordEmail);
      
      if (!userExists) {
        toast({
          title: "User Not Found",
          description: "No account found with this email address",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setForgotPasswordLoading(false);
        return;
      }

      // In a real application, you would send an API request to your backend
      // to send a password reset email. For demo purposes, we'll simulate this
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a mock reset code (in real app, this would be sent to email)
      const mockResetCode = Math.floor(100000 + Math.random() * 900000).toString();
      console.log("Reset code (for demo):", mockResetCode); // In real app, remove this
      
      toast({
        title: "Reset Code Sent",
        description: `A password reset code has been sent to ${forgotPasswordEmail}. For demo: ${mockResetCode}`,
        status: "success",
        duration: 8000,
        isClosable: true,
      });
      
      setResetStep(2);
      setForgotPasswordLoading(false);
      
    } catch (error) {
      console.error("Error sending reset code:", error);
      toast({
        title: "Error",
        description: "Failed to send reset code. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setForgotPasswordLoading(false);
    }
  };

  const handleVerifyResetCode = () => {
    if (!resetCode || resetCode.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid 6-digit reset code",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // In a real application, you would verify the code with your backend
    // For demo purposes, we'll accept any 6-digit code
    setResetStep(3);
    
    toast({
      title: "Code Verified",
      description: "Reset code verified successfully. Please enter your new password.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleResetPassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      toast({
        title: "Invalid Password",
        description: "Password must be at least 6 characters long",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setForgotPasswordLoading(true);
    
    try {
      // In a real application, you would make an API call to update the password
      // For demo purposes, we'll simulate this
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Password Reset Successful",
        description: "Your password has been reset successfully. Please login with your new password.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      
      // Close forgot password modal and open login modal
      onForgotPasswordClose();
      onOpen();
      setForgotPasswordLoading(false);
      
    } catch (error) {
      console.error("Error resetting password:", error);
      toast({
        title: "Error",
        description: "Failed to reset password. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setForgotPasswordLoading(false);
    }
  };

  const handleBackToLogin = () => {
    onForgotPasswordClose();
    onOpen();
  };

  // Signup handleChange
  const handleChangeSignup = (e) => {
    setExist(false);
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    switch (name) {
      case "first_name":
        setFirst(
          value === "" ? <Required info="This is a required feild" /> : ""
        );
        break;

      case "last_name":
        setLast(
          value === "" ? <Required info="This is a required feild" /> : ""
        );
        break;

      case "ph_no":
        setPh(
          value === "" ? (
            <Required info="This is a required feild" />
          ) : (
            <Required info="Please enter a valid mobile number (eg. 9987XXXXXX)" />
          )
        );
        break;

      case "email":
        setMail(
          value === "" ? (
            <Required info="This is a required feild" />
          ) : (
            <Required info="Please enter a valid email address e.g. johndoe@domain.com." />
          )
        );
        break;

      case "password":
        setPassSignup(
          value === "" ? (
            <Required info="This is a required feild" />
          ) : (
            <Required info="Password should be more than 6 characters." />
          )
        );
        break;

      default:
        break;
    }
  };

  const getData = async () => {
    try {
      setLoading(true);
      setinCorrect(false);
      if (loginData.email !== "" && loginData.password !== "") {
       
          const res = await fetch(LOGIN_URL,
          {
            method: "POST",
            body: JSON.stringify(loginData),
            headers: {
              "Content-type": "application/json"
            }
          }
        );
        let data = await res.json();
        if (res) {
          const credential = await fetch(USERS_URL);

          let cred = await credential.json();
          localStorage.setItem("token", data.token);
          res1 = cred.filter((el) => el.email === loginData.email);
          
          // Reset cart and wishlist in Redux when new user logs in
          dispatch(cartReset());
          dispatch({ type: 'RESET_WISHLIST' }); // Add this action type to your wishlist types
          
          // Update auth state
          setisAuth(true);
          setAuthData(res1);
          
          // Store user info in localStorage
          localStorage.setItem("user", JSON.stringify(res1[0]));
          
          // Fetch cart items for this user after login
          try {
            const cartResponse = await axios.get(`${CART_URL}/${res1[0]._id}`);
            dispatch(setCartItems(cartResponse.data));
          } catch (cartError) {
            console.error("Error fetching cart after login:", cartError);
          }
          
          // Fetch wishlist items for this user after login
          try {
            dispatch(loadWishlistItems()); // This will load user-specific wishlist items
          } catch (wishlistError) {
            console.error("Error fetching wishlist after login:", wishlistError);
          }
          
          if (loginData.email.includes(process.env.admin)) {
            setLoading(false);
            setinCorrect(false);
            onClose();
            navigate("/productlist");
          } else {
            setLoading(false);
            setinCorrect(false);
            onClose();
          }
        } else {
          setLoading(false);
          setinCorrect(true);
        }
      }
    } catch (error) {
      setLoading(false);
      setinCorrect(true);
      console.log("An error occurred. Please try again later.");
    }
  };

  // Signup getData
  const getDataSignup = (body) => {
    setLoadingSignup(true);

    fetch(USERS_URL)
      .then((res) => res.json())
      
      .then((res) => {
        res.map((el) => {
          if (el.email === body.email) {
            flag = true;
            setExist(true);
            return el;
          }
          setLoadingSignup(false);
        });
      })
      .then(() => {
        if (flag === false) {
          fetch(REGISTER_URL, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then((res) => res.json())
            .then((res) => {
              setAuth(true);
              setLoadingSignup(false);
              setExist(false);
              // Close signup modal and show success message or redirect
              onSignupClose();
              // Optionally open login modal
              onOpen();
            })
            .catch((err) => setAuth(false))
            .finally(() => setLoadingSignup(false))
            .finally(() => setExist(false));
        } else {
          setLoadingSignup(false);
        }
      });
  };

  const handleClick = () => {
    loginData.password = "";
    setpass(false);
  };

  const handlesign = () => {
    setpass(true);
    if (loginData.password.length > 6) {
      getData(loginData);
    }
  };

  const handleRegister = () => {
    getDataSignup(userData);
  };

  const handleCreateAccountClick = () => {
    onClose(); // Close login modal
    onSignupOpen(); // Open signup modal
  };

  const handleSignInFromSignup = () => {
    onSignupClose(); // Close signup modal
    onOpen(); // Open login modal
  };

  // If this is a standalone usage, show the button to open the modal
  // If it's imported with props, don't show the button (modal will be controlled by parent)
  const renderLoginButton = externalIsOpen === undefined ? (
    <Center onClick={onOpen} fontWeight={"400"} fontSize="15px" w="80px">
      Sign In
    </Center>
  ) : null;

  return (
    <div>
      {renderLoginButton}

      {/* Login Modal */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={{ xl: "md", lg: "md", md: "md", sm: "md", base: "sm" }}
      >
        <ModalOverlay />
        <ModalContent rounded="3xl">
          <ModalCloseButton
            borderRadius={"50%"}
            bg="white"
            m={"10px 10px 0px 0px"}
          />

          <ModalBody p={"0px 0px "} borderRadius={"15px 15px 15px 15px "}>
            <Image
              src="/assets/login.png"
              alt="pic"
              borderRadius={"10px 10px 0px 0px "}
            />
            <Box m={"34px 45px 50px 45px"}>
              <Heading
                fontFamily={" Times, serif"}
                fontWeight="100"
                fontSize={"28px"}
                mb="24px"
                color={"#333368"}
              >
                Sign In
              </Heading>

              {pass === false ? (
                <Input
                  name="email"
                  placeholder="Email"
                  h={"50px"}
                  fontSize="16px"
                  focusBorderColor="rgb(206, 206, 223)"
                  borderColor={"rgb(206, 206, 223)"}
                  onChange={handleChange}
                  rounded="2xl"
                />
              ) : (
                <Box>
                  <Box fontSize={"17px"} color="#66668e">
                    Enter password for
                  </Box>

                  <Flex
                    justifyContent={"space-between"}
                    fontFamily={" sans-serif"}
                    mb="22px"
                    color={"#000042"}
                  >
                    <Box fontSize="18px">{loginData.email}</Box>
                    <Box
                      fontSize={"14px"}
                      textDecoration="underline"
                      onClick={handleClick}
                      cursor="pointer"
                    >
                      Edit
                    </Box>
                  </Flex>

                  <InputGroup>
                    <Input
                      type={show ? "text" : "password"}
                      name="password"
                      placeholder="Enter password"
                      h={"50px"}
                      fontSize="16px"
                      focusBorderColor="rgb(206, 206, 223)"
                      borderColor={"rgb(206, 206, 223)"}
                      onChange={handleChange}
                      rounded="2xl"
                    />

                    <InputRightElement width="6.5rem" size="lg">
                      <Button
                        size="md"
                        borderRadius="3xl"
                        mt="10%"
                        onClick={() => setShow(!show)}
                        bg="white"
                      >
                        {show ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>

                  {incorrect === true ? (
                    <Box
                      fontSize={"14px"}
                      m="3px 0px 3px 0px"
                      color={"#ff1f1f"}
                      fontWeight="500"
                      ml="2"
                      letterSpacing={"-0.4px"}
                    >
                      Wrong email or password
                    </Box>
                  ) : (
                    ""
                  )}
                </Box>
              )}
              <Box
                textDecoration={"underline"}
                m="15px 0px 0px 0px"
                color="#000042"
                fontSize="15px"
                cursor="pointer"
                onClick={handleForgotPasswordClick}
              >
                Forget Password
              </Box>
              {loginData.email.includes("@") && loginData.email.includes(".com")
                ? ""
                : btn}
              <br />
              {loginData.email.includes("@") &&
              loginData.email.includes(".com") ? (
                <Button
                  isLoading={loading}
                  onClick={handlesign}
                  bgColor={"#11daac"}
                  width="100%"
                  borderRadius={"35px/35px"}
                  h="50px"
                  fontSize="18px"
                  _hover={{ backgroundColor: "#11daac" }}
                >
                  Sign In
                </Button>
              ) : (
                <Button
                  bgColor={"#cccccc"}
                  width="100%"
                  borderRadius={"35px/35px"}
                  fontSize="18px"
                  h="50px"
                  _hover={{ backgroundColor: "#cccccc" }}
                >
                  Sign In
                </Button>
              )}

              <HStack spacing={"0px"} mt="19px" gap="2">
                <Box fontSize={"14px"}> New member?</Box>
                <Link 
                  fontSize={"15px"}
                  fontWeight="500"
                  textDecoration={"underline"}
                  onClick={handleCreateAccountClick}
                  cursor="pointer"
                >
                  Create an Account
                </Link>
              </HStack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Forgot Password Modal */}
      <Modal isOpen={isForgotPasswordOpen} onClose={onForgotPasswordClose} isCentered size="md">
        <ModalOverlay />
        <ModalContent rounded="3xl">
          <ModalCloseButton />
          <ModalBody p="40px">
            <Heading
              fontFamily="Times, serif"
              fontWeight="100"
              fontSize="24px"
              mb="20px"
              color="#333368"
            >
              {resetStep === 1 && "Reset Password"}
              {resetStep === 2 && "Verify Code"}
              {resetStep === 3 && "Set New Password"}
            </Heading>

            {/* Step 1: Email Input */}
            {resetStep === 1 && (
              <Box>
                <Text mb="15px" fontSize="14px" color="#66668e">
                  Enter your email address and we'll send you a code to reset your password.
                </Text>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  h="50px"
                  fontSize="16px"
                  focusBorderColor="rgb(206, 206, 223)"
                  borderColor="rgb(206, 206, 223)"
                  rounded="2xl"
                  mb="20px"
                />
                <Button
                  onClick={handleSendResetCode}
                  isLoading={forgotPasswordLoading}
                  bgColor="#11daac"
                  width="100%"
                  borderRadius="35px"
                  h="50px"
                  fontSize="16px"
                  _hover={{ backgroundColor: "#11daac" }}
                  mb="15px"
                >
                  Send Reset Code
                </Button>
                <Center>
                  <Link
                    fontSize="14px"
                    textDecoration="underline"
                    onClick={handleBackToLogin}
                    cursor="pointer"
                  >
                    Back to Sign In
                  </Link>
                </Center>
              </Box>
            )}

            {/* Step 2: Code Verification */}
            {resetStep === 2 && (
              <Box>
                <Text mb="15px" fontSize="14px" color="#66668e">
                  Enter the 6-digit code sent to {forgotPasswordEmail}
                </Text>
                <Input
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  h="50px"
                  fontSize="16px"
                  focusBorderColor="rgb(206, 206, 223)"
                  borderColor="rgb(206, 206, 223)"
                  rounded="2xl"
                  mb="20px"
                  maxLength={6}
                />
                <Button
                  onClick={handleVerifyResetCode}
                  bgColor="#11daac"
                  width="100%"
                  borderRadius="35px"
                  h="50px"
                  fontSize="16px"
                  _hover={{ backgroundColor: "#11daac" }}
                  mb="15px"
                >
                  Verify Code
                </Button>
                <Center>
                  <Link
                    fontSize="14px"
                    textDecoration="underline"
                    onClick={() => setResetStep(1)}
                    cursor="pointer"
                  >
                    Resend Code
                  </Link>
                </Center>
              </Box>
            )}

            {/* Step 3: New Password */}
            {resetStep === 3 && (
              <Box>
                <Text mb="15px" fontSize="14px" color="#66668e">
                  Enter your new password
                </Text>
                
                <InputGroup mb="15px">
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    h="50px"
                    fontSize="16px"
                    focusBorderColor="rgb(206, 206, 223)"
                    borderColor="rgb(206, 206, 223)"
                    rounded="2xl"
                  />
                  <InputRightElement width="6.5rem" size="lg">
                    <Button
                      size="md"
                      borderRadius="3xl"
                      mt="10%"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      bg="white"
                    >
                      {showNewPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>

                <InputGroup mb="20px">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    h="50px"
                    fontSize="16px"
                    focusBorderColor="rgb(206, 206, 223)"
                    borderColor="rgb(206, 206, 223)"
                    rounded="2xl"
                  />
                  <InputRightElement width="6.5rem" size="lg">
                    <Button
                      size="md"
                      borderRadius="3xl"
                      mt="10%"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      bg="white"
                    >
                      {showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>

                <Button
                  onClick={handleResetPassword}
                  isLoading={forgotPasswordLoading}
                  bgColor="#11daac"
                  width="100%"
                  borderRadius="35px"
                  h="50px"
                  fontSize="16px"
                  _hover={{ backgroundColor: "#11daac" }}
                  mb="15px"
                >
                  Reset Password
                </Button>
                <Center>
                  <Link
                    fontSize="14px"
                    textDecoration="underline"
                    onClick={handleBackToLogin}
                    cursor="pointer"
                  >
                    Back to Sign In
                  </Link>
                </Center>
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Signup Modal */}
      <Modal isOpen={isSignupOpen} onClose={onSignupClose} isCentered size="md">
        <ModalOverlay />
        <ModalContent w="lg" pt="5" rounded="3xl">
          <ModalCloseButton />

          <ModalBody p={"0px 0px "}>
            <Box m={"5px 45px 20px 45px"}>
              <Heading
                fontFamily={" Times, serif"}
                fontWeight="100"
                fontSize={"26px"}
                mb="20px"
                color={"#333368"}
              >
                Create an Account
              </Heading>

              <Input
                type="text"
                fontSize="16px"
                onChange={handleChangeSignup}
                focusBorderColor="rgb(206, 206, 223)"
                name="first_name"
                placeholder="First Name*"
                h={"45px"}
                borderColor={"rgb(206, 206, 223)"}
                m={"8px 0px 15px 0px"}
                rounded="2xl"
              />

              <Text mt="-2%" ml="2%">
                {first}
              </Text>

              <Input
                fontSize="16px"
                onChange={handleChangeSignup}
                name="last_name"
                type="text"
                placeholder="Last Name"
                h={"45px"}
                focusBorderColor="rgb(206, 206, 223)"
                borderColor={"rgb(206, 206, 223)"}
                m={"8px 0px 25px 0px"}
                rounded="2xl"
              />
              <Text mt="-2%" ml="2%">
                {last}
              </Text>

              <InputGroup
                w="100%"
                h="50px"
                fontSize="18px"
                borderRadius="xl"
                mb="14px"
              >
                <InputLeftAddon
                  children="+91"
                  h="45px"
                  fontSize="18px"
                  rounded="2xl"
                  bg="whiteAlpha.900"
                />

                <Input
                  onChange={handleChangeSignup}
                  type="number"
                  name="ph_no"
                  placeholder=" Mobile*"
                  w="100%"
                  h="45px"
                  fontSize="16px"
                  focusBorderColor="rgb(206, 206, 223)"
                  borderColor={"rgb(206, 206, 223)"}
                  rounded="2xl"
                />
              </InputGroup>
              <Text mt="-2%" ml="2%">
                {userData.ph_no.length === 10 ? "" : ph}
              </Text>

              <Input
                onChange={handleChangeSignup}
                fontSize="16px"
                name="email"
                placeholder="Email*"
                h={"45px"}
                focusBorderColor="rgb(206, 206, 223)"
                borderColor={"rgb(206, 206, 223)"}
                m={"8px 0px 18px 0px"}
                rounded="2xl"
              />
              <Text mt="-2%" ml="2%">
                {userData.email.includes("@") && userData.email.includes(".com")
                  ? ""
                  : mail}
              </Text>

              <InputGroup mb="15px">
                <Input
                  onChange={handleChangeSignup}
                  fontSize="16px"
                  type={showSignup ? "text" : "password"}
                  name="password"
                  placeholder="Password*"
                  h={"45px"}
                  focusBorderColor="rgb(206, 206, 223)"
                  borderColor={"rgb(206, 206, 223)"}
                  m={"8px 0px 8px 0px"}
                  rounded="2xl"
                />

                <InputRightElement width="6.5rem" size="lg">
                  <Button
                    size="md"
                    borderRadius="3xl"
                    mt="20%"
                    onClick={() => setShowSignup(!showSignup)}
                    bg="white"
                  >
                    {showSignup ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {userData.password.length >= 6 ? "" : passSignup}

              {exist === true ? (
                <Required info="Email Id already exists" />
              ) : (
                ""
              )}

              <HStack spacing={"3px"} mb="10px">
                <Box
                  fontSize={"14px"}
                  fontFamily={" sans-serif"}
                  fontWeight="100"
                  letterSpacing={"-0.4px"}
                >
                  By creating this account, you agree to our
                </Box>
                <Box fontSize={"15px"} textDecoration="underline">
                  Privacy Policy
                </Box>
              </HStack>

              {userData.email.includes("@") &&
              userData.email.includes(".com") &&
              userData.first_name.length >= 1 &&
              userData.last_name.length >= 1 &&
              userData.password.length >= 6 &&
              userData.ph_no.length === 10 ? (
                <Button
                  isLoading={loadingSignup}
                  onClick={handleRegister}
                  bgColor={"#11daac"}
                  width="100%"
                  borderRadius={"35px/35px"}
                  h="50px"
                  _hover={{ backgroundColor: "#11daac" }}
                  fontFamily={" sans-serif"}
                  fontWeight="300"
                  fontSize="18px"
                >
                  Create an Account
                </Button>
              ) : (
                <Button
                  bgColor={"#cccccc"}
                  width="100%"
                  borderRadius={"35px/35px"}
                  h="50px"
                  fontFamily={" sans-serif"}
                  fontWeight="300"
                  fontSize="18px"
                >
                  Create an Account
                </Button>
              )}

              <Center mt={"14px"} fontSize="15px" gap="2">
                Have an account?{" "}
                <Center 
                  fontWeight={"500"} 
                  textDecoration="underline"
                  onClick={handleSignInFromSignup}
                  cursor="pointer"
                >
                  Sign In
                </Center>
              </Center>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Login;