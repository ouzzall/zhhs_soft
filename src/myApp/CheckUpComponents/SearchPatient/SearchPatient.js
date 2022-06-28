// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiTypography from "components/SuiTypography";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { setId } from "redux/patId";

function SearchPatient() {
  const { patientId } = useSelector((state) => state.patId);

  // console.log(patientId);
  // if (patientId === 6) {
  //   console.log("HELLO 6");
  // }

  const dispatch = useDispatch();

  const [patientsData, setPatientsData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [errorL, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(`http://localhost/zhhs_soft_server/api/patients`, {
      signal: abortCont.signal,
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Not Fetching data from server.");
        }
        return res.json();
      })
      .then((result) => {
        // console.log(result);
        setPatientsData(result.data);
        setIsPending(false);
        setError(false);
      })
      .catch((err) => {
        // console.log(err.name === "AbortError");
        if (err.name === "AbortError") {
          // console.log("Fetch Aborted.");
        } else {
          setError(err.message);
          setPatientsData(null);
          setIsPending(false);
        }
      });

    return () => abortCont.abort();
  }, [`http://localhost/zhhs_soft_server/api/patients`]);

  function selectPatient(e) {
    // console.log(e.target.value);
    // console.log(patientId);
    const intId = parseInt(e.target.value, 10);
    // RADIX K BAREY MA PARHNA HA YEH AGEY ISSUE KAR SAKTA HA
    dispatch(setId(intId));
  }

  let patData = "";

  if (patientsData) {
    // console.log(medicinesData[1], isPending, errorL);
    // console.log(medicinesData[1]);
    // console.log(patientId);
    patientsData.forEach((element) => {
      // console.log(patientId);
      // console.log(element.id);
      if (patientId === element.id) {
        element.pick = (
          <input type="radio" value={element.id} defaultChecked name="selected_patient" />
        );
      } else {
        element.pick = (
          <input type="radio" value={element.id} name="selected_patient" onChange={selectPatient} />
        );
      }
    });

    patData = {
      columns: [
        { Header: "PICK", accessor: "pick" },
        // { Header: "ID", accessor: "id" },
        { Header: "FIRST NAME", accessor: "name", width: "18%" },
        { Header: "LAST NAME", accessor: "father_name", width: "18%" },
        { Header: "AGE", accessor: "age" },
        { Header: "GENDER", accessor: "gender" },
        { Header: "WEIGHT (Kg)", accessor: "weight" },
        { Header: "HEIGHT", accessor: "height" },
        { Header: "PHONE", accessor: "phone" },
      ],

      rows: patientsData,
    };

    // console.log(medData);
  }

  return (
    <SuiBox>
      <SuiBox textAlign="" mx="auto" mb={0} display="flex" justifyContent="space-between" p={1}>
        <SuiBox>
          <SuiTypography variant="h5" fontWeight="regular">
            Search Patient
          </SuiTypography>
        </SuiBox>
        <SuiBox>
          <Link to="/patients/new-patient">
            <SuiButton variant="gradient" color="success">
              New Patient
            </SuiButton>
          </Link>
        </SuiBox>
      </SuiBox>
      <SuiBox>
        {errorL && (
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <SuiBox p={3} pb={15}>
              {errorL}
            </SuiBox>
          </Grid>
        )}
        {isPending && (
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <SuiBox p={3} pb={15}>
              <Oval color="#74c40e" height={80} width={80} />
            </SuiBox>
          </Grid>
        )}
        {patientsData && <DataTable table={patData} canSearch />}
      </SuiBox>
    </SuiBox>
  );
}

export default SearchPatient;
