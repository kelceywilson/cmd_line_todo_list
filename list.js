const { readFromFile } = require('./fileio');

const taskList = readFromFile();

const list = () => {
  let idNumber = 1;
  console.log('\nID Description');
  console.log('-- -----------');
  // bds: no need to use the counter here. The index is an optional parameter to
  // bds: the forEach argument function
  // bds: try this: taskList.tasks.forEach((task, idNumber) => {...})
  taskList.tasks.forEach((task) => {
    console.log(`${idNumber}  ${task}`);
    idNumber += 1;
  });
  console.log(`\nYou have ${idNumber - 1} tasks\n`);
};

module.exports.list = list;
