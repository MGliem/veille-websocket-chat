import { Button, Flex, Text, Box, Center, Input } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

const MessageInput = ({ sendMessage }: { sendMessage: (val: string) => void }) => {
  const [value, setValue] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  let messageInput: null | HTMLInputElement = null;

  useEffect(() => {
    if (value.length > 200) {
      setErrorMsg('Your message must be less than 200 characters long');
    } else {
      setErrorMsg('');
    }
  }, [value]);

  const sendValue = () => {
    if (value.length < 200 && value.length > 0) {
      sendMessage(value);
      setValue('');
      messageInput && messageInput.focus();
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      sendValue();
    }
  };

  return (
    <>
      <Flex flexDirection={'column'} w="100%" gap="0.5rem" mt={'0.5rem'}>
        <Input
          autoFocus
          ref={(i) => {
            messageInput = i;
          }}
          placeholder="Enter your message"
          textColor="white"
          borderColor={'teal.100'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyUp={handleKeyUp}
        />
        <Button
          colorScheme="teal"
          onClick={sendValue}
          disabled={value.length < 200 && value.length > 0}
        >
          Send
        </Button>
      </Flex>
      <Box h={'50px'} p={'0.5rem'} display={errorMsg === '' ? 'none' : 'block'}>
        {errorMsg && (
          <Center>
            <Text textColor={'red.500'}>{errorMsg}</Text>
          </Center>
        )}
      </Box>
    </>
  );
};

export default MessageInput;
