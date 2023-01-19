import {Anchor, Button} from "@mantine/core";

export default function WatchDiagrams(){
    return(
        <>
            <h4>Zobacz wykresy</h4>
            <Anchor href="players/game-chart">
                <Button variant="gradient" gradient={{ from: '#ad8881', to: '#4d331f', deg: 60 }}>Statystyki porównując gry</Button>
            </Anchor>
            <Anchor href="/players/club-chart">
                <Button variant="gradient" gradient={{ from: '#ad8881', to: '#4d331f', deg: 60 }} sx={{marginLeft:"10px"}}>Statystyki porównując atrybuty klubów</Button>
            </Anchor>
        </>
    )
}