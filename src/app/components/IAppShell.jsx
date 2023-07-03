"use client";
import { AppShell, Divider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "../../index.css";
import Logo from "../images/logo.png";

export function IAppShell(props) {
  const router = useRouter();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppShell
        header={
          <div className="bg-white">
            <div className="container mx-auto flex items-center px-4 md:pr-12 font-sans font-bold text-xl leading-6 h-[116px] ">
              <a href="/">
                <Image
                  src={Logo}
                  alt="logo"
                  width={60}
                  height={60}
                  className="mr-12"
                />
              </a>
              <a
                href="/players"
                className="text-xs md:text-base pr-4 md:pr-12 md:px-8"
              >
                Zawodnicy
              </a>
              <a
                href="/clubs"
                className="text-xs md:text-base pr-4 md:pr-12 md:px-8"
              >
                Kluby
              </a>
              <a
                href="/players/game-chart"
                className="text-xs md:text-base pr-4 md:pr-12 md:px-8"
              >
                Wykres gier
              </a>
              <a href="/players/club-chart" className="text-xs md:text-base">
                Wykres klubów
              </a>
            </div>
            <Divider my="sm" variant="dashed" style={{ margin: "0px" }} />
          </div>
        }
        styles={() => ({
          main: {
            padding: 0,
          },
          root: {
            overflowX: props.forbidenScroll ? "hidden" : "",
            overflowY: "hidden",
            maxHeight: props.forbidenScroll ? "100vh" : "none",
            margin: "auto",
          },
        })}
      >
        <div className="mx-auto gradient-background p-0">{props.contain}</div>
      </AppShell>
    </QueryClientProvider>
  );
}

export default IAppShell;
