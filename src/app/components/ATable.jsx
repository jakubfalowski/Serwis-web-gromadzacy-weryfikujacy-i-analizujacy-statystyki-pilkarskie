import { Table } from "@mantine/core";

export function ATable(value) {
  return (
    <Table>
      <thead>
        <tr className="bg-black h-16">
          <th style={{ color: "white" }}>Imie</th>
          <th style={{ color: "white" }}>FIFA</th>
          <th style={{ color: "white" }}>FM</th>
        </tr>
      </thead>
      <tbody>
        {value.value &&
          value.value.map((element, index) => (
            <tr
              key={element.Name}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <td>
                <a href={`/players/${element.Name}`} className="font-semibold">
                  {element.Name}
                </a>
              </td>
              <td>{element.FIFA}</td>
              <td>{element.FM}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
}
