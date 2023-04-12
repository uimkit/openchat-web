import {
  useUIKit,
  Contact,
  useConversation,
} from '@uimkit/uikit-react';
import { 
  Avatar,
  Flex,
  Button,
} from '@chakra-ui/react';

export type ContactDetailsProps = {
  contact: Contact;
  onStartConversation?: () => void;
};

export const ContactDetails: React.FC<ContactDetailsProps> = ({
  contact,
  onStartConversation,
}) => {
  return (
    <Flex>
      {contact.nickname}
      <Avatar name={contact.nickname} src={contact.avatar} />
      <Button onClick={onStartConversation}>发消息</Button>
    </Flex>
  );
}