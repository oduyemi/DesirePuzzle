import React from 'react';
import { Box, Button, Flex, Grid, Heading, Text, VStack, Icon, SimpleGrid, Image, useBreakpointValue } from '@chakra-ui/react';
import { FaPuzzlePiece, FaGem, FaRegHandPointRight, FaWallet } from 'react-icons/fa';
import CTAButton from './elements/CTAButton';

export const GameFeatures: React.FC = () => {
  const gridColumns = useBreakpointValue({ base: 1, md: 2, lg: 4 });

  return (
    <Box 
        as="section"
        height="84vh"
        textAlign="center" 
        py={10} 
        bgColor="#121212"
        color="#fff"
    >
      <Heading as="h2" fontSize="3xl" mb={6} color="teal.500">
        Game Features
      </Heading>

      <Text fontSize="xl" color="gray.50" mb={12}>
        Discover the exciting features of our game and unlock rewards, challenges, and more!
      </Text>

      <SimpleGrid columns={gridColumns} spacing={10} px={5}>
        <FeatureCard
          icon={<FaPuzzlePiece size={50} color='orange' />}
          title="Puzzle Challenges"
          description="Solve engaging puzzles and unlock new levels of excitement. Every puzzle brings a new challenge!"
          buttonText="Start Puzzle"
        />
        <FeatureCard
          icon={<FaGem size={50} color='orange' />}
          title="Diamond Rewards"
          description="Earn diamonds as you complete tasks or watch ads. Collect and use them for awesome rewards!"
          buttonText="Collect Diamonds"
        />
        <FeatureCard
          icon={<FaRegHandPointRight size={50} color='orange' />}
          title="Game Progress"
          description="Track your progress with cool animations. See how far you’ve come and what's next!"
          buttonText="View Progress"
        />
        <FeatureCard
          icon={<FaWallet size={50} color='orange' />}
          title="In-App Purchases"
          description="Connect your wallet to make purchases and unlock premium features. Start your journey now!"
          buttonText="Go Premium"
        />
      </SimpleGrid>

      <Box mt={12}>
        <CTAButton 
          text="Play Now"
          color="white" 
          bgColor="#6200EA"
          _hover={{ bgColor: "#3700B3" }}
          px={10}
          size="lg"
        />
      </Box>
    </Box>
  );
};

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
}> = ({ icon, title, description, buttonText }) => (
  <Box
    bg="white"
    borderRadius="lg"
    boxShadow="lg"
    p={6}
    textAlign="center"
    _hover={{
      boxShadow: 'xl',
      transform: 'scale(1.05)',
      transition: 'transform 0.2s, box-shadow 0.2s',
    }}
    transition="transform 0.2s, box-shadow 0.2s"
  >
    <Box mb={4}>
        <Flex>
            {icon}
            <Heading as="h3" fontSize="xl" mt={4} mb={2} color="teal.500">
                &nbsp;{title}
            </Heading>
        </Flex>
    </Box>
    <Text color="gray.600" mb={4}>
      {description}
    </Text>
    <CTAButton 
          text={buttonText}
          color="white" 
          bgColor="#6200EA"
          _hover={{ bgColor: "#3700B3" }}
          mt={4}
          size="sm"
        />
  </Box>
);

