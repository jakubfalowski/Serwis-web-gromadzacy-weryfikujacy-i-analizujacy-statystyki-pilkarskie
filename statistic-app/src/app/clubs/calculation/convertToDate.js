export function convertToDate(start_time){
    let year = 2022;
    let month = 6;
    let day = 4;
    let hour = -1;
    let minute = 0;
    let amountDaysInYear;
    let amountDaysInMonth;
    let difference = start_time - 1654293600

    for(let i = 0; i < 999; i++){
        if(year%4 === 0) amountDaysInYear = 366;
        else amountDaysInYear = 365;

        if(month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) amountDaysInMonth = 31;
        else if(month === 4 || month === 6 || month === 9 || month === 11) amountDaysInMonth = 30;
        else if(month === 2 && amountDaysInYear === 365) amountDaysInMonth = 28;
        else if(month === 2 && amountDaysInYear === 366) amountDaysInMonth = 29;

        if(difference >= 3600*24*amountDaysInYear) {
            year += 1;
            difference -= 3600*24*amountDaysInYear;
        }

        if(difference < 3600*24*amountDaysInYear && difference >= 3600*24*amountDaysInMonth){
            if(month !== 12) month += 1;
            else{
                year += 1;
                month = 1;
            } 

            difference -= 3600*24*amountDaysInMonth
        }

        if(difference < 3600*24*amountDaysInMonth && difference >= 3600*24){
            if(day !== amountDaysInMonth) day += 1;
            else{
                day = 1;
                if(month !== 12) month += 1;
                else{
                    year += 1;
                    month = 1;
                }
            }
            difference -= 3600*24
        }

        if(difference < 3600*24 && difference >= 3600){
            if(hour !== 23){
                hour += 1;
            }
            else{
                hour = 0;
                if(day !== amountDaysInMonth) day += 1;
                else{
                    day = 1;
                    if(month !== 12) month += 1;
                    else{
                        year += 1;
                        month = 1;
                    }
                }
            }
            difference -= 3600
        }

        if(difference < 3600 && difference >= 60){
            if(minute !== 59) minute += 1;
            else{
                minute = 0;
                if(hour !== 23) hour += 1;
                else{
                    hour = 0;
                    if(day !== amountDaysInMonth) day += 1;
                    else{
                        day = 1;
                        if(month !== 12) month += 1;
                        else{
                            year += 1;
                            month = 1;
                        }
                    }
                }
            }
            difference -= 60;
        }
    }


    if(minute < 10) minute = `0${minute}`
    // if(day < 10) day = `0${day}`
    // if(month < 10) month = `0${month}`
    return(`${hour}:${minute}, ${year}-${month}-${day}`)
}