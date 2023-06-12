"use client";
import Image from "next/image";
import { Card } from "./components/Card";
import { getBlogPosts, setFifaPlayers } from "./fetch/getData";
import fifaStats from "./fifa.json";
import fmStats from "./fm.json";
import { IconBottomBg, IconTopBg } from "./images/bg";
import IconChart from "./images/icon-chart.png";
import IconMaths from "./images/icon-maths.png";
import IconPad from "./images/icon-pad.png";
import IconPlayer from "./images/icon-player.png";
import Logo from "./images/logo.png";

export function MainPage() {
  const { data: blogPost } = getBlogPosts();
  const { mutate } = setFifaPlayers();

  function handleButtonFifaClick() {
    fifaStats.map((stat) =>
      mutate({
        Name: stat.name,
        Overall: parseInt(stat.rating),
        Pace: parseInt(stat.pace),
        Shooting: parseInt(stat.shots),
        Passing: parseInt(stat.pass),
        Dribbling: parseInt(stat.dribble),
        Defense: parseInt(stat.defensive),
        Physical: parseInt(stat.physicality),
      })
    );
  }

  function handleButtonFmClick() {
    console.log(fmStats);
  }

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
          target="_blank"
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
        {blogPost &&
          blogPost.map((item) => (
            <Card
              title={item.title}
              content={item.description}
              date={item.date}
              imgUrl={item.imgUrl}
            />
          ))}
        <button onClick={handleButtonFifaClick}>Dodaj FIFA</button>
        <button onClick={handleButtonFmClick}>Dodaj FM</button>
      </div>
    </div>
  );
}

export default MainPage;
