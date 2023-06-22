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
            <div className="container mx-auto flex items-center pr-12 font-sans font-bold text-xl leading-6 h-[116px] ">
              <button onClick={() => router.push("/")}>
                <Image
                  src={Logo}
                  alt="logo"
                  width={60}
                  height={60}
                  className="mr-12"
                />
              </button>
              <button onClick={() => router.push("/players")} className="mr-12">
                Zawodnicy
              </button>
              <button onClick={() => router.push("/clubs")}>Kluby</button>
            </div>
            <Divider my="sm" variant="dashed" style={{ margin: "0px" }} />
          </div>
        }
        styles={() => ({
          main: {
            padding: 0,
          },
          root: {
            overflowX: "hidden",
            overflowY: props.forbidenScroll ?? "hidden",
            maxHeight: props.forbidenScroll ?? "100vh",
          },
        })}
      >
        <div className="mx-auto gradient-background p-0">{props.contain}</div>
      </AppShell>
    </QueryClientProvider>
  );
}

export default IAppShell;
