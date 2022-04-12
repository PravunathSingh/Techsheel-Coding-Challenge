import React, { useState, useEffect, useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Users } from '../../context/usersContext';
import { Link } from 'react-router-dom';

const User = ({ user }) => {
  const [userDetails, setUserDetails] = useState({});
  const userCtx = useContext(Users);

  useEffect(() => {
    const getUserDetails = async () => {
      const config = {
        headers: {
          'app-id': '6253cf9bb834d5b0ba49be8f',
        },
      };

      const res = await axios.get(
        `https://dummyapi.io/data/v1/user/${user.id}`,
        config
      );

      const resData = res.data;
      // console.log(resData);
      setUserDetails(resData);
    };

    getUserDetails();
  }, []);

  const deleteUser = () => {
    userCtx.deleteUser(user.id);
  };

  return (
    <Grid item lg={4} sm={12} mb={4}>
      <Card sx={{ maxWidth: 350 }} elevation={5}>
        <CardMedia
          component='img'
          height='200'
          alt='userImage'
          image={`${user.picture}`}
        />
        <CardContent>
          {(userDetails.firstName && userDetails.lastName) === undefined ? (
            <Skeleton variant='text' />
          ) : (
            <Typography gutterBottom variant='h4' component='div'>
              {`${userDetails.firstName} ${userDetails.lastName}`}
            </Typography>
          )}

          {userDetails.email === undefined ? (
            <Skeleton variant='text' />
          ) : (
            <Typography variant='h6' color='text.secondary'>
              {userDetails.email}
            </Typography>
          )}

          {userDetails.phone === undefined ? (
            <Skeleton variant='text' />
          ) : (
            <Typography variant='h6' color='text.secondary'>
              {userDetails.phone}
            </Typography>
          )}
        </CardContent>
        <CardActions disableSpacing>
          <Link to={`/edit/${user.id}`}>
            <IconButton aria-label='add to favorites'>
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton aria-label='share' onClick={deleteUser}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default User;
