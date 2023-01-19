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

  const playerTab = new Array(0);

  function initalizeData(){
    if(playerTab[0] && !playersData) setData(playerTab[0].sort(sortByOverallFifa))
  }

  playerTabFunction().then((value) => {
    console.log(value)
    playerTab.push(value)
  }).then(initalizeData)

  return (
    <div className="tableCompare">
    <h4>Tabela podsumowująca</h4>
    <div style={{marginBottom:"20px"}}>
        <span style={{paddingRight:"10px"}}>Wybierz ilość zawodników w kolumnie</span>
        <input
        type="number"
        min="5"
        max="50"
        value={userPlayers}
        onChange={(e) => setUserPlayers(e.target.valueAsNumber)}
        />
    </div>
    
    <table border="red 1px solid">
      <thead>
        <tr>
          <td rowSpan={2}>Imie i nazwisko</td>
          <td>
            <button onClick={() => {
                if(playerTab[0]){
                  console.log("a")
                  setData(playerTab[0].sort(sortByOverallFifa))
                  console.log(playersData)
                  setOverallActive(true)
                  setPaceActive(false)
                  setPhysicalityActive(false)
                  setAttackActive(false)
                  setDefensiveActive(false)
                }
                
              }}>FIFA
            </button>
          </td>
          <td>
            <button onClick={() => {
                if(playerTab[0]){
                  console.log("a")
                  setData(playerTab[0].sort(sortByOverallFm))
                  console.log(playersData)
                  setOverallActive(true)
                  setPaceActive(false)
                  setPhysicalityActive(false)
                  setAttackActive(false)
                  setDefensiveActive(false)
                }
              }}>FM
            </button>
          </td>
          <td>
            <button onClick={() => {
                if(playerTab[0]){
                  setData(playerTab[0].sort(sortByOverallDifference))
                  setOverallActive(true)
                  setPaceActive(false)
                  setPhysicalityActive(false)
                  setAttackActive(false)
                  setDefensiveActive(false)
                }
              }}>Różnica
            </button>
          </td>
          <td>
            <button onClick={() => {
                if(playerTab[0]){
                  setData(playerTab[0].sort(sortByPaceFifa))
                  setOverallActive(false)
                  setPaceActive(true)
                  setPhysicalityActive(false)
                  setAttackActive(false)
                  setDefensiveActive(false)
                }
              }}>FIFA
            </button>
          </td>
          <td>
            <button onClick={() => {
                if(playerTab[0]){
                  setData(playerTab[0].sort(sortByPaceFm))
                  setOverallActive(false)
                  setPaceActive(true)
                  setPhysicalityActive(false)
                  setAttackActive(false)
                  setDefensiveActive(false)
                }
              }}>FM
            </button>
          </td>
          <td>
            <button onClick={() => {
                if(playerTab[0]){
                  setData(playerTab[0].sort(sortByPaceDifference))
                  setOverallActive(false)
                  setPaceActive(true)
                  setPhysicalityActive(false)
                  setAttackActive(false)
                  setDefensiveActive(false)
                }
              }}>Różnica
            </button>
          </td>
          <td>
            <button onClick={() => {
                if(playerTab[0]){
                  setData(playerTab[0].sort(sortByPhysicalityFifa))
                  setOverallActive(false)
                  setPaceActive(false)
                  setPhysicalityActive(true)
                  setAttackActive(false)
                  setDefensiveActive(false)
                }
              }}>FIFA
            </button>
          </td>
          <td>
            <button onClick={() => {
                if(playerTab[0]){
                  setData(playerTab[0].sort(sortByPhysicalityFm))
                  setOverallActive(false)
                  setPaceActive(false)
                  setPhysicalityActive(true)
                  setAttackActive(false)
                  setDefensiveActive(false)
                }
              }}>FM
            </button>
          </td>
          <td>
            <button onClick={() => {
                if(playerTab[0]){
                  setData(playerTab[0].sort(sortByPhysicalityDifference))
                  setOverallActive(false)
                  setPaceActive(false)
                  setPhysicalityActive(true)
                  setAttackActive(false)
                  setDefensiveActive(false)
                }
              }}>Różnica
            </button>
          </td>
          <td>
            <button onClick={() => {
                if(playerTab[0]){
                  setData(playerTab[0].sort(sortByAttackFifa))
                  setOverallActive(false)
                  setPaceActive(false)
                  setPhysicalityActive(false)
                  setAttackActive(true)
                  setDefensiveActive(false)
                }
              }}>FIFA
            </button>
          </td>
          <td>
            <button onClick={() => {
                if(playerTab[0]){
                  setData(playerTab[0].sort(sortByAttackFm))
                  setOverallActive(false)
                  setPaceActive(false)
                  setPhysicalityActive(false)
                  setAttackActive(true)
                  setDefensiveActive(false)
                }
              }}>FM
            </button>
          </td>
          <td>
            <button onClick={() => {
                if(playerTab[0]){
                  setData(playerTab[0].sort(sortByAttackDifference))
                  setOverallActive(false)
                  setPaceActive(false)
                  setPhysicalityActive(false)
                  setAttackActive(true)
                  setDefensiveActive(false)
                }
              }}>Różnica
            </button>
          </td>
          <td>
            <button onClick={() => {
                if(playerTab[0]){
                  setData(playerTab[0].sort(sortByDefensiveFifa))
                  setOverallActive(false)
                  setPaceActive(false)
                  setPhysicalityActive(false)
                  setAttackActive(false)
                  setDefensiveActive(true)
                }
              }}>FIFA
            </button>
          </td>
          <td>
            <button onClick={() => {
                if(playerTab[0]){
                  setData(playerTab[0].sort(sortByDefensiveFm))
                  setOverallActive(false)
                  setPaceActive(false)
                  setPhysicalityActive(false)
                  setAttackActive(false)
                  setDefensiveActive(true)
                }
              }}>FM
            </button>
          </td>
          <td>
            <button onClick={() => {
                if(playerTab[0]){
                  setData(playerTab[0].sort(sortByDefensiveDifference))
                  setOverallActive(false)
                  setPaceActive(false)
                  setPhysicalityActive(false)
                  setAttackActive(false)
                  setDefensiveActive(true)
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