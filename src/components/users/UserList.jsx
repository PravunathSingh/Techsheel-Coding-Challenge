import React, { useState, useEffect, useContext } from 'react';
import User from './User';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import { Users } from '../../context/usersContext';
import CircularProgress from '@mui/material/CircularProgress';

const UserList = ({ allUsers }) => {
  const usersCtx = useContext(Users);

  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    usersCtx.getNewUsers(allUsers.length * 2);
    setIsFetching(false);
  }, [isFetching]);

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setIsFetching(true);
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
