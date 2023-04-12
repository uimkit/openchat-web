import { useMemo, useState } from "react";
import {
  Provider,
} from '@uimkit/uikit-react';
import {
  Avatar,
  VStack,
  IconButton,
} from '@chakra-ui/react';
import { AddIcon } from "@chakra-ui/icons"
import { CreateAccountModal } from "../CreateAccountModal";

export type ProviderListProps = {
  onSelect?: (provider: Provider) => void;
}

export const ProviderList: React.FC<ProviderListProps> = ({
  onSelect,
}) => {
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
  ], []);

  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <VStack spacing='12px'>
        {providers?.map(provider => (
          <div key={provider.identifier} onClick={() => onSelect?.(provider)}>
            <Avatar w='36px' h='36px' name={provider.name} src={provider.icon}/>
          </div>
        ))}
        <IconButton aria-label="添加账号" onClick={() => setOpen(true)} icon={<AddIcon />}/>
      </VStack>
      <CreateAccountModal isOpen={open} onClose={() => setOpen(false)}/>
    </>
  );
};