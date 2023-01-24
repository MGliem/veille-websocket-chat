import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('', {
  path: '/chat-ws/',
});

function App() {
  return <Box>jj</Box>;
}

export default App;
