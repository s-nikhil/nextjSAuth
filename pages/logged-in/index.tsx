import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { NextApiRequest } from 'next';
import { getCookie, CookieValueTypes } from 'cookies-next';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { getUserDetails } from '../../src/api/auth/signin';
import Cookies from 'js-cookie';
import Header from '../../src/components/Header/header';
import { Box, Container, IconButton } from '@mui/material';

interface UserDetails {
  email: string;
}

interface IndexProps {
  userDetails: UserDetails | null;
}

interface CustomNextApiRequest extends NextApiRequest {
  cookies: Partial<{ [key: string]: string }>;
}

const Index: NextPage<IndexProps> = ({ userDetails }) => {
  const userEmail = userDetails?.email || null;

  return (
    <Header userEmail={userEmail}>
      <Container maxWidth="lg">
        <Box
          sx={{
            my: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="private"
          >
            <LockPersonIcon />
          </IconButton>
        </Box>
      </Container>
    </Header>
  );
};

export default Index;

const extractHeadersForServer = (req: CustomNextApiRequest): Record<string, string> => {
  const tokenValue = getCookie('auth_token', { req }) as CookieValueTypes;
  return { auth_token: typeof tokenValue === 'string' ? tokenValue : '' };
};

export const getServerSideProps: GetServerSideProps<IndexProps> = async (context) => {
  const req = context.req as CustomNextApiRequest;
  const headers = extractHeadersForServer(req);
  const userDetails: UserDetails | null = await getUserDetails(headers);

  if (!userDetails) {
    Cookies.remove('auth_token');
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    };
  }

  return {
    props: {
      userDetails,
    },
  };
};
