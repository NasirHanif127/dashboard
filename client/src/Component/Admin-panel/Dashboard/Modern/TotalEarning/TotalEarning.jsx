
import {
    Grid,
    Card,
    CardContent,
    CardActions,
    Typography,
    Button
   } from "@mui/material";
   import "./TotelEarning.css";
   import Chart from "react-apexcharts";
import { useState } from "react";
import { useSelector } from "react-redux";

const TotalEarning = ()=>{
    const adminReducer = useSelector(response => response.adminReducer)
const options = {
    chart: {
        toolbar: {
            tools: {
                download : false,
                zoom: false,
                zoomin: false,
                zoomout: false,
                pan: false,
                reset: false
            }
        },
        sparkline : {
            enabled : true
        }
    },
    theme : {
        palette : "palette8"
    },

    title: {
        text: "$18,000",
        style : {
            fontSize : "18px",
            color : adminReducer.dark ? "#fff" : "inherit"
            
        }
    }
}

const [series , setSeries]= useState([
    {
        name : "Earning",
        data : [100,150,20,250,45,25,50,450,70,850,750,700,]
    }
])

   const design = (

       <>
           <Grid item xs={12} sm={4}>
               <Card className="chart-box" 
               sx={{
                bgcolor : adminReducer.dark ? "#1e1e1e" : "white"
                }}
               >
                <CardContent>
                    <Typography gutterBottom variant="h5">
                    Total Earning
                    </Typography>
                </CardContent>
                   <Chart 
                   options={options} 
                   series={series}
                   type="area"
                   height="160px" 
                   className="chart"
                   />
               </Card>
               
           </Grid>
       </>
   );

   return design
}

export default TotalEarning