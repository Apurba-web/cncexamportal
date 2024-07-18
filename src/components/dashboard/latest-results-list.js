import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
import { SectionLayout } from "src/layouts/SectionLayout";

export const LatestResults = ({ data }) => {
  const router = useRouter();

  const viewResult = (exam_id) => {
    if (exam_id) {
      router.push(`/exam/${exam_id}/analysis`);
    }
  };
  return (
    <SectionLayout sectionTitle="Latest Results">
      {data?.length === 0 && (
        <Box sx={{ px: 5 }}>
          <Typography variant="body2">No Results Available</Typography>
        </Box>
      )}
      <Box
        display="flex"
        flexDirection="column"
        flex={1}
        height="100%"
        justifyContent="flex-start"
        sx={{ overflowY: "auto", height: "100%" }}>
        {data?.map((item, index) => (
          <>
            <Box
              py={1}
              key={index}
              display="flex"
              justifyContent="space-between"
              alignItems="center">
              <Typography fontFamily="Poppins" fontSize="14px" fontWeight="700">
                {item.exam_name}
              </Typography>
              <Button
                variant="text"
                onClick={() => {
                  viewResult(item.id);
                }}>
                View
              </Button>
            </Box>
            <Divider />
          </>
        ))}
      </Box>
    </SectionLayout>
  );
};
