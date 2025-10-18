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
import { Upload, FileText, ArrowRight, SkipForward, Phone } from 'lucide-react';
import { InfoIcon } from '@chakra-ui/icons';
import { PRESCRIPTIONS_URL } from '../../config/api';

const PrescriptionPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    prescription: {
      rightEye: { sph: '', cyl: '', axis: '', pd: '' },
      leftEye: { sph: '', cyl: '', axis: '', pd: '' },
      add: '',
      totalPd: '',
    },
    prescriptionFile: null,
  });
  const [inputMethod, setInputMethod] = useState('manual');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handlePrescriptionChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      prescription: {
        ...prev.prescription,
        [section]: {
          ...prev.prescription[section],
          [field]: value,
        },
      },
    }));
  };

  const handleExtraChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      prescription: {
        ...prev.prescription,
        [field]: value,
      },
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[\d\s\-()]{10,}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    if (inputMethod === 'manual') {
      const { rightEye, leftEye } = formData.prescription;
      if (!rightEye.sph && !leftEye.sph) {
        newErrors.prescription = 'Please fill in prescription details';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      let prescriptionData = {
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        inputMethod: inputMethod,
      };

      let bodyData;
      let headers = {};

      if (inputMethod === 'manual') {
        prescriptionData.prescription = formData.prescription;
        bodyData = JSON.stringify(prescriptionData);
        headers['Content-Type'] = 'application/json';
      } else {
        const fileData = new FormData();
        fileData.append('prescriptionFile', formData.prescriptionFile);
        Object.keys(prescriptionData).forEach((key) => {
          fileData.append(key, prescriptionData[key]);
        });
        bodyData = fileData;
      }

      const response = await fetch(`${PRESCRIPTIONS_URL}`, {
        method: 'POST',
        headers,
        body: bodyData,
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
      <Container maxW="2xl">
        <Card shadow="lg">
          <CardBody p={8}>
            <VStack spacing={8} align="stretch">
              <Box textAlign="center">
                <Heading size="xl" mb={2} color="gray.800">
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

              {/* Personal Info */}
              <VStack spacing={4} align="stretch">
                <Heading size="lg" color="gray.800">
                  Personal Information
                </Heading>
                <FormControl isInvalid={errors.name}>
                  <FormLabel>Full Name</FormLabel>
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
                  <FormLabel>Phone Number</FormLabel>
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
              </VStack>

              <Divider />

              {/* Prescription Details */}
              <VStack spacing={4} align="stretch">
                <Heading size="lg" color="gray.800">
                  Prescription Details
                </Heading>

                <SimpleGrid columns={2} spacing={4}>
                  <Card
                    variant={inputMethod === 'manual' ? 'filled' : 'outline'}
                    bg={inputMethod === 'manual' ? 'blue.50' : 'white'}
                    borderColor={inputMethod === 'manual' ? 'blue.500' : 'gray.200'}
                    borderWidth={inputMethod === 'manual' ? '2px' : '1px'}
                    cursor="pointer"
                    onClick={() => setInputMethod('manual')}
                    _hover={{ borderColor: 'blue.300' }}
                  >
                    <CardBody textAlign="center" py={6}>
                      <Icon as={FileText} boxSize={6} mb={2} color="blue.600" />
                      <Text fontWeight="medium" color="blue.700">
                        Enter Manually
                      </Text>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody textAlign="center" py={6}>
                      <Icon as={Upload} boxSize={6} mb={2} color="gray.500" />
                      <Text fontWeight="medium" color="gray.700">
                        Upload File (Coming Soon)
                      </Text>
                    </CardBody>
                  </Card>
                </SimpleGrid>

                {inputMethod === 'manual' && (
                  <>
                    <Tooltip
                      label="Include SPH, CYL, Axis for each eye, and PD (Pupillary Distance)."
                      aria-label="Prescription format help"
                      placement="right"
                    >
                      <HStack>
                        <Icon as={InfoIcon} color="gray.500" boxSize={4} />
                        <Text fontSize="sm" color="gray.600">
                          Fill in values for both eyes below
                        </Text>
                      </HStack>
                    </Tooltip>

                    {/* Right Eye */}
                    <Box bg="gray.100" p={4} borderRadius="md">
                      <Heading size="md" color="blue.700" mb={3}>
                        Right Eye (OD)
                      </Heading>
                      <SimpleGrid columns={2} spacing={4}>
                        <Input
                          placeholder="SPH"
                          value={formData.prescription.rightEye.sph}
                          onChange={(e) =>
                            handlePrescriptionChange('rightEye', 'sph', e.target.value)
                          }
                        />
                        <Input
                          placeholder="CYL"
                          value={formData.prescription.rightEye.cyl}
                          onChange={(e) =>
                            handlePrescriptionChange('rightEye', 'cyl', e.target.value)
                          }
                        />
                        <Input
                          placeholder="Axis"
                          value={formData.prescription.rightEye.axis}
                          onChange={(e) =>
                            handlePrescriptionChange('rightEye', 'axis', e.target.value)
                          }
                        />
                        <Input
                          placeholder="PD (mm)"
                          value={formData.prescription.rightEye.pd}
                          onChange={(e) =>
                            handlePrescriptionChange('rightEye', 'pd', e.target.value)
                          }
                        />
                      </SimpleGrid>
                    </Box>

                    {/* Left Eye */}
                    <Box bg="gray.100" p={4} borderRadius="md">
                      <Heading size="md" color="blue.700" mb={3}>
                        Left Eye (OS)
                      </Heading>
                      <SimpleGrid columns={2} spacing={4}>
                        <Input
                          placeholder="SPH"
                          value={formData.prescription.leftEye.sph}
                          onChange={(e) =>
                            handlePrescriptionChange('leftEye', 'sph', e.target.value)
                          }
                        />
                        <Input
                          placeholder="CYL"
                          value={formData.prescription.leftEye.cyl}
                          onChange={(e) =>
                            handlePrescriptionChange('leftEye', 'cyl', e.target.value)
                          }
                        />
                        <Input
                          placeholder="Axis"
                          value={formData.prescription.leftEye.axis}
                          onChange={(e) =>
                            handlePrescriptionChange('leftEye', 'axis', e.target.value)
                          }
                        />
                        <Input
                          placeholder="PD (mm)"
                          value={formData.prescription.leftEye.pd}
                          onChange={(e) =>
                            handlePrescriptionChange('leftEye', 'pd', e.target.value)
                          }
                        />
                      </SimpleGrid>
                    </Box>

                    {/* ADD & Total PD */}
                    <SimpleGrid columns={2} spacing={4}>
                      <Input
                        placeholder="ADD (Near Vision)"
                        value={formData.prescription.add}
                        onChange={(e) => handleExtraChange('add', e.target.value)}
                      />
                      <Input
                        placeholder="Total PD"
                        value={formData.prescription.totalPd}
                        onChange={(e) => handleExtraChange('totalPd', e.target.value)}
                      />
                    </SimpleGrid>
                  </>
                )}
              </VStack>

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
