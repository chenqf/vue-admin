export class HttpError extends Error {
  constructor(error) {
    super();
    this.error = error;
    this.code = -1;
    this.message = "网络异常，请稍后重试";
  }
}

export class ResponseError extends Error {
  constructor(data) {
    super();
    this.code = 200;
    this.data = data;
  }
}

// export class ParamError extends Error {
//   constructor(data) {
//     super();
//     this.code = 400;
//     this.key = data.key;
//     this.type = data.type;
//   }
// }

// class permissionError extends Error {
//   constructor(message) {
//     super();
//     this.code = 401;
//     this.message = message;
//   }
// }

// class CustomError extends Error {
//   constructor({ code, data, message }) {
//     super();
//     this.code = code || -1;
//     this.data = data;
//     this.message = message;
//   }
// }
