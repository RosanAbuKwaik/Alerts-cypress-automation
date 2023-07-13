Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe("this is test for alerts boxes ", () => {
  it.skip("test the normal alert", () => {
    cy.visit("https://codenboxautomationlab.com/practice/");
    cy.get("#alertbtn");
    cy.on("window:alert", (themsg) => {
      expect(themsg).to.eql(
        "Hello , share this practice page who love to learn automation"
      );
    });
  });

//   prompt alerts :

  it("Alert prompt masg", () => {
    cy.visit("https://demo.automationtesting.in/Alerts.html");
    cy.window().then((win) => {
      cy.stub(win, "prompt").returns("rosa Abukwaik"); // to write in to the alert  box
    });
    cy.get("#Textbox > .btn").click();
    cy.get("#demo1").contains("rosa");
  });

//    Confirm Alerts :

  it("Confirm Alert ", () => {
    cy.visit("https://demo.automationtesting.in/Alerts.html");
    cy.get("#CancelTab > .btn").click();
    cy.on("window:confirm", () => true);
    cy.get("#demo").should("have.text", "You pressed Ok");
  });
  it("Confirm Alert with Cancle Button", () => {
    cy.visit("https://demo.automationtesting.in/Alerts.html");
    cy.get("#CancelTab > .btn").click();
    cy.on("window:confirm", () => false);
    cy.get("#demo").should("have.text", "You Pressed Cancel");
  });

  it("confirm Alert in with Ok button in onther website", () => {
    cy.visit("https://codenboxautomationlab.com/practice/");
    cy.get("#name").type("rosan@gmail.com");
    cy.on("window:confirm", (text) => {
      expect(text).to.contains("rosan");
      expect(text).to.eql(
        "Hello rosan@gmail.com, Are you sure you want to confirm?"
      );
      return true;
    });
    cy.get("#confirmbtn").click();
  });
  it("Confirm Alerts with cancle button", () => {
    cy.visit("https://codenboxautomationlab.com/practice/");
    cy.get("#name").type("rosan@gmail.com");
    cy.on("window:confirm", (text) => {
      return false;
    });
  });
});
