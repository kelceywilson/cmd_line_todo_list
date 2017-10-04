const { readFromFile, writeToFile } = require('./fileio');

const add = (newTask) => {
  console.log(newTask);

  // bds: you could also say
  // bds: if (newTask)
  // bds: since newTask will be falsy if it's an empty string.
  // bds: but, as mentioned in the tasks file, that's a better place to handle
  // bds: bad user input.
  if (newTask !== '') {
    const taskList = readFromFile();
    taskList.tasks.push(newTask);
    writeToFile(taskList);

    // bds: what happens to the task number if a task is deleted?
    // bds: note the spec -- it wants task IDs to remain constant even after
    // bds: tasks are completed/deleted. This won't take care of that.
    // bds: Just a gentle reminder: paying careful attention to specs is going to be
    // bds: very important in the phase interview (and as a software engineer :-) )
    console.log(`Created task ${taskList.tasks.length}`);
  } else {
    console.log('Missing task');
  }
};

// bds: see comment in tasks file. would be better here to say
// bds: module.exports = add
module.exports.add = add;
