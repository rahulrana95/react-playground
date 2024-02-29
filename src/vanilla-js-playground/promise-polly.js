// function MyPromise(cb) {
//   const states = {
//     FULFILLED: "FULFILLED",
//     PENDING: "PENDING",
//     REJECTED: "REJECTED",
//   };

//   this.state = states.PENDING;
//   this.thenHandlers = [];
//   this.catch = undefined;
//   this.val = undefined;
//   this.err = undefined;

//   this._successCb = (data) => {
//     this.val = data;
//     this.thenHandlers.forEach((cb) => {
//       cb?.(data);
//     });

//     this.state = states.FULFILLED;
//   };

//   this._failureCb = (err) => {
//     this.err = err;
//   };

//   this.then = (cb) => {
//     if (this.state === states.FULFILLED) {
//       cb(this.val);
//       return;
//     }
//     this.thenHandlers.push(cb);
//     return this;
//   };

//   this.catch = (cb) => {
//     if (this.state === states.REJECTED) {
//       cb(this.val);
//       return;
//     }
//     this.err = err;
//     this.catch(err);
//     return this;
//   };

//   try {
//     cb(this._successCb, this._failureCb);
//   } catch (err) {
//     this._failureCb(err);
//   }
// }

function MyPromise(executor) {
  const states = {
    FULFILLED: "FULFILLED",
    PENDING: "PENDING",
    REJECTED: "REJECTED",
  };

  this.state = states.PENDING;
  this.thenHandlers = [];
  this.catchHandler = undefined;
  this.value = undefined;
  this.error = undefined;

  const resolve = (data) => {
    if (this.state !== states.PENDING) return;
    this.state = states.FULFILLED;
    this.value = data;
    this.thenHandlers.forEach((handler) => handler(data));
  };

  const reject = (err) => {
    if (this.state !== states.PENDING) return;
    this.state = states.REJECTED;
    this.error = err;
    if (this.catchHandler) this.catchHandler(err);
  };

  try {
    executor(resolve, reject);
  } catch (err) {
    reject(err);
  }
}

MyPromise.prototype.then = function (onFulfilled) {
  return new MyPromise((resolve, reject) => {
    const handleFulfillment = (data) => {
      try {
        const result = onFulfilled(data);
        if (result instanceof MyPromise) {
          result.then(resolve).catch(reject);
        } else {
          resolve(result);
        }
      } catch (err) {
        reject(err);
      }
    };

    if (this.state === "FULFILLED") {
      handleFulfillment(this.value);
    } else {
      this.thenHandlers.push(handleFulfillment);
    }
  });
};

MyPromise.prototype.catch = function (onRejected) {
  this.catchHandler = onRejected;
};

function CustomPromiseA() {
  document.addEventListener("CustomPromise", () => {
    new MyPromise((resolve, reject) => {
      setTimeout(() => {
        resolve("1");
      }, 3000);
    })
      .then((data) => {
        console.log(data);
        return data;
      })
      .then((data) => {
        console.log(data);
      });

    new MyPromise((resolve, reject) => {
      setTimeout(() => {
        resolve("2");
      }, 2000);
    })
      .then((data) => {
        console.log(data);
        return data;
      })
      .then((data) => {
        console.log(data);
      });
  });
}

CustomPromiseA();

export default CustomPromiseA;
