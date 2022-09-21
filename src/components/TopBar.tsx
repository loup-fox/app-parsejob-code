import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import titleUrl from "../assets/title.svg";

const AccountCircle = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("test");
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
        onClick={handleClick}
      >
        <Avatar />
      </IconButton>
      <Menu sx={{ zIndex: 999 }} anchorEl={anchorEl} open={!!anchorEl}>
        <MenuItem onClick={() => {}}>Sign Out</MenuItem>
      </Menu>
    </Box>
  );
};

export const TopBar = ({
  prepend,
  children,
}: {
  prepend?: React.ReactNode;
  children?: React.ReactNode;
}) => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        {prepend}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img height="30px" src={titleUrl} alt="title" />
        </Box>
        <Stack direction={"row"} display="flex" ml={3} spacing={1}>
          <Button onClick={() => navigate("/parsers")} color="inherit">
            Parsers
          </Button>
          <Button onClick={() => navigate("/merchants")} color="inherit">
            Merchants
          </Button>
          <Button onClick={() => navigate("/fetching")} color="inherit">
            Fetching
          </Button>
        </Stack>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            ml: 2,
            mr: 2,
          }}
        >
          {children}
        </Box>
        <AccountCircle />
      </Toolbar>
    </AppBar>
  );
};
