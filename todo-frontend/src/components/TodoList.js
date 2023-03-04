import React, {useState, useEffect} from 'react'
import {getAllTodos} from '../requests'
import TodoListItem from './TodoListItem'
import { Divider } from '@mui/material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import {makeStyles} from '@mui/styles'

const useStyles = makeStyles(theme => ({
    datepicker: {
      margin: "2px 0px 2px 0px",
      height: "60px",
      // width: 'fit-content',
      padding: "20px 15px 10px",
      borderBottom: "2px solid blue",
      backgroundColor: "#fff",
      color: "#2c2c2c",
      width: 300,
      fontWeight: 600
    },
  }));

export default function TodoList() {
    const [date, setDate] = useState(null)
    const [data, setData] = useState([])
    const [todos, setTodos] = useState([])
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);  
    useEffect(() => {
      getData()
      setTodos([todos])
    }, [])
    
    const getData = async() => {
        const data = await getAllTodos()
        setData(data.data)
        setTodos(data.data)
    }

    const resetFilter = () => {
        setDate(null)
        setMonth(null)
        setYear(null)
        setTodos(data)
    }
    const onDateChange = (newValue) => {
        setMonth(null)
        setYear(null)
        setDate(newValue)
        const j = data.filter(i => i.date.substring(0,15) === newValue.$d.toString().substring(0,15));
        console.log(j);
        setTodos(j)
    }
    const onMonthChange = (newValue) => {
        setDate(null)
        setYear(null)
        setMonth(newValue)
        const j = data.filter(i => i.date.getMonth() === newValue.$M)
        setTodos(j)
    }

    const onYearChange = (newValue) => {
        setDate(null)
        setMonth(null)
        setYear(newValue)
        const j = data.filter(i => i.date.toString().substring(11,15) === newValue.$y.toString())
        setTodos(j)
    }
    const classes = useStyles()
    return (
        <div>
            <div className='filters'>
                <span>Add Filters</span>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker 
                            fullWidth
                            onChange={(newValue) => onDateChange(newValue)}
                            value={date}
                            label={date && "Date"}
                            margin="normal"
                            placeholder="Date"
                            InputProps={{className: !date ?  classes.datepicker : null}}
                        />
                        <DatePicker 
                            fullWidth
                            onChange={(newValue) => onMonthChange(newValue)}
                            value={month}
                            format="MM"
                            label={month && "Month"}
                            margin="normal"
                            placeholder="Month"
                            views={['month']}
                            InputProps={{className: !date ?  classes.datepicker : null}}
                        />
                        <DatePicker 
                            fullWidth
                            onChange={(newValue) => onYearChange(newValue)}
                            value={year}
                            label={year && "Year"}
                            margin="normal"
                            placeholder="Year"
                            views={['year']}
                            InputProps={{className: !date ?  classes.datepicker : null}}
                        />
                        <Button style={{backgroundColor: "brown"}} variant="contained" onClick={resetFilter}>Reset</Button>
                    </DemoContainer>
                </LocalizationProvider>
            </div>
            {
                todos.map((todo, index) => {
                    return(
                        <><TodoListItem todo={todo} key={index}/>
                        <Divider sx={{marginLeft: '5%', marginRight: '5%'}}/>
                        </>
                    )
                })
            }
        </div>
  )
}


