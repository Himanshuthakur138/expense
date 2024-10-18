"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { routesUrl } from "@/utils/pagesurl";
import LogoutButton from "../shared/form/LogoutButton";
import { usePathname } from "next/navigation";
import { useState } from "react";

function ResponsiveAppBar() {
  const pathName = usePathname();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { data: session } = useSession();
  if (pathName === "/auth/signin") {
    return null
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" className="bg-transparent shadow-none">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <IconButton
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white" }}
            >
              <Link href="/">
                <Typography>Home</Typography>
              </Link>
            </IconButton>
            {/* <IconButton
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white" }}
            >
              <Link href={routesUrl.about}>
                <Typography>About</Typography>
              </Link>
            </IconButton> */}
            {session ? (
              <>
                <IconButton
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white" }}
                >
                  <Link href={routesUrl.expense}>
                    <Typography>Expense Tracker</Typography>
                  </Link>
                </IconButton>
              </>
            ) : (
              <></>
            )}
          </Box>
          <Box>{session?.user?.email}</Box>
          <Box sx={{ flexGrow: 0, marginLeft:2}}>
            <Tooltip title={session ? "Sign Out" : "Sign in"}>
                {session ? (
                <Typography className="signin-button" color="white"> <LogoutButton /></Typography>
                ) : (
                  <Link href={routesUrl.signIn}>
                    <Typography className="signin-button" color="white">Sign In</Typography>
                  </Link>
                )}
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {session ? (
                <>
                  <MenuItem>
                    <div>
                      
                    </div>
                  </MenuItem>
                </>
              ) : null}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
