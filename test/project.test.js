import { expect } from 'chai';

import Task from '../src/models/task.js';
import Project from '../src/models/project.js';
import { fromDate } from '../src/utils/date.js';

describe('project', function() {
  describe('constructor', function() {
    it('should not accept no arguments', function(done) {
      expect( () => new Project() ).to.throw();
      done();
    });

    it('should not accept no name', function(done) {
      expect( () => new Project(undefined, '2020-02-01', 3) ).to.throw();
      done();
    });

    it('should not accept no start date', function(done) {
      expect( () => new Project('a', undefined, 3) ).to.throw();
      done();
    });

    it('should accept a default slack time', function(done) {
      expect( () => new Project('a', '2020-02-01') ).not.to.throw();
      expect( (new Project('a', '2020-02-01')).slack_time ).to.equal(0);
      done();
    });

    it('should not accept a negative slack time', function(done) {
      expect( () => new Project('a', '2020-02-01', -3) ).to.throw();
      done();
    });

    it('should not accept an invalid start date', function(done) {
      expect( () => new Project('a', 'abc', 3) ).to.throw();
      done();
    });

    it('should accept a name, a start date, and a slack time', function(done) {
      expect( () => new Project('a', '2020-02-01', 3) ).not.to.throw();
      done();
    });
  });

  describe('assigning tasks', function() {
    it('should accept a task', function(done) {
      const p = new Project('f', '2021-12-01', 3);
      const t = new Task('f', 'ghf', 3);
      p.assignTask(t);
      expect(p.assignedTasks.size).to.equal(1);
      expect(p.assignedTasks.has(t)).to.be.true;
      expect(t._assignedProject).to.be.equal(p);
      done();
    });

    it('should update deadline and totaldays', function(done) {
      const p = new Project('f', '2021-12-02', 3);
      const t = new Task('f', 'ghf', 3);
      const t2 = new Task('g', 'ghf', 2);
      const estimatedDeadline = fromDate('2021-12-10');
      p.assignTask(t);
      p.assignTask(t2);
      expect(p.deadline.getDate() - p.start_date.getDate()).to.equal(8);
      expect(p._totaldays).to.equal(8);
      console.log(p.deadline - estimatedDeadline);
      expect(+p.deadline).to.equal(+estimatedDeadline);
      done();
    });

    it('should not accept another object', function(done) {
      const p = new Project('f', '2021-12-01', 3);
      const t = {a: 'öö'};
      expect( () => p.assignTask(t) ).to.throw();
      done();
    });
  });

  describe('removing tasks', function() {
    it('should remove a task', function(done) {
      const p = new Project('f', '2021-12-01', 3);
      const t = new Task('f', 'ghf', 3);
      p.assignTask(t);
      p.removeTask(t);
      expect(p.assignedTasks.size).to.equal(0);
      expect(p.assignedTasks.has(t)).to.be.false;
      expect(p._totaldays).to.equal(p.slack_time);
      expect(t._assignedProject).to.be.null;
      done();
    });
  });
});
