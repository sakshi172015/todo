import React, {useState, useEffect} from 'react'
import {getAllTodos, changeOrder} from '../requests'
import TodoListItem from './TodoListItem'
import { Divider } from '@mui/material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import {makeStyles} from '@mui/styles'
import ReactDragList from 'react-drag-list';
import 'react-drag-list/assets/index.less';

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
    let data = []
    const [todos, setTodos] = useState([])
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);  
    const classes = useStyles()
    useEffect(() => {
      getData()
    }, [])
    
    const getData = async() => {
        let t = await getAllTodos()

        const temp = t.data.sort(function (a, b) {
            if (a.order < b.order) {
              return -1;
            }
            if (a.order > b.order) {
              return 1;
            }
            return 0;
          });
          console.log(temp)

        data = temp
        setTodos(temp)
        return temp
    }

    const resetFilter = async() => {
        setDate(null)
        setMonth(null)
        setYear(null)
        return await getData()
        
    }
    const onDateChange = async(newValue) => {
        let temp = await resetFilter()
        setMonth(null)
        setYear(null)
        setDate(newValue)
        const j = temp.filter(i => i.date.substring(0,15) == newValue.$d.toString().substring(0,15));
        setTodos(j)
    }
    const onMonthChange = async(newValue) => {
        let temp = await resetFilter()
        setDate(null)
        setYear(null)
        setMonth(newValue)
        const j = temp.filter(i => {
            let dt = new Date(i.date);
            if(dt.getMonth() === newValue.$M)
                return true
            return false
        })
        setTodos(j)
    }

    const onYearChange = async(newValue) => {
        let temp = await resetFilter()
        setDate(null)
        setMonth(null)
        setYear(newValue)
        const j = temp.filter(i => i.date.toString().substring(11,15) === newValue.$y.toString())
        setTodos(j)
    }
    
    const onTodoDragged = async() => {
        resetFilter()
        const response = await changeOrder(data)
        console.log(response)
        if(response.status === 200) {
            console.log("yes")
            window.location.reload(true);
        }
    }
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
                        <Button style={{backgroundColor: "brown", cursor: "pointer"}} variant="contained" onClick={resetFilter}>Reset</Button>
                    </DemoContainer>
                </LocalizationProvider>
            </div>
            <ReactDragList 
                dataSource={todos}
                row={(todo, index) => (
                    <div key={index}>
                        <TodoListItem todo={todo} />
                        <Divider sx={{marginLeft: '5%', marginRight: '5%'}} />
                    </div>
                )}
                handles={false}
                onUpdate={(record, index) => onTodoDragged()}
                className="simple-drag"
                rowClassName='simple-drag-row'
            />
            
        </div>
  )
}


