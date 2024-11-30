import TelegramBot from 'node-telegram-bot-api';
import { ethers } from 'ethers';

// Replace with your Telegram Bot Token
const token = 'YOUR_TELEGRAM_BOT_TOKEN';

// Create an instance of the bot
const bot = new TelegramBot(token, { polling: true });

// Define the user progress interface
interface UserProgress {
  diamonds: number;
  badges: string[];
  tiles: number[];
  moves: number;
}

// Store user progress
const userProgress: Record<number, UserProgress> = {};

// Function to start the game
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  
  if (!userProgress[chatId]) {
    userProgress[chatId] = { diamonds: 0, badges: [], tiles: [], moves: 0 };
  }

  bot.sendMessage(chatId, 'Welcome to the Puzzle Game! Type /play to start playing.');
});

// Start the puzzle game
bot.onText(/\/play/, (msg) => {
  const chatId = msg.chat.id;

  if (!userProgress[chatId]) {
    bot.sendMessage(chatId, 'Please start the game by typing /start first.');
    return;
  }

  bot.sendMessage(chatId, 'Let’s start the puzzle! Type /shuffle to shuffle the tiles.');
});

// Shuffle tiles
bot.onText(/\/shuffle/, (msg) => {
  const chatId = msg.chat.id;

  if (!userProgress[chatId]) {
    bot.sendMessage(chatId, 'Please start the game by typing /start first.');
    return;
  }

  const shuffledTiles = [1, 2, 3, 4, 5, 6, 7, 8, 0].sort(() => Math.random() - 0.5);
  userProgress[chatId].tiles = shuffledTiles;
  userProgress[chatId].moves = 0;

  bot.sendMessage(chatId, 'Puzzle shuffled! Type /move followed by a tile number (1-8) to make a move.');
});

// Handle tile moves
bot.onText(/\/move (\d)/, (msg, match) => {
  const chatId = msg.chat.id;
  const tile = parseInt(match![1]);

  if (!userProgress[chatId]) {
    bot.sendMessage(chatId, 'Please start the game by typing /start first.');
    return;
  }

  const user = userProgress[chatId];
  const tileIndex = user.tiles.indexOf(tile);
  const emptyIndex = user.tiles.indexOf(0);

  // Check if the move is valid (adjacent)
  const isAdjacent = [1, -1, 3, -3].includes(tileIndex - emptyIndex);

  if (isAdjacent) {
    [user.tiles[tileIndex], user.tiles[emptyIndex]] = [user.tiles[emptyIndex], user.tiles[tileIndex]];
    user.moves += 1;
    bot.sendMessage(chatId, `Tile moved! Current board: ${user.tiles.join(' ')}`);
    checkPuzzleCompletion(chatId);
  } else {
    bot.sendMessage(chatId, 'Invalid move! Tiles must be adjacent.');
  }
});

// Check if puzzle is solved
function checkPuzzleCompletion(chatId: number): void {
  const user = userProgress[chatId];
  const solved = user.tiles.join('') === '123456780'; // 0 represents empty space
  if (solved) {
    userProgress[chatId].badges.push('Puzzle Master');
    userProgress[chatId].diamonds += 10; // Reward diamonds
    bot.sendMessage(chatId, 'Congratulations, you solved the puzzle!');
    bot.sendMessage(chatId, `You earned 10 diamonds and the "Puzzle Master" badge!`);
  }
}

// Reward user with diamonds
bot.onText(/\/collectDiamonds/, (msg) => {
  const chatId = msg.chat.id;
  if (!userProgress[chatId]) {
    bot.sendMessage(chatId, 'Please start the game by typing /start first.');
    return;
  }

  const earnedDiamonds = 10;
  userProgress[chatId].diamonds += earnedDiamonds;
  bot.sendMessage(chatId, `You earned ${earnedDiamonds} diamonds! Total: ${userProgress[chatId].diamonds}`);
});

// List user's badges
bot.onText(/\/badges/, (msg) => {
  const chatId = msg.chat.id;

  if (!userProgress[chatId]) {
    bot.sendMessage(chatId, 'Please start the game by typing /start first.');
    return;
  }

  const badges = userProgress[chatId].badges.length
    ? userProgress[chatId].badges.join(', ')
    : 'You have no badges yet.';
  bot.sendMessage(chatId, `Your badges: ${badges}`);
});

// Wallet Connection (for in-app purchases)
bot.onText(/\/connectWallet/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Please connect your Web3 wallet using MetaMask or WalletConnect.');
  // Integrate Web3 connection here using ethers.js
  bot.sendMessage(chatId, 'You are now connected to your wallet!');
});

// Purchase Diamonds (USDT transaction simulation)
bot.onText(/\/buyDiamonds/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Please proceed with purchasing diamonds using USDT.');
  // Integrate USDT transaction and smart contract interaction here using ethers.js
});
