import React, { useState, useEffect, useContext } from 'react';
import User from './User';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import { Users } from '../../context/usersContext';
import CircularProgress from '@mui/material/CircularProgress';

const UserList = ({ allUsers }) => {
  const usersCtx = useContext(Users);

  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isBottom) {
      usersCtx.getNewUsers(allUsers.length + 10);
      setIsBottom(false);
    }
  }, [isBottom]);

  function handleScroll() {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    if (scrollTop + window.innerHeight + 50 >= scrollHeight) {
      setIsBottom(true);
    }
  }

  const usersList = allUsers.map((user) => {
    return <User key={user.id} user={user} />;
    // console.log(user);
  });
  return (
    <Box>
      <Grid container spacing={4} direction='row' alignItems='center'>
        {usersList}
      </Grid>

      {usersCtx.usersLength !== null && (
        <Box mb={8} mt={8} sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default UserList;
