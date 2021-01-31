const inquirer = require('inquirer');

let x = 78;
let y = 85;
let z = 95;
let array = [] ;
array[0] = x;
array[1] = y;
array[2] = z;
array[3] = array[2] + array[0];
array[4] = array[3] + array[1] + array[0];
array[5] = array[4] + array[3] + array[1];
array[6] = array[5] + array[4] + array[2];
array[7] = array[6] + array[5] + array[3];
array[8] = array[7] + array[6] + array[4];
array[9] = array[8] + array[7] + array[5];
array[10]= array[9] + array[8] + array[6];

console.log(array);
// const questions = [
//   {
//     type: 'input',
//     name: 'array_input',
//     message: "Input-1 ="
//   }, {
//     type: 'input',
//     name: 'mod_x',
//     message: "Input-2: MOD divider X (MOD-X) =",
//   }, {
//     type: 'input',
//     name: 'mod_y',
//     message: "Input-3: MOD divider Y (MOD-Y) =",
//   }
// ];

// inquirer.prompt(questions).then(answers => {
//   console.log('Source Array is');
//   console.log('MOD-X Array is');
//   console.log('MOD-X = 0 Array Indexes from source is');
//   console.log('MOD-Y > 0 Array Indexes from new MOD-Y Array is');
// });