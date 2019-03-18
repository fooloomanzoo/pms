import { expect } from 'chai';

import { ProjectManagementSystem, Employee, Task, Project } from '../src/index.js';

describe('PMS', function() {
  describe('adding', function() {
    it('an employee (by arguments)', function(done) {
      expect( () => {
        const pms = new ProjectManagementSystem();
        pms.addEmployee('a', 'bcd');
      } ).not.to.throw();
      done();
    });

    it('an employee (by object)', function(done) {
      expect( () => {
        const pms = new ProjectManagementSystem();
        const e = new Employee('a', 'bcd');
        pms.addEmployee(e);
      } ).not.to.throw();
      done();
    });

    it('an project (by arguments)', function(done) {
      expect( () => {
        const pms = new ProjectManagementSystem();
        pms.addProject('a', '2020-02-01', 3);
      } ).not.to.throw();
      done();
    });

    it('an project (by object)', function(done) {
      expect( () => {
        const pms = new ProjectManagementSystem();
        const e = new Project('a', '2020-02-01', 3);
        pms.addProject(e);
      } ).not.to.throw();
      done();
    });

    it('an task (by arguments)', function(done) {
      expect( () => {
        const pms = new ProjectManagementSystem();
        pms.addTask('a', 'bcd', 3);
      } ).not.to.throw();
      done();
    });

    it('an task (by object)', function(done) {
      expect( () => {
        const pms = new ProjectManagementSystem();
        const e = new Task('a', 'bcd', 3);
        pms.addTask(e);
      } ).not.to.throw();
      done();
    });

  });

  describe('removing', function() {
    it('an project', function(done) {
      const pms = new ProjectManagementSystem();
      const p = new Project('f', '2021-12-01', 3);
      pms.addProject(p);
      pms.deleteProject(p);
      expect(pms.projects.size).to.equal(0);
      done();
    });

    it('an project, removed references (employee)', function(done) {
      const pms = new ProjectManagementSystem();
      const p = new Project('f', '2021-12-01', 3);
      const e = new Employee('a', 'bcd');

      let employeeIsAssigned = false;
      pms.addEmployee(e);
      pms.addProject(p);
      pms.assignProjectToEmployee(p, e);

      pms.employees.forEach(employee => {
        if (employee.projects.has(p)) {
          employeeIsAssigned = true;
        }
      });
      expect(employeeIsAssigned).to.be.true;

      pms.deleteProject(p);

      employeeIsAssigned = false;
      pms.employees.forEach(employee => {
        if (employee.projects.has(p)) {
          employeeIsAssigned = true;
        }
      });
      expect(employeeIsAssigned).to.be.false;
      expect(pms.projects.size).to.equal(0);
      expect(pms.employees.size).to.equal(1);
      done();
    });

    it('an project, removed references (task)', function(done) {
      const pms = new ProjectManagementSystem();
      const p = new Project('f', '2021-12-01', 3);
      const t = new Task('a', 'bcd', 3);

      let taskIsAssigned = false;
      pms.addTask(t);
      pms.addProject(p);
      pms.assignTaskToProject(t, p);

      pms.tasks.forEach(task => {
        if (task._assignedProject === p) {
          taskIsAssigned = true;
        }
      });
      expect(taskIsAssigned).to.be.true;

      pms.deleteProject(p);

      taskIsAssigned = false;
      pms.tasks.forEach(task => {
        if (task._assignedProject === p) {
          taskIsAssigned = true;
        }
      });
      expect(taskIsAssigned).to.be.false;
      expect(pms.projects.size).to.equal(0);
      expect(pms.tasks.size).to.equal(1);
      done();
    });

    it('an task', function(done) {
      const pms = new ProjectManagementSystem();
      const t = new Task('f', '2021-12-01', 3);
      pms.addTask(t);
      pms.deleteTask(t);
      expect(pms.tasks.size).to.equal(0);
      done();
    });

    it('an task, removed references (projects)', function(done) {
      const pms = new ProjectManagementSystem();
      const p = new Project('f', '2021-12-01', 3);
      const t = new Task('a', 'bcd', 3);

      let taskIsAssigned = false;
      pms.addTask(t);
      pms.addProject(p);
      pms.assignTaskToProject(t, p);

      pms.projects.forEach(project => {
        if (project.assignedTasks.has(t)) {
          taskIsAssigned = true;
        }
      });
      expect(taskIsAssigned).to.be.true;

      pms.deleteTask(t);

      taskIsAssigned = false;
      pms.projects.forEach(project => {
        if (project.assignedTasks.has(t)) {
          taskIsAssigned = true;
        }
      });
      expect(taskIsAssigned).to.be.false;
      expect(pms.projects.size).to.equal(1);
      expect(pms.tasks.size).to.equal(0);
      expect(t._assignedProject).to.be.null;
      done();
    });
  });

  describe('total days', function() {

    it('of single project', function(done) {
      const pms = new ProjectManagementSystem();
      const p = new Project('f', '2021-12-01', 3);
      pms.addProject(p);
      expect(pms.totalDays()).to.equal(3);
      done();
    });

    it('of multiple projects', function(done) {
      const pms = new ProjectManagementSystem();
      const p = new Project('a', '2021-12-01', 3);
      p.assignTask(new Task('a', 'bcd', 3));
      pms.addProject(p);
      pms.addProject('b', '2021-12-01', 4);
      pms.addProject('c', '2021-12-01', 5);
      expect(pms.totalDays()).to.equal(15);
      done();
    });
  });

  describe('view', function() {
    it('display all employees', function(done) {
      const pms = new ProjectManagementSystem();
      const p = new Project('p1', '2021-12-01', 3);
      const a = new Employee('a', 'bcd');
      const b = new Employee('b', 'bcd', a);
      pms.addEmployee(a);
      pms.addEmployee(b);
      pms.addEmployee(new Employee('c', 'bcd'));

      pms.assignProjectToEmployee(p, a);

      expect(pms.viewAllEmployees()).to.deep.equal([
        { name: 'a', lastname: 'bcd', projects: ["p1"] },
        { name: 'b', lastname: 'bcd', supervisor: { name: 'a', lastname: 'bcd' } },
        { name: 'c', lastname: 'bcd' }
      ]);
      done();
    });

    it('display all tasks assigned to a project', function(done) {
      const pms = new ProjectManagementSystem();
      const p = new Project('a', '2021-12-01', 3);

      pms.addProject(p);

      pms.assignTaskToProject(new Task('a', 'bcd', 3), p);
      pms.assignTaskToProject(new Task('b', 'bcd', 3), p);
      pms.assignTaskToProject(new Task('c', 'bcd', 3), p);

      expect(pms.viewAllTasksOfProject(p)).to.deep.equal([
        { name: 'a', description: 'bcd', estimated_days: 3 },
        { name: 'b', description: 'bcd', estimated_days: 3 },
        { name: 'c', description: 'bcd', estimated_days: 3 }
      ]);
      done();
    });
  });
});
