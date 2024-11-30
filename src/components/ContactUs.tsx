import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, Heading, Text, VStack, SimpleGrid, useBreakpointValue, IconButton, Stack, useToast } from '@chakra-ui/react';
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import { MdSend } from 'react-icons/md';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import CTAButton from './elements/CTAButton';

export const ContactUs: React.FC = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const gridColumns = useBreakpointValue({ base: 1, md: 2 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate a form submission
    setTimeout(() => {
      setLoading(false);
      toast({
        title: 'Message Sent!',
        description: 'We have received your message and will get back to you shortly.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setFormValues({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <Box py={16} px={5} bgColor="#121212">
      <VStack spacing={8} textAlign="center" mb={12}>
        <Heading as="h2" fontSize="4xl" color="white" fontWeight="bold" textShadow="2px 2px 6px rgba(0, 0, 0, 0.3)">
          Contact Us
        </Heading>
        <Text fontSize="xl" color="gray.100" maxW="800px" mx="auto" mb={8}>
          We'd love to hear from you! Whether you have a question, need assistance, or just want to share your feedback, feel free to get in touch with us.
        </Text>
      </VStack>

      {/* Contact Details Section */}
      <SimpleGrid columns={gridColumns} spacing={12} mb={12}>
        <Box bg="white" borderRadius="lg" boxShadow="lg" p={8} _hover={{ boxShadow: '2xl', transform: 'scale(1.02)' }} transition="all 0.3s ease">
          <Heading as="h3" fontSize="2xl" color="teal.500" mb={4}>
            Get In Touch
          </Heading>
          <Text fontSize="lg" color="gray.700" mb={6}>
            Have a question or need support? Reach out to us through any of the channels below:
          </Text>

          <VStack spacing={6}>
            <Box display="flex" justifyContent="space-between" _hover={{ transform: 'scale(1.05)', transition: '0.3s' }}>
              <FaPhoneAlt size={24} color="orange" />
              <Text ml={4}>+1 (555) 123-4567</Text>
            </Box>
            <Box display="flex" justifyContent="space-between" _hover={{ transform: 'scale(1.05)', transition: '0.3s' }}>
              <FaEnvelope size={24} color="orange" />
              <Text ml={4}>support@example.com</Text>
            </Box>
            <Box display="flex" justifyContent="space-between" _hover={{ transform: 'scale(1.05)', transition: '0.3s' }}>
              <FaMapMarkerAlt size={24} color="orange" />
              <Text ml={4}>1234 Street Name, City, Country</Text>
            </Box>
          </VStack>
        </Box>

        {/* Map Section */}
        <Box bg="white" borderRadius="lg" boxShadow="lg" p={8} _hover={{ boxShadow: '2xl', transform: 'scale(1.02)' }} transition="all 0.3s ease">
          <Heading as="h3" fontSize="2xl" color="teal.500" mb={4}>
            Our Location
          </Heading>

          {/* Google Maps Integration */}
          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
              mapContainerStyle={{ height: '400px', width: '100%' }}
              center={{ lat: 40.748817, lng: -73.985428 }} // Example location (New York)
              zoom={12}
            >
              <Marker position={{ lat: 40.748817, lng: -73.985428 }} />
            </GoogleMap>
          </LoadScript>
        </Box>
      </SimpleGrid>

      {/* Contact Form Section */}
      <Box bg="white" borderRadius="lg" boxShadow="lg" p={8} _hover={{ boxShadow: '2xl', transform: 'scale(1.02)' }} transition="all 0.3s ease">
        <Heading as="h3" fontSize="2xl" color="teal.500" textAlign="center" mb={6}>
          Send Us a Message
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={6} align="stretch">
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                placeholder="Your Name"
                _hover={{ borderColor: 'teal.500' }}
                transition="border-color 0.3s ease"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                placeholder="Your Email"
                _hover={{ borderColor: 'teal.500' }}
                transition="border-color 0.3s ease"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Message</FormLabel>
              <Textarea
                name="message"
                value={formValues.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={6}
                _hover={{ borderColor: 'teal.500' }}
                transition="border-color 0.3s ease"
              />
            </FormControl>
            <Button
              type="submit"
              bgColor="#6200EA"
              color='white'
            //   size="lg"
              rightIcon={<MdSend />}
              variant="solid"
              width="full"
              isLoading={loading}
              _hover={{ transform: 'scale(1.05)', transition: '0.3s' }}
              boxShadow="md"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </Button>
          </VStack>
        </form>
      </Box>

      {/* Floating Action Button */}
      <IconButton
        aria-label="Quick Contact"
        icon={<FaEnvelope />}
        position="fixed"
        bottom={6}
        right={6}
        borderRadius="full"
        size="lg"
        colorScheme="orange"
        boxShadow="md"
        _hover={{ transform: 'scale(1.1)', boxShadow: 'lg' }}
        transition="all 0.3s ease"
        onClick={() => window.location.href = 'mailto:support@example.com'}
      />
    </Box>
  );
};

