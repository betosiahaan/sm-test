const inquirer = require('inquirer');

const questions = [
  {
    type: 'input',
    name: 'x',
    message: "Input: AreaID ="
  }
];

inquirer.prompt(questions).then(answers => {
  console.log('Output : \n ....');
});