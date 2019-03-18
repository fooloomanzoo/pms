import { validType, validInstance } from '../controler/error.js';

import Project from './project.js';

/**
 * @class Task
 * @classdesc Task class of the Project Management System
 * @constructor
 * @param {string} name The name of the task.
 * @param {string} description The description of the task.
 * @param {number} estimated_days The estimated days of the task.
 */

class Task {
  constructor(name, description, estimated_days) {
    this.name = name;
    this.description = description;
    this.estimated_days = estimated_days;
    this._assignedProject = null;
  }

  /**
   * The name of the task.
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
   * The description of the task.
   * @type {string}
   */
  get description() {
    return this._description;
  }

  set description(description) {
    validType(description, 'string');
    this._description = description;
  }

  /**
   * The estimated days of the task.
   * @type {number}
   */
  get estimated_days() {
    return this._estimated_days;
  }

  set estimated_days(estimated_days) {
    if (estimated_days > 0) {
      this._estimated_days = +estimated_days;
      if (this._assignedProject) {
        this._assignesProject.updateDeadline();
      }
    } else {
      throw new Error(`Estimated days should be larger than 0`);
    }
  }

  /**
   * Assigns a project to the task
   * @param  {Project} project  The project
   */
  assignProject(project) {
    validInstance(project, Project);
    this._assignedProject = project;
    if (!this._assignedProject.assignedTasks.has(this)) {
      this._assignedProject.assignTask(this);
    }
  }

  /**
   * Removes the project from the task.
   */
  removeProject() {
    if (this._assignedProject && this._assignedProject.assignedTasks.has(this)) {
      this._assignedProject.removeTask(this);
    }
    this._assignedProject = null;
  }

  /**
   * Returns the properties for displaying purposes
   * @return {Object} The properties.
   */
  toJSON() {
    return {
      name: this.name,
      description: this.description,
      estimated_days: this.estimated_days
    };
  }
}

export default Task;
