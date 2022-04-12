import React, { useState, useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Users } from '../../context/usersContext';
import { Button, Container, Grid, TextField } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const [addUserForm, setAddUserForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const usersCtx = useContext(Users);
  // const history = useNavigate();

  const addUserHandler = (e) => {
    setAddUserForm({ ...addUserForm, [e.target.name]: e.target.value });
  };

  const addUser = (e) => {
    e.preventDefault();
    usersCtx.addUser(addUserForm);
    setAddUserForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    });
    // history('/', { replace: true });
  };

  return (
    <Container maxWidth='lg'>
      <Typography
        gutterBottom
        variant='h4'
        component='div'
        textAlign='center'
        mt={8}
        mb={4}
      >
        Add New User
      </Typography>

      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justify='center'
      >
        <Grid item xs={3}>
          <Card sx={{ maxWidth: 500 }} elevation={5}>
            <CardContent>
              <form onSubmit={addUser}>
                <Typography mb={3}>
                  <TextField
                    id='outlined-basic'
                    label='First Name'
                    variant='outlined'
                    fullWidth
                    name='firstName'
                    onChange={addUserHandler}
                    value={addUserForm.firstName}
                  />
                </Typography>

                <Typography my={3}>
                  <TextField
                    id='outlined-basic'
                    label='Last Name'
                    variant='outlined'
                    fullWidth
                    name='lastName'
                    onChange={addUserHandler}
                    value={addUserForm.lastName}
                  />
                </Typography>

                <Typography mb={3}>
                  <TextField
                    id='outlined-basic'
                    label='Email'
                    variant='outlined'
                    fullWidth
                    name='email'
                    onChange={addUserHandler}
                    value={addUserForm.email}
                    type='email'
                  />
                </Typography>

                <Typography>
                  <TextField
                    id='outlined-basic'
                    label='Phone'
                    variant='outlined'
                    fullWidth
                    name='phone'
                    onChange={addUserHandler}
                    value={addUserForm.phone}
                  />
                </Typography>
              </form>
            </CardContent>

            <CardActions>
              <Button variant='contained' fullWidth onClick={addUser}>
                Add User
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddUser;
