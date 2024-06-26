const getPromiseWithExecutors = () => {
  let resolve: Function;
  let reject: Function;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return {
    promise,
    resolve,
    reject,
  };
};

describe("posts page", () => {
  it("should redirect to login page when token is not present in local storage", () => {
    cy.visit("/posts");
    cy.url().should("equal", "http://localhost:5173/");
  });

  it("should show error when something goes wrong on the server", () => {
    const { resolve, promise } = getPromiseWithExecutors();

    cy.intercept("get", "http://0.0.0.0:3000/posts", async (req) => {
      return promise.then(() => {
        req.reply({
          statusCode: 500,
        });
      });
    });

    cy.visit("/posts", {
      onBeforeLoad: (win) => {
        win.localStorage.setItem(
          "token",
          "d7720048-d6a0-4a6e-a32f-3900e266be9a",
        );
      },
    });

    cy.contains("loading", { matchCase: false })
      .should("exist")
      .then(() => {
        resolve();

        cy.contains("loading", { matchCase: false }).should("not.exist");
        cy.contains("error", { matchCase: false }).should("exist");
      });
  });

  it("should fetch list of posts", () => {
    const { resolve, promise } = getPromiseWithExecutors();

    cy.intercept("get", "http://0.0.0.0:3000/posts", async (req) => {
      return promise.then(() => {
        req.reply({
          statusCode: 200,
          body: [
            {
              id: "6fbe024f-2316-4265-aa6e-8d65a837e308",
              content:
                "Cur defluo laboriosam curvo aqua vigor avaritia tergo thesaurus sumptus. Thorax combibo aliquam stultus eaque utor uredo varius tricesimus ago. Adflicto certe assentator adulatio utrimque spargo altus optio curiositas.",
              title:
                "Vita cupiditas expedita avaritia stultus clam comedo ara.",
              likes: 69,
            },
            {
              id: "cd600c9f-ab44-47c3-b117-7e14e412801a",
              content:
                "Verbum cena coaegresco deprimo. Adnuo maxime natus porro arca viscus odit. Subseco callide ambulo expedita cupio.",
              title:
                "Suasoria depromo cupio hic admiratio teneo facilis adipisci sonitus apud.",
              likes: 52,
            },
            {
              id: "cf09ee82-72ec-4668-92ae-559cab2eb9ac",
              content:
                "Tenax centum consuasor vehemens tardus. Uxor vobis absum somnus deripio quasi. Amplus tersus vir.",
              title: "Defaeco conspergo nesciunt.",
              likes: 95,
            },
            {
              id: "663cec94-0c92-4598-b0eb-57ec9704edb8",
              content:
                "At demergo approbo. Vicissitudo aureus subiungo delectus aedificium callide temeritas distinctio. Bellicus vesica admiratio sum earum ante at accusantium crustulum.",
              title: "Amita ad dolore.",
              likes: 24,
            },
            {
              id: "1d4838fd-4134-4199-bf68-50dc43bc966d",
              content:
                "Cursus iure cursus approbo conturbo adulatio arguo animus. Adinventitias veritatis amita tero caelum praesentium summisse adeptio laborum solium. Aperio aequitas claustrum.",
              title:
                "Contra minus cervus barba aer casus argentum tam arx autus.",
              likes: 94,
            },
            {
              id: "95f0db34-739f-4de2-ac0a-107d9c9758f1",
              content:
                "Crastinus dolor ipsa bibo. Veritatis sortitus deinde celo apparatus aeger tendo corpus. Quod aestas bellum allatus.",
              title:
                "Ascisco aeger consuasor cavus allatus thymum arbitro aut vicinus.",
              likes: 64,
            },
            {
              id: "98de9451-bb8c-4be2-8ea0-63b9cf6fe83e",
              content:
                "Vester cribro claustrum depereo aspernatur peccatus acidus inflammatio. Vester titulus versus corporis crur peior. Adeo atavus conspergo antepono aeternus appono suadeo dicta abundans acer.",
              title: "Vinum vito tres concido accendo demens.",
              likes: 17,
            },
            {
              id: "1582ec85-4f59-4ee3-9d0e-f7685c9427f9",
              content:
                "Viridis optio blanditiis. Carpo timor urbanus comburo canto vapulus. Nesciunt illum auctus aureus tertius odit perspiciatis administratio adnuo.",
              title: "Curia admiratio spoliatio.",
              likes: 40,
            },
            {
              id: "e90dfc64-f192-4d39-b6a5-4b9bc1d0ccbe",
              content:
                "Commodi celer speciosus. Defendo contigo creber capto cunctatio acervus. Exercitationem cometes aperte quasi laudantium curtus.",
              title: "Voluptate curiositas spiritus stillicidium.",
              likes: 20,
            },
            {
              id: "46053c0e-eeca-4840-844d-88dc291b087c",
              content:
                "Aeger deleniti tondeo conicio repellat aegrotatio terebro. Sufficio ager capio vomito adinventitias attonbitus. Tonsor uredo utique aer sto.",
              title: "Modi audeo arto enim deleo venio conitor demo.",
              likes: 22,
            },
          ],
        });
      });
    });

    cy.visit("/posts", {
      onBeforeLoad: (win) => {
        win.localStorage.setItem(
          "token",
          "d7720048-d6a0-4a6e-a32f-3900e266be9a",
        );
      },
    });

    cy.contains("loading", { matchCase: false })
      .should("exist")
      .then(() => {
        resolve();

        cy.contains("loading", { matchCase: false }).should("not.exist");
        cy.get("[data-cy='card']").should("have.length", 10);
      });
  });
});
