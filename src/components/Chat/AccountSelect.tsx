import React from 'react'
import { IMAccount } from '@uimkit/uikit-react';
import { HStack, Button, Menu, MenuButton, MenuList, MenuItem, Avatar } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

export type AccountSelectProps = {
  activeAccount?: IMAccount;
  accounts?: IMAccount[];
  onSelect?: (account: IMAccount) => void;
}

export const AccountSelect: React.FC<AccountSelectProps> = ({ 
  activeAccount,
  accounts,
  onSelect,
}) => {
  return (
    <Menu onSelect={onSelect}>
      <MenuButton as={Button}>
        <HStack spacing="12px">
          { activeAccount ? (
            <>
              <Avatar boxSize="2rem" name={activeAccount.nickname} src={activeAccount.avatar}/>
              <span style={{ overflow: 'hidden', maxWidth: '160px' }}>{activeAccount.nickname} ({activeAccount.presence === 'active' ? '在线' : '离线'})</span>
            </>
          ) : <span>全部账号</span>}
          <ChevronDownIcon />
        </HStack>      
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => onSelect?.(undefined)}>
          <HStack spacing="12px">
            <span>全部账号</span>
          </HStack>
        </MenuItem>
        {accounts?.map(account => (
          <MenuItem key={account.id} onClick={() => onSelect?.(account)}>
            <HStack spacing="12px">
              <Avatar boxSize="2rem" name={account.nickname} src={account.avatar}/>
              <span>{account.nickname} ({account.presence === 'active' ? '在线' : '离线'})</span>
            </HStack>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>    
  );
}