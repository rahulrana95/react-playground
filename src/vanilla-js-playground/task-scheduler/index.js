function logsChanged(arr) {
  const contentArea = document.getElementById("v_content-area");

  contentArea.innerHTML = "";
  arr.forEach((item) => {
    const node = document.createElement("div");
    node.style = `
    padding: 8px;
    margin-bottom: 4px;
    background-color: palegreen;
    `;
    node.innerHTML = `${new Date()} : ${item}`;
    node.classList.add("fade-in");
    contentArea.insertBefore(node, contentArea.firstChild);
  });
}
function jobScheduler() {
  document.addEventListener("JobsScheduler", () => {
    function Jobs(concurrency) {
      this.concurrency = concurrency;
      this.queue = [];
      this.running = 0;
      const logsA = [];
      this.logs = new Proxy(logsA, {
        set: function (target, property, value) {
          target[property] = value;
          logsChanged(target);
          return true;
        },
      });

      this.addJob = function (cb, cbData = () => {}) {
        this.queue.push({ cb, cbData });
        this.executeJobs();
      };

      this.addJobs = function (cbs) {
        this.result = new Array(cbs.length);
        let resolved = 0;

        cbs.forEach((cb, index) => {
          this.addJob(cb, (data) => {
            this.logs.push(`data arrive at each job callback ${data}`);
            this.result[index] = data;
            resolved++;
            if (resolved === cbs.length) {
              this.logs.push(this.result);
            }
          });
        });
      };

      this.executeJobs = function () {
        if (!this.queue.length || this.running >= this.concurrency) return;

        let { cb: job, cbData } = this.queue.shift();

        this.running++;
        job = job.bind(this);
        job((data, error) => {
          this.logs.push(`data got from api job success ${data}`);
          cbData(data);
          this.running--;
          this.executeJobs();
        });
      };
    }

    const startTime = new Date().getTime();
    let data = 0;
    function apiCall(cb) {
      const time = 2000;
      let val = data;
      data++;
      setTimeout(() => {
        const endTime = new Date().getTime();
        this.logs.push(`executing task ${endTime - startTime}`);
        cb(val);
      }, time);
    }

    const obj = new Jobs(2);

    obj.addJobs([
      apiCall,
      apiCall,
      apiCall,
      apiCall,
      apiCall,
      apiCall,
      apiCall,
      apiCall,
      apiCall,
    ]);
  });
}

jobScheduler();

export default jobScheduler;
