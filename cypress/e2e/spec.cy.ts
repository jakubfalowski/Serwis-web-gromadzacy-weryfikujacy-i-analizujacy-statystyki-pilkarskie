describe("Testowanie pobrania danych i sortowania zawodników", () => {
  beforeEach(() => {
    cy.visit(
      "http://localhost:3000/players?sort=Pace&count=30&game=fminside&sortBy=ASC"
    );
  });

  let skillTab = new Array(0);
  skillTab[0] = new Array(0);

  it("Znajdowanie wszystkich elementów tablicy", () => {
    cy.wait(5000);
    cy.get("tr td:nth-of-type(3)").each(($column) => {
      cy.wrap($column).then(($stat) => {
        skillTab[0].push($stat.text());
      });
    });
  });

  it("Sprawdzanie filtru ilości zawodników", () => {
    expect(skillTab[0].length).to.be.equal(30);
  });

  it("Sprawdzanie sortowania FM, ASC", () => {
    for (let j = 1; j < skillTab[0].length; j++) {
      expect(parseInt(skillTab[0][j - 1])).to.be.lte(parseInt(skillTab[0][j]));
    }
  });
});

describe("Testowanie przekierowania zawodników", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/players");
  });

  const player = "Kevin De Bruyne";

  it("Za pomocą inputa", () => {
    cy.wait(3000);
    cy.get("input.mantine-Input-input").type(player);
    cy.get("#searchButton").click();
    cy.wait(5000);
    cy.get("#playerName").invoke('text').then((text) => {
      expect(text).to.be.equal(player);
    });
  });
});
