const { readFromFile } = require('../fileio');

const taskList = readFromFile();

const list = () => {
  console.log('\nID Description');
  console.log('-- -----------');
  // The index is an optional parameter to the forEach argument function
  taskList.tasks.forEach((task, index) => {
    console.log(`${index + 1}  ${task}`);
  });
  console.log(`\nYou have ${taskList.tasks.length} tasks\n`);
};

module.exports = list;
