class BadRequest extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 400;

    Object.setPrototypeOf(this, BadRequest.prototype);
  }
}

export default BadRequest;
