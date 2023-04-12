import React from 'react'
import {
  Box,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import {
  Contact,
} from '@chakra-ui/react';

export type ContactSidebarProps = {
  contact: Contact;
}

export const ContactSidebar: React.FC<ContactSidebarProps> = ({
  contact,
}) => {
  return (
    <VStack w='300px' h="full" spacing='12px' alignItems="flex-start" p="4">
      <span>{contact.nickname}</span>
      <Accordion allowMultiple w='full'>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left'>
                标签
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            fjfj
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left'>
                交易记录
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            交易记录
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </VStack>
  );
};