/**
 * Test an argument for a given type.
 * @param  {*}  value  The value to be tested.
 * @param  {string}  expectedType  The expected type.
 * @param  {boolean} isRequired  Is true, if the value is expected to be truethy.
 */
const validType = function(value, expectedType, isRequired) {
  if (typeof value !== expectedType) {
    throw new Error(`Invalid argument: expected value to be of type '${expectedType}' insteadof '${typeof value}'`);
  }
  if (isRequired === true && !value) {
    throw new Error(`Invalid argument: expected value should be set`);
  }
};

/**
 * Test an argument if it is of an given class-instance.
 * @param  {*}  value        The value to be tested:
 * @param  {Object}  expectedInstance The expected class instance.
 * @param  {boolean} couldBeUndefined Is true, if the value could be undefined.
 */
const validInstance = function(value, expectedInstance, couldBeUndefined) {
  if (couldBeUndefined === true && value === undefined) {
    return;
  }
  if (!(value instanceof expectedInstance)) {
    throw new Error(`Invalid argument: value should be of ${expectedInstance.constructor.name}`);
  }
};

export {
  validType,
  validInstance
};
