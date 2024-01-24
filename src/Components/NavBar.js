import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useEffect } from "react";
import SearchField from "./SearchField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import About from "./About";
import Contact from "./Contact";
import BarChart from "./BarChart";

const NavBar = ({
  darkMode,
  handleThemeChange,
  search,
  setSearch,
  notificationCount,
  selectedCoins,
  onNotificationClick,
}) => {
  const navItems = [
    { label: "HOME", path: "/" },
    { label: "ABOUT", path: "/about" },
    { label: "CONTACT", path: "/contact" },
  ];

  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (path) => {
    setAnchorEl(null);
    if (path === "/about") {
      setDialogContent(<About />);
      setDialogOpen(true);
    } else if (path === "/contact") {
      setDialogContent(<Contact />);
      setDialogOpen(true);
    } else if (path === "/graph") {
      setDialogContent(<BarChart selectedCoins={selectedCoins} />);
      setDialogOpen(true);
    }
  };

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#424242" : "#f5f5f5";
  }, [darkMode]);

  return (
    <Box style={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <div style={{ paddingRight: "20px" }}>CRYPTO TRACKER</div>
          <SearchField search={search} setSearch={setSearch} />
          <Box style={{ display: "flex", marginLeft: "auto" }}>
            <IconButton onClick={handleThemeChange} style={{ color: "#fff" }} aria-label="Toggle Dark Mode">
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <IconButton onClick={onNotificationClick} style={{ color: "#fff" }}>
              <Badge badgeContent={notificationCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              onClick={() => handleMenuClose("/graph")}
              style={{ color: "#fff" }}
            >
              <ShowChartIcon />
            </IconButton>
            <IconButton onClick={handleMenuClick} style={{ color: "#fff" }}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => handleMenuClose(null)}
            >
              {navItems.map((item) => (
                <MenuItem
                  key={item.label}
                  onClick={() => handleMenuClose(item.path)}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogContent>
          <Box
            sx={{
              padding: 2,
              textAlign: "justify",
              width: "100%",
              height: "100%",
            }}
          >
            {dialogContent}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default NavBar;