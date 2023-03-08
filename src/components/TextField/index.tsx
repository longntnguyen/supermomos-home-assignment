import * as React from "react";
import { Box, Link, Typography } from "@mui/material";
import styles from "./index.module.css";

export type TTextField = {
  label: string | React.ReactNode;
  errorMessage?: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export default function TextField({
  label,
  errorMessage,
  ...props
}: TTextField) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        ...(errorMessage && { marginBottom: 4 }),
      }}
    >
      <label htmlFor="time">{label}</label>
      <Box sx={{ width: "100%" }}>
        <input className={styles.input} {...props} />
        {errorMessage && (
          <Typography sx={{ position: "absolute", color: "red" }}>
            {errorMessage}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
