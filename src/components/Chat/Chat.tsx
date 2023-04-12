'use client'
import { useEffect, useState } from 'react';
import { 
  Provider,
  useUIKit, 
  Profile,
  APIClient, 
  IMAccount, 
  UIChat, 
  UIGroupList, 
  UIContactList, 
  UIConversationList, 
  UIGroupMemberList, 
  UIKit,
  UIChatHeader,
  VirtualizedMessageList,
  UIMessageInput,
  UIMomentList,
  Contact,
  useConversation,
  ConversationType,
} from '@uimkit/uikit-react';
import { AccountSelect } from './AccountSelect';
import '@uimkit/uikit-react/dist/cjs/index.css';
import {
  IconButton,
  HStack,
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  VStack,
  Divider,
} from '@chakra-ui/react';
import { ContactDetails } from './ContactDetails';
import { ProviderList } from './ProviderList';
import { SettingsPopover } from './SettingsPopover';
import { ContactSidebar } from '../ContactSidebar';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { MarketIcon, SideBarShowIcon, MomentIcon } from '../Icons'
import Logo from '@/assets/logo.png';
import Image from 'next/image'

export type ChatProps = {
  accessToken: string;
}

export function Chat({ 
  accessToken
}: ChatProps) {
  const [client, setClient] = useState<APIClient | undefined>();
  const [activeAccount, setActiveAccount] = useState<IMAccount | undefined>(undefined);

  useEffect(() => {
    (async function() {
      const UIMClient = (await import('@uimkit/uim-js')).default;

      const client = new UIMClient(accessToken, {
        subscribeKey: process.env.NEXT_PUBLIC_SUBSCRIBE_KEY,
        publishKey: process.env.NEXT_PUBLIC_PUBLISH_KEY,
        secretKey: process.env.NEXT_PUBLIC_SECRET_KEY,
      });
      setClient(client as unknown as APIClient);
    })();
  }, [accessToken]);

  return client ? (
    <UIKit client={client} activeProfile={activeAccount}>
      <ChatContainer activeAccount={activeAccount} setActiveAccount={setActiveAccount} />
    </UIKit>
  ) : null;
}

export type ChatContainerProps = {
  activeAccount?: IMAccount;
  setActiveAccount: (account: IMAccount) => void;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  activeAccount,
  setActiveAccount,
}) => {
  const { client, activeConversation, setActiveConversation } = useUIKit();

  const [accounts, setAccounts] = useState<IMAccount[]>();
  const [activeContact, setActiveContact] = useState<Contact>();

  const handleSelectContact = (contact: Contact) => {
    setActiveContact(contact);
    setActiveConversation(undefined);
  };

  useEffect(() => {
    if (client) {
      (async function() {
        const r = await client?.getAccountList({
          subscribe: true,
        });
        setAccounts(r.data);
      })();
    }
  }, [client]);

  const handleChangeAccount = (account: IMAccount) => {
    setActiveAccount(account);
  }
  
  const [activeMomentProfile, setActiveMomentProfile] = useState<Profile | undefined>(undefined);

  const [tabIndex, setTabIndex] = useState(0);

  const { 
    createConversation
  } = useConversation();

  const handleStartConversation = async () => {
    if (!activeContact) return;

    // TODO 查找会话, 没有就创建
    // 设置会话
    const conversation = await createConversation(activeContact.id);
    setActiveConversation(conversation);
    setActiveContact(undefined);
    setTabIndex(0);
  }

  const [activeProvider, setActiveProvider] = useState<Provider | undefined>(undefined);

  const handleSelectProvider = (provider: Provider) => {
    setActiveProvider(provider);
  }

  const [showSider, setShowSider] = useState<boolean>(false);

  return (
    <Flex
      w="100%"
      h="full"
    >
      <VStack w="72px" direction="column" p='2' spacing="0">
        <Box pt='4' pb='4'>
          <Image src={Logo} width={32} height={32} alt="logo" />
        </Box>
        <Divider />
        <Box pt='4'>
          <ProviderList onSelect={handleSelectProvider}/>
        </Box>
        <Flex direction="column" flex={1} justifyContent="end">
          <VStack spacing='12px'>
            <IconButton icon={<MarketIcon />} />
            <ColorModeSwitcher />
            <SettingsPopover />
          </VStack>
        </Flex>
      </VStack>
      <VStack spacing="12px" w="300px" alignItems='flex-start'>
        <Box p='4'>
          <AccountSelect activeAccount={activeAccount} accounts={accounts} onSelect={handleChangeAccount} />
        </Box>
        <Tabs variant='soft-rounded' colorScheme='green' onChange={(index) => setTabIndex(index)} index={tabIndex}>
          <TabList>
            <Tab>会话</Tab>
            <Tab>联系人</Tab>
            <Tab>群</Tab>
          </TabList>
          <TabPanels>
            <TabPanel p="0" h='85vh'>
              <UIConversationList activeProfile={activeAccount} />
            </TabPanel>
            <TabPanel p="0" h='85vh'>
              <UIContactList activeContact={activeContact} setActiveContact={handleSelectContact}/>
            </TabPanel>
            <TabPanel p="0" h='85vh'>
              <UIGroupList activeProfile={activeAccount} />
            </TabPanel>
          </TabPanels>  
        </Tabs>
      </VStack>
      <Box flex='1'>
        {activeConversation && (
          <HStack h='full'>
            <UIChat>
              <UIChatHeader
                pluginComponentList={[
                  <div key="moment" className="input-plugin-item" onClick={() => setActiveMomentProfile(activeConversation?.contact)}>
                    <MomentIcon />
                  </div>,
                  <div key="sider" className="input-plugin-item" onClick={() => setShowSider(!showSider)}>
                    <SideBarShowIcon />
                  </div>,
                ]}
              />
              <VirtualizedMessageList />
              <UIMessageInput />
            </UIChat>
            {activeConversation.type === ConversationType.Group && <UIGroupMemberList />}
            {activeConversation.type !== ConversationType.Group && activeConversation.contact && showSider && (
              <ContactSidebar contact={activeConversation.contact} />
            )}
          </HStack>
        )}
        {activeContact && !activeConversation && (
          <ContactDetails contact={activeContact} onStartConversation={handleStartConversation} />
        )}

        <Drawer
          isOpen={!!activeMomentProfile}
          onClose={() => setActiveMomentProfile(undefined)}
          placement='right'
        >
          <DrawerOverlay />
          <DrawerContent>
            <UIMomentList profile={activeMomentProfile} />
          </DrawerContent>
        </Drawer>
      </Box>
    </Flex>
  );
}