// import { useUser } from '@authok/nextjs-authok/client';
import { Container } from '@chakra-ui/react';

export function Layout({ children }) {
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