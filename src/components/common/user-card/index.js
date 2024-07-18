import { LogoutOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Card, Divider, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "src/adapters/authAdapters";
import { logout } from "src/services/authRequests";
import { useSWRConfig } from "swr";

export const UserCard = ({}) => {
  const { user, mutate } = useAuth();

  const { cache } = useSWRConfig();

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/login");
      cache.clear();
    } catch (error) {}
  };
  return (
    <Card
      sx={{
        width: "100%",

        backgroundColor: "#0661B6dd",
        borderRadius: 2,
      }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography sx={{ color: "white", p: 1 }}>WELCOME</Typography>

        <Button onClick={handleLogout} variant="text" color="warning">
          <LogoutOutlined fontSize="small" /> Logout
        </Button>
      </Box>
      <Divider />
      <Box
        sx={{
          p: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Avatar sx={{ width: 90, height: 90 }} />
        <Button
          onClick={() => router.replace("/changepassword")}
          variant="text"
          size="small"
          color="secondary">
          Change Password
        </Button>
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          p={1}
          marginTop={3}>
          <Typography
            variant="body2"
            sx={{ display: "flex", flex: 1, color: "#e1e1e1" }}>
            Name:
          </Typography>
          <Typography
            sx={{
              display: "flex",
              flex: 1,
              color: "white",
              fontWeight: "500",
            }}>
            {user?.firstname} {user?.lastname}
          </Typography>
        </Box>
        <Box width="100%" display="flex" justifyContent="space-between" p={1}>
          <Typography
            variant="body2"
            sx={{ display: "flex", flex: 1, color: "#e1e1e1" }}>
            Student Id:
          </Typography>
          <Typography
            sx={{
              display: "flex",
              flex: 1,
              color: "white",
              fontWeight: "500",
            }}>
            {user?.stud_reg_no}
          </Typography>
        </Box>
        <Box width="100%" display="flex" justifyContent="space-between" p={1}>
          <Typography
            variant="body2"
            sx={{ display: "flex", flex: 1, color: "#e1e1e1" }}>
            Section:
          </Typography>
          <Typography
            sx={{
              display: "flex",
              flex: 1,
              color: "white",
              fontWeight: "500",
            }}>
            {user?.section_name}
          </Typography>
        </Box>
        <Box width="100%" display="flex" justifyContent="space-between" p={1}>
          <Typography
            variant="body2"
            sx={{ display: "flex", flex: 1, color: "#e1e1e1" }}>
            Department:
          </Typography>
          <Typography
            sx={{
              display: "flex",
              flex: 1,
              color: "white",
              fontWeight: "500",
            }}>
            {user?.dept_name}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};
