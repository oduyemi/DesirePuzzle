import { useState } from 'react';
import { Box, Button, Text, VStack, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';

export const DiamondRewards = () => {
  const [diamonds, setDiamonds] = useState(0);
  const toast = useToast();

  const collectDiamonds = (amount: number) => {
    setDiamonds(diamonds + amount);
    toast({
      title: 'Congratulations!',
      description: `You earned ${amount} diamonds!`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={4} align="center">
      <Text fontSize="2xl" fontWeight="bold" color="teal.600">
        Diamonds: {diamonds}
      </Text>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Box
          bg="yellow.400"
          p={4}
          borderRadius="md"
          shadow="lg"
          textAlign="center"
          width="150px"
        >
          💎 Earn Diamonds!
        </Box>
      </motion.div>
      <Button
        colorScheme="teal"
        onClick={() => collectDiamonds(10)}
        size="lg"
      >
        Complete Task
      </Button>
    </VStack>
  );
};
