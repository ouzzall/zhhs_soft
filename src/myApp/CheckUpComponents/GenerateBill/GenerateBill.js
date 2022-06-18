import { useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import { useSelector } from "react-redux";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
import Swal from "sweetalert2";

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
  faFileInvoice,
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
  faFileInvoice
);

function GenerateBill() {
  const { pWBillId } = useSelector((state) => state.patId);
  // console.log(pWBillId);
  // const [design, setDesign] = useState(false);

  // const handleSetDesign = () => setDesign(!design);

  const customButtonStyles = ({
    functions: { pxToRem },
    borders: { borderWidth },
    palette: { transparent },
  }) => ({
    width: pxToRem(150),
    height: pxToRem(120),
    borderWidth: borderWidth[0],
    mb: 1,
    ml: 0.5,

    "&.MuiButton-contained, &.MuiButton-contained:hover": {
      boxShadow: "none",
      border: `${borderWidth[0]} solid ${transparent.main}`,
    },
  });

  useEffect(() => {
    Swal.fire("Check Up Finished", "Generate Prescription and Bill", "success");
  }, []);

  function printHandler1() {
    const sendId2 = new URLSearchParams({
      id: pWBillId,
      user: localStorage.getItem("phone"),
      bill_type: "patient_bill",
    }).toString();

    window.open(`https://zahidhd.tk/zahidhd/print?${sendId2}`, "_blank");
  }

  function printHandler2() {
    const sendId2 = new URLSearchParams({
      id: pWBillId,
      user: localStorage.getItem("phone"),
      bill_type: "patient_prescription",
    }).toString();

    window.open(`https://zahidhd.tk/zahidhd/print?${sendId2}`, "_blank");
  }

  return (
    <SuiBox>
      <SuiBox width="80%" textAlign="center" mx="auto" mb={4}>
        <SuiBox mb={1}>
          <SuiTypography variant="h5" fontWeight="regular">
            Check Up Finished.
          </SuiTypography>
        </SuiBox>
        <SuiTypography variant="body2" fontWeight="regular" color="text">
          Print The Following things according to the need.
        </SuiTypography>
      </SuiBox>
      <SuiBox mt={2}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={3}>
            <SuiBox textAlign="center">
              <SuiButton
                color="info"
                variant="gradient"
                onClick={printHandler2}
                sx={customButtonStyles}
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-file-prescription"
                  size="lg"
                  className="font_clr_2"
                />
              </SuiButton>
              <SuiTypography variant="h6" ml={0}>
                Generate Prescription
              </SuiTypography>
            </SuiBox>
          </Grid>
          <Grid item xs={12} sm={3}>
            <SuiBox textAlign="center">
              <SuiButton
                color="info"
                variant="gradient"
                onClick={printHandler1}
                sx={customButtonStyles}
              >
                <FontAwesomeIcon icon="fa-solid fa-file-invoice" size="xl" className="font_clr_2" />
              </SuiButton>
              <SuiTypography variant="h6" ml={1}>
                Generate Bill
              </SuiTypography>
            </SuiBox>
          </Grid>
        </Grid>
      </SuiBox>
    </SuiBox>
  );
}

export default GenerateBill;
