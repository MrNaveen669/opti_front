import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  UnorderedList,
  ListItem,
  Link,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { LockIcon, InfoIcon, WarningIcon, CheckCircleIcon } from "@chakra-ui/icons";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";

const PrivacyPolicy = () => {
  return (
    <Box bg="gray.50" minH="100vh">
      <Navbar />
      <Box maxW="800px" mx="auto" mt={10} p={8} borderWidth="1px" borderRadius="lg" boxShadow="lg" bg="white">
        <Heading textAlign="center" mb={6}>Privacy Policy</Heading>

        <Text fontSize="sm" mb={4}><strong>Last updated: April 28, 2025</strong></Text>

        <VStack spacing={4} align="start">
          <HStack spacing={2}>
            <Icon as={LockIcon} color="teal.500" />
            <Text>
              This privacy policy sets out how <strong>TUKESHWAR SAHU</strong> uses and protects
              any information that you give TUKESHWAR SAHU when you visit our website and/or agree
              to purchase from us.
            </Text>
          </HStack>

          <HStack spacing={2}>
            <Icon as={LockIcon} color="teal.500" />
            <Text>
              TUKESHWAR SAHU is committed to ensuring that your privacy is protected. Should we
              ask you to provide certain information by which you can be identified when using
              this website, you can be assured that it will only be used in accordance with this
              privacy statement.
            </Text>
          </HStack>

          <Text>
            TUKESHWAR SAHU may change this policy from time to time by updating this page. You
            should check this page from time to time to ensure that you adhere to these changes.
          </Text>

          <Heading as="h2" size="md" mt={4}>
            <HStack>
              <Icon as={InfoIcon} color="blue.500" />
              <Text>Information we may collect:</Text>
            </HStack>
          </Heading>
          <UnorderedList pl={5}>
            <ListItem>Name</ListItem>
            <ListItem>Contact information including email address</ListItem>
            <ListItem>Demographic information such as postcode, preferences, and interests (if required)</ListItem>
            <ListItem>Other information relevant to customer surveys and/or offers</ListItem>
          </UnorderedList>

          <Heading as="h2" size="md" mt={4}>
            <HStack>
              <Icon as={InfoIcon} color="blue.500" />
              <Text>What we do with the information we gather:</Text>
            </HStack>
          </Heading>
          <UnorderedList pl={5}>
            <ListItem>Internal record keeping</ListItem>
            <ListItem>We may use the information to improve our products and services</ListItem>
            <ListItem>
              We may periodically send promotional emails about new products, special offers, or
              other information which we think you may find interesting using the email address
              you have provided
            </ListItem>
            <ListItem>
              From time to time, we may also use your information to contact you for market
              research purposes. We may contact you by email, phone, fax, or mail.
            </ListItem>
            <ListItem>We may use the information to customize the website according to your interests</ListItem>
          </UnorderedList>

          <Text>
            We are committed to ensuring that your information is secure. In order to prevent
            unauthorized access or disclosure, we have put in suitable measures.
          </Text>

          <Heading as="h2" size="md" mt={4}>
            <HStack>
              <Icon as={WarningIcon} color="yellow.500" />
              <Text>How we use cookies:</Text>
            </HStack>
          </Heading>
          <Text>
            A cookie is a small file which asks permission to be placed on your computer's hard
            drive. Once you agree, the file is added and the cookie helps analyze web traffic or
            lets you know when you visit a particular site. Cookies allow web applications to
            respond to you as an individual. The web application can tailor its operations to
            your needs, likes, and dislikes by gathering and remembering information about your
            preferences.
          </Text>

          <Text>
            We use traffic log cookies to identify which pages are being used. This helps us
            analyze data about webpage traffic and improve our website in order to tailor it to
            customer needs. We only use this information for statistical analysis purposes and
            then the data is removed from the system.
          </Text>

          <Text>
            Overall, cookies help us provide you with a better website, by enabling us to monitor
            which pages you find useful and which you do not. A cookie in no way gives us access
            to your computer or any information about you, other than the data you choose to
            share with us.
          </Text>

          <Text>
            You can choose to accept or decline cookies. Most web browsers automatically accept
            cookies, but you can usually modify your browser setting to decline cookies if you
            prefer. This may prevent you from taking full advantage of the website.
          </Text>

          <Heading as="h2" size="md" mt={4}>
            <HStack>
              <Icon as={CheckCircleIcon} color="green.500" />
              <Text>Controlling your personal information:</Text>
            </HStack>
          </Heading>
          <Text>
            You may choose to restrict the collection or use of your personal information in the
            following ways:
          </Text>
          <UnorderedList pl={5}>
            <ListItem>
              Whenever you are asked to fill in a form on the website, look for the box that you
              can click to indicate that you do not want the information to be used by anybody
              for direct marketing purposes
            </ListItem>
            <ListItem>
              If you have previously agreed to us using your personal information for direct
              marketing purposes, you may change your mind at any time by writing to or emailing
              us at{" "}
              <Link color="teal.500" href="mailto:helloopticlair@gmail.com">
                helloopticlair@gmail.com
              </Link>
            </ListItem>
          </UnorderedList>

          <Text>
            We will not sell, distribute, or lease your personal information to third parties
            unless we have your permission or are required by law to do so. We may use your
            personal information to send you promotional information about third parties which we
            think you may find interesting if you tell us that you wish this to happen.
          </Text>

          <Text>
            If you believe that any information we are holding on you is incorrect or incomplete,
            please write to us at In Front Of New Vivekanand Park, Raipur, Chhattisgarh 492001,
            or contact us at <strong> +91 8817415179</strong> or{" "}
            <Link color="teal.500" href="mailto:clearvisionoptical.r@gmail.com">
              clearvisionoptical.r@gmail.com
            </Link>{" "}
            as soon as possible. We will promptly correct any information found to be incorrect.
          </Text>
        </VStack>
      </Box>
      <Footer />
    </Box>
  );
};

export default PrivacyPolicy;

