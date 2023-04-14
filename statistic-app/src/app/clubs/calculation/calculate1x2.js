export function calculate1x2(homePercent, awayPercent, goals){
    let winHomePercent = 30;
    let drawPercent = 40;
    let winAwayPercent = 30;
    let result=''
    let degreeGoals = 0;

    if(goals < 60) degreeGoals = 1 // poniżej 2 goli na mecz
    if(goals >= 60 && goals < 70) degreeGoals = 2 // 2-2.(3)
    if(goals >= 70 && goals < 80) degreeGoals = 3 // 2.(3)-2.(6)
    if(goals >= 80 && goals < 90) degreeGoals = 4 // 2.(6)-3
    if(goals >= 90) degreeGoals = 5 // 3+


    if(homePercent>50 && homePercent<60){
      winHomePercent += (homePercent-50)*2 // (55) 40, (59) 48
      drawPercent -= (homePercent-50) // 35, 31
      winAwayPercent -= (homePercent-50) // 25, 21
    }
    else if(homePercent>=60){
      winHomePercent += 20 + (homePercent-60) // (70) 60, (90) 80, (60) 50
      drawPercent -= 10 - (homePercent-60)/2 // 25, 15, 30
      winAwayPercent -= 10 - (homePercent-60)/2 // 15, 5, 20
    }
    else if(homePercent<=50 && homePercent > 40){
        winAwayPercent += (awayPercent-50)*2
        drawPercent -= (awayPercent-50)
        winHomePercent -= (awayPercent-50)
    }
    else{
        winAwayPercent += 20 + (awayPercent-60)
        drawPercent -= 10 - (awayPercent-60)/2
        winHomePercent -= 10 - (awayPercent-60)/2
    }
    if(drawPercent > winAwayPercent && drawPercent > winHomePercent){
        if(degreeGoals === 1) result = '0-0'
        else if(degreeGoals === 2 || degreeGoals === 3) result = '1-1'
        else if(degreeGoals === 4 || degreeGoals === 5) result = '2-2'
    }
    else if(winHomePercent > winAwayPercent && winHomePercent > drawPercent){
        if(winHomePercent < (drawPercent+10)){
            if(degreeGoals === 1 || degreeGoals === 2) result = '1-0'
            if(degreeGoals === 3 || degreeGoals === 4) result = '2-1'
            if(degreeGoals === 5) result = '3-2'
        }
        else if(winHomePercent >= (drawPercent+10) && winHomePercent <(drawPercent+25)){
            if(degreeGoals === 1 || degreeGoals === 2) result = '2-0'
            if(degreeGoals === 3 || degreeGoals === 4) result = '3-1'
            if(degreeGoals === 5) result = '4-2'
        }
        else if(winHomePercent >= (drawPercent+25) && winHomePercent <(drawPercent+40)){
            if(degreeGoals === 1 || degreeGoals === 2 || degreeGoals === 3) result = '3-0'
            if(degreeGoals === 4) result = '4-1'
            if(degreeGoals === 5) result = '5-2'
        }
        else{
            result = '4-0'
        }
    }
    else if(winHomePercent < winAwayPercent && winAwayPercent > drawPercent){
        if(winAwayPercent < (drawPercent+10)){
            if(degreeGoals === 1 || degreeGoals === 2) result = '0-1'
            if(degreeGoals === 3 || degreeGoals === 4) result = '1-2'
            if(degreeGoals === 5) result = '2-3'
        }
        else if(winAwayPercent >= (drawPercent+10) && winAwayPercent <(drawPercent+25)){
            if(degreeGoals === 1 || degreeGoals === 2) result = '0-2'
            if(degreeGoals === 3 || degreeGoals === 4) result = '1-3'
            if(degreeGoals === 5) result = '2-4'
        }
        else if(winAwayPercent >= (drawPercent+25) && winAwayPercent <(drawPercent+40)){
            if(degreeGoals === 1 || degreeGoals === 2 || degreeGoals === 3) result = '0-3'
            if(degreeGoals === 4 ) result = '1-4'
            if(degreeGoals === 5) result = '2-5'
        }
        else{
            result = '0-4'
        }
    }
    return{
        result: result,
        home: winHomePercent,
        draw: drawPercent,
        away: winAwayPercent
    }
  }