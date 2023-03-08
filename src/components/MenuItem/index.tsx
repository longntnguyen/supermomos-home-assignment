import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Link } from "@mui/material";

export type TMenuItem = {
  menuItem: TMenu;
  onClick?: () => void;
};

export default function MenuItem({ menuItem, onClick }: TMenuItem) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    if (onClick) onClick();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box sx={{ fontFamily: "Inter" }}>
      {menuItem.children?.length ? (
        <>
          <Button
            sx={{
              color: "#333333",
              w: "auto",
              p: 0,
              height: 10,
              textTransform: "inherit",
            }}
            variant="text"
            aria-describedby={id}
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
          >
            {menuItem.title}
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            sx={{
              ".MuiPaper-root": {
                mt: 2,
              },
              fontFamily: "Inter",
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", width: 150 }}>
              {menuItem.children.map((item) => (
                <Link
                  sx={{
                    px: 2,
                    py: 1,
                    color: "#333333",
                    textDecoration: "auto",
                    "&:hover": {
                      background: "#eeeeee",
                    },
                  }}
                  key={item.title}
                  href={item.href}
                >
                  {item.title}
                </Link>
              ))}
            </Box>
          </Popover>
        </>
      ) : (
        <Link
          sx={{
            color: "#333333",
            textDecoration: "auto",
          }}
          href={menuItem.href}
        >
          {menuItem.title}
        </Link>
      )}
    </Box>
  );
}
