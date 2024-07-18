import React from "react";

import { Box } from "@mui/system";
import styles from "./MainLayout.module.css";

export const MainLayout = ({ children }) => {
  return (
    <main>
      <Box className={styles.leftBottomBgImageBox}>
        <img
          src="/assets/images/bg_left_bottom.png"
          alt=""
          style={{ position: "absolute", objectFit: "fill" }}
        />
      </Box>
      <Box className={styles.rightBgImageBox}>
        <img
          src="/assets/images/strip_bg.png"
          alt=""
          style={{ position: "absolute", objectFit: "fill" }}
        />
      </Box>

      <Box zIndex={2} paddingY={10}>
        {children}
      </Box>
    </main>
  );
};
