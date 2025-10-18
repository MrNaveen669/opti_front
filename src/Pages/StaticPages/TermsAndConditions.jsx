import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  HStack,
  Icon,
  Divider,
} from "@chakra-ui/react";
import {
  CheckCircleIcon,
  WarningIcon,
  ExternalLinkIcon,
  InfoIcon,
} from "@chakra-ui/icons";
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
          {/* General Website Terms */}
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
                is entirely at your own risk, for which we shall not be liable.
              </Text>
            </HStack>
          </ListItem>

          <ListItem>
            <HStack align="start">
              <Icon as={CheckCircleIcon} color="green.500" mt={1} />
              <Text>
                Our website contains material owned by or licensed to us. This material includes
                the design, layout, appearance, and graphics. Reproduction is prohibited except
                in accordance with the copyright notice.
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
                From time to time, our website may include links to other websites for your convenience.
              </Text>
            </HStack>
          </ListItem>

          <ListItem>
            <HStack align="start">
              <Icon as={WarningIcon} color="red.500" mt={1} />
              <Text>
                You may not link to our website without <strong>TUKESHWAR SAHU’s</strong> prior written consent.
              </Text>
            </HStack>
          </ListItem>

          <ListItem>
            <HStack align="start">
              <Icon as={WarningIcon} color="red.500" mt={1} />
              <Text>
                Any dispute arising is subject to the laws of India.
              </Text>
            </HStack>
          </ListItem>

          <ListItem>
            <HStack align="start">
              <Icon as={WarningIcon} color="red.500" mt={1} />
              <Text>
                We are not liable for any loss from transaction authorization declines due to card limits.
              </Text>
            </HStack>
          </ListItem>
        </UnorderedList>

        <Divider my={6} />
        <Heading as="h2" size="lg" mb={4}>
          Product & Warranty Terms
        </Heading>

        <UnorderedList spacing={4}>
          <ListItem>
            <Text>1. Six-Month Frame Coating Peel-Off Warranty: Covered unless caused by user negligence or misuse.</Text>
          </ListItem>
          <ListItem>
            <Text>2. Six-Month Lens Coating Peel-Off Warranty: Covered under the same terms as the frame coating.</Text>
          </ListItem>
          <ListItem>
            <Text>3. No Scratches and Breakage Warranty: Scratches and breakages are not covered under warranty.</Text>
          </ListItem>
          <ListItem>
            <Text>4. Unavailable Frames at Time of Claim: Replacement will be of equal value, possibly different brand.</Text>
          </ListItem>
          <ListItem>
            <Text>5. Frame and Lens Warranty Coverage: Only the defective part (frame or lens) is replaced, not both.</Text>
          </ListItem>
          <ListItem>
            <Text>6. Manufacturing Defects Warranty: Six-month warranty covers both frame and lens against defects.</Text>
          </ListItem>
          <ListItem>
            <Text>7. Branded Frame Replacement Time: 15 to 30 days for branded frame replacements.</Text>
          </ListItem>
          <ListItem>
            <Text>8. No Order Cancellation: Orders cannot be canceled after confirmation.</Text>
          </ListItem>
          <ListItem>
            <Text>9. No wear-and-tear coverage for frame and lens under warranty.</Text>
          </ListItem>
          <ListItem>
            <Text>10. Issue Reporting: Visit within 7 days for vision, alignment, or defect concerns.</Text>
          </ListItem>
          <ListItem>
            <Text>11. Order Collection: Collect within 30 days of delivery. Not liable for unclaimed orders after this period.</Text>
          </ListItem>
          <ListItem>
            <Text>12. MR8 1.60 & 1.59 Polycarbonate Lens: Includes six-month breakage warranty.</Text>
          </ListItem>
          <ListItem>
            <Text>13. One-Time Warranty Claim: Warranty claims are valid once per master order.</Text>
          </ListItem>
          <ListItem>
            <Text>14. Delivery Timeline: Estimated delivery is 30 days. We are not liable post-delivery.</Text>
          </ListItem>
          <ListItem>
            <Text>15. Prescription Disclaimer: Not responsible for third-party errors made using prescriptions provided by OptiClair.</Text>
          </ListItem>
        </UnorderedList>
      </Container>
      <Footer />
    </Box>
  );
};

export default TermsAndConditions;
