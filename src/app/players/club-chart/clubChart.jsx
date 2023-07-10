"use client";
import { getClubsData } from "../../fetch/getData";
import { Charts } from "./charts";

export function ClubChart() {
  const { data: overallData } = getClubsData("Overall");
  const { data: paceData } = getClubsData("Pace");
  const { data: shotData } = getClubsData("Shooting");
  const { data: passData } = getClubsData("Passing");
  const { data: dribblingData } = getClubsData("Dribbling");
  const { data: defenseData } = getClubsData("Defense");
  const { data: physicalData } = getClubsData("Physical");

  return (
    <div>
      <div className="container mx-auto">
        <Charts
          data={overallData}
          dataKey1="club_total_FIFA"
          dataKey2="club_total_FM"
          description="Siła zespołów - ocena ogólna"
        />
        <Charts
          data={paceData}
          dataKey1="club_total_FIFA"
          dataKey2="club_total_FM"
          description="Zespoły najszybsze"
        />
        <Charts
          data={shotData}
          dataKey1="club_total_FIFA"
          dataKey2="club_total_FM"
          description="Zespoły najlepsze w ofensywie"
        />
        <Charts
          data={passData}
          dataKey1="club_total_FIFA"
          dataKey2="club_total_FM"
          description="Zespoły najlepiej podające"
        />
        <Charts
          data={dribblingData}
          dataKey1="club_total_FIFA"
          dataKey2="club_total_FM"
          description="Zespoły posiadające najlepszych dryblerów"
        />
        <Charts
          data={defenseData}
          dataKey1="club_total_FIFA"
          dataKey2="club_total_FM"
          description="Zespoły najlepsze w defensywie"
        />
        <Charts
          data={physicalData}
          dataKey1="club_total_FIFA"
          dataKey2="club_total_FM"
          description="Zespoły najlepsze fizycznie"
        />
      </div>
    </div>
  );
}
export default ClubChart;
