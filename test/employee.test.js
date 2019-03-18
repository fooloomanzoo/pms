import { expect } from 'chai';

import Employee from '../src/models/employee.js';
import Project from '../src/models/project.js';

describe('employee', function() {
  describe('constructor', function() {
    it('should not accept no arguments', function(done) {
      expect( () => new Employee() ).to.throw();
      done();
    });

    it('should not accept no name', function(done) {
      expect( () => new Employee(undefined, 'bcd') ).to.throw();
      done();
    });

    it('should not accept no lastname', function(done) {
      expect( () => new Employee('a') ).to.throw();
      done();
    });

    it('should accept a name and a lastname', function(done) {
      expect( () => new Employee('a', 'bcd') ).not.to.throw();
      done();
    });

    it('should accept a name, a lastname, and a supervisor', function(done) {
      const supervisor = new Employee('f', 'ghi');
      expect( () => new Employee('a', 'bcd', supervisor) ).not.to.throw();
      done();
    });

    it('should not accept a supervisor, that is not an instance of "Employee"', function(done) {
      const supervisor = { name: 'f', lastname: 'ghi' };
      expect( () => new Employee('a', 'bcd', supervisor) ).to.throw();
      done();
    });
  });

  describe('assigning projects', function() {
    it('should accept a project', function(done) {
      const e = new Employee('f', 'ghi');
      const p = new Project('f', '2021-12-01', 3);
      e.assignProject(p);
      expect(e.projects.size).to.equal(1);
      done();
    });

    it('should not accept another object', function(done) {
      const e = new Employee('f', 'ghi');
      const p = new Employee('fi', 'ghi');
      expect( () => e.assignProject(p) ).to.throw();
      done();
    });

    it('should not accept more than two projects', function(done) {
      const e = new Employee('f', 'ghi');
      const p1 = new Project('f', '2021-12-01', 3);
      const p2 = new Project('f', '2021-12-01', 3);
      const p3 = new Project('f', '2021-12-01', 3);
      e.assignProject(p1);
      expect(e.projects.size).to.equal(1);
      e.assignProject(p2);
      expect(e.projects.size).to.equal(2);
      e.assignProject(p3);
      expect(e.projects.size).to.equal(2);
      done();
    });
  });
});
