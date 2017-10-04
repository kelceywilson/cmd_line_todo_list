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

// bds: general note on tests for this benchmark: it's better for the functions
// bds: in add, list, delete, etc to *return* a string, and then for the tasks
// bds: file to console.log that string
// bds: This way you can test the function output of, say, add independently of
// bds: testing the tasks file

// bds: also: you should be resetting the test file *every* test, and then
// bds: setting up only what you need for the test in that file.
// bds: Tests should not rely on previous tests to populate the test file.
// bds: What if the test populating the test file fails? Then the following test
// bds: would fail as well. Tests need to be independent.
// bds: Make heavy use of before() and beforeEach()


// run tests by running npm test on the command line

// sanity check
describe('Mocha sanity test', () => {
  it('should run our tests using npm', () => {
    expect(true).to.be.ok;
  });
});


// bds: this section's great :-)
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


// bds: more tests! Does it give the task the right task number?
// bds: does the task file have the right number of tasks if you add
// bds: when it's empty? Does it have the right number of tasks if you
// bds: add when it has a task? Does the task get the right task number
// bds: if you add after having deleted? After having completed?

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

// bds: more tests! What if the list is empty? Does it do the right thing after
// bds: deleting? After completing? And here, you're not testing
// bds: whether the output actually contains the expected tasks.
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

// bds: what other tests could you do here?
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

// bds: what other tests could you do here? 
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
