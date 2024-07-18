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
import { useAuth } from "src/adapters/authAdapters";
import {
  useAllExamResult,
  useCurrentExams,
  useUpcomingExams,
} from "src/adapters/examAdapter";
import { AppBar } from "src/components/app-bar";
import { UserCard } from "src/components/common/user-card";
import { CurrentExamList } from "src/components/dashboard/current-exams-list";
import { ExaminationsList } from "src/components/dashboard/examinations-list";
import { LatestNoticeList } from "src/components/dashboard/latest-notice-list";
import { LatestResults } from "src/components/dashboard/latest-results-list";
import { MainLayout } from "src/layouts/MainLayout";
import { SectionLayout } from "src/layouts/SectionLayout";

export default function StudentDashboard() {

  //alert('Student Dashboard')

  const { user } = useAuth({
    redirectTo: "/login",
  });

  const { currentExams } = useCurrentExams();
  const { upcomingExams } = useUpcomingExams();
  const { allResults } = useAllExamResult();

 // console.log(allResults);

  return (
    <div>
      <Head>
        <title>Student Dashboard</title>
        <meta name="description" content="All students access in one place" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar />
      {!user && (
        <MainLayout>
          <Grid
            item
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="90vh">
            <CircularProgress />
          </Grid>
        </MainLayout>
      )}

      <MainLayout>
        <Grid container minHeight="75vh" padding={5}>
          <Grid item lg={9} sm={12} xs={12}>
            <Stack spacing={2}>
              <CurrentExamList data={currentExams} />
              <ExaminationsList data={upcomingExams} />
              <Stack direction="row" spacing={2}>
                <LatestResults data={allResults} />
                <LatestNoticeList />
              </Stack>
              <SectionLayout sectionTitle="Performance Overview"></SectionLayout>
            </Stack>
          </Grid>
          <Grid item lg={3} sm={0} paddingLeft={3}>
            <UserCard />
          </Grid>
        </Grid>
      </MainLayout>
    </div>
  );
}
