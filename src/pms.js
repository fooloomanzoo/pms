import { validInstance } from './controler/error.js';

import Task from './models/task.js';
import Project from './models/project.js';
import Employee from './models/employee.js';

/**
 * @class ProjectManagementSystem
 * @classdesc class of the Project Management System
 */
class ProjectManagementSystem {

  constructor() {
    this.employees = new Set();
    this.projects = new Set();
    this.tasks = new Set();
  }

  /**
   * Adds an employee.
   * @param {string|Employee} name First name of the employee.
   * @param {string} lastname Last name of the employee.
   * @param {Employee} supervisor Supervisor of the employee.
   */
  addEmployee(name, lastname, supervisor) {
    // adding by assuming that there could be duplicate names
    if (arguments[0] instanceof Employee) {
      this.employees.add(arguments[0]);
    } else {
      this.employees.add(new Employee(name, lastname, supervisor));
    }
  }

  /**
   * Adds a project.
   * @param {string|Project} name The name of the project
   * @param {string|Date} start_date The starting date of the project.
   * @param {number} slack_time The number of days of slack time.
   */
  addProject(name, start_date, slack_time) {
    // adding by assuming that there could be duplicate names
    if (arguments[0] instanceof Project) {
      this.projects.add(arguments[0]);
    } else {
      this.projects.add(new Project(name, start_date, slack_time));
    }
  }

  /**
   * Deletes a project from the list.
   * @param {Project} project  The project.
   */
  deleteProject(project) {
    validInstance(project, Project);
    if (this.projects.has(project)) {
      this.projects.delete(project);
    }
    // remove projects from employees and tasks
    this.employees.forEach(employee => employee.removeProject(project));
    project.assignedTasks.forEach(task => task.removeProject());
  }

  /**
   * Adds a task.
   * @param {string|Task} name The name of the task.
   * @param {string} description The description of the task.
   * @param {number} estimated_days The estimated days of the task.
   */
  addTask(name, description, estimated_days) {
    // adding by assuming that there could be duplicate names
    if (arguments[0] instanceof Task) {
      this.tasks.add(arguments[0]);
    } else {
      this.tasks.add(new Task(name, description, estimated_days));
    }
  }

  /**
   * Deletes a task from the list.
   * @param {Task} task  The task.
   */
  deleteTask(task) {
    validInstance(task, Task);
    if (this.tasks.has(task)) {
      this.tasks.delete(task);
    }
    // remove projects from employees
    this.projects.forEach(project => project.removeTask(task));
  }

  /**
   * Assign a task to a project.
   * @param {Task} task  The task.
   * @param {Project} project  The project.
   */
  assignTaskToProject(task, project) {
    validInstance(task, Task);
    validInstance(project, Project);
    project.assignTask(task);
  }

  /**
   * Assign a project to an employee.
   * @param {Project} project  The project.
   * @param {Employee} employee  The employee.
   */
  assignProjectToEmployee(project, employee) {
    validInstance(project, Project);
    validInstance(employee, Employee);
    employee.assignProject(project);
  }

  /**
   * Computes the total days needed for a given list of projects (assuming that projects can't be worked on parallel)
   * @return {number}  The total days needed.
   */
  totalDays() {
    let days = 0;
    this.projects.forEach(project => {
      days += project._totaldays;
    });
    return days;
  }

  /**
   * View all employees
   * @return {Object[]} The array of descriptors.
   */
  viewAllEmployees() {
    let arr = [];
    this.employees.forEach(employee => arr.push(employee.toJSON()));
    return arr;
  }

  /**
   * View all task for a given project.
   * @param {Project} project  The project.
   * @return {Object[]} The array of descriptors.
   */
  viewAllTasksOfProject(project) {
    validInstance(project, Project);
    let arr = [];
    project.assignedTasks.forEach(task => arr.push(task.toJSON()));
    return arr;
  }
}

export default ProjectManagementSystem;
