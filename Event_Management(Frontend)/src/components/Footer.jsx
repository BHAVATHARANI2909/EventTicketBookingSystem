import { Box, Grid, Typography, IconButton, Link } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';

export default function Footer() {
  return (
    <Box
      sx={{
        mt: 8,
        px: { xs: 4, md: 12 },
        py: 6,
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(10px)",
        color: "white",
        borderTop: "2px solid #e102ffff",
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box display="flex" alignItems="center" mb={1}>
            <Typography variant="h6" fontWeight="bold" color="purple">
              Event TicketBooking
            </Typography>
          </Box>
          <Typography variant="body2" color="purple">
            Where every booking becomes a memory
          </Typography>
        </Grid>

      
        <Grid item xs={12} md={4}>
          <Typography variant="h6" fontWeight="bold" mb={1} color="purple" marginLeft={"525px"}>
            Contact Us
          </Typography>
          <Typography variant="body2" color="black" marginLeft={"500px"}>📍 Chennai, India</Typography>
          <Typography variant="body2" color="black" marginLeft={"500px"}>📞 +91-</Typography>
          <Typography variant="body2" color="black" marginLeft={"500px"}>📧 </Typography>

          <Box mt={2}>
            <IconButton sx={{ color: "white" }}><FacebookIcon /></IconButton>
            <IconButton sx={{ color: "white" }}><InstagramIcon /></IconButton>
            <IconButton sx={{ color: "white" }}><TwitterIcon /></IconButton>
          </Box>
        </Grid>
      </Grid>

      <Box textAlign="center" mt={5} fontSize="14px" color="#ccc">
        © {new Date().getFullYear()}All rights reserved.
      </Box>
    </Box>
  );
}
