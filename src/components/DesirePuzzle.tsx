import { useState } from 'react';
import { Box, Button, Grid, Text, Input, VStack, CircularProgress, useToast, Spinner } from '@chakra-ui/react';
import CTAButton from './elements/CTAButton';
import homeHero from "../assets/images/homehero.png";



export const DesirePuzzle = () => {
  const [desire, setDesire] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [puzzlePieces, setPuzzlePieces] = useState<string[]>([]);
  const [isSolved, setIsSolved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const fetchImage = async () => {
    if (!desire.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a valid desire.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      // Replace with your API key and endpoint
      const response = await fetch(`https://api.unsplash.com/photos/random?query=${desire}&client_id=API_KEY`);
      const data = await response.json();
      setImageURL(data.urls.regular);
      toast({
        title: 'Image Fetched',
        description: `Image for "${desire}" retrieved successfully!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch image. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generatePuzzle = () => {
    if (!imageURL) return;

    // Create a 3x5 grid of image pieces
    const pieces = Array.from({ length: 15 }, (_, i) => `${imageURL}&piece=${i}`);
    const shuffledPieces = [...pieces].sort(() => Math.random() - 0.5);
    setPuzzlePieces(shuffledPieces);
    setIsSolved(false);
  };

  const handleDrop = (piece: string, index: number) => {
    const newPuzzle = [...puzzlePieces];
    const pieceIndex = newPuzzle.indexOf(piece);
    [newPuzzle[pieceIndex], newPuzzle[index]] = [newPuzzle[index], newPuzzle[pieceIndex]];
    setPuzzlePieces(newPuzzle);

    // Check if the puzzle is solved
    const solved = newPuzzle.every((p, i) => p === `${imageURL}&piece=${i}`);
    setIsSolved(solved);
  };

  return (
    <Box
      as="section"
      bgImage={homeHero}
      bgSize="cover"
      bgPosition="center"
      color="#F5F5F5"
      py={16}
      height="84vh"
      textAlign="center"
      bgColor="#121212"
      display="flex"
      justifyContent="center"
      alignItems="center"  
      pt={0}  
    >
      <VStack spacing={4} mt={5} p={4} align="center">
        <Input
          placeholder="Type what you desire (e.g., 'beach vacation')"
          value={desire}
          onChange={(e) => setDesire(e.target.value)}
          width="200%"
          variant="filled"
          focusBorderColor="teal.400"
          mb={4}
        />
        <CTAButton 
          text="Fetch Image"
          color="white" 
          bgColor="#6200EA"
          _hover={{ bgColor: "#3700B3" }}
          onClick={fetchImage}
          isLoading={isLoading}
          loadingText="Fetching Image"
        />
        {imageURL && (
          <CTAButton 
          text="Generate Puzzle"
          color="white" 
          bgColor="#6200EA"
          _hover={{ bgColor: "#3700B3" }}
          onClick={generatePuzzle}
        />
        )}
        {puzzlePieces.length > 0 && (
          <Grid
            templateColumns="repeat(5, 100px)"
            gap={2}
            justifyContent="center"
            mt={5}
            p={4}
            border="2px solid teal"
            borderRadius="md"
            bg="gray.50"
          >
            {puzzlePieces.map((piece, index) => (
              <Box
                key={index}
                bgImage={`url(${piece})`}
                bgSize="cover"
                bgPos="center"
                height="100px"
                width="100px"
                borderRadius="md"
                border="1px solid teal"
                shadow="md"
                cursor="grab"
                draggable
                onDragStart={(e) => e.dataTransfer.setData('text/plain', piece)}
                onDrop={(e) => handleDrop(piece, index)}
                onDragOver={(e) => e.preventDefault()}
                transition="transform 0.2s"
                _hover={{ transform: 'scale(1.05)' }}
              />
            ))}
          </Grid>
        )}
        {isSolved && (
          <Text mt={5} fontSize="lg" fontWeight="bold" color="green.500">
            🎉 Congratulations! You solved the puzzle!
          </Text>
        )}
      </VStack>
    </Box>
  );
};
