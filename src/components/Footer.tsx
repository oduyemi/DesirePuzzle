import React from 'react';
import { Box, Text } from '@chakra-ui/react';

export const Footer: React.FC = () => {
  return (
    <Box as="footer" bg="#1C1C1C" color="#F5F5F5" py={4} textAlign="center">
      <Text>&copy; {new Date().getFullYear()} My Desire. All Rights Reserved.</Text>
    </Box>
  );
};
