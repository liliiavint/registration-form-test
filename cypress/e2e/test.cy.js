/* eslint-disable no-undef */
let names = "Mindaugas";
let email = "mindaugas@mindaugas.com";
let dob = "2000/06/01";
let age = new Date().getFullYear() - new Date(dob).getFullYear(); 

describe('visible component display', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('should match elements, label', () => {
    const labels = [
      "Your name",
      "Email",
      "Password",
      "Date of Birth"
    ];

    labels.forEach(label => {
      cy.contains("label", label).should("be.visible");
    });
  })

  it('should have empty and visible input elements', () => {
    const inputs = [
      '#username',
      '#email',
      '#password',
      '#dob'
    ];
    inputs.forEach(input => {
      cy.get(input)
        .should("be.visible")
        .and("have.value", "");
    });
  });

  
  it('should have specific input placeholders visible', () => {
    cy.get('input[placeholder="First and last name"]').should('be.visible');
    cy.get('input[placeholder="at least 4 characters"]').should('be.visible');
  });

  it('displays button "Create your account"', () => {
    const element = cy.contains("button", /Create your account/i)

    element.should("be.visible")
  })
  });


  describe('Successful registration', () => {

    beforeEach(() => {
      cy.visit('http://localhost:5173/')
    })
  
    it('User is able to fill registration form ', () => {
      cy.get('#username').type(names);
      cy.get('#email').type(email);
      cy.get('#password').type("mind");
      cy.get('#dob').type(dob);
      cy.contains('button', 'Create your account').click(); 

      cy.get('#successful').should('be.visible');
      cy.get('#successful h4').should('contain.text', 'Your data has been successfully registered:');
      cy.get('#successful ul li:nth-child(1)').should('contain.text', 'Username:', names);
      cy.get('#successful ul li:nth-child(2)').should('contain.text', 'Email:', email); 
      cy.get('#successful ul li:nth-child(3)').should('contain.text', 'Age:', age); 
  });

});


describe('Registration with mistake', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  });

  it('User is pressing button without filling up', () => {
    cy.get('#username').clear();
    cy.get('#email').clear();
    cy.get('#password').clear();
    cy.get('#dob').clear();

    cy.contains('button', 'Create your account').click(); 

    cy.get('#error').should('be.visible');

    cy.get('#error h4').should('contain.text', 'There was a problem:');
    cy.get('#error ul li').should(($li) => {
        expect($li).to.have.length(4);  
        expect($li.eq(0)).to.contain.text('Username is required.');
        expect($li.eq(1)).to.contain.text('Email is required.');
        expect($li.eq(2)).to.contain.text('Password is required.');
        expect($li.eq(3)).to.contain.text('Date of Birth is required.');
    });
});

  it('User is able name of registration form fills uppercase letters', () => {
    cy.get('#username').type(names.toUpperCase());
    cy.get('#email').type(email);
    cy.get('#password').type("mind");
    cy.get('#dob').type(dob);
    cy.contains('button', 'Create your account').click(); 

    cy.get('#error').should('be.visible');
    cy.get('#error h4').should('contain.text', 'There was a problem:');
    cy.get('#error ul li:nth-child(1)').should('contain.text', 'Username cannot contain uppercase letter.' );

  });

  
});

