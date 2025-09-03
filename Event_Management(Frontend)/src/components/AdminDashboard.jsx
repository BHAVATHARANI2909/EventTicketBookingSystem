// AdminDashboard.js
import { useEffect, useState } from 'react';
import {
  Box, Typography, Paper, TextField,
  Button, Stack
} from '@mui/material';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get('http://localhost:8080/getAllUser');
        setUsers(userRes.data || []);
      } catch (err) {
        console.error('Failed to load admin data:', err);
      }
    };
    fetchData();
  }, []);

  // 🔎 Filtering logic
  const filterData = (data) => {
    return data.filter((item) => {
      const q = search.toLowerCase();
      const matchesSearch =
        item.username?.toLowerCase().includes(q) ||
        item.email?.toLowerCase().includes(q);

      const matchesUsername = username ? item.username?.toLowerCase().includes(username.toLowerCase()) : true;
      const matchesEmail = email ? item.email?.toLowerCase().includes(email.toLowerCase()) : true;
      const matchesNumber = number ? item.number?.toString().includes(number) : true;

      return matchesSearch && matchesUsername && matchesEmail && matchesNumber;
    });
  };

  // 📄 Export PDF
  const exportPDF = (data) => {
    const doc = new jsPDF();
    const title = 'User Details';
    const headers = ['Username', 'Email', 'Number', 'Card No', 'Expire Date', 'CVV'];

    const rows = data.map((item) => [
      item.username,
      item.email,
      item.number,
      item.cardno,
      item.expriedate,
      item.cvv,
    ]);

    doc.text(title, 14, 10);
    doc.autoTable({ head: [headers], body: rows });
    doc.save(`${title}.pdf`);
  };

  // 📦 Cards layout
  const CardsGrid = ({ data }) => (
    <Box
      sx={{
        mt: 2,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 6,
        alignItems: 'stretch',
      }}
    >
      {data.map((item, idx) => (
        <Paper
          key={item.id ?? idx}
          elevation={3}
          className="glass-card"
          sx={{ p: 2, width: '100%', height: '100%' }}
        >
          <Typography variant="h6" color="purple" fontWeight="bold" mb={1}>
            {idx + 1}. {item.username}
          </Typography>
          <Typography >Email: {item.email}</Typography>
          <Typography>Number: {item.number}</Typography>
          <Typography>Card No: {item.cardno}</Typography>
          <Typography>Expire Date: {item.expriedate}</Typography>
          <Typography>CVV: {item.cvv}</Typography>
        </Paper>
      ))}
    </Box>
  );

  const filteredUsers = filterData(users);

  return (
    <Box p={4} className="admin-dashboard-bg" sx={{ backgroundImage: 'url(.jpg)', backgroundSize: 'cover' }}>
      <Typography variant="h4" gutterBottom textAlign="center" color='purple' fontWeight="bold"> 
        Dashboard
      </Typography>

      {/* Filters */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={2} mb={3}>
        <TextField
          label="Search by Username or Email"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
         InputLabelProps={{ style: { color: 'purple' } }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "purple" },
              "&:hover fieldset": { borderColor: "darkred" },
              "&.Mui-focused fieldset": { borderColor: "purple" }
            }
          }}
        />
        <TextField
          label="Filter Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
           InputLabelProps={{ style: { color: 'purple' } }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "purple" },
              "&:hover fieldset": { borderColor: "darkred" },
              "&.Mui-focused fieldset": { borderColor: "purple" }
            }
          }}
        />
        <TextField
          label="Filter Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputLabelProps={{ style: { color: 'purple' } }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "purple" },
              "&:hover fieldset": { borderColor: "darkred" },
              "&.Mui-focused fieldset": { borderColor: "purple" }
            }
          }}
        />
        <TextField
          label="Filter Number"
          variant="outlined"
          fullWidth
          value={number}
          onChange={(e) => setNumber(e.target.value)}
         InputLabelProps={{ style: { color: 'purple' } }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "purple" },
              "&:hover fieldset": { borderColor: "darkred" },
              "&.Mui-focused fieldset": { borderColor: "purple" }
            }
          }}
        />
      </Stack>

      {/* User Section */}
      <Box mb={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" color='purple'>Users</Typography>
          <Stack direction="row" spacing={1}>
           
          </Stack>
        </Stack>
        <CardsGrid data={filteredUsers} />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
