import { validType, validInstance } from '../controler/error.js';

import Project from './project.js';

/**
 * @class Employee
 * @classdesc Employee class of the Project Management System
 * @constructor
 * @param {string} name First name of the employee.
 * @param {string} lastname Last name of the employee.
 * @param {Employee} supervisor Supervisor of the employee.
 */
class Employee {

  constructor(name, lastname, supervisor) {
    this.name = name;
    this.lastname = lastname;
    this.supervisor = supervisor;
    this._projects = new Set();
  }

  /**
   * The name of the employee.
   * @type {string}
   */
  get name() {
    return this._name;
  }

  set name(name) {
    validType(name, 'string', true);
    this._name = name;
  }

  /**
   * The last name of the employee.
   * @type {string}
   */
  get lastname() {
    return this._lastname;
  }

  set lastname(lastname) {
    validType(lastname, 'string', true);
    this._lastname = lastname;
  }

  /**
   * The supervisor of the employee.
   * @type {Employee}
   */
  get supervisor() {
    return this._supervisor;
  }

  set supervisor(supervisor) {
    validInstance(supervisor, Employee, true);
    this._supervisor = supervisor;
  }

  /**
   * The projects assigned to the employee.
   * @type {Set}
   */
  get projects() {
    return this._projects;
  }

  /**
   * The maximum of assignable projects to the employee.
   * @static
   * @type {number}
   */
  static get maximumProjectsAssignable() {
    return 2;
  }

  /**
   * Assigns a project to the employee.
   * @param  {Project} project The project to assign.
   */
  assignProject(project) {
    validInstance(project, Project);
    if (this.projects.size < Employee.maximumProjectsAssignable) {
      if (!this.projects.has(project)) {
        this.projects.add(project);
      }
    } else {
      console.warn(`Maximum projects reached: ${this.projects.size}/${Employee.maximumProjectsAssignable} projects assigned.`);
    }
  }

  /**
   * Removes a project from the employee.
   * @param  {Project} project The project to remove.
   */
  removeProject(project) {
    validInstance(project, Project);
    if (this.projects.has(project)) {
      this.projects.delete(project);
    }
  }

  /**
   * Returns the properties for displaying purposes
   * @return {Object} The properties.
   */
  toJSON() {
    let ret = {
      name: this.name,
      lastname: this.lastname
    };
    if (this.supervisor) {
      ret.supervisor = {
        name: this.supervisor.name,
        lastname: this.supervisor.lastname
      };
    }
    if (this.projects.size > 0) {
      ret.projects = [];
      this.projects.forEach(p => ret.projects.push(p.name));
    }
    return ret;
  }
}

export default Employee;
