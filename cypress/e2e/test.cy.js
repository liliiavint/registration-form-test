/* eslint-disable no-undef */
let names = "test";
let email = "mindaugas@mindaugas.com";
let dob = "2000-06-01";
let password = "mind";
let age = 34; 

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
      cy.contains("label", label).should("be.visible").and('not.be.disabled');
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
        .and("have.value", "")
        .and('not.be.disabled');
    });
  });
  
  it('should have specific input placeholders visible', () => {
    cy.get('input[placeholder="First and last name"]').should('be.visible');
    cy.get('input[placeholder="at least 4 characters"]').should('be.visible');
  });

  it('displays button "Create your account"', () => {
    cy.contains("button", /Create your account/i).should("be.visible")
  })
  });

describe('Successful registration', () => {
 
    it('User is able to fill registration form and seeing a successful message', () => {
      cy.fillRegistrationForm(names, email, password, dob);

      cy.get('#successful').should('be.visible');
      cy.get('#successful h4').should('contain.text', 'Your data has been successfully registered:');
      cy.get('#successful ul li:nth-child(1)').should('contain.text', 'Username:', names);
      cy.get('#successful ul li:nth-child(2)').should('contain.text', 'Email:', email); 
      cy.get('#successful ul li:nth-child(3)').should('contain.text', 'Age:', age); 
  });
});

describe('Filling and checking the registration form with the incorrect values', () => {
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

    cy.contains('#error h4', 'There was a problem:');
    cy.contains('#error ul li:nth-child(1)', 'Username is required.');
    cy.contains('#error ul li:nth-child(2)', 'Email is required.');
    cy.contains('#error ul li:nth-child(3)', 'Password is required.');
    cy.contains('#error ul li:nth-child(4)', 'Date of Birth is required.');
    });
});

it('User is able name of registration form fills long name and short password', () => {
  cy.fillRegistrationForm(names.repeat(10), email, password.slice(1), dob);

  cy.get('#error').should('be.visible');
  cy.contains('#error h4', 'There was a problem:');
  cy.contains('#error ul li:nth-child(1)', 'The text is too long, please write shorter!' );
  cy.contains('#error ul li:nth-child(2)', 'The password must be at least 4 characters.' );
});

it('User is able to register with password containing special characters', () => {
  cy.fillRegistrationForm(names, email, password + "!", dob);
  cy.get('#successful').should('be.visible');  
});

it('The Invalid Date of Birth users.', () => {
  cy.fillRegistrationForm(names, email, password, "2024-06-17");

  cy.get('#error').should('be.visible');
  cy.contains('#error h4', 'There was a problem:');
  cy.contains('#error ul li:nth-child(1)', 'Invalid Date of Birth.' );
});
