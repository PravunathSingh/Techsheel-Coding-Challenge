import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Users } from '../../context/usersContext';
import UserList from './UserList';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';

const AllUsers = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const usersCtx = useContext(Users);
  const allUsers = usersCtx.users;

  const searchHandler = (e) => {
    console.log(e.target.value);
    setSearchTerm(e.target.value);
    if (searchTerm !== '') {
      const filteredUsers = allUsers.filter((user) => {
        return Object.values(user)
          .join(' ')
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(filteredUsers);
    } else {
      setSearchResults(allUsers);
    }
  };

  const searchFormHandler = (e) => {
    e.preventDefault();
    setSearchTerm('');
  };

  return (
    <div>
      <Container maxWidth='lg'>
        <Box mt={8} mb={12}>
          <Grid container spacing={4} direction='row' alignItems='center'>
            <Grid item lg={4} sm={12}>
              <Typography variant='h4' component='h4'>
                All Users
              </Typography>
            </Grid>

            <Grid item lg={4} sm={12}>
              <form>
                <TextField
                  id='outlined-basic'
                  label='Search User'
                  variant='outlined'
                  fullWidth
                  onChange={searchHandler}
                  value={searchTerm}
                />
              </form>
            </Grid>

            <Grid item lg={4} sm={12}>
              <Link to='/add'>
                <Button size='medium' variant='contained' fullWidth p={4}>
                  Add New User
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Box>

        <UserList allUsers={searchTerm.length < 1 ? allUsers : searchResults} />
      </Container>
    </div>
  );
};

export default AllUsers;
