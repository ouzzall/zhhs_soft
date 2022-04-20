import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import { useHistory } from "react-router-dom";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

function ActionCell() {
  const history = useHistory();
  function handlePatientProfile() {
    history.push("/patients/profile");
  }

  return (
    <SuiBox display="flex" alignItems="center">
      <SuiTypography variant="body1" color="secondary" sx={{ cursor: "pointer", lineHeight: 0 }}>
        <Tooltip title="Preview product" placement="top" onClick={handlePatientProfile}>
          <Icon>visibility</Icon>
        </Tooltip>
      </SuiTypography>
      <SuiBox mx={2}>
        <SuiTypography variant="body1" color="secondary" sx={{ cursor: "pointer", lineHeight: 0 }}>
          <Tooltip title="Edit product" placement="top">
            <Icon>edit</Icon>
          </Tooltip>
        </SuiTypography>
      </SuiBox>
      <SuiTypography variant="body1" color="secondary" sx={{ cursor: "pointer", lineHeight: 0 }}>
        <Tooltip title="Delete product" placement="left">
          <Icon>delete</Icon>
        </Tooltip>
      </SuiTypography>
    </SuiBox>
  );
}

export default ActionCell;
