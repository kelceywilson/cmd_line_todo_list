const { expect } = require('chai');
const { exec } = require('child_process');
// these requires require fileio.js, which causes the taskFile to be created
const { add } = require('./add');
const { list } = require('./list');
const { del } = require('./delete');
const { comp } = require('./complete');

const {
  readFromFile,
  writeToFile,
  taskFile,
} = require('./fileio');

// run tests by running npm test on the command line

// sanity check
describe('Mocha sanity test', () => {
  it('should run our tests using npm', () => {
    expect(true).to.be.ok;
  });
});

// test suite covering missing or invalid commands
describe('error message for missing or invalid commands', () => {
  // test specs (unit tests)
  it('displays error msg for missing command', (done) => {
    exec('./tasks', (err, stdout, stderr) => {
      expect(stdout).to.include('Missing or invalid command');
      // done has to run before it can move on to next test
      done();
    });
  });
  it('displays error for invalid command', (done) => {
    exec('./tasks blah', (err, stdout, stderr) => {
      expect(stdout).to.include('Missing or invalid command');
      done();
    });
  });
});

// test suite covering functions
describe('add()', () => {
  it('is a function', () => {
    expect(add).to.be.a('function');
  });
  it('displays success message when task added', (done) => {
    exec('./tasks add add test', (err, stdout, stderr) => {
      expect(stdout).to.include('Created task');
      done();
    });
  });
  it('displays error when "add" is not followed by a task', (done) => {
    exec('./tasks add', (err, stdout, stderr) => {
      expect(stdout).to.include('Missing task');
      done();
    });
  });
});

describe('list()', () => {
  it('is a function', () => {
    expect(list).to.be.a('function');
  });
  it('displays task list', (done) => {
    exec('./tasks list', (err, stdout, stderr) => {
      expect(stdout).to.include('ID Description');
      done();
    });
  });
});

describe('del()', () => {
  let taskList;
  beforeEach((done) => {
    taskList = readFromFile();
    done();
  });
  it('is a function', () => {
    expect(del).to.be.a('function');
  });
  it('displays success message when task deleted', (done) => {
    exec(`./tasks delete ${taskList.tasks.length}`, (err, stdout, stderr) => {
      expect(stdout).to.include('Deleted task');
      done();
    });
  });
  it('displays an error if the task id entered does not exist', (done) => {
    exec(`./tasks delete ${taskList.tasks.length}`, (err, stdout, stderr) => {
      expect(stdout).to.include('Missing or invalid id');
      done();
    });
  });
});

describe('comp()', () => {
  let taskList;
  before((done) => {
    exec('./tasks add comp test', (err, stdout, stderr) => { done(); });
  });
  it('is a function', () => {
    expect(comp).to.be.a('function');
  });
  beforeEach((done) => {
    taskList = readFromFile();
    done();
  });
  it('displays success message when task completed', (done) => {
    console.log(taskList.tasks.length);
    exec(`./tasks complete ${taskList.tasks.length}`, (err, stdout, stderr) => {
      expect(stdout).to.include('Completed task');
      done();
    });
  });
  it('displays an error if the task id entered does not exist', (done) => {
    exec(`./tasks complete ${taskList.tasks.length}`, (err, stdout, stderr) => {
      expect(stdout).to.include('Missing or invalid id');
      done();
    });
  });
});


// it('displays success message when task completed', (done) => {
//   exec(`./tasks complete ${taskList.tasks.length}`, (err, stdout, stderr) => {
//     expect(stdout).to.include('Completed task');
//     done();
//   });
// });

// it('displays error for missing or invalid id', (done) => {
//   exec('./tasks delete', (err, stdout, stderr) => {
//     expect(stdout).to.include('Missing or invalid id');
//     done();
//   });
// });
//   context('no tasks exist', () => {
//     beforeEach(() => {
//       fs.unlinkSync(taskFile);
//       initializeFile();
//     });
//     it('should add a task', () => {
//       add('new task');
//       const tasks = readFromFile();
//       expect(tasks.length).to.equal(1);
//     });
//     it('should display confirmation message', () => {
//
//     });
//   });
// });


// expect(add).to.be.a('function')
// expect(add('a task')).to.be.an('undefined')
// });
