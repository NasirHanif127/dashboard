import Congratulation from "./Congratulation/Congratulation";
import Purchase from "./Purchase/Purchase";
import Revenue from "./Revenue/Revenue";
import TotalEarning from "./TotalEarning/TotalEarning";
import { Grid } from "@mui/material";
function Modern() {
  return (
    <>
      <Grid container spacing={3}>
        <Congratulation />
        <Purchase />
        <TotalEarning />
        <Revenue />
      </Grid>
    </>
  )
}

export default Modern