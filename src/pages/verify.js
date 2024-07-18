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
import { useRouter } from "next/router";
import { AppBar } from "src/components/app-bar";
import { MainLayout } from "src/layouts/MainLayout";

export default function Verify() {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Verify Login</title>
        <meta name="description" content="Courses and careers student login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar />
      <MainLayout>
        <Grid container height="70vh">
          <Grid
            item
            lg={12}
            sm={12}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center">
            <Box width="100%">
              <Box paddingX={10} marginY={2}>
                <Typography variant="h4" color="#263228" textAlign="center">
                  Verify login
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="#263228aa"
                  textAlign="center">
                  We have sent an email contaning an OTP.
                  <br />
                  Please enter it below to proceed. Thank you.
                </Typography>
              </Box>
            </Box>

            <Box
              marginTop={5}
              width="70%"
              padding={5}
              minHeight="200px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              borderRadius={1}
              sx={{ backgroundColor: "#0661B6dd" }}>
              <Box
                maxWidth="500px"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignSelf="center"
                alignItems="center">
                <TextField
                  variant="filled"
                  label=" ENTER OTP"
                  InputLabelProps={{
                    style: {},
                  }}
                  inputProps={{
                    min: 0,
                    style: { textAlign: "center", max: 6 },
                  }}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 1,
                  }}
                />

                <Button
                  onClick={() => {
                    router.push("/dashboard");
                  }}
                  variant="contained"
                  fullWidth
                  sx={{ backgroundColor: "black", marginTop: 3 }}>
                  Verify
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
                  Resend OTP
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </MainLayout>
    </div>
  );
}
