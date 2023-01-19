import axios from 'axios';
import cheerio from 'cheerio';

    const playerTab = new Array(7);
    for(let i=0;i<=7;i++) playerTab[i]=new Array(0);

    let numberOfPage = 1;

    export function Fifa(){ return new Promise((resolve, reject) => {
        for(numberOfPage; numberOfPage <= 14; numberOfPage++){
            axios.get(`https://www.futhead.com/21/players/?club=all&league=13&page=${numberOfPage}&level=all_nif&bin_platform=ps`).then((res) => {
                const $ = cheerio.load(res.data);
                const playerName = $('.player-name');
                const rating = $('.fut21');
                const pace = $('.player-right .player-stat:nth-of-type(1) .value');
                const shots = $('.player-right .player-stat:nth-of-type(2) .value');
                const passing = $('.player-right .player-stat:nth-of-type(3) .value');
                const dribbling = $('.player-right .player-stat:nth-of-type(4) .value');
                const defending = $('.player-right .player-stat:nth-of-type(5) .value');
                const physicality = $('.player-right .player-stat:nth-of-type(6) .value');
    
                $(playerName).each((i ,el) => {
                    const item = $(el).text();
                    playerTab[0].push(item);
                })
    
                $(rating).each((i ,el) => {
                    const item = $(el).text();
                    if(parseInt(item) > 10) playerTab[1].push(item);

                })
    
                $(pace).each((i ,el) => {
                    const item = $(el).text();
                    if(parseInt(item) > 10) playerTab[2].push(item);
                })
    
                $(shots).each((i ,el) => {
                    const item = $(el).text();
                    if(parseInt(item) > 10) playerTab[3].push(item);
                })
    
                $(passing).each((i ,el) => {
                    const item = $(el).text();
                    if(parseInt(item) > 10) playerTab[4].push(item);
                })
    
                $(dribbling).each((i ,el) => {
                    const item = $(el).text();
                    if(parseInt(item) > 10) playerTab[5].push(item);
                })
    
                $(defending).each((i ,el) => {
                    const item = $(el).text();
                    if(parseInt(item) > 10) playerTab[6].push(item);
                })
    
                $(physicality).each((i ,el) => {
                    const item = $(el).text();
                    if(parseInt(item) > 10) playerTab[7].push(item);
                })
            })
        }
        resolve(playerTab);
    })
}

export default Fifa;