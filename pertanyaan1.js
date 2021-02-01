    const inquirer = require('inquirer');

    let array = [];
    let modXArray = [];
    let modXArrayIndex = [];
    let modYArrayIndex = [];
    function sourceArray (x,y,z){
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
        return array;
    }
    function modX (mod_x,x,y,z){
    array = sourceArray(x,y,z);
    array.forEach(e => { 
        if (e % mod_x == 0) {
            modXArray.push(e);
        }
    });
    return modXArray;
    }

    function modXIndex(x,y,z){
        modXArray = modX();
        array = sourceArray(x,y,z);
        modXArray.forEach(e => {
            index = array.indexOf(e);
            modXArrayIndex.push(index); 
        });
        return modXArrayIndex;
    }
    function modYIndex(b){
    modYArray = modX();
    modYArray.forEach(e => {
        if (e % b > 0) {
            modYArrayIndex.push(modYArray.indexOf(e))
        }
    })
    return modYArrayIndex;
    }

    function toInt(x){
        return x.split(',').map(Number);
    }


    const questions = [
    {
        type: 'input',
        name: 'input',
        message: "Input-1 ="
    }, 
    {
        type: 'input',
        name: 'mod_x',
        message: "Input-2: MOD divider X (MOD-X) =",
    }, {
        type: 'input',
        name: 'mod_y',
        message: "Input-3: MOD divider Y (MOD-Y) =",
    }
    ];

    inquirer.prompt(questions)
    .then(a => {
        console.log('Source Array is ', sourceArray(toInt(a.input)[0],toInt(a.input)[1],toInt(a.input)[2]));
        console.log('MOD-X Array is',  modX(a.mod_x,toInt(a.input)[0],toInt(a.input)[1],toInt(a.input)[2]));
        console.log('MOD-X = 0 Array Indexes from source is',modXIndex(toInt(a.input)[0],toInt(a.input)[1],toInt(a.input)[2]));
        console.log('MOD-Y > 0 Array Indexes from new MOD-Y Array is',modYIndex(a.mod_y));
    });