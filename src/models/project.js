import { validType, validInstance } from '../controler/error.js';
import { addDay, fromDate } from '../utils/date.js';

import Task from './task.js';

/**
 * @class Project
 * @classdesc Project class of the Project Management System
 *
 * @constructor
 * @param {string} name The name of the project
 * @param {string|Date} start_date The starting date of the project.
 * @param {number} slack_time The number of days of slack time.
 */
class Project {

  constructor(name, start_date, slack_time) {
    this.name = name;
    this.start_date = start_date;
    this.slack_time = slack_time;
    this._assignedTasks = new Set();
    this.updateDeadline();
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
   * The start date of the project.
   * @type {Date}
   */
  get start_date() {
    return this._start_date;
  }

  set start_date(start_date) {
    this._start_date = fromDate(start_date);
  }

  /**
   * The deadline of the project.
   * @type {Date}
   */
  get deadline() {
    return this._deadline;
  }

  set deadline(d) {
    this._deadline = fromDate(d);
  }

  /**
   * The number of days of slack time.
   * @type {number}
   */
  get slack_time() {
    return this._slack_time;
  }

  set slack_time(slack_time = 0) {
    if (slack_time >= 0) {
      this._slack_time = +slack_time;
    } else {
      throw new Error(`The slack time should be larger or equal 0 days.`);
    }
  }

  /**
   * The assigned task to the project.
   * @type {Set}
   */
  get assignedTasks() {
    return this._assignedTasks;
  }

  set assignedTasks(tasks) {
    validInstance(tasks, Set);
    this._assignedTasks = tasks;
  }

  /**
   * Assigns a task to the project.
   * @param  {Task} task The task to assign.
   */
  assignTask(task) {
    validInstance(task, Task);
    if (!this.assignedTasks.has(task)) {
      this.assignedTasks.add(task);
      task.assignProject(this);
    }
    this.updateDeadline();
  }

  /**
   * Removes a task from the project.
   * @param  {Project} task The task to remove.
   */
  removeTask(task) {
    validInstance(task, Task);
    if (this.assignedTasks.has(task)) {
      this.assignedTasks.delete(task);
      task.removeProject();
    }
    this.updateDeadline();
  }

  /**
   * Update the deadline and the total days needed
   */
  updateDeadline() {
    let days = this.slack_time;
    this.assignedTasks.forEach(task => {
      days += task.estimated_days;
    });
    this._totaldays = days;
    this._deadline = addDay(this.start_date, days);
  }

  /**
   * Returns the properties for displaying purposes
   * @return {Object} The properties.
   */
  toJSON() {
    let ret = {
      name: this.name,
      start_date: this.start_date,
      deadline: this.deadline,
      slack_time: this.slack_time
    };
    if (this.assignedTasks.size > 0) {
      ret.tasks = [];
      this.assignedTasks.forEach(t => ret.tasks.push(t.toJSON()));
    }
    return ret;
  }
}

export default Project;
