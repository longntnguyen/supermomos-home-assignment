import * as React from "react";
import Image from "next/image";
import MenuItem from "@/components/MenuItem";
import { Box } from "@mui/material";
import { MENU } from "@/content/menu";

export default function Header() {
  return (
    <Box
      sx={{
        pt: 2.75,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 13,
      }}
    >
      <Box>
        <Image src="/logo.png" width={200} height={35} alt="logo" />
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 6,
        }}
      >
        {MENU.map((menuItem) => (
          <MenuItem menuItem={menuItem} key={menuItem.title} />
        ))}
      </Box>
    </Box>
  );
}
