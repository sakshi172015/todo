import React, {useEffect, useState} from 'react'
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { getAllTodos } from '../requests';

export default function BarChart() {
    const [data, setData] = useState([])
    useEffect(() => {
        getData()
    }, [])
      
    const getData = async() => {
        let t = await getAllTodos()
        formatData(t.data)
    }

	const formatData = (res) => {
		const jan = res.filter(i => {
            let dt = new Date(i.date);
            if(dt.getMonth() === 0)
                return true
            return false
        })
		const feb = res.filter(i => {
            let dt = new Date(i.date);
            if(dt.getMonth() === 1)
                return true
            return false
        })
		const march = res.filter(i => {
            let dt = new Date(i.date);
            if(dt.getMonth() === 2)
                return true
            return false
        })
		const april = res.filter(i => {
            let dt = new Date(i.date);
            if(dt.getMonth() === 3)
                return true
            return false
        })
		const may = res.filter(i => {
            let dt = new Date(i.date);
            if(dt.getMonth() === 4)
                return true
            return false
        })
		const june = res.filter(i => {
            let dt = new Date(i.date);
            if(dt.getMonth() === 5)
                return true
            return false
        })
		const july = res.filter(i => {
            let dt = new Date(i.date);
            if(dt.getMonth() === 6)
                return true
            return false
        })
		const aug = res.filter(i => {
            let dt = new Date(i.date);
            if(dt.getMonth() === 7)
                return true
            return false
        })
		const sept = res.filter(i => {
            let dt = new Date(i.date);
            if(dt.getMonth() === 8)
                return true
            return false
        })
		const oct = res.filter(i => {
            let dt = new Date(i.date);
            if(dt.getMonth() === 9)
                return true
            return false
        })
		const nov = res.filter(i => {
            let dt = new Date(i.date);
            if(dt.getMonth() === 10)
                return true
            return false
        })
		const dec = res.filter(i => {
            let dt = new Date(i.date);
            if(dt.getMonth() === 11)
                return true
            return false
        })
		setData([jan.length, feb.length, march.length, april.length, may.length, june.length, july.length, aug.length, sept.length, oct.length, nov.length, dec.length])
	}

  	return (
    <div style={{ backgroundColor: "wheat"}}>
      <h1>BAR CHART - TODOS</h1>
      <div style={{ maxWidth: "650px" }}>
        <Bar
          data={{
            labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
            datasets: [
              {
                label: "total todos",
                data: data,
                borderWidth: 0.5,
              },
            ],
          }}
          // Height of graph
          height={400}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    // The y-axis value will start from zero
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              labels: {
                fontSize: 15,
              },
            },
          }}
        />
      </div>
    </div>
  )
  
}
