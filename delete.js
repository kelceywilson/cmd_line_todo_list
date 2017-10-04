const { readFromFile, writeToFile } = require('./fileio');

const del = (taskNumber) => {
  const taskList = readFromFile();
  const taskListLength = taskList.tasks.length;
  console.log(taskNumber);
  if (parseInt(taskNumber) < 1 || parseInt(taskNumber) > taskListLength || taskNumber === NaN) {
    console.log('Missing or invalid id');
  } else {
    // bds: which way do you like better of harvesting the deleted / completed task?
    // bds: this way, or the way you used in complete.js? It's better to choose
    // bds: one and be consistent. Even better: make a file with helper functions
    // bds: and use the helper function to hold the repeated code. MUCH more
    // bds: maintainable -- you only need to update the code in one place when
    // bds: you make changes (as you will, in order to satisfy the spec of constant
    // bds: task ID after delete / complete ;-) )
    const deleted = taskList.tasks[taskNumber - 1];
    taskList.tasks.splice(taskNumber - 1, 1);
    writeToFile(taskList);
    console.log(`Deleted task ${taskNumber}: ${deleted}`);
  }
};

module.exports.del = del;
