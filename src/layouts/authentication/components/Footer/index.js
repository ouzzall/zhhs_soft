import Grid from "@mui/material/Grid";
// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import Link from "@mui/material/Link";

function Footer() {
  const href = "https://www.ouzzall.com/";
  return (
    <SuiBox component="footer" py={3}>
      <Grid container justifyContent="center">
        <Grid item xs={12} lg={12} display="flex" justifyContent="center">
          <SuiTypography variant="body2" color="secondary">
            © 2022, made by&nbsp;
          </SuiTypography>
          <Link href={href} target="_blank">
            <SuiTypography variant="body2" color="secondary" fontWeight="bold">
              ABD-AY Developers.
            </SuiTypography>
          </Link>
        </Grid>
      </Grid>
    </SuiBox>
  );
}

export default Footer;
