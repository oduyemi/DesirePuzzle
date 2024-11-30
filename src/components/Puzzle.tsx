import { useState } from 'react';
import { Box, Button, Grid, Text, Input, VStack } from '@chakra-ui/react';

export const Puzzle = () => {
  const [desire, setDesire] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [puzzlePieces, setPuzzlePieces] = useState<string[]>([]);
  const [isSolved, setIsSolved] = useState(false);

  const fetchImage = async () => {
    try {
      // Replace with your API key and endpoint
      const response = await fetch(`https://api.unsplash.com/photos/random?query=${desire}&client_id=YOUR_API_KEY`);
      const data = await response.json();
      setImageURL(data.urls.regular);
    } catch (error) {
      console.error('Error fetching image:', error);
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
    <VStack spacing={4} mt={5}>
      <Text fontSize="xl" fontWeight="bold">Desire Puzzle Game</Text>
      <Input
        placeholder="Type your desire (e.g., 'beach vacation')"
        value={desire}
        onChange={(e) => setDesire(e.target.value)}
      />
      <Button colorScheme="teal" onClick={fetchImage}>
        Fetch Image
      </Button>
      {imageURL && (
        <Button colorScheme="teal" onClick={generatePuzzle}>
          Generate Puzzle
        </Button>
      )}
      {puzzlePieces.length > 0 && (
        <Grid templateColumns="repeat(5, 100px)" gap={2} justifyContent="center" mt={5}>
          {puzzlePieces.map((piece, index) => (
            <Box
              key={index}
              bgImage={`url(${piece})`}
              bgSize="cover"
              bgPos="center"
              height="100px"
              width="100px"
              border="1px solid teal"
              onDrop={(e) => handleDrop(piece, index)}
              draggable
              onDragStart={(e) => e.dataTransfer.setData('text/plain', piece)}
            />
          ))}
        </Grid>
      )}
      {isSolved && <Text mt={5} color="green.500">Congratulations! You solved the puzzle.</Text>}
    </VStack>
  );
};
