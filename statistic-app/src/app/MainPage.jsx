"use client"
import { Card, Text, Badge, Button, Grid, Group, Anchor} from '@mantine/core';
import Image from "next/image";
import image1 from "./images/ratingsGames.jpg";
import image2 from "./images/bestTeams.jpg";
import image3 from "./images/comparePlayers.jpg";
import image4 from "./images/upcomingMatches.jpg";

export function MainPage() {
  return (
    <Grid>
        <Grid.Col md={6} sm={12}>
            <Card shadow="sm" p="lg" radius="md" withBorder>

                <Group position="apart" mt="md" mb="xs">
                    <Text weight={500}>Porównanie oceniania w grach</Text>
                    <Badge color="pink" variant="light">
                        FM, FIFA
                    </Badge>
                </Group>

                <Text className="description-page" size="sm" color="dimmed">
                    Ocenianie w grze Fifa odbywa się w zakresie 1-99, nastomiast Football Manager od 1-20. Nazwy atrybutów w obydwu źródłach są bardzo podobne,
                    ponieważ dotyczą tego samego przykładowo strzały, obrona, fizyczność. Jedyną różnicą jest to, że w grze Fifa piłkarzami steruje gracz,
                    a w Football Managerze sztuczna inteligencja na podstawie taktyki wybranej przez trenera (użytkownika). Stąd dodatkowe atrybuty w kolumnie mentalność.
                    Dodatkowo technika, która jest składową podań i dryblingu w grze Fifa została podzielona na dwie części, natomiast dane z symulatora trenera
                    piłkarskiego zostały ujęte w jednej kolumnie. Które ocenianie było bardziej łaskawe dla piłkarzy z ligi angielskiej? Dokładne przedstawienie
                    na podanym wykresie.
                </Text>

                <Anchor href='/players/game-chart'>
                    <Button variant="light" color="dark" fullWidth mt="md" radius="md">
                        Przejdź do podstrony
                    </Button>
                </Anchor>
            </Card>
        </Grid.Col>

        <Grid.Col md={6} sm={12}>
            <Card shadow="sm" p="lg" radius="md" withBorder>
                <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>Najlepsze drużyny według atrybutu</Text>
                <Badge color="pink" variant="light">
                    FM, FIFA
                </Badge>
                </Group>

                <Text className="description-page" size="sm" color="dimmed">
                    Ocenianie w grze ma wymiar nie tylko indywidualny. Można za pomocą statystyk danych zawodników zaobserwować, która drużyna skupia się na którym atrybucie gry.
                    Spośród wszystkich zawodników, którzy przynależą do danej drużyny z Premier League, wybrano 11 najlepszych pod względem overalla.
                    Najlepsze jedenastki zostały porównane pod kątem każdego z atrybutów pojawiających się w grach Football Manager i Fifa. A więc kto ma najlepszy atak, kto obrone, kto
                    transferuje do swojego klubu głównie szybkich zawodników, a kto dobrych technicznie?
                </Text>

                <Anchor href='/players/club-chart'>
                    <Button variant="light" color="dark" fullWidth mt="md" radius="md">
                        Przejdź do podstrony
                    </Button>
                </Anchor>
            </Card>
        </Grid.Col>
    
        <Grid.Col md={6} sm={12}>
            <Card shadow="sm" p="lg" radius="md" withBorder>
                <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>Porównanie zawodników</Text>
                <Badge color="pink" variant="light">
                    FM, FIFA, SofaScore
                </Badge>
                </Group>

                <Text className="description-page" size="sm" color="dimmed">
                    W piłce nożnej można kibicować nie tylko drużynom piłkarskim, ale również poszczególnym piłkarzom. W momencie gdy Robert Lewandowski zdobywa kolejne bramki oraz trofea,
                    duża część fanów piłkarskich pochodzących z Polski ogląda poczynania tego zawodnika, niezależnie od przynależności klubowej. Istnieją również rywalizacje pomiędzy
                    zawodnikami. Sterling czy Salah? De Bruyne czy Bruno Fernandez? Van Dijk czy Jan Bednarek? Na poniższej podstronie można dowiedzieć się, jak oceniają ich
                    specjaliści, zajmujący się ocenianiem w Fifie, Football Managerze i statystyki z sezonu 20/21 w Premier League.
                </Text>

                <Anchor href='/players'>
                    <Button variant="light" color="dark" fullWidth mt="md" radius="md">
                        Przejdź do podstrony
                    </Button>
                </Anchor>
            </Card>
        </Grid.Col>

        <Grid.Col md={6} sm={12}>
            <Card shadow="sm" p="lg" radius="md" withBorder>
                <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>Najbliższe spotkania</Text>
                    <Badge color="blue" variant="light">
                        Bukmacher, Forebet, własne
                    </Badge>
                </Group>

                <Text className="description-page" size="sm" color="dimmed">
                Czy jesteś gotów na kolejną emocjonującą kolejkę polskiej ekstraklasy? Zobacz, kto według różnych źródeł będzie zwycięzcą najbliższych meczów 
                i przygotuj się na niezapomniane emocje! Kliknij tutaj, aby zobaczyć najnowsze prognozy wyniku meczu i dowiedzieć się, kto będzie w najlepszej
                formie. Nie przegap swoich ulubionych drużyn w akcji i przygotuj się na niezapomniane emocje!
                </Text>

                <Anchor href='/clubs'>
                    <Button variant="light" color="dark" fullWidth mt="md" radius="md">
                        Przejdź do podstrony
                    </Button>
                </Anchor>
            </Card>
        </Grid.Col>
  </Grid>
  );
}

export default MainPage;