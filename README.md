[![Build Status](https://travis-ci.com/fooloomanzoo/pms.svg?branch=master)](https://travis-ci.com/fooloomanzoo/pms)

# Example of a Project Management System

The following functionality should be available:
- Creating a new employee with a given first name, last name and a direct supervisor
- Creating a new project with a given name, a start date and a time slack
- Creating a new task with a given name, a description of this task and estimated days needed to
complete it
- Include the possibility to adjust the give time estimation, by creating a new value for estimated days
needed for a task
- Assign a task to a project: By this the attributes „assigned tasks" and „end date" will be updated
automatically
- Assign a project to an employee (an employee can only work on two projects at the same time).
- Delete a task (don‘t forget to update the underlying references)
- Delete a project (don‘t forget to update the underlying references)
- Display/View all employees
- Display/View all tasks for a given project
- Getting the total days needed for a given list of projects (assuming that projects can‘t be worked on
parallel) 

[Tests on Travis CI](https://travis-ci.com/fooloomanzoo/pms)
