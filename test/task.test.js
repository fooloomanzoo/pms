import { expect } from 'chai';

import Task from '../src/models/task.js';
import Project from '../src/models/project.js';

describe('task', function() {
  describe('constructor', function() {
    it('should not accept no arguments', function(done) {
      expect( () => new Task() ).to.throw();
      done();
    });

    it('should not accept no name', function(done) {
      expect( () => new Task(undefined, '2020-02-01', 3) ).to.throw();
      done();
    });

    it('should accept an empty description', function(done) {
      expect( () => new Task('a', '', 3) ).not.to.throw();
      done();
    });

    it('should not accept no estimated time', function(done) {
      expect( () => new Task('a', 'bcd') ).to.throw();
      done();
    });

    it('should not accept a negative estimated time', function(done) {
      expect( () => new Task('a', 'bcd', -3) ).to.throw();
      done();
    });

    it('should accept a name, a lastname, and a estimated time', function(done) {
      expect( () => new Task('a', 'bcd', 3) ).not.to.throw();
      done();
    });
  });

  describe('assign a project', function() {
    it('should assign a project', function(done) {
      const t = new Task('f', 'ghf', 3);
      const p = new Project('f', '2021-12-01', 3);
      t.assignProject(p);
      expect(p._assignedProject).not.to.be.null;
      done();
    });
  });

  describe('remove a project', function() {
    it('should remove a project', function(done) {
      const t = new Task('f', 'ghf', 3);
      const p = new Project('f', '2021-12-01', 3);
      t.assignProject(p);
      t.removeProject();
      expect(t._assignedProject).to.be.null;
      done();
    });
  });
});
