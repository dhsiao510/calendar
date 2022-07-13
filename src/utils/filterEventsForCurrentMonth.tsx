import { Event } from "../types";

export const currentMonthsEventsToDayMap = (array: Event[], targetMonth: string, targetYear: string) => {
    if(!array.length) return;
    const map = {} as any;
    array.forEach((event: any) => {
        const splitDate = event.date.split(' ');
        if(splitDate[0] === targetMonth && splitDate[2] === targetYear) {
          map[splitDate[1]] = {
            name: event.name,
            date: event.date,
            description: event.description,
            type: event.type
          }
        }
      })
    return map;
}

export default currentMonthsEventsToDayMap;