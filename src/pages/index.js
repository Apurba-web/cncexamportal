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
  CircularProgress,
  Container,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "src/adapters/authAdapters";
import { AppBar } from "src/components/app-bar";
import { UserCard } from "src/components/common/user-card";
import { CurrentExamList } from "src/components/dashboard/current-exams-list";
import { ExaminationsList } from "src/components/dashboard/examinations-list";
import { LatestNoticeList } from "src/components/dashboard/latest-notice-list";
import { LatestResults } from "src/components/dashboard/latest-results-list";
import { MainLayout } from "src/layouts/MainLayout";
import { SectionLayout } from "src/layouts/SectionLayout";

import Image from 'next/image';

export default function Home() {

  const { user } = useAuth({
    redirectTo: "/dashboard",
  });

  return (
    <div>
      <Head>
        <title>Courses and Careers</title>
        <meta name="description" content="Exams at your fingertips" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100vw",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          backdropFilter: "blur(5px)",
          position: "relative",
        }}>
        <img
          src="/assets/images/cnc_logo.png"
          
//          width={400}
//          height={200}
          alt="logo"
          style={{ position: "absolute" }}

        /> 
        <CircularProgress size="150px" />
      </Box>
    </div>
  );
}
