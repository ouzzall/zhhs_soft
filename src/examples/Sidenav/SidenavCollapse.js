/**
=========================================================
* Soft UI Dashboard PRO React - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";

// Custom styles for the SidenavCollapse
import {
  collapseItem,
  collapseIconBox,
  collapseText,
} from "examples/Sidenav/styles/sidenavCollapse";

// Soft UI Dashboard PRO React context
import { useSoftUIController } from "context";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCapsules,
  faUserDoctor,
  faHospitalUser,
  faUserGroup,
  faMoneyBill1,
  faHouseUser,
  faPersonWalking,
  faMoneyBillTrendUp,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faCapsules,
  faHouseUser,
  faUserDoctor,
  faHospitalUser,
  faUserGroup,
  faMoneyBill1,
  faPersonWalking,
  faMoneyBillTrendUp
);

function SidenavCollapse({ color, icon, name, children, active, noCollapse, open, ...rest }) {
  const [controller] = useSoftUIController();
  const { miniSidenav, transparentSidenav } = controller;

  // console.log(active);

  return (
    <>
      <ListItem component="li">
        <SuiBox {...rest} sx={(theme) => collapseItem(theme, { active, transparentSidenav })}>
          <ListItemIcon
            sx={(theme) => collapseIconBox(theme, { active, transparentSidenav, color })}
          >
            {active ? (
              <FontAwesomeIcon icon={icon} size="xs" className="font_clr_2" />
            ) : (
              <FontAwesomeIcon icon={icon} size="xs" className="font_clr" />
            )}
          </ListItemIcon>

          <ListItemText
            primary={name}
            sx={(theme) => collapseText(theme, { miniSidenav, transparentSidenav, active })}
          />

          {/* <Icon
            sx={(theme) =>
              collapseArrow(theme, { noCollapse, transparentSidenav, miniSidenav, open })
            }
          >
            expand_less
          </Icon> */}
        </SuiBox>
      </ListItem>
      {children && (
        <Collapse in={open} unmountOnExit>
          {children}
        </Collapse>
      )}
    </>
  );
}

// Setting default values for the props of SidenavCollapse
SidenavCollapse.defaultProps = {
  color: "info",
  active: false,
  noCollapse: false,
  children: false,
  open: false,
};

// Typechecking props for the SidenavCollapse
SidenavCollapse.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
  active: PropTypes.bool,
  noCollapse: PropTypes.bool,
  open: PropTypes.bool,
};

export default SidenavCollapse;
