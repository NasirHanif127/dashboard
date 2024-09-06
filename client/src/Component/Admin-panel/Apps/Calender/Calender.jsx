import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import "./Calender.css";

import {
    Card,
    Button,
    ButtonGroup,
    CardContent,
    Typography,
    span

} from '@mui/material';
import { useRef } from 'react';

const Calender = () => {

    const cal = useRef();


const next = ()=>{
const calender = cal.current.getApi();
calender.next()
}

const prev = ()=>{
    const calender = cal.current.getApi();
calender.prev()
    }
const today = ()=>{
    const calender = cal.current.getApi();
calender.today()
    }

    const todayDate = () => {
        const date = new Date();
        let dd = date.getDate();
        let mm = date.toLocaleDateString("default", { month: "long" });
        let yy = date.getFullYear();
        dd = dd < 10 ? "0" + dd : dd;
        // mm = mm < 10 ? "0"+mm : mm;
        return dd + " " + mm + " " + yy
    }
    const design = (
        <>
            <Card className='shadow-sm border'>
                <CardContent className='p-0'>
                    <div className='d-flex p-4 justify-content-between align-items-center'>
                        <ButtonGroup>
                            <Button 
                            onClick={prev}
                             variant='outlined'
                              className='py-2'>
                                <span className='material-icons-outlined'>arrow_left</span>
                                Prev
                            </Button>
                            <Button 
                            onClick={next}
                            variant='outlined' className='py-2'>
                                Next
                                <span className='material-icons-outlined'>arrow_right</span>
                            </Button>
                        </ButtonGroup>
                        <Typography variant='h5' component="div">
                            {
                                todayDate()
                            }
                        </Typography>
                        <Button 
                        onClick={today}
                        variant='outlined' color='warning'>Today</Button>
                    </div>
                    <FullCalendar 
                    ref={cal}
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        events={[
                            {
                                title: "Nasir birthday",
                                date: "2023-11-24",
                                color: "green"
                            },
                            {
                                title: "Bay domain",
                                date: "2023-11-25",
                                color: "red"
                            }
                        ]}
                        headerToolbar={{
                            start: "",
                            center: "",
                            end: ""
                        }}
                        eventDisplay='list-item'
                    />
                </CardContent>
            </Card>
        </>
    );
    return design
}

export default Calender