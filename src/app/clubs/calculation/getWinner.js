let XProbability = 35;
let HProbability = 0;
let AProbability = 0;
let render = 0;

export function getWinner(homeStrength, awayStrength){

    if(render < 1){
        homeStrength = parseInt(homeStrength);
        awayStrength = parseInt(awayStrength);

        const homePercent = (homeStrength/(awayStrength+homeStrength))*100;
        const awayPercent = 100-homePercent;

        let difference12 = Math.abs(homePercent-awayPercent);
        
        if(difference12 <= 20) XProbability -= difference12/2;
        else if(difference12 > 20 && difference12 <= 40) XProbability = (XProbability-10)-(difference12-20)/4;
        else if(difference12 > 40) XProbability = (XProbability-15)-((difference12-40)/8);

        HProbability = (100-XProbability)*(homePercent/100);
        AProbability = (100-XProbability)*(awayPercent/100);
        render++;
    }
    
    const ret = {home: HProbability.toFixed(2), draw: XProbability.toFixed(2), away: AProbability.toFixed(2)}
    return ret;
}