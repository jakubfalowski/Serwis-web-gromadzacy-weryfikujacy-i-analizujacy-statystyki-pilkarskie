import axios from 'axios';
import cheerio from 'cheerio';

export async function Forebet() {

    const axiosTest = async () =>{
        const response = await axios.get('https://www.forebet.com/pl/prognozy-pi%C5%82karskie-polska/ekstraklasa');
        return response.data;
    }

    const data = await axiosTest();
    const $ = cheerio.load(data);
    const homeTeam = $('.homeTeam');
    const awayTeam = $('.awayTeam');
    const percents = $('.fprc span');
    const result = $('.ex_sc');
    const homeName = [];
    const awayName = [];
    const percentsAmount = [];
    const resultTab = [];
    const homePercent = [];
    const drawPercent = [];
    const awayPercent = [];


    const objects = {};

    $(homeTeam).each((i ,el) => {
        const item = $(el).text();
        homeName.push(item);
    })

    $(awayTeam).each((i ,el) => {
        const item = $(el).text();
        awayName.push(item);
    })

    $(percents).each((i ,el) => {
        const item = $(el).text();
        if(item !== '1' && item !== 'X' && item !== '2') percentsAmount.push(item);
    })

    for(let x = 0; x <= percentsAmount.length; x++){
        if(x % 3 === 0) homePercent.push(percentsAmount[x])
        else if(x % 3 === 1) drawPercent.push(percentsAmount[x])
        else if(x % 3 === 2) awayPercent.push(percentsAmount[x])
    }

    $(result).each((i ,el) => {
        const item = $(el).text();
        if(item !== 'Prognoza wyniku') resultTab.push(item);
    })

    for (let x = 0; x < resultTab.length; x++) {
        objects[x] = {homeName: homeName[x], awayName: awayName[x], homePercent: homePercent[x], drawPercent: drawPercent[x], awayPercent: awayPercent[x], result: resultTab[x]};
    }
    
    return objects;
}

export default Forebet;