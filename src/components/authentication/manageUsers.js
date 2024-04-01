import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import { useNavigate } from 'react-router-dom';

function ManageUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([
    { id: 1, username: 'kranthi', role: 'Student', enabled: true },
    { id: 2, username: 'atef', role: 'Faculty', enabled: true },
    { id: 3, username: 'bader', role: 'Staff', enabled: false },
    { id: 4, username: 'john', role: 'Moderator', enabled: true },
    { id: 5, username: 'harsha', role: 'Student', enabled: false },
  ]); // State to store the list of users

  useEffect(() => {
    // Load users from localStorage on component mount
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    if (storedUsers) {
      setUsers(storedUsers);
    }
  }, []); 

  const handleToggleUser = (id) => {
    // Toggle user enabled state
    const updatedUsers = users.map(user =>
      user.id === id ? { ...user, enabled: !user.enabled } : user
    );
    setUsers(updatedUsers);
  };

  const handleSave = () => {
    // Save updated users list to localStorage
    localStorage.setItem('users', JSON.stringify(users));
  };

  const handleBack = () => {
    // Navigate back to the previous page
    navigate('/');
  };

  return (
    <Box textAlign="center" marginTop={8}>
      <Typography variant="h4" gutterBottom>
        Manage Users
      </Typography>
      <TableContainer component={Paper} sx={{ width: '60%', margin: 'auto', mt: 10, mb: 10 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">Username</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">Role</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">Enable/Disable</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Switch
                    color="primary"
                    checked={user.enabled}
                    onChange={() => handleToggleUser(user.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" onClick={handleSave} sx={{ mr: 2 }}>
        Save
      </Button>
      <Button variant="outlined" onClick={handleBack}>
        Back
      </Button>
    </Box>
  );
}

export default ManageUsers;
