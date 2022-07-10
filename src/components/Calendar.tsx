import React, { useEffect, useState } from "react";
import { format, getDay, getMonth, startOfMonth,lastDayOfMonth, isSameMonth } from "date-fns"
import { Event } from "../types";

const Calendar = ({selectDay, sameMonth}: any) => {
    const calGrids = Array(42).fill(null);
    const weekdays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const [ firstOfMonthIdx, setFirstOfMonthIdx] = useState(null) as any;
    const [ selectMonth, setSelectMonth ] = useState(null) as any;
    const [ monthLength, setMonthLength ] = useState(null) as any;
    const [ today, setToday ] = useState(null) as any;
    

    useEffect(() => {
        setFirstOfMonthIdx(getDay(startOfMonth(new Date(selectDay))));
        setSelectMonth(months[getMonth(new Date(selectDay))]);
        const monthEnd = lastDayOfMonth(new Date(selectDay)).toString();
        setMonthLength(Number(monthEnd.split(' ')[2]));
        setToday(Number(format(new Date(), "dd")))
    }, [selectDay])
    
    const renderHeader = (array:Array<string>) => {
        return array.map((day:string, key) => <div key={key} className="cal-header">{day}</div>)
    }

    const renderGrid = (array: any) => {
        return array.map((day: any, key:any) => {
            if(key >= firstOfMonthIdx && key < (firstOfMonthIdx + monthLength)) {
                if(sameMonth && (today + firstOfMonthIdx - 1) === key) {
                    return <div key={key} className="cal-cel-selected" onClick={() =>{console.log(key)}}>{key - firstOfMonthIdx + 1} </div>
                } else {
                    return <div key={key} className="cal-cel-days" onClick={() =>{console.log(key)}}>{key - firstOfMonthIdx + 1} </div>
                }
            } else {
                return <div key={key} className="cal-cel"></div>
            }
        }
    )}
/*
    const selectDate = () => {
        const selectDate = 
        const selectMonth = 
        const selectYear = 
    }

*/
    return (
        <div className="cal-wrapper">
            <h1>{selectMonth}</h1>
            <div className="cal-table">
                {renderHeader(weekdays)}
                {renderGrid(calGrids)}
            </div>
        </div>
    )
}

export default Calendar;


    /*
    const longMonths: string[] = ['Jan', 'Mar', 'May', 'Jul', 'Aug', 'Oct', 'Dec']
    let today: any = new Date();
    let monthAndYear = today.toString().split(' ').slice(1,4)
    let currentDate = Number(monthAndYear.splice(1, 1));
    monthAndYear = monthAndYear.reverse().join(' ');
    const currentMonth: string = monthAndYear.split(' ')[1];
    const firstOfMonthIdx: number = new Date(monthAndYear).getDay();
    //add logic for Feb
    const numberOfDays: number = longMonths.indexOf(currentMonth) > -1 ? 31:30;
    */