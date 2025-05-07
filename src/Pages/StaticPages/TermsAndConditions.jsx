import React from "react";
import { Box, Container, Heading, Text, UnorderedList, ListItem, HStack, Icon } from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon, ExternalLinkIcon, InfoIcon } from "@chakra-ui/icons";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";

const TermsAndConditions = () => {
  return (
    <Box bg="#f0f0f0" minHeight="100vh">
      <Navbar />
      <Container maxW="container.lg" py={8}>
        <Heading as="h1" size="xl" mb={4}>
          Terms and Conditions
        </Heading>

        <Text fontWeight="bold" mb={4}>
          Last updated: April 28, 2025
        </Text>

        <Text mb={4}>
          For the purpose of these Terms and Conditions, the terms "we", "us", "our" refer to{" "}
          <strong>TUKESHWAR SAHU</strong>, whose registered/operational office is In Front Of
          New Vivekanand Park, Raipur, Chhattisgarh 492001. The terms "you", "your",
          "user", "visitor" refer to any natural or legal person visiting our website
          and/or purchasing from us.
        </Text>

        <Text mb={4}>
          Your use of this website and/or any purchase from us is governed by the following Terms and Conditions:
        </Text>

        <UnorderedList spacing={4}>
          <ListItem>
            <HStack align="start">
              <Icon as={InfoIcon} color="blue.500" mt={1} />
              <Text>The content of the pages of this website is subject to change without notice.</Text>
            </HStack>
          </ListItem>

          <ListItem>
            <HStack align="start">
              <Icon as={WarningIcon} color="red.500" mt={1} />
              <Text>
                Neither we nor any third parties provide any warranty or guarantee as to the
                accuracy, timeliness, performance, completeness or suitability of the
                information and materials found or offered on this website for any particular
                purpose. You acknowledge that such information and materials may contain
                inaccuracies or errors, and we expressly exclude liability for any such
                inaccuracies or errors to the fullest extent permitted by law.
              </Text>
            </HStack>
          </ListItem>

          <ListItem>
            <HStack align="start">
              <Icon as={WarningIcon} color="red.500" mt={1} />
              <Text>
                Your use of any information or materials on our website and/or product pages
                is entirely at your own risk, for which we shall not be liable. It shall be
                your own responsibility to ensure that any products, services or information
                available through our website and/or product pages meet your specific
                requirements.
              </Text>
            </HStack>
          </ListItem>

          <ListItem>
            <HStack align="start">
              <Icon as={CheckCircleIcon} color="green.500" mt={1} />
              <Text>
                Our website contains material owned by or licensed to us. This material includes,
                but is not limited to, the design, layout, look, appearance, and graphics.
                Reproduction is prohibited except in accordance with the copyright notice,
                which forms part of these terms and conditions.
              </Text>
            </HStack>
          </ListItem>

          <ListItem>
            <HStack align="start">
              <Icon as={CheckCircleIcon} color="green.500" mt={1} />
              <Text>
                All trademarks reproduced on our website that are not the property of, or
                licensed to, the operator are acknowledged on the website.
              </Text>
            </HStack>
          </ListItem>

          <ListItem>
            <HStack align="start">
              <Icon as={WarningIcon} color="red.500" mt={1} />
              <Text>
                Unauthorized use of information provided by us may give rise to a claim for
                damages and/or be a criminal offense.
              </Text>
            </HStack>
          </ListItem>

          <ListItem>
            <HStack align="start">
              <Icon as={ExternalLinkIcon} color="purple.500" mt={1} />
              <Text>
                From time to time, our website may also include links to other websites.
                These links are provided for your convenience to offer further information.
              </Text>
            </HStack>
          </ListItem>

          <ListItem>
            <HStack align="start">
              <Icon as={WarningIcon} color="red.500" mt={1} />
              <Text>
                You may not create a link to our website from another website or document
                without <strong>TUKESHWAR SAHU’s</strong> prior written consent.
              </Text>
            </HStack>
          </ListItem>

          <ListItem>
            <HStack align="start">
              <Icon as={WarningIcon} color="red.500" mt={1} />
              <Text>
                Any dispute arising out of the use of our website and/or purchase with us
                and/or any engagement with us is subject to the laws of India.
              </Text>
            </HStack>
          </ListItem>

          <ListItem>
            <HStack align="start">
              <Icon as={WarningIcon} color="red.500" mt={1} />
              <Text>
                We shall be under no liability whatsoever for any loss or damage arising
                directly or indirectly from the decline of authorization for any transaction,
                due to the Cardholder exceeding the preset limit mutually agreed between us
                and our acquiring bank from time to time.
              </Text>
            </HStack>
          </ListItem>
        </UnorderedList>
      </Container>
      <Footer />
    </Box>
  );
};

export default TermsAndConditions;
