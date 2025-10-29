import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Card,
  CardBody,
  Heading,
  SimpleGrid,
  Icon,
  useToast,
  Spinner,
  Divider,
  Tooltip,
} from '@chakra-ui/react';
import { ArrowRight, SkipForward, Phone, Eye } from 'lucide-react';
import { InfoIcon } from '@chakra-ui/icons';
import { PRESCRIPTIONS_URL } from '../../config/api';

const PrescriptionPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    // Right Eye (OD)
    rightSph: '',
    rightCyl: '',
    rightAxis: '',
    rightPd: '',
    // Left Eye (OS)
    leftSph: '',
    leftCyl: '',
    leftAxis: '',
    leftPd: '',
    // Additional measurements
    addPower: '',
    totalPd: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Personal info validation
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[\d\s\-()]{10,}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    // Check if at least one prescription field is filled
    const prescriptionFields = [
      'rightSph', 'rightCyl', 'rightAxis', 'rightPd',
      'leftSph', 'leftCyl', 'leftAxis', 'leftPd',
      'addPower', 'totalPd'
    ];
    
    const hasAnyPrescription = prescriptionFields.some(field => formData[field].trim());
    
    if (!hasAnyPrescription) {
      newErrors.prescription = 'Please fill at least one prescription field';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill all required fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Structure prescription data as JSON
      const prescriptionData = {
        name: formData.name.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        inputMethod: 'manual',
        prescriptionDetails: {
          rightEye: {
            sph: formData.rightSph.trim(),
            cyl: formData.rightCyl.trim(),
            axis: formData.rightAxis.trim(),
            pd: formData.rightPd.trim(),
          },
          leftEye: {
            sph: formData.leftSph.trim(),
            cyl: formData.leftCyl.trim(),
            axis: formData.leftAxis.trim(),
            pd: formData.leftPd.trim(),
          },
          additional: {
            addPower: formData.addPower.trim(),
            totalPd: formData.totalPd.trim(),
          }
        }
      };

      const response = await fetch(`${PRESCRIPTIONS_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prescriptionData),
      });

      if (response.ok) {
        toast({
          title: 'Prescription saved successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/shipping');
      } else {
        const errorData = await response.json();
        toast({
          title: 'Error saving prescription',
          description: errorData.message || 'Failed to save prescription',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error submitting prescription:', error);
      toast({
        title: 'Network Error',
        description: 'Please check your connection and try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    navigate('/shipping');
  };

  return (
    <Box bg="gray.50" minH="100vh" py={8}>
      <Container maxW="4xl">
        <Card shadow="lg">
          <CardBody p={8}>
            <VStack spacing={8} align="stretch">
              {/* Header */}
              <Box textAlign="center">
                <Heading size="xl" mb={4} color="gray.800">
                  Prescription Details
                </Heading>
                
                <Card bg="blue.50" borderColor="blue.200" borderWidth="1px">
                  <CardBody py={4}>
                    <HStack justify="center" spacing={3}>
                      <Icon as={Phone} color="blue.600" />
                      <Text color="blue.800" fontWeight="medium">
                        Need help with your prescription?
                      </Text>
                      <Button
                        as="a"
                        href="tel:+919981463336"
                        size="sm"
                        colorScheme="blue"
                        variant="solid"
                        leftIcon={<Icon as={Phone} />}
                      >
                        Call 9981463336
                      </Button>
                    </HStack>
                  </CardBody>
                </Card>
              </Box>

              {/* Personal Information */}
              <VStack spacing={4} align="stretch">
                <Heading size="lg" color="gray.800">Personal Information</Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <FormControl isInvalid={errors.name}>
                    <FormLabel>Full Name *</FormLabel>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      focusBorderColor="blue.500"
                    />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={errors.phoneNumber}>
                    <FormLabel>Phone Number *</FormLabel>
                    <Input
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      focusBorderColor="blue.500"
                    />
                    <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
                  </FormControl>
                </SimpleGrid>
              </VStack>

              <Divider />

              {/* Prescription Details */}
              <VStack spacing={6} align="stretch">
                <HStack justify="space-between" align="center">
                  <Heading size="lg" color="gray.800">Prescription Measurements</Heading>
                  <Tooltip
                    label="SPH: Sphere (nearsighted/farsighted), CYL: Cylinder (astigmatism), Axis: Angle (1-180), PD: Pupillary Distance"
                    aria-label="Prescription help"
                    placement="left"
                  >
                    <Box>
                      <Icon as={InfoIcon} color="blue.500" boxSize={5} cursor="pointer" />
                    </Box>
                  </Tooltip>
                </HStack>

                {errors.prescription && (
                  <Text color="red.500" fontSize="sm">{errors.prescription}</Text>
                )}

                {/* Right Eye (OD) */}
                <Box>
                  <HStack spacing={2} mb={3}>
                    <Icon as={Eye} color="blue.600" />
                    <Heading size="md" color="gray.700">Right Eye (OD)</Heading>
                  </HStack>
                  <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
                    <FormControl>
                      <FormLabel fontSize="sm">SPH (Sphere)</FormLabel>
                      <Input
                        name="rightSph"
                        value={formData.rightSph}
                        onChange={handleInputChange}
                        placeholder="e.g., -2.00"
                        focusBorderColor="blue.500"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel fontSize="sm">CYL (Cylinder)</FormLabel>
                      <Input
                        name="rightCyl"
                        value={formData.rightCyl}
                        onChange={handleInputChange}
                        placeholder="e.g., -0.75"
                        focusBorderColor="blue.500"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel fontSize="sm">Axis (°)</FormLabel>
                      <Input
                        name="rightAxis"
                        value={formData.rightAxis}
                        onChange={handleInputChange}
                        placeholder="e.g., 180"
                        focusBorderColor="blue.500"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel fontSize="sm">PD (mm)</FormLabel>
                      <Input
                        name="rightPd"
                        value={formData.rightPd}
                        onChange={handleInputChange}
                        placeholder="e.g., 32"
                        focusBorderColor="blue.500"
                      />
                    </FormControl>
                  </SimpleGrid>
                </Box>

                {/* Left Eye (OS) */}
                <Box>
                  <HStack spacing={2} mb={3}>
                    <Icon as={Eye} color="blue.600" />
                    <Heading size="md" color="gray.700">Left Eye (OS)</Heading>
                  </HStack>
                  <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
                    <FormControl>
                      <FormLabel fontSize="sm">SPH (Sphere)</FormLabel>
                      <Input
                        name="leftSph"
                        value={formData.leftSph}
                        onChange={handleInputChange}
                        placeholder="e.g., -1.75"
                        focusBorderColor="blue.500"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel fontSize="sm">CYL (Cylinder)</FormLabel>
                      <Input
                        name="leftCyl"
                        value={formData.leftCyl}
                        onChange={handleInputChange}
                        placeholder="e.g., -1.00"
                        focusBorderColor="blue.500"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel fontSize="sm">Axis (°)</FormLabel>
                      <Input
                        name="leftAxis"
                        value={formData.leftAxis}
                        onChange={handleInputChange}
                        placeholder="e.g., 170"
                        focusBorderColor="blue.500"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel fontSize="sm">PD (mm)</FormLabel>
                      <Input
                        name="leftPd"
                        value={formData.leftPd}
                        onChange={handleInputChange}
                        placeholder="e.g., 32"
                        focusBorderColor="blue.500"
                      />
                    </FormControl>
                  </SimpleGrid>
                </Box>

                {/* Additional Measurements */}
                <Box>
                  <Heading size="md" color="gray.700" mb={3}>Additional Measurements</Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    <FormControl>
                      <FormLabel fontSize="sm">
                        ADD Power (Near Vision)
                        <Tooltip label="For reading or bifocal lenses" placement="right">
                          <Box as="span" ml={1}>
                            <Icon as={InfoIcon} color="gray.400" boxSize={3} />
                          </Box>
                        </Tooltip>
                      </FormLabel>
                      <Input
                        name="addPower"
                        value={formData.addPower}
                        onChange={handleInputChange}
                        placeholder="e.g., +1.50"
                        focusBorderColor="blue.500"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel fontSize="sm">
                        Total PD (mm)
                        <Tooltip label="Distance between pupils (both eyes)" placement="right">
                          <Box as="span" ml={1}>
                            <Icon as={InfoIcon} color="gray.400" boxSize={3} />
                          </Box>
                        </Tooltip>
                      </FormLabel>
                      <Input
                        name="totalPd"
                        value={formData.totalPd}
                        onChange={handleInputChange}
                        placeholder="e.g., 63"
                        focusBorderColor="blue.500"
                      />
                    </FormControl>
                  </SimpleGrid>
                </Box>

                {/* Info Box */}
                <Card bg="gray.50" borderColor="gray.200" borderWidth="1px">
                  <CardBody>
                    <Text fontSize="sm" color="gray.600">
                      <strong>💡 Tip:</strong> You can find these values on your prescription paper from your eye doctor. 
                      If you're unsure about any values, you can skip them or call us for assistance.
                    </Text>
                  </CardBody>
                </Card>
              </VStack>

              {/* Action Buttons */}
              <HStack spacing={4} pt={6}>
                <Button
                  flex={1}
                  variant="outline"
                  leftIcon={<Icon as={SkipForward} />}
                  onClick={handleSkip}
                  size="lg"
                >
                  Skip for Now
                </Button>

                <Button
                  flex={1}
                  colorScheme="blue"
                  rightIcon={isSubmitting ? <Spinner size="sm" /> : <Icon as={ArrowRight} />}
                  onClick={handleSubmit}
                  isLoading={isSubmitting}
                  loadingText="Saving..."

                  
                  size="lg"
                >
                  Save & Continue
                </Button>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      </Container>
    </Box>
  );
};

export default PrescriptionPage;