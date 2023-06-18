"use client";
import { Autocomplete, Button, Group } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getCompare } from "../fetch/getData";

export function SearchPlayers() {
  const data = getCompare("Overall", "futhead", "DESC");
  const ref = useRef(null);
  const router = useRouter();
  const [names, setNames] = useState([]);

  useEffect(() => {
    const extractedNames =
      data && data.data && data.data.map((imie) => imie.Name);
    setNames(extractedNames);
  }, [data]);

  return (
    <div className="pl-4">
      <h1 className="text-4xl font-bold mt-16 mb-8">
        Wyszukaj konkretnego zawodnika
      </h1>
      {names && (
        <Group className="buttonDown">
          <Autocomplete
            placeholder="Wpisz nazwę zawodnika"
            data={names}
            ref={ref}
            style={{ minWidth: "600px" }}
          />
          <Button
            style={{ backgroundColor: "black" }}
            onClick={() => {
              if (ref.current.value !== "") {
                window.location.href = `/players/${ref.current.value}`;
              }
            }}
          >
            Przekieruj
          </Button>
        </Group>
      )}
    </div>
  );
}
export default SearchPlayers;
