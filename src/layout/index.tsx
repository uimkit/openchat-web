import { Container } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode
}
export function Layout({ children }: Props) {
  return (
    <Container
      m={0}
      p={0}
      maxW="none"
      minH="full"
      maxH="100vh"
      h="full"
      display="flex"
      justifyContent="start"
      alignItems="stretch"
      flexDir="row"
    >
      {children}
    </Container>
  );
  
  /*
  return (
    <Box>
      <Grid p={3}>
        <HStack justifySelf="flex-end">
          {user ? (
            <a href="/api/auth/logout">注销</a>
          ): (
            <a href="/api/auth/login">登录</a>
          )}
          <ColorModeSwitcher />
        </HStack>
      </Grid>
      <main>
        {children}
      </main>
    </Box>
  );*/
}