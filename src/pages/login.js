import {
  Grid,
  Box,
  Typography,
  Divider,
  TextField,
  FormControl,
  Stack,
  Button,
  Link,
} from "@mui/material";
import Head from "next/head";
import { AppBar } from "src/components/app-bar";
import { MainLayout } from "src/layouts/MainLayout";
import { useRouter } from "next/router";
import { useAuth } from "src/adapters/authAdapters";
import { login } from "src/services/authRequests";
import { useState } from "react";
import LoadingModal from "src/components/common/loading-modal";

export default function Login() {
  const { mutate } = useAuth({
    redirectIfFound: true,
    redirectTo: "/dashboard",
  });

  const [user_name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    setLoading(true);
    try {
      await login({ user_name, password });
      mutate();
      setLoading(false);

    } catch (error) {
      setError("Failed to login! Please check credentials");
      setLoading(false);
    }
  };
  return (
    <div>
      <LoadingModal show={loading} />
      <Head>
        <title>Student Login</title>
        <meta name="description" content="Courses and Careers student login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar />
      <MainLayout>
        <Grid container minHeight="75vh">
          <Grid
            item
            lg={6}
            sm={12}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center">
            <Box width={{ lg: "70%", sm: "95%" }}>
              <Box
                width={{ lg: "100%", sm: "25%" }}
                alignSelf={{ sm: "center" }}>
               <img
                  style={{ height: "204px", width: "300px" }}
                  src="/assets/images/man_studying.png"
                  layout="responsive"
                  alt=""
                />  
              </Box>
              <Box paddingX={10} marginY={2}>
                <Typography
                  variant="h4"
                  color="#263228"
                  textAlign={{ lg: "left", sm: "center" }}>
                  Get Started !
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="#263228aa"
                  textAlign={{ lg: "left", sm: "center" }}>
                  Just a click away to easily take an exam.
                  <br />
                  Login, take exam and get your results.(Version 2)
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            lg={6}
            sm={12}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center">
            <Box
              width="70%"
              minHeight="300px"
              borderRadius={1}
              sx={{ backgroundColor: "#0661B6dd" }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "400",
                  color: "white",
                  textAlign: "center",
                  paddingY: 1,
                }}>
                LOGIN
              </Typography>
              <Divider />
              <Box padding={5}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: "400",
                    color: "white",
                    textAlign: "left",
                    paddingY: 1,
                  }}>
                  Enter student ID and password to login
                </Typography>

                <FormControl fullWidth>
                  <Stack spacing={2} marginY={2}>
                    <TextField
                      variant="filled"
                      label="Username/Student ID"
                      value={user_name}
                      onChange={(e) => setUsername(e.target.value)}
                      sx={{
                        backgroundColor: "white",
                        borderRadius: 1,
                      }}
                    />
                    <TextField
                      variant="filled"
                      label="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      sx={{
                        backgroundColor: "white",
                        borderRadius: 1,
                      }}
                    />
                  </Stack>
                  {error && (
                    <Typography
                      variant="caption"
                      color="yellow"
                      fontSize="small">
                      {error}
                    </Typography>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleLogin}
                    sx={{ backgroundColor: "black", marginTop: 3 }}>
                    Login
                  </Button>
                  <Link
                    variant="caption"
                    sx={{
                      fontWeight: "400",
                      color: "white",
                      textAlign: "left",
                      paddingY: 1,
                      textDecorationLine: "underline",
                      textDecorationColor: "white",
                      cursor: "pointer",
                    }}>
                    Forgot Password
                  </Link>
                </FormControl>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </MainLayout>
    </div>
  );
}
