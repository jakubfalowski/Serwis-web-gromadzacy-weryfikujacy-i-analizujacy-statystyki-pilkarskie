describe('Testing player pages', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/players');
  })

  let skillTab = new Array(14);
  for(let i=0;i<=14;i++) skillTab[i]=new Array(0);

  it('Znajdowanie wszystkich elementów tablicy', () => {
    cy.wait(5000);
    cy.get('thead tr button').each(($td, index) => {
        cy.wrap($td).click();
        cy.wait(1000);
        cy.get('tbody tr').each($td2 => {
          cy.wrap($td2).find("td:nth-of-type(" + (index + 2) + ")").then(($skill) =>{
            skillTab[index].push($skill.text());
          })
        });
      });
  });

  it('Sprawdzanie poprawności sortowania', () => {
    for(let i = 0; i < skillTab.length; i++){
      for(let j = 0; j < skillTab[i].length; j++){
        if(j>0) expect(parseInt(skillTab[i][j-1])).to.be.gte(parseInt(skillTab[i][j]));  
      }
    }
  });
});