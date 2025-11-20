export class InputError extends Error {
  constructor(field, message) {
    super(message);
    this.field = field;
  }
}