import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Avatar,
  Button,
  Text,
  useToast,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import {
  Provider,
  useUIKit,
} from '@uimkit/uikit-react';
import { useMemo } from 'react';
import UIMClient from '@uimkit/uim-js';



type CreateAccountModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
}

export const CreateAccountModal: React.FC<CreateAccountModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { client } = useUIKit('CreateAccountModal');

  const providers = useMemo(() => [
    {
      icon: 'https://scrm-uploads-1252461817.cos.ap-guangzhou.myqcloud.com/authok/assets/wechat.svg',
      name: '微信',
      identifier: 'wechat',
    },
    {
      icon: 'https://scrm-uploads-1252461817.cos.ap-guangzhou.myqcloud.com/authok/assets/wework.svg',
      name: '企业微信',
      identifier: 'wework',
    },
    {
      name: '小程序客服',
      icon: 'https://scrm-uploads-1252461817.cos.ap-guangzhou.myqcloud.com/authok/assets/wechat.svg',
      identifier: 'mini_kefu'  
    },
    {
      icon: 'https://scrm-uploads-1252461817.cos.ap-guangzhou.myqcloud.com/authok/assets/wechat.svg',
      name: '公众号',
      identifier: 'wpub',
    },
    {
      icon: 'https://cdn.authok.cn/market/catalog/assets/connections/social/douyin.svg',
      name: '抖音客服',
      identifier: 'douyin',
    },
    {
      icon: 'http://p0.ssl.qhimg.com//dm/72_72_100/t0105dd3fba0f5c3c5c.png',
      name: '钉钉',
      identifier: 'dingtalk',
    },
    {
      icon: '',
      name: '美洽',
      identifier: 'meiqia',
    },
    {
      icon: '',
      name: '网易七鱼',
      identifier: 'qiyu',
    },
    {
      icon: '',
      name: 'Discord',
      identifier: 'discord',
    },
    {
      icon: '',
      name: 'Telegram',
      identifier: 'telegram',
    },
    {
      icon: '',
      name: 'Facebook Messenger',
      identifier: 'messenger',
    },
    {
      icon: '',
      name: 'WhatsApp',
      identifier: 'whatsapp',
    },
    {
      icon: '',
      name: 'Line',
      identifier: 'line',  
    },
    {
      icon: '',
      name: 'Kakao',
      identifier: 'kakao',  
    },
    {
      icon: '',
      name: 'Zalo',
      identifier: 'zalo',  
    }
  ], []);

  const toast = useToast()

  const handleAddAccount = (provider: Provider) => {
    const c = (client as UIMClient);
    c.authorize(provider.identifier, (id) => {
      toast({
        title: '账号添加成功.',
        description: "账号添加成功.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>添加账号</ModalHeader>
        <ModalCloseButton />
        <ModalBody as={Wrap} spacing={4}>
          {providers.map(provider => (
            <WrapItem 
              key={provider.identifier} 
              as={Button} 
              alignItems="center" 
              variant="outline"
              style={{ width: '180px', height: '180px' }}
              whiteSpace={'normal'}
            >
              <VStack>
                <Avatar name={provider.name} src={provider.icon} w='64px' h='64px' />
                <Text>{provider.name}</Text>
                <Button colorScheme='whatsapp' onClick={() => handleAddAccount(provider)}>添加账号</Button>
              </VStack>
            </WrapItem>
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};