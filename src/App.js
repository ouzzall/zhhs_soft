import { useState, useEffect } from "react";

// react-router components
import { Route, Switch, Redirect, useLocation, useHistory } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
// import SuiBox from "components/SuiBox";

// Soft UI Dashboard PRO React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Soft UI Dashboard PRO React themes
import theme from "assets/theme";

// Soft UI Dashboard PRO React routes
import routes from "routes";

// Soft UI Dashboard PRO React contexts
import { useSoftUIController, setMiniSidenav } from "context";
import brand from "./assets/logo/no-bg-logo.png";
// import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";

export default function App() {
  const history = useHistory();
  // console.log("HELLO FROM APP");

  if (localStorage.getItem("phone")) {
    if (window.location.href === "https://zahidhd.tk/sign-in") history.push("/dashboard");
  } else if (window.location.href === "https://zahidhd.tk/sign-in") {
    //
  } else {
    history.push("/sign-in");
  }

  const [controller, dispatch] = useSoftUIController();
  // const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const { miniSidenav, direction, layout, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  // const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} component={route.component} key={route.key} />;
      }

      return null;
    });

  // const configsButton = (
  //   <SuiBox
  //     display="flex"
  //     justifyContent="center"
  //     alignItems="center"
  //     width="3.5rem"
  //     height="3.5rem"
  //     bgColor="white"
  //     shadow="sm"
  //     borderRadius="50%"
  //     position="fixed"
  //     right="2rem"
  //     bottom="2rem"
  //     zIndex={99}
  //     color="dark"
  //     sx={{ cursor: "pointer" }}
  //     onClick={handleConfiguratorOpen}
  //   >
  //     <Icon fontSize="default" color="inherit">
  //       settings
  //     </Icon>
  //   </SuiBox>
  // );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={brand}
            brandName="Zahid Herbal Dawakhana"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {/* {configsButton} */}
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Switch>
        {getRoutes(routes)}
        <Redirect from="*" to="/dashboard" />
      </Switch>
    </ThemeProvider>
  );
}

// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { decrement, increment, incrementByAmount } from "redux/counter";

// export default function App() {
//   const { value } = useSelector((state) => state.counter);
//   const dispatch = useDispatch();
//   return (
//     <div className="App">
//       <h1> The count is: {value}</h1>
//       <button type="button" onClick={() => dispatch(increment())}>
//         increment
//       </button>
//       <button type="button" onClick={() => dispatch(decrement())}>
//         decrement
//       </button>
//       <button type="button" onClick={() => dispatch(incrementByAmount(33))}>
//         Increment by 33
//       </button>
//     </div>
//   );
// }
