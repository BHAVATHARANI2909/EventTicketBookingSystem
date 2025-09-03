import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [data, setData] = useState({ username: "", password: "" });
  const [users, setUsers] = useState([]);
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });

  const handleClose = () => setSnack({ ...snack, open: false });

  useEffect(() => {
    fetch("http://localhost:8080/getAllLogin")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  const handleLogin = () => {
    const found = users.find(
      (user) => user.username === data.username && user.password === data.password
    );

    if (found) {
      setSnack({ open: true, message: "Successfully Logged In!", severity: "success" });
      setTimeout(() => navigate("/dashboard"), 1500);
    } else {
      setSnack({ open: true, message: "Invalid Credentials", severity: "error" });
    }
  };

  return (
    <Container maxWidth={false} className="login-bg">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="login-box"
      >

        <Typography variant="h4" className="login-title">
          Login
        </Typography>

        <TextField
          InputLabelProps={{ style: { color: 'purple' } }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "purple" },
              "&:hover fieldset": { borderColor: "darkred" },
              "&.Mui-focused fieldset": { borderColor: "purple" }
            }
          }}
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />

        <TextField
          InputLabelProps={{ style: { color: 'purple' } }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "purple" },
              "&:hover fieldset": { borderColor: "darkred" },
              "&.Mui-focused fieldset": { borderColor: "purple" }
            }
          }}
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <Typography variant="body2" align="center" sx={{ my: 1 }} style={{ color: "#000000ff" }}>
          Don’t have an account?{" "}
          <Link to="/register" className="login-link">
            Register
          </Link>
        </Typography>

        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          sx={{
            mt: 2,
            fontWeight: "bold",
            bgcolor: "#9c27b0", // purple
            "&:hover": { bgcolor: "#7b1fa2" } // darker purple on hover
          }}
        >
          Login
        </Button>


      </motion.div>

      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snack.severity}
          onClose={handleClose}
          variant="filled"
          sx={{
            width: "100%",
            backgroundColor: snack.severity === "error" ? "red !important" : "purple !important"
          }}
        >
          {snack.message}
        </Alert>

      </Snackbar>
    </Container>
  );
}
