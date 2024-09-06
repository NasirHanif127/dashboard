
import {
    Grid,
    Card,
    CardContent,
    CardActions,
    Typography,
    Button
} from "@mui/material";
import { useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux/es/hooks/useSelector";

const Purchase = () => {

    const adminReducer = useSelector(response => response.adminReducer)
    const options = {

        chart: {
            width: 380,
            type: 'pie'
          },
        
        labels: [
            "Laotop",
            "Mobile",
            "Watch",
            "Desktop",  
        ],
        responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
       
    }
    const [series, setSeries] = useState([
        400,
        520,
        210,
        350
        
    ])

    const design = (

        <>
            <Grid item xs={12} sm={4}>
                <Card style={{ height: "220px" }} 
                sx={{
                    bgcolor : adminReducer.dark ? "#1e1e1e" : "white"
                    }}
                >
                    <CardContent>
                        <Typography gutterBottom variant="h5">
                            Purchase
                        </Typography>
                        <Chart
                            options={options}
                            series={series}
                            type="pie"
                            height="160px" 
                            
                            
                    ></Chart>
                       
                    </CardContent>
                   
                </Card>

            </Grid>
        </>
    );

    return design
}

export default Purchase