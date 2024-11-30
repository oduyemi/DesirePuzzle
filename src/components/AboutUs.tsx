import React from 'react';
import { Box, Button, Grid, Heading, Text, VStack, Image, SimpleGrid, useBreakpointValue, Fade } from '@chakra-ui/react';
import { FaGamepad, FaUsers, FaTrophy } from 'react-icons/fa';
import CTAButton from './elements/CTAButton';

export const AboutUs: React.FC = () => {
  const gridColumns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  return (
    <Box bg="#121212" py={16} px={5} backgroundImage="url('/images/bg-about.jpg')" backgroundSize="cover" backgroundPosition="center">
      <VStack spacing={8} textAlign="center" mb={12}>
        <Heading as="h2" fontSize="4xl" color="#fff" fontWeight="bold" textShadow="2px 2px 4px rgba(0, 0, 0, 0.3)">
          About the Game
        </Heading>
        <Text fontSize="xl" color="gray.50" maxW="800px" mx="auto" textShadow="1px 1px 2px rgba(0, 0, 0, 0.2)">
          Welcome to our exciting puzzle game! Our goal is to provide an engaging, fun, and challenging experience for puzzle enthusiasts. Whether you're here to test your brain or unlock awesome rewards, there's always something new to discover!
        </Text>
      </VStack>

      {/* Mission Section */}
      <Box textAlign="center" my={16} bg="orange" py={8} borderRadius="xl" boxShadow="md">
        <Heading as="h3" fontSize="2xl" color="teal.500" mb={4}>
          Our Mission
        </Heading>
        <Text fontSize="lg" color="gray.600" maxW="700px" mx="auto" mb={8}>
          We aim to create puzzles that push the boundaries of creativity and challenge. Our mission is to inspire players to think critically while having fun. Every puzzle is carefully crafted to provide an exciting and rewarding experience.
        </Text>
      </Box>

      {/* Team Section */}
      <Box textAlign="center" my={16}>
        <Heading as="h3" fontSize="2xl" color="teal.500" mb={4}>
          Meet the Team
        </Heading>
        <Text fontSize="lg" color="gray.50" maxW="700px" mx="auto" mb={10}>
          We are a passionate group of game developers, designers, and puzzle lovers dedicated to bringing you the best puzzle-solving experience.
        </Text>

        <SimpleGrid columns={gridColumns} spacing={12}>
          <TeamMemberCard name="Alice" role="Game Designer" />
          <TeamMemberCard name="Bob" role="Developer" />
          <TeamMemberCard name="Charlie" role="UI/UX Designer" />
        </SimpleGrid>
      </Box>

      {/* Features Section */}
      <Box bg="orange.50" py={12}>
        <Heading as="h3" fontSize="2xl" color="teal.600" mb={4} textAlign="center">
          Features of the Game
        </Heading>
        <SimpleGrid columns={gridColumns} spacing={10} px={5}>
          <FeatureCard
            icon={<FaGamepad size={50} />}
            title="Engaging Gameplay"
            description="Enjoy challenging puzzles that get more difficult as you progress. A perfect blend of fun and strategy!"
          />
          <FeatureCard
            icon={<FaTrophy size={50} />}
            title="Reward System"
            description="Earn diamonds and badges as you complete puzzles. Unlock exciting in-game rewards as you go."
          />
          <FeatureCard
            icon={<FaUsers size={50} />}
            title="Multiplayer Mode"
            description="Challenge your friends or join players from around the world. Compete in real-time to solve puzzles."
          />
        </SimpleGrid>
      </Box>

      {/* Call to Action Section */}
      <Box textAlign="center" my={16} bg="orange" py={10} borderRadius="xl" boxShadow="xl" color="white">
        <Heading as="h3" fontSize="2xl" mb={4}>
          Join the Adventure
        </Heading>
        <Text fontSize="lg" mb={6}>
          Ready to dive into the world of puzzles? Join us and start solving your way to victory!
        </Text>
        <CTAButton 
          text="Play Now"
          color="white" 
          bgColor="#6200EA"
          _hover={{ bgColor: "#3700B3" }}
          px={12}
          size="lg"
        />
      </Box>
    </Box>
  );
};

// Team Member Card with animated entrance
const TeamMemberCard: React.FC<{ name: string; role: string }> = ({ name, role }) => (
  <Fade in>
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
      <Image
        borderRadius="full"
        boxSize="150px"
        src={`https://via.placeholder.com/150?text=${name}`}
        alt={name}
        mx="auto"
        mb={4}
      />
      <Heading as="h4" fontSize="lg" color="teal.500">
        {name}
      </Heading>
      <Text color="gray.600">{role}</Text>
    </Box>
  </Fade>
);

// Feature Card Component for Game Features with hover effect
const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({
  icon,
  title,
  description,
}) => (
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
    <Box mb={4}>{icon}</Box>
    <Heading as="h4" fontSize="xl" mb={2} color="teal.500">
      {title}
    </Heading>
    <Text color="gray.600">{description}</Text>
  </Box>
);
