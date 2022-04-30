import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormControl, FormLabel, Input
  } from '@chakra-ui/react'
import React from 'react';
import { GlobalConsumer } from '../context/context';


function Dialog(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    React.useEffect(() => {
        if (props.isOpen) onOpen();
        else onClose();

        return () => {
            onClose();
        }
    })

    const [input, setInput] = React.useState('');

    const handleInputChange = (e) => setInput(e.target.value)

    return (
      <>
        {/* <Button variant={'outline'} onClick={onOpen}>Not {props.state.handleInfo.handle} ?</Button> */}
  
        <Modal isOpen={isOpen} onClose={onClose} size={'xs'}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>You are not {props.state.handleInfo.handle}?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <FormControl>
              <FormLabel>set your handle</FormLabel>
              <Input placeholder='Handle' 
              value={input}
                onChange={handleInputChange}/>
            </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={() => {
                  props.onClose();
                  }}>
                Close
              </Button>
              <Button variant='ghost' onClick={() => {
                  props.dispatch({type: 'UPDATE_STATE', state: {
                    ...props.state,
                    handleInfo: {handle: input}
                }});
                setTimeout(() => {
                    props.dispatch({type: 'LOAD_RATING'});
                    props.onClose();
                }, 500)
              }}>Set Handle</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
export default GlobalConsumer(Dialog);