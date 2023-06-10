"use client";
import Image from "next/image";
import { Card } from "./components/Card";
import { IconBottomBg, IconTopBg } from "./images/bg";
import IconChart from "./images/icon-chart.png";
import IconMaths from "./images/icon-maths.png";
import IconPad from "./images/icon-pad.png";
import IconPlayer from "./images/icon-player.png";
import Logo from "./images/logo.png";

export function MainPage() {
  return (
    <div className="py-8 font-sans">
      <IconTopBg />
      <div className="w-full h-[600px] -my-0.5 bg-green-500 flex flex-col items-center text-white">
        <Image
          src={Logo}
          alt="logo"
          width={100}
          height={100}
          className="mt-8"
        />
        <h4 className="text-3xl my-4">Funkcjonalności</h4>
        <p className="max-w-sm my-4 text-center">Sprawdź co oferuje strona</p>
        <a
          href="https://github.com/jakubfalowski/analizerpilkarski"
          className="bg-white text-green-500 rounded-md px-8 py-4 font-bold"
        >
          Github aplikacji
        </a>
        <div className="max-w-3xl mt-8">
          <ol className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-24">
            <li className="flex">
              <div className="flex flex-col items-center justify-between flex-1">
                <Image src={IconChart} alt="logo" width={60} height={60} />
                <h1 className="text-center text-sm mt-4">
                  Najlepsze drużyny według atrybutu
                </h1>
                <a
                  href="/players"
                  className="bg-white text-green-500 rounded-md px-8 py-2 font-bold mt-2"
                >
                  Przejdź
                </a>
              </div>
            </li>
            <li className="flex">
              <div className="flex flex-col items-center justify-between flex-1">
                <Image src={IconMaths} alt="logo" width={60} height={60} />
                <h1 className="text-center text-sm mt-4">
                  Najbliższe spotkania
                </h1>
                <a
                  href="/clubs"
                  className="bg-white text-green-500 rounded-md px-8 py-2 font-bold mt-2"
                >
                  Przejdź
                </a>
              </div>
            </li>
            <li className="flex">
              <div className="flex flex-col items-center justify-between flex-1">
                <Image src={IconPad} alt="logo" width={60} height={60} />
                <h1 className="text-center text-sm mt-4">
                  Porównanie oceniania w grach
                </h1>
                <a
                  href="/players/game-chart"
                  className="bg-white text-green-500 rounded-md px-8 py-2 font-bold mt-2"
                >
                  Przejdź
                </a>
              </div>
            </li>
            <li className="flex">
              <div className="flex flex-col items-center justify-between flex-1">
                <Image src={IconPlayer} alt="logo" width={60} height={60} />
                <h1 className="text-center text-sm mt-4">
                  Porównanie zawodników
                </h1>
                <a
                  href="/players/club-chart"
                  className="bg-white text-green-500 rounded-md px-8 py-2 font-bold mt-2"
                >
                  Przejdź
                </a>
              </div>
            </li>
          </ol>
        </div>
      </div>
      <IconBottomBg />
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mt-32">Najnowsze informacje</h1>
        <Card
          title="Nowe funkcjonalności"
          content="W aplikacji zostało dodane połączenie z bazą danych. Dzięki temu możliwe jest przechowywanie i pobieranie danych 
            z zewnętrznego źródła, co ułatwia zarządzanie informacjami i dostęp do nich. Wprowadzono nowy wygląd aplikacji, aby poprawić jej
            estetykę i interakcję z użytkownikami. Może to obejmować zmiany wizualne, takie jak kolory, układy czy czcionki, które nadają aplikacji
            świeży i nowoczesny wygląd. Dokonano uaktualnienia danych w aplikacji. To oznacza, że istniejące informacje zostały zaktualizowane lub
          ulepszone, co może wpłynąć na dokładność, kompletność lub dostępność danych dla użytkowników."
          date="10 czerwca 2023 roku"
          imgUrl="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <Card
          title="Start działania aplikacji"
          content="Nasza aplikacja analizująca statystyki piłkarskie jest nieocenionym
            narzędziem dla trenerów, zawodników i pasjonatów piłki nożnej. Dzięki
            jej wyjątkowym funkcjom i możliwościom, jesteśmy w stanie dostarczyć
            najbardziej kompletny i zaawansowany zestaw danych związanych z piłką
            nożną."
          date="14 października 2022 roku"
          imgUrl="https://images.pexels.com/photos/2923/young-game-match-kids.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
      </div>
    </div>
  );
}

export default MainPage;
