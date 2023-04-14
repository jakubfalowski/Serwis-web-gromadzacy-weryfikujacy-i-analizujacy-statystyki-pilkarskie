import axios from 'axios';
import cheerio from 'cheerio';

const playerTab = new Array(9)
for(let i=0;i<=9;i++) playerTab[i]=new Array(0);

let numberOfPage = 0;

export default function Fm() { return new Promise((resolve, reject) => {
    for(numberOfPage; numberOfPage <= 26; numberOfPage++){
        axios.get(`https://fmdataba.com/21/l/2613/premier-league/best-players/${numberOfPage}`).then((res) => {
            const $ = cheerio.load(res.data);
            const playerName = $('a[title~=fm21] strong');
            const overall = $('td:nth-of-type(7) .veri61');
            const att = $('td:nth-of-type(8) .veri61');
            const def = $('td:nth-of-type(9) .veri61');
            const tech = $('td:nth-of-type(10) .veri61');
            const men = $('td:nth-of-type(11) .veri61');
            const phy = $('td:nth-of-type(12) .veri61');
            const spe = $('td:nth-of-type(13) .veri61');
            const club = $('a[title~=squad] span');
            const nation = $('a[title~=2021] span');

            $(playerName).each((i ,el) => {
                const item = $(el).text();
            playerTab[0].push(item);
            })

            $(overall).each((i ,el) => {
                const item = $(el).text();
                playerTab[1].push(item);
            })
            
            $(att).each((i ,el) => {
                const item = $(el).text();
                playerTab[2].push(item);
            })

            $(def).each((i ,el) => {
                const item = $(el).text();
                playerTab[3].push(item);
            })

            $(tech).each((i ,el) => {
                const item = $(el).text();
                playerTab[4].push(item);
            })

            $(men).each((i ,el) => {
                const item = $(el).text();
                playerTab[5].push(item);
            })

            $(phy).each((i ,el) => {
                const item = $(el).text();
                playerTab[6].push(item);
            })

            $(spe).each((i ,el) => {
                const item = $(el).text();
                playerTab[7].push(item);
            })

            $(club).each((i ,el) => {
                const item = $(el).text()
                playerTab[8].push(item);
            })

            $(nation).each((i ,el) => {
                const item = $(el).text()
                playerTab[9].push(item);
            })
        })
    }
        resolve(playerTab);
    })
}