import React, { useState } from "react";

const Calendar = () => {
    const weekdays: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const longMonths: string[] = ['January', 'March', 'May', 'July', 'August', 'October', 'December']
    
    let today: any = new Date();
    today = today.toString().split(' ').slice(2,4).reverse().join(' ');
    const currentMonth: string = months[today.split(' ')[1] - 1];
    const firstOfMonthIdx: number = new Date(today).getDay();
    console.log(firstOfMonthIdx)
    const calGrids = Array(42).fill(null);
    const numberOfDays: number = longMonths.indexOf(currentMonth) > -1 ? 31:30;



    const renderHeader = (array:Array<string>) => {
        return array.map((day:string, key) => <div key={key} className="cal-header">{day}</div>)
    }
    const renderGrid = (array: any) => {
        return array.map((day: any, key:any) => {
            if(key >= firstOfMonthIdx && key < (firstOfMonthIdx + numberOfDays)) {
                return <div key={key} className="cal-cel-days" onClick={() =>{console.log(key)}}>{key - firstOfMonthIdx + 1} </div>
            } else {
                return <div key={key} className="cal-cel"></div>
            }
        }
    )}

    const selectDate = () => {
    }


    return (
        <div className="cal-wrapper">
            <h1>{currentMonth}</h1>
            <div className="cal-table">
                {renderHeader(weekdays)}
                {renderGrid(calGrids)}
            </div>
        </div>
    )
}

export default Calendar;