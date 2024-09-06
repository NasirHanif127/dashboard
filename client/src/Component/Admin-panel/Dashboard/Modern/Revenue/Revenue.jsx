
import {
    Grid,
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Skelton,
    Skeleton
} from "@mui/material";
import Chart from "react-apexcharts";
import { useState, useEffect } from "react";
import { revenueRequest } from "./revenue.action";
import { useDispatch, useSelector } from "react-redux";


const Revenue = () => {
    const dispatch = useDispatch();
    const  revenueReducer  = useSelector(response => response.revenueReducer);
    const  adminReducer  = useSelector(response => response.adminReducer)


    const getRevenue = () => {
        dispatch(revenueRequest())
    }

    const setRevenue = () => {
        return (
            setSeries([
                {
                    name: "Earning",
                    data: revenueReducer.data.earning
                },
                {
                    name: "Expenses",
                    data: revenueReducer.data.expenses
                }
            ]),
            setCat(revenueReducer.data.months)
        )

    }

    useEffect(() => {

        if (revenueReducer.isLoading === null) {
            getRevenue();
        }

        if (revenueReducer.success) {
            setRevenue()
        }

    }, [revenueReducer])

    const [series, setSeries] = useState([]);
    const [cat, setCat] = useState([])


    const options = {
        xaxis: {
            categories: cat
        },
        chart: {
            toolbar: {
                tools: {
                    zoom: false,
                    zoomin: false,
                    zoomout: false,
                    pan: false,
                    reset: false
                }
            }
        }


    }



    const design = (

        <>
            <Grid item xs={12} sm={6}>
                <Card
                    sx={{
                        bgcolor: adminReducer.dark ? "#1e1e1e" : "white"
                    }}>
                    <CardContent>

                        {
                            revenueReducer.isLoading ?
                                <div >
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Skeleton
                                            height={40}
                                            width={40}
                                            variant="circular"
                                            sx={{ mr: 2 }}
                                        />
                                        <div className="d-flex flex-grow-1 flex-column ">
                                            <Skeleton
                                                height={40}
                                                width={"100%"}
                                                variant="rectangular"
                                            />

                                            <Skeleton
                                                width={"100%"}
                                                variant="text"
                                            />
                                        </div>
                                    </div>
                                    <Skeleton
                                        width={"100%"}
                                        variant="rectangular"
                                        height={"320px"}
                                        sx={{ mt: 1 }}
                                    />
                                </div> :
                                <div>
                                    <Typography variant="h5" component="div">
                                        Revenue Updates
                                    </Typography>
                                    <Chart
                                        type="line"
                                        options={options}
                                        series={series}
                                    ></Chart>
                                </div>
                        }

                    </CardContent>
                </Card>

            </Grid>
        </>
    );

    return design
}

export default Revenue