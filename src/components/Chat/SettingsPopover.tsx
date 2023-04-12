import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { SettingsIcon } from "@chakra-ui/icons";
import Link from 'next/link';

export type SettingsPopoverProps = {
};

export const SettingsPopover: React.FC<SettingsPopoverProps> = ({
}) => {
  return (
    <Menu>
      <MenuButton>
        <IconButton icon={<SettingsIcon/>}/>
      </MenuButton>
      <MenuList>
        <Link href="/api/auth/logout">
          <MenuItem>
              退登
          </MenuItem>
        </Link>
        <MenuItem>
          关于
        </MenuItem>
      </MenuList>
    </Menu>
  );
};