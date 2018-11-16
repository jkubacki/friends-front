export class ErrorArray extends Error {
  constructor(errors) {
    super();
    this.errors = errors;
  }
}

export class RequestError extends Error {
  constructor(type) {
    super();
    this.type = type;
  }
  setBase = ({ message, fileName, lineNumber }) => {
    this.message = message;
    this.fileName = fileName;
    this.lineNumber = lineNumber;

    return this;
  };
}
