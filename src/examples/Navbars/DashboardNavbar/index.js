import "main.css";

import { useState, useEffect } from "react";

// react-router components
import { useHistory, useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard PRO React example components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarDesktopMenu,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Soft UI Dashboard PRO React context
import { useSoftUIController, setMiniSidenav } from "context";
// import { useSoftUIController, setTransparentNavbar, setMiniSidenav } from "context";

// Images
// import team2 from "assets/images/team-2.jpg";
import team2 from "assets/images/profile-pic.jpg";

function DashboardNavbar({ absolute, light, isMini }) {
  const history = useHistory();
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useSoftUIController();
  // const { miniSidenav, transparentNavbar, fixedNavbar } = controller;
  const { miniSidenav, fixedNavbar } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  let route = "";
  // console.log(useLocation().pathname);
  if (useLocation().pathname === "/") {
    // console.log("hello1");
    route = ["dashboard"];
  } else {
    // console.log("hello2");
    route = useLocation().pathname.split("/").slice(1);
  }

  //
  const newRoutes = [];
  for (let i = 0; i < route.length; i += 1) {
    if (i === 0) newRoutes.push(route[i]);
    if (i === 1) newRoutes.push(`${route[i - 1]}/${route[i]}`);
    if (i === 2) newRoutes.push(`${route[i - 2]}/${route[i - 1]}/${route[i]}`);
    if (i === 3) newRoutes.push(`${route[(i = 3)]}/${route[i - 2]}/${route[i - 1]}/${route[i]}`);
    if (i === 4)
      newRoutes.push(
        `${route[i - 4]}/${route[(i = 3)]}/${route[i - 2]}/${route[i - 1]}/${route[i]}`
      );
  }
  // console.log(route);
  // console.log(newRoutes);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      // setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  function logoutHandler() {
    setOpenMenu(false);
    localStorage.removeItem("phone");
    localStorage.removeItem("name");
    history.push("/sign-in");
  }

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2, ml: -3 }}
    >
      <NotificationItem
        image={<img src={team2} alt="person" />}
        title={[localStorage.getItem("name")]}
        date="Log Out"
        onClick={logoutHandler}
      />
    </Menu>
  );

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      // sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
      sx={(theme) => navbar(theme, { absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <SuiBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs
            icon="home"
            title={route[route.length - 1]}
            names={newRoutes}
            route={route}
            light={light}
          />
          {/* <Icon fontSize="medium" sx={navbarDesktopMenu} onClick={handleMiniSidenav}></Icon> */}
          <Icon fontSize="medium" sx={navbarDesktopMenu}>
            {miniSidenav ? "menu_open" : "menu"}
          </Icon>
        </SuiBox>
        {isMini ? null : (
          <SuiBox sx={(theme) => navbarRow(theme, { isMini })} className="rightt_align">
            <SuiBox color={light ? "white" : "inherit"}>
              <IconButton sx={navbarIconButton} onClick={handleOpenMenu} size="small">
                <Icon
                  sx={({ palette: { dark, white } }) => ({
                    color: light ? white.main : dark.main,
                  })}
                >
                  account_circle
                </Icon>
                <SuiTypography
                  variant="button"
                  fontWeight="medium"
                  color={light ? "white" : "dark"}
                >
                  {localStorage.getItem("name")}
                </SuiTypography>
              </IconButton>
              <IconButton
                size="small"
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon className={light ? "text-white" : "text-dark"}>
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              {/* <IconButton
                size="small"
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                <Icon className={light ? "text-white" : "text-dark"}>notifications</Icon>
              </IconButton> */}
              {renderMenu()}
            </SuiBox>
          </SuiBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
