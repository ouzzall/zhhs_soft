import PropTypes from "prop-types";

import "main.css";

// @mui material components
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import Fade from "@mui/material/Fade";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard PRO React base styles

// Custom styles for the SuiSnackbar
import SuiSnackbarIconRoot from "components/SuiSnackbar/SuiSnackbarIconRoot";

function SuiSnackbar({ color, icon, title, dateTime, content, close, bgWhite, ...rest }) {
  let titleColor;
  let dateTimeColor;

  if (bgWhite) {
    titleColor = color;
    dateTimeColor = "dark";
  } else if (color === "light") {
    titleColor = "dark";
    dateTimeColor = "text";
  } else {
    titleColor = "white";
    dateTimeColor = "white";
  }

  return (
    <Snackbar
      TransitionComponent={Fade}
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...rest}
      action={
        <IconButton size="small" aria-label="close" color="inherit" onClick={close}>
          <Icon fontSize="small">close</Icon>
        </IconButton>
      }
    >
      <SuiBox
        variant={bgWhite ? "contained" : "gradient"}
        bgColor={bgWhite ? "white" : color}
        minWidth="21.875rem"
        maxWidth="100%"
        shadow="md"
        borderRadius="md"
        p={1}
        className="hide_back"
      >
        <SuiBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          color="dark"
          p={1.5}
        >
          <SuiBox display="flex" alignItems="center" lineHeight={0}>
            <SuiSnackbarIconRoot fontSize="small" ownerState={{ color, bgWhite }}>
              {icon}
            </SuiSnackbarIconRoot>
            <SuiTypography
              variant="button"
              fontWeight="medium"
              color={titleColor}
              textGradient={bgWhite}
            >
              {title}
            </SuiTypography>
          </SuiBox>
          <SuiBox display="flex" alignItems="center" lineHeight={0}>
            <SuiTypography variant="caption" color={dateTimeColor}>
              {dateTime}
            </SuiTypography>
            <Icon
              sx={{
                color: ({ palette: { dark, white } }) =>
                  bgWhite || color === "light" ? dark.main : white.main,
                fontWeight: ({ typography: { fontWeightBold } }) => fontWeightBold,
                cursor: "pointer",
                marginLeft: 2,
                transform: "translateY(-1px)",
              }}
              onClick={close}
            >
              close
            </Icon>
          </SuiBox>
        </SuiBox>
      </SuiBox>
    </Snackbar>
  );
}

// Setting default values for the props of SuiSnackbar
SuiSnackbar.defaultProps = {
  bgWhite: false,
  color: "info",
};

// Typechecking props for SuiSnackbar
SuiSnackbar.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  close: PropTypes.func.isRequired,
  bgWhite: PropTypes.bool,
};

export default SuiSnackbar;
