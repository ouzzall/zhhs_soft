import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

// Soft UI Dashboard PRO React icons
// import Settings from "examples/Icons/Settings";

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
  faTrashCan,
  faFilePrescription,
  faBedPulse,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faCapsules,
  faHouseUser,
  faUserDoctor,
  faHospitalUser,
  faUserGroup,
  faMoneyBill1,
  faPersonWalking,
  faTrashCan,
  faFilePrescription,
  faBedPulse
);

function PatientType() {
  // const [design, setDesign] = useState(false);
  const [code, setCode] = useState(false);
  const [develop, setDevelop] = useState(false);

  // const handleSetDesign = () => setDesign(!design);
  const handleSetCode = () => {
    setCode(true);
    setDevelop(false);
  };
  const handleSetDevelop = () => {
    setCode(false);
    setDevelop(true);
  };

  const customButtonStyles = ({
    functions: { pxToRem },
    borders: { borderWidth },
    palette: { transparent },
  }) => ({
    width: pxToRem(150),
    height: pxToRem(120),
    borderWidth: borderWidth[2],
    mb: 1,
    ml: 0.5,

    "&.MuiButton-contained, &.MuiButton-contained:hover": {
      boxShadow: "none",
      border: `${borderWidth[2]} solid ${transparent.main}`,
    },

    // "&:hover": {
    //   backgroundColor: `${transparent.main} !important`,
    //   border: `${borderWidth[2]} solid ${secondary.main} !important`,

    //   "& svg g": {
    //     fill: rgba(dark.main, 0.75),
    //   },
    // },
  });

  return (
    <SuiBox>
      <SuiBox width="80%" textAlign="center" mx="auto" mb={4}>
        <SuiBox mb={1}>
          <SuiTypography variant="h5" fontWeight="regular">
            Select Patient
          </SuiTypography>
        </SuiBox>
        <SuiTypography variant="body2" fontWeight="regular" color="text">
          Did He/She ever came to ZHHS Before ?
        </SuiTypography>
      </SuiBox>
      <SuiBox mt={2}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={3}>
            <SuiBox textAlign="center">
              <SuiButton
                color="dark"
                variant={code ? "contained" : "outlined"}
                onClick={handleSetCode}
                sx={customButtonStyles}
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-bed-pulse"
                  size="xl"
                  className={code ? "font_clr_2" : "font_clr_3"}
                />
              </SuiButton>
              <SuiTypography variant="h6" ml={1.5}>
                Existing Patient
              </SuiTypography>
            </SuiBox>
          </Grid>
          <Grid item xs={12} sm={3}>
            <SuiBox textAlign="center">
              <SuiButton
                color="dark"
                variant={develop ? "contained" : "outlined"}
                onClick={handleSetDevelop}
                sx={customButtonStyles}
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-hospital-user"
                  size="xl"
                  className={develop ? "font_clr_2" : "font_clr_3"}
                />
              </SuiButton>
              <SuiTypography variant="h6" ml={2}>
                New Patient
              </SuiTypography>
            </SuiBox>
          </Grid>
        </Grid>
      </SuiBox>
    </SuiBox>
  );
}

export default PatientType;
