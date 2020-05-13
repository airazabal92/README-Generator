// Add Node standard library package for reading/writing files
const fs = require("fs");

// Inquirer dependency
const inquirer = require("inquirer");

const questions = [];

function writeToFile(fileName, data) {}

function init() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your GitHub username?",
        name: "username",
      },
      {
        type: "input",
        message: "What is your email?",
        name: "email",
      },
      {
        type: "input",
        message: "What is the URL of your project?",
        name: "projectURL",
      },
      {
        type: "input",
        message: "What is your project's name?",
        name: "projectName",
      },
      {
        type: "input",
        message: "Please write a short description of your project:",
        name: "description",
      },
      {
        type: "list",
        message: "What kind of license should your project have?",
        name: "license",
        choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"],
      },
      {
        type: "input",
        message: "What command should be run to install dependencies?",
        name: "dependencies",
      },
      {
        type: "input",
        message: "What command should be run to run tests?",
        name: "tests",
      },
      {
        type: "input",
        message: "What does the user need to know about using the repo?",
        name: "tests",
      },
      {
        type: "input",
        message:
          "What does the user need to know about contributing to the repo?",
        name: "contributing",
      },
    ])
    .then((answers) => {
      questions.push(`${answers.username}`);
      questions.push(`${answers.email}`);
      questions.push(`${answers.username}`);
      questions.push(`${answers.projectURL}`);
      questions.push(`${answers.projectName}`);
      questions.push(`${answers.description}`);
      questions.push(`${answers.license}`);
      questions.push(`${answers.dependencies}`);
      questions.push(`${answers.tests}`);
      questions.push(`${answers.contributing}`);

      questions.forEach((element) => {
        console.log(element);
      });
    })
    .catch((error) => {
      if (error) {
        console.log(error);
      }
    });
}

init();
