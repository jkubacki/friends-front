export class ErrorArray extends Error {
  constructor(errors) {
    super();
    this.errors = errors;
  }
}
