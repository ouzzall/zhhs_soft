import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import DefaultCounterCard from "examples/Cards/CounterCards/DefaultCounterCard";
import FormField from "layouts/applications/wizard/components/FormField";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCheckUpCostGlobal, setDiscountGlobal, setFeeGlobal } from "redux/patId";

function PreFinalStepCheck() {
  const { shelfMedList } = useSelector((state) => state.patMedicines);
  const { selfMedList } = useSelector((state) => state.patMedicines);

  const dispatch = useDispatch();

  // console.log(shelfMedList, selfMedList);

  const [medicineTotal, setMedicineTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [checkUpFee, setCheckUpFee] = useState(0);

  useEffect(() => {
    let selfPrice = 0;
    selfMedList.forEach((element) => {
      // console.log(element.price);
      selfPrice += parseInt(element.price, 10);
    });
    // console.log(selfPrice);

    const shelfIdList = [];
    shelfMedList.forEach((element) => {
      // console.log(element.id);
      shelfIdList.push(element.key);
    });
    // console.log(shelfIdList);
    // console.log(shelfIdList.toString());
    const sendId = new URLSearchParams({ ids: shelfIdList.toString() }).toString();

    fetch(`http://localhost/zhhs_soft_server/api/medicines_total?${sendId}`)
      .then((res) => {
        if (!res.ok) {
          throw Error("Not Fetching data from server.");
        }
        return res.json();
      })
      .then((result) => {
        // console.log(selfPrice);
        // console.log(result.data);
        let shelfPrice = 0;
        if (result.status === true) {
          result.data.forEach((element, index) => {
            // console.log(element, index);
            // shelfPrice += parseInt(element, 10) * shelfMedList[index].quantity;

            shelfPrice +=
              parseInt(element, 10) *
              (parseInt(shelfMedList[index].days, 10) *
                (parseInt(shelfMedList[index].morning, 10) +
                  parseInt(shelfMedList[index].noon, 10) +
                  parseInt(shelfMedList[index].night, 10)));
          });
          setMedicineTotal(selfPrice + shelfPrice);
          dispatch(setCheckUpCostGlobal(selfPrice + shelfPrice));
        } else if (result.status === false) {
          setMedicineTotal(selfPrice + shelfPrice);
          dispatch(setCheckUpCostGlobal(selfPrice + shelfPrice));
        }
        // console.log(shelfPrice);
      });
    // .catch((err) => {
    //   console.log(err);
    // });
  }, []);

  return (
    <SuiBox style={{ display: "grid" }} justifyContent="center">
      <SuiBox width="80%" textAlign="center" mx="auto" mb={1.5}>
        <SuiBox>
          <SuiTypography variant="h5" fontWeight="regular">
            Check Up Fee and Discounts
          </SuiTypography>
        </SuiBox>
      </SuiBox>
      <SuiBox>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <DefaultCounterCard
              count={medicineTotal && medicineTotal}
              // suffix={<>&deg;C</>}
              title="Medicines Total"
              color="primary"
              // description="temperature"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormField
              type="number"
              label="check up fee"
              placeholder="eg. 200"
              value={checkUpFee}
              onChange={(e) => {
                setCheckUpFee(e.target.value);
                dispatch(setFeeGlobal(e.target.value));
              }}
              // onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormField
              type="number"
              label="discount from total amount if any"
              placeholder="eg. 100"
              value={discount}
              onChange={(e) => {
                setDiscount(e.target.value);
                dispatch(setDiscountGlobal(e.target.value));
              }}
            />
          </Grid>
        </Grid>
      </SuiBox>
    </SuiBox>
  );
}

export default PreFinalStepCheck;
