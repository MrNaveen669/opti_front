import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Input,
  Textarea,
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
  Badge,
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
    prescriptionText: '',
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
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          file: 'Please upload a valid image (JPEG, PNG) or PDF file',
        }));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          file: 'File size must be less than 5MB',
        }));
        return;
      }

      setFormData((prev) => ({
        ...prev,
        prescriptionFile: file,
      }));
      setErrors((prev) => ({
        ...prev,
        file: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[\d\s\-()]{10,}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    if (inputMethod === 'manual' && !formData.prescriptionText.trim()) {
      newErrors.prescriptionText = 'Please enter your prescription details';
    }
    if (inputMethod === 'upload' && !formData.prescriptionFile) {
      newErrors.file = 'Please upload your prescription file';
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
        prescriptionData.prescriptionText = formData.prescriptionText;
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

              <VStack spacing={4} align="stretch">
                <Heading size="lg" color="gray.800">Personal Information</Heading>
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

              <VStack spacing={4} align="stretch">
                <Heading size="lg" color="gray.800">Prescription Details</Heading>
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
                  <FormControl isInvalid={errors.prescriptionText}>
                    <FormLabel>
                      Prescription Details
                      <Tooltip
                        label="Include SPH, CYL, Axis for each eye, and PD (Pupillary Distance)."
                        aria-label="Prescription format help"
                        placement="right"
                      >
                        <Box as="span" ml={2}>
                          <Icon as={InfoIcon} color="gray.500" boxSize={4} cursor="pointer" />
                        </Box>
                      </Tooltip>
                    </FormLabel>

                    <Box p={4} bg="gray.100" borderRadius="md" color="gray.700" fontSize="sm" mb={3}>
                      <Text fontWeight="medium" mb={1}>Write Prescription Format:</Text>
                      <Text>Right Eye (OD): SPH -2.00, CYL -0.75, Axis 180*,Right PD 32 MM,</Text>
                      <Text>Left Eye (OS): SPH -1.75, CYL -1.00, Axis 170*,Left PD 32 MM,</Text>
                      <Text>ADD:(Near vision) Both Eye ADD +1.50,</Text>
                      <Text>Total PD: 63 MM,</Text>
                    </Box>

                    <Textarea
                      name="prescriptionText"
                      value={formData.prescriptionText}
                      onChange={handleInputChange}
                      placeholder={`Enter your prescription details here...`}
                      rows={6}
                      focusBorderColor="blue.500"
                    />
                    <FormErrorMessage>{errors.prescriptionText}</FormErrorMessage>
                  </FormControl>
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
