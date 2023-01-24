import { Box, Button, Flex, FormLabel, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { io } from 'socket.io-client';
import ChatRoom from './component/ChatRoom';

const socket = io('', {
  path: '/chat-ws/',
});

function App() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (name !== '' && room !== '') {
      socket.emit('joinRoom', room);
      setShowChat(true);
    }
  };
  return (
    <Flex h={'100vh'} justify={'center'} alignItems={'center'} backgroundColor={'#607485'}>
      {!showChat ? (
        <Box
          w={'50%'}
          p={'12px'}
          border={'1px solid #ffffff'}
          rounded={'8'}
          shadow={'lg'}
        >
          <Flex flexDir={'column'} alignItems={'center'}>
            <Text as={'h1'} fontSize={'2rem'} marginBlockEnd={'32px'} color={'white'}>
              {'Join a chat-room'}
            </Text>
            <FormLabel htmlFor={'name'} alignSelf={'start'} color={'white'}>
              {'Name: '}
            </FormLabel>
            <Input
              id="name"
              marginBlockEnd={'24px'}
              placeholder="Enter your name"
              backgroundColor={'white'}
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            ></Input>
            <FormLabel htmlFor={'room'} alignSelf={'start'} color={'white'}>
              {'Room: '}
            </FormLabel>
            <Input
              id="room"
              marginBlockEnd={'24px'}
              placeholder="Room ID..."
              backgroundColor={'white'}
              value={room}
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            ></Input>
            <Button
              colorScheme="teal"
              isDisabled={name === '' && room === ''}
              onClick={joinRoom}
            >
              {'Enter'}
            </Button>
          </Flex>
        </Box>
      ) : (
        <ChatRoom socket={socket} name={name} room={room} />
      )}
    </Flex>
  );
}

export default App;
