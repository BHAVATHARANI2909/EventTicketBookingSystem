import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const menuItems = [];

  return (
    <AppBar position="sticky" className="navbar-glass">
      <Toolbar>

        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: 'bold', color: 'purple' }}
        >
          Event TicketBooking
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {menuItems.map((item) => (
            <Button
              key={item}
              component={Link}
              to={`/${item.replace(/\s+/g, '').toLowerCase()}`}
              sx={{
                color: 'purple',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: 'rgba(248, 8, 248, 0.1)',
                },
              }}
              className="nav-link"
            >
              {item}
            </Button>
          ))}

          {/* Admin Login Button */}
          <Button
            variant="outlined"
            onClick={() => navigate('/admin')}
            sx={{
              color: 'purple !important',      // Force text color
              borderColor: 'purple',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: 'rgba(128, 0, 128, 0.1)',
                borderColor: 'purple',
              },
            }}
            className="nav-link"
          >
            Admin Login
          </Button>

        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
