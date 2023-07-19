import React from 'react'
import { getCookie } from 'cookies-next'; 
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { getUserDetails } from '../../src/api/auth/signin';
import Cookies from 'js-cookie';
import Header from '../../src/components/Header/header';
import { Box, Container, IconButton } from '@mui/material';

interface IndexProps {
  userDetails: any; // Update 'any' with the type of your user details object
}

const Index: React.FC<IndexProps> = ({ userDetails }) => {
  // You can extract the userEmail from the userDetails object, assuming it has an 'email' property
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
}

export default Index;

const extractHeadersForServer = (req: any) => {
  const tokenValue = getCookie('auth_token', { req });
  return { "auth_token": tokenValue }; // Format the Authorization header
};

export async function getServerSideProps(context: any) {
  const headers = extractHeadersForServer(context.req);
  const userDetails = await getUserDetails(headers);

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
}
