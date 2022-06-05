class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}

function isCustomErorr(err: any): err is CustomError {
  return typeof err.status === 'number';
}

export {
  CustomError,
  isCustomErorr,
};
