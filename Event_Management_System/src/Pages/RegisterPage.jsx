import {
  Button,
  Container,
  Paper,
  Snackbar,
  TextField,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import './RegisterPage.css';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    otp: ""
  });

  const [sentOtp, setSentOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: "" });
  const [resendCountdown, setResendCountdown] = useState(0);

  const handleClose = () => setSnack({ ...snack, open: false });

  useEffect(() => {
    if (resendCountdown === 0) return;
    const timer = setTimeout(() => {
      setResendCountdown(resendCountdown - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  const generateOTP = () => {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    setSentOtp(otp);
    setIsOtpSent(true);
    setResendCountdown(10);
    setSnack({ open: true, message: `OTP sent: ${otp}` });
  };

  const verifyOtp = () => {
    if (formData.otp === sentOtp) {
      setIsPhoneVerified(true);
      setSnack({ open: true, message: "Phone verified successfully!" });
    } else {
      setSnack({ open: true, message: "Invalid OTP" });
    }
  };

  const saveUser = async () => {
    if (!isPhoneVerified) {
      setSnack({ open: true, message: "Please verify phone number first." });
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/saveLogin", {
        method: "POST",
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          email: formData.email,
          phone: formData.phone
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (res.ok) {
        setSnack({ open: true, message: "Successfully Registered" });
        setFormData({
          username: "",
          email: "",
          phone: "",
          password: "",
          otp: ""
        });
        setIsPhoneVerified(false);
        setIsOtpSent(false);
        setSentOtp("");
      } else {
        setSnack({ open: true, message: "Registration Failed" });
      }
    } catch (err) {
      console.error(err);
      setSnack({ open: true, message: "Server Error" });
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      className="register-bg"
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Paper
            elevation={10}
            sx={{
              bgcolor: "#fff !important",   // ✅ force white
              backgroundColor: "#fff !important",
              padding: 4,
              borderRadius: 3,
              borderLeft: "5px solid purple",
              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)"
            }}
          >

            <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
              <Typography variant="h4" fontWeight="bold" color="purple" >
                User Registration
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Full Name"
                  fullWidth
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  InputLabelProps={{ style: { color: 'purple' } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "purple" },
                      "&:hover fieldset": { borderColor: "darkred" },
                      "&.Mui-focused fieldset": { borderColor: "purple" }
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  InputLabelProps={{ style: { color: 'purple' } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "purple" },
                      "&:hover fieldset": { borderColor: "darkred" },
                      "&.Mui-focused fieldset": { borderColor: "purple" }
                    }
                  }}
                />
              </Grid>

              <Grid item xs={8}>
                <TextField
                  label="Phone Number"
                  type="tel"
                  fullWidth
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={isPhoneVerified}
                  InputLabelProps={{ style: { color: 'purple' } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "purple" },
                      "&:hover fieldset": { borderColor: "darkred" },
                      "&.Mui-focused fieldset": { borderColor: "purple" }
                    }
                  }}
                />
              </Grid>

              <Grid item xs={4}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={generateOTP}
                  disabled={isOtpSent || isPhoneVerified || formData.phone.length < 10}
                >
                  Send OTP
                </Button>
              </Grid>

              {isOtpSent && !isPhoneVerified && (
                <>
                  <Grid item xs={8}>
                    <TextField
                      label="Enter OTP"
                      fullWidth
                      value={formData.otp}
                      onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                      InputLabelProps={{ style: { color: 'purple' } }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "purple" },
                          "&:hover fieldset": { borderColor: "darkred" },
                          "&.Mui-focused fieldset": { borderColor: "purple" }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Button fullWidth variant="contained" onClick={verifyOtp}>
                      Verify
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="text"
                      onClick={generateOTP}
                      disabled={resendCountdown > 0}
                    >
                      {resendCountdown > 0 ? `Resend OTP in ${resendCountdown}s` : "Resend OTP"}
                    </Button>
                  </Grid>
                </>
              )}

              <Grid item xs={12}>
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  InputLabelProps={{ style: { color: 'purple' } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "purple" },
                      "&:hover fieldset": { borderColor: "darkred" },
                      "&.Mui-focused fieldset": { borderColor: "purple" }
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  onClick={saveUser}
                  variant="contained"
                  fullWidth
                  sx={{
                    fontWeight: "bold",
                    height: "45px",
                    borderRadius: "5px",
                    bgcolor: "#9c27b0", // purple
                    "&:hover": { bgcolor: "#7b1fa2" } // darker purple on hover
                  }}
                >
                  REGISTER
                </Button>

              </Grid>
            </Grid>
          </Paper>
        </motion.div>

        <Snackbar
          open={snack.open}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          {(() => {
            const msg = snack.message.toLowerCase();
            const isSuccess = msg.includes("success") || msg.includes("verified") || msg.includes("otp sent");
            const isError = msg.includes("fail") || msg.includes("error") || msg.includes("invalid");


            const severity = isSuccess ? "success" : isError ? "error" : "info";


            const bgColor = isSuccess
              ? "#352853ff"
              : isError
                ? "#d32f2f"
                : "#1976d2";

            return (
              <MuiAlert
                elevation={6}
                variant="filled"
                onClose={handleClose}
                severity={severity}
                sx={{
                  width: "100%",
                  backgroundColor: `${bgColor} !important`,
                  color: "#fff"
                }}
              >
                {snack.message}
              </MuiAlert>
            );
          })()}
        </Snackbar>


      </Container>
    </Box >
  );
}