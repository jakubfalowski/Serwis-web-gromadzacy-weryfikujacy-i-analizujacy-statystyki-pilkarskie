"use client"
export const playersFifaFunction = async () => {
  try{
      const response = await fetch(`http://localhost:3000/api/fifa`);
      const data = await response.json();
      return data;
  } catch(error){
    console.log(error)
  }
}

export const playersFmFunction = async () => {
  try{
      const response = await fetch(`http://localhost:3000/api/fm`);
      const data = await response.json();
      return data;
  } catch(error){
    console.log(error)
  }
}

export const playerTabFunction = async () => {
  let playersFifa;
  let playersFm;
  let playerTab;

  const getFifa = () => {
    return new Promise ((resolve, reject) => { 
      playersFifaFunction().then((value) => {
        playersFifa = value;
        resolve()
      })
    })
  }

  const getFm = () => {
    return new Promise ((resolve, reject) => { 
      playersFmFunction().then((value) => {
        playersFm = value;
        resolve()
      })
    })
  }

  const getTable = () => {
    return new Promise ((resolve, reject) => {
      if(playersFifa && playersFm){

        playerTab = new Array(437);
        for(let i=0;i<=437;i++) playerTab[i]=new Array(0);

        let indexPlayerTab = 0;

        let doubleSource = false;
        let doubleNameTab = [];
        let fifaCopy = playersFifa;

        for(let indexFifa = 0; indexFifa < 645; indexFifa++){
          for(let indexCopyFifa = 0; indexCopyFifa < 645; indexCopyFifa++){
            if(fifaCopy[indexCopyFifa].name === playersFifa[indexFifa].name && fifaCopy[indexCopyFifa].rating === playersFifa[indexFifa].rating && indexCopyFifa !== indexFifa && !doubleNameTab.includes(indexFifa) && !doubleNameTab.includes(indexCopyFifa)){
                doubleNameTab.push(indexCopyFifa)
              } 
          }
          
          doubleSource = false;
        
          for(let indexFm = 0; indexFm < 1080; indexFm++){
            if(playersFifa[indexFifa].name === playersFm[indexFm].name && !doubleNameTab.includes(indexFifa)){
              doubleSource = true;
              playerTab[indexPlayerTab].push(playersFifa[indexFifa].name)
              playerTab[indexPlayerTab].push(playersFifa[indexFifa].rating)
              playerTab[indexPlayerTab].push(playersFm[indexFm].rating*5)
              playerTab[indexPlayerTab].push(playersFifa[indexFifa].pace)
              playerTab[indexPlayerTab].push(playersFm[indexFm].pace*5)
              playerTab[indexPlayerTab].push(playersFifa[indexFifa].physicality)
              playerTab[indexPlayerTab].push(playersFm[indexFm].physicality*5)
              playerTab[indexPlayerTab].push(playersFifa[indexFifa].shots)
              playerTab[indexPlayerTab].push(playersFm[indexFm].attack*5)
              playerTab[indexPlayerTab].push(playersFifa[indexFifa].defensive)
              playerTab[indexPlayerTab].push(playersFm[indexFm].defensive*5)
              playerTab[indexPlayerTab].push(playersFifa[indexFifa].dribble)
              playerTab[indexPlayerTab].push(playersFifa[indexFifa].pass)
              playerTab[indexPlayerTab].push(playersFm[indexFm].technique*5)
              playerTab[indexPlayerTab].push(playersFm[indexFm].mentality*5)
              playerTab[indexPlayerTab].push(playersFm[indexFm].club)
              playerTab[indexPlayerTab].push(playersFm[indexFm].nation)
              indexPlayerTab++;
            } 
          }
          
          let playerOneSourceTab = [];

          if(doubleSource === false) playerOneSourceTab.push(playersFifa[indexFifa].name)
        }
      }
      resolve(playerTab)
    })
  }

  const getPlayerTab = async () => {
    const getValue = getFifa().then(getFm).then(getTable).then(async (value) => {
      const data = await value
      return data;
    })
    return getValue;
  }
  
  return getPlayerTab()
}

