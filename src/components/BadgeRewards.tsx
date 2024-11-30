import { useState } from 'react';
import { Box, Button, Text, VStack, Grid } from '@chakra-ui/react';
import { motion } from 'framer-motion';

export const BadgeRewards = () => {
  const [badges, setBadges] = useState<string[]>([]);

  const earnBadge = (badge: string) => {
    setBadges([...badges, badge]);
  };

  return (
    <VStack spacing={4} align="center">
      <Text fontSize="2xl" fontWeight="bold" color="teal.600">
        Earned Badges
      </Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {badges.map((badge, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              bg="teal.500"
              color="white"
              p={4}
              borderRadius="full"
              shadow="lg"
              textAlign="center"
            >
              {badge}
            </Box>
          </motion.div>
        ))}
      </Grid>
      <Button
        colorScheme="blue"
        onClick={() => earnBadge('🏆 Puzzle Master')}
        size="lg"
      >
        Complete Puzzle
      </Button>
    </VStack>
  );
};
