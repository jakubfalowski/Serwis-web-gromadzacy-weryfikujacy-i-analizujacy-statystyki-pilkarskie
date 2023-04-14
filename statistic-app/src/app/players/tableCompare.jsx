"use client"
import { useState } from "react";
import { playerTabFunction } from "./fetchData";
import { sortByOverallDifference, sortByOverallFifa, sortByOverallFm, sortByPaceFifa, sortByPaceFm, sortByPaceDifference, sortByPhysicalityDifference, sortByPhysicalityFm, sortByPhysicalityFifa, sortByAttackFifa, sortByAttackFm, sortByAttackDifference, sortByDefensiveFifa, sortByDefensiveFm, sortByDefensiveDifference } from "./sort";
import "../styles/Table.scss";

export function TableCompare() {

  const [playersData, setData] = useState()
  const [userPlayers, setUserPlayers] = useState(10)

  const [overallActive, setOverallActive] = useState(false);
  const [paceActive, setPaceActive] = useState(false);
  const [physicalityActive, setPhysicalityActive] = useState(false);
  const [attackActive, setAttackActive] = useState(false);
  const [defensiveActive, setDefensiveActive] = useState(false);
  const [option, setOption] = useState(0);

  const playerTab = new Array(0);

  function initalizeData(){

    function isEmpty(obj) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          return false;
        }
      }
      return true;
    }
    
    const nonEmptyPlayersData = playerTab[0].filter(obj => !isEmpty(obj));

    if(!playersData) setData(nonEmptyPlayersData.sort(sortByOverallFifa))
  }

  playerTabFunction().then((value, i) => {
    if (Array.isArray(value) && value.length){
      playerTab[playerTab.length] = value;
    }
  }).then(initalizeData)

  function returnTable(){
    
  }

  return (
    <div className="tableCompare">
    <h4>Tabela podsumowująca</h4>
    <div style={{marginBottom:"20px"}}>
        <span style={{paddingRight:"10px"}}>Wybierz ilość zawodników w kolumnie</span>
        <input
          type="number"
          min="1"
          max="426"
          value={userPlayers}
          onChange={(e) => e.target.valueAsNumber < 427 && e.target.valueAsNumber > 0 ? setUserPlayers(e.target.valueAsNumber): setUserPlayers(10)}
        />
    </div>
    
    <table border="red 1px solid">
      <thead>
        <tr>
          <td rowSpan={2}>Imie i nazwisko</td>
          <td>
            <button onClick={() => {
                if(playersData){
                  setData(playersData.sort(sortByOverallFifa))
                  setOverallActive(true)
                  setPaceActive(false)
                  setPhysicalityActive(false)
                  setAttackActive(false)
                  setDefensiveActive(false)
                  setOption(1)
                }
                
              }}>FIFA
            </button>
          </td>
          <td>
            <button onClick={() => {
                if(playersData){
                  setData(playersData.sort(sortByOverallFm))
                  setOverallActive(true)
                  setPaceActive(false)
                  setPhysicalityActive(false)
                  setAttackActive(false)
                  setDefensiveActive(false)
                  setOption(2)
                }
              }}>FM
            </button>
          </td>
          <td>
            <button onClick={() => {        
                if(playersData){
                  setData(playersData.sort(sortByOverallDifference))
                  setOverallActive(true)
                  setPaceActive(false)
                  setPhysicalityActive(false)
                  setAttackActive(false)
                  setDefensiveActive(false)
                  setOption(3)
                }
              }}>Różnica
            </button>
          </td>
          <td>
            <button onClick={() => {
                if(playersData){
                  setData(playersData.sort(sortByPaceFifa))
                  setOverallActive(false)
                  setPaceActive(true)
                  setPhysicalityActive(false)
                  setAttackActive(false)
                  setDefensiveActive(false)
                  setOption(1)
                }
              }}>FIFA
            </button>
          </td>
          <td>
            <button onClick={() => {
                if(playersData){
                  setData(playersData.sort(sortByPaceFm))
                  setOverallActive(false)
                  setPaceActive(true)
                  setPhysicalityActive(false)
                  setAttackActive(false)
                  setDefensiveActive(false)
                  setOption(2)
                }
              }}>FM
            </button>
          </td>
          <td>
            <button onClick={() => {
                if(playersData){
                  setData(playersData.sort(sortByPaceDifference))
                  setOverallActive(false)
                  setPaceActive(true)
                  setPhysicalityActive(false)
                  setAttackActive(false)
                  setDefensiveActive(false)
                  setOption(3)
                }
              }}>Różnica
            </button>
          </td>
          <td>
            <button onClick={() => {
                if(playersData){
                  setData(playersData.sort(sortByPhysicalityFifa))
                  setOverallActive(false)
                  setPaceActive(false)
                  setPhysicalityActive(true)
                  setAttackActive(false)
                  setDefensiveActive(false)
                  setOption(1)
                }
              }}>FIFA
            </button>
          </td>
          <td>
            <button onClick={() => {
                if(playersData){
                  setData(playersData.sort(sortByPhysicalityFm))
                  setOverallActive(false)
                  setPaceActive(false)
                  setPhysicalityActive(true)
                  setAttackActive(false)
                  setDefensiveActive(false)
                  setOption(2)
                }
              }}>FM
            </button>
          </td>
          <td>
            <button onClick={() => {
                if(playersData){
                  setData(playersData.sort(sortByPhysicalityDifference))
                  setOverallActive(false)
                  setPaceActive(false)
                  setPhysicalityActive(true)
                  setAttackActive(false)
                  setDefensiveActive(false)
                  setOption(3)
                }
              }}>Różnica
            </button>
          </td>
          <td>
            <button onClick={() => {
                if(playersData){
                  setData(playersData.sort(sortByAttackFifa))
                  setOverallActive(false)
                  setPaceActive(false)
                  setPhysicalityActive(false)
                  setAttackActive(true)
                  setDefensiveActive(false)
                  setOption(1)
                }
              }}>FIFA
            </button>
          </td>
          <td>
            <button onClick={() => {
                if(playersData){
                  setData(playersData.sort(sortByAttackFm))
                  setOverallActive(false)
                  setPaceActive(false)
                  setPhysicalityActive(false)
                  setAttackActive(true)
                  setDefensiveActive(false)
                  setOption(2)
                }
              }}>FM
            </button>
          </td>
          <td>
            <button onClick={() => {
                if(playersData){
                  setData(playersData.sort(sortByAttackDifference))
                  setOverallActive(false)
                  setPaceActive(false)
                  setPhysicalityActive(false)
                  setAttackActive(true)
                  setDefensiveActive(false)
                  setOption(3)
                }
              }}>Różnica
            </button>
          </td>
          <td>
            <button onClick={() => {
                if(playersData){
                  setData(playersData.sort(sortByDefensiveFifa))
                  setOverallActive(false)
                  setPaceActive(false)
                  setPhysicalityActive(false)
                  setAttackActive(false)
                  setDefensiveActive(true)
                  setOption(1)
                }
              }}>FIFA
            </button>
          </td>
          <td>
            <button onClick={() => {
                if(playersData){
                  setData(playersData.sort(sortByDefensiveFm))
                  setOverallActive(false)
                  setPaceActive(false)
                  setPhysicalityActive(false)
                  setAttackActive(false)
                  setDefensiveActive(true)
                  setOption(2)
                }
              }}>FM
            </button>
          </td>
          <td>
            <button onClick={() => {
                if(playersData){
                  setData(playersData.sort(sortByDefensiveDifference))
                  setOverallActive(false)
                  setPaceActive(false)
                  setPhysicalityActive(false)
                  setAttackActive(false)
                  setDefensiveActive(true)
                  setOption(3)
                }
              }}>Różnica
            </button>
          </td>
        </tr>
        <tr>
          <td colSpan={3}>Ocena ogólna</td>
          <td colSpan={3}>Szybkość</td>
          <td colSpan={3}>Fizyczność</td>
          <td colSpan={3}>Atak</td>
          <td colSpan={3}>Obrona</td>
        </tr>
      </thead>
      <tbody>
      {playersData &&
      playersData.map((player, index) =>
        {
          if(index < userPlayers) return(
            <tr key={index}>
              <td><a href={`/players/${player[0]}`}>{player[0]}</a></td>
              <td className={overallActive ? 'active' : ''}>{player[1]}</td>
              <td className={overallActive ? 'active' : ''}>{player[2]}</td>
              <td className={overallActive ? 'active' : ''}>{Math.abs(parseInt(player[1]) - parseInt(player[2]))}</td>
              <td className={paceActive ? 'active' : ''}>{player[3]}</td>
              <td className={paceActive ? 'active' : ''}>{player[4]}</td>
              <td className={paceActive ? 'active' : ''}>{Math.abs(parseInt(player[3]) - parseInt(player[4]))}</td>
              <td className={physicalityActive ? 'active' : ''}>{player[5]}</td>
              <td className={physicalityActive ? 'active' : ''}>{player[6]}</td>
              <td className={physicalityActive ? 'active' : ''}>{Math.abs(parseInt(player[5]) - parseInt(player[6]))}</td>
              <td className={attackActive ? 'active' : ''}>{player[7]}</td>
              <td className={attackActive ? 'active' : ''}>{player[8]}</td>
              <td className={attackActive ? 'active' : ''}>{Math.abs(parseInt(player[7]) - parseInt(player[8]))}</td>
              <td className={defensiveActive ? 'active' : ''}>{player[9]}</td>
              <td className={defensiveActive ? 'active' : ''}>{player[10]}</td>
              <td className={defensiveActive ? 'active' : ''}>{Math.abs(parseInt(player[9]) - parseInt(player[10]))}</td>
            </tr>
          )
    })}</tbody></table>
    </div>
  );
}

export default TableCompare;