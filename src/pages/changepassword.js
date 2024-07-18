import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { MainLayout } from "src/layouts/MainLayout";
import { Router } from "@mui/icons-material";
import { changePassword } from "src/services/authRequests";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [changing, setChanging] = useState(false);

  const matches = useMediaQuery("(max-width:600px)");

  const router = useRouter();

  const handleChangePassword = () => {
    
    if (!oldPassword) {
      setErrors("Password field cannot be blank....");
      return;
    }
    if (!newPassword) {
      setErrors("Password field cannot be blank");
      return;
    }
    if (!confirmNewPassword) {
      setErrors("Password field cannot be blank");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setErrors("password does not match");
      return;
    }
    setChanging(true);
   
    try {
      let res = changePassword({
        oldpassword: oldPassword,
        newpassword: newPassword,
      });
      setChanging(false);

      if (res) {
        router.push("/dashboard");
        setChanging(false);
      }
    } catch (error) {
      setChanging(false);
      setErrors("Invalid please check!");
    }
  };

  const handleCancel = () => {
    router.push("/dashboard");
  };

  const handlePasswordChange = () => {
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      setErrors("Please fill all fields");
    }
  };

  return (
    <MainLayout>
      {changing && (
        <Box
          width="100%"
          height="100%"
          position="absolute"
          display="flex"
          justifyContent="center"
          alignItems="center"
          zIndex={999}
          bgcolor="#ffffff80">
          <CircularProgress />
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Box m={2}>
     {/*     <img
            src="/assets/images/cnc_logo.png"
            alt=""
            style={{
              width: matches ? "57" : "97px",
              height: matches ? "27" : "64px",
              objectFit: "contain",
            }}
          />   */}
        </Box>
        <Typography
          variant="subtitle1"
          color="#747474"
          sx={{ textAlign: "left", m: 1 }}>
          Change password . Provide old password first type your new password.
        </Typography>
        <Card sx={{ maxWidth: "500px" }}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "300px",
            }}>
            <Stack spacing={1}>
              <TextField
                variant="outlined"
                size="small"
                label="Old Password"
                onChange={(e) => setOldPassword(e.target.value)}
                value={oldPassword}
              />
              <TextField
                variant="outlined"
                size="small"
                label="New Password"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
              <TextField
                variant="outlined"
                size="small"
                label="Confirm New Password"
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                value={confirmNewPassword}
              />
            </Stack>
          </CardContent>

          {errors && (
            <Typography
              bgcolor="orange"
              px={5}
              variant="captions"
              color="error">
              {errors}
            </Typography>
          )}
          <CardActions>
            <Button variant="text" color="error" onClick={handleCancel}>
              cancel
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleChangePassword}>
              Change Password
            </Button>
          </CardActions>
        </Card>
      </Box>
    </MainLayout>
  );
};

export default ChangePassword;
