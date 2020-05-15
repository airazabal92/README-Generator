/* GLOBAL VARIABLES 
-------------------------------------------------------------*/
// Add Node standard library package for reading/writing files
const fs = require("fs");

// Inquirer dependency
const inquirer = require("inquirer");

// Axios dependency
const axios = require("axios");

let profilePicURL = "";
let licenseURL = "";
let licenseIncluded = "";

/* LOGIC & FUNCTIONS
-------------------------------------------------------------*/

function init() {
  // Ask user for input
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your GitHub username?",
        name: "username",
        //validate:
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
        name: "usage",
      },
      {
        type: "input",
        message:
          "What does the user need to know about contributing to the repo?",
        name: "contributing",
      },
    ])
    .then((answers) => {
      let queryURL = `https://api.github.com/users/${answers.username}`;
      console.log("QUERY " + queryURL);

      // Call GitHub API to get the user's profile picture
      axios.get(queryURL).then((gitHubData) => {
        profilePicURL = gitHubData.data.avatar_url;
        //console.log(gitHubData);
        //console.log("PROFILE " + profilePicURL);

        // Create the README outline and add the user inputted values
        const data = `
        ${answers.projectName} 
        \n ## Description 
        \n ${answers.description} 
        
        \n ## Table of Contents 
        \n * [Installation](#installation) 
        \n * [Usage](#usage) 
        \n * [Contributing](#contributing) 
        \n * [Tests](#tests) 
        \n * [Questions](#questions) 
        \n * [License](#license) 

        \n ## Installation 
        \n ${answers.dependencies} 
      
        \n ## Usage
        \n ${answers.usage}

        \n ## Contributing
        \n ${answers.contributing}

        \n ## Tests
        \n ${answers.tests}

        \n ## Questions
        \n If you have any questions, feel free to reach out! 
        \n ![Profile User](${profilePicURL})`;

        // Determine the URL for the license
        if (`${answers.license}` == "MIT") {
          licenseURL =
            "https://github.com/microsoft/vscode/blob/master/LICENSE.txt";
        } else if (`${answers.license}` == "APACHE 2.0") {
          licenseURL = "https://www.apache.org/licenses/LICENSE-2.0.txt";
        } else if (`${answers.license}` == "GPL 3.0") {
          licenseURL = "https://www.gnu.org/licenses/gpl-3.0.txt";
        } else if (`${answers.license}` == "BSD 3") {
          licenseURL =
            "https://tldrlegal.com/license/bsd-3-clause-license-(revised)#fulltext";
        } else {
          licenseURL = "";
        }

        // Set the license URL alongside the license name
        if (`${answers.license}` == "None") {
          licenseIncluded = "";
        } else {
          licenseIncluded = `\n ## License
        \n Licensed under the [${answers.license}](${licenseURL}) license.`;
        }

        // Add the data with the license info
        const finalData = data + licenseIncluded;

        // Call the function to write the data to the README.MD file
        writeToFile("test.md", finalData);
      });
    })
    .catch((error) => {
      if (error) {
        console.log(error);
      }
    });
}

// Write the data to the README.MD file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      console.log(error);
    }
  });
  console.log(data);
}

init();
