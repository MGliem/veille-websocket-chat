import { Box, Center, Flex, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import MessageInput from './MessageInput';
import {ChatMessage } from '@libs/typings';

const ChatRoom = ({
  socket,
  name,
  room,
}: {
  socket: Socket;
  name: string;
  room: string;
}) => {
  const [messageList, setMessageList] = useState<ChatMessage[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (data: ChatMessage) => {
      setMessageList((list: ChatMessage[]) => [...list, data]);
    };
    socket.on('chatToClient', handler);

    return () => {
      socket.off('chatToClient', handler);
    };
  }, [socket]);

  const sendMessage = (currentMessage: String) => {
    if (currentMessage !== '') {
      const messageData = {
        sender: name,
        room: room,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };

      socket.emit('chatToServer', messageData);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  return (
    <Flex flexDir={'column'} w={'100%'} h={'100vh'} p={'24px'}>
      <Center>
        <Text color={'white'}>{`Chat-room: ${room}`}</Text>
      </Center>
      <Box
        w={'100%'}
        p={'0.5rem'}
        overflow={'auto'}
        borderWidth={'1px'}
        borderStyle={'solid'}
        borderColor={'teal.100'}
        borderRadius={'lg'}
        flexGrow={1}
      >
        {messageList.map((message, index) => (
          <Box key={index}>
            <Text
              color={'white'}
            >{`${message.time} | ${message.sender === name ? 'You' : message.sender}: ${message.message}`}</Text>
          </Box>
        ))}
        <Box ref={messagesEndRef}></Box>
      </Box>
      <MessageInput sendMessage={sendMessage} />
    </Flex>
  );
};

export default ChatRoom;
