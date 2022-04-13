import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Button, Container, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = () => {
  const [editUser, setEditUser] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });

  const { id } = useParams();
  const history = useNavigate();

  useEffect(() => {
    const getUserDetails = async () => {
      const config = {
        headers: {
          'app-id': '6256983a2fbcea61ae39fe8e',
        },
      };
      const res = await axios.get(
        `https://dummyapi.io/data/v1/user/${id}`,
        config
      );
      const resData = res.data;

      setEditUser({
        firstName: `${resData.firstName}`,
        lastName: `${resData.lastName}`,
        phone: resData.phone,
      });
    };

    getUserDetails();
  }, []);

  const editUserHandler = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const edit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'app-id': '6256983a2fbcea61ae39fe8e',
      },
    };

    const body = {
      firstName: editUser.firstName,
      lastName: editUser.lastName,
      phone: editUser.phone,
    };

    const res = await axios.put(
      `https://dummyapi.io/data/v1/user/${id}`,
      body,
      config
    );

    setEditUser({
      firstName: '',
      lastName: '',
      phone: '',
    });

    // console.log(res.data);
    history('/', { replace: true });
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
        Edit User Details
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
              <form onSubmit={edit}>
                <Typography mb={3}>
                  <TextField
                    id='outlined-basic'
                    label='First Name'
                    variant='outlined'
                    fullWidth
                    name='firstName'
                    onChange={editUserHandler}
                    value={editUser.firstName}
                  />
                </Typography>

                <Typography my={3}>
                  <TextField
                    id='outlined-basic'
                    label='Last Name'
                    variant='outlined'
                    fullWidth
                    name='lastName'
                    onChange={editUserHandler}
                    value={editUser.lastName}
                  />
                </Typography>

                <Typography>
                  <TextField
                    id='outlined-basic'
                    label='Phone'
                    variant='outlined'
                    fullWidth
                    name='phone'
                    onChange={editUserHandler}
                    value={editUser.phone}
                  />
                </Typography>
              </form>
            </CardContent>

            <CardActions>
              <Button variant='contained' fullWidth onClick={edit}>
                Submit
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditUser;
