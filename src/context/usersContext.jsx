import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const Users = createContext({
  users: [],
  usersLength: 0,
  addUser: (user) => {},
  deleteUser: (id) => {},
  getNewUsers: (limit) => {},
});

const UsersProvider = ({ children }) => {
  const [usersLength, setUsersLength] = useState(null);

  const [users, setUsers] = useState([]);

  const addUser = async (user) => {
    const config = {
      headers: {
        'app-id': '6253cf9bb834d5b0ba49be8f',
      },
    };

    setUsers([...users, user]);

    const res = await axios.post(
      'https://dummyapi.io/data/v1/user/create',
      user,
      config
    );
    console.log(res.data);
  };

  const deleteUser = async (id) => {
    const config = {
      headers: {
        'app-id': '6253cf9bb834d5b0ba49be8f',
      },
    };

    const res = await axios.delete(
      `https://dummyapi.io/data/v1/user/${id}`,
      config
    );
    // console.log(res.data);
    const filteredUsers = users.filter((user) => user.id !== id);
    setUsers(filteredUsers);
  };

  useEffect(() => {
    const getUsers = async () => {
      const config = {
        headers: {
          'app-id': '6253cf9bb834d5b0ba49be8f',
        },
      };
      const res = await axios.get(
        `https://dummyapi.io/data/v1/user?limit=6`,
        config
      );
      const resData = res.data;
      // console.log(resData.data);
      setUsers(resData.data);
      setUsersLength(users.length);
    };

    getUsers();
  }, []);

  const getNewUsers = async (limit) => {
    const config = {
      headers: {
        'app-id': '6253cf9bb834d5b0ba49be8f',
      },
    };
    const res = await axios.get(
      `https://dummyapi.io/data/v1/user?limit=${limit}`,
      config
    );
    const resData = res.data;
    console.log(resData.data);
    setUsers(resData.data);
    setUsersLength(users.length);

    if (limit >= 55) {
      setUsersLength(null);
    }
  };

  const usersValue = {
    users: users,
    usersLength: usersLength,
    addUser: addUser,
    deleteUser: deleteUser,
    getNewUsers: getNewUsers,
  };

  return <Users.Provider value={usersValue}>{children}</Users.Provider>;
};

export default UsersProvider;
