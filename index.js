const jsonfile = require("jsonfile");
const moment = require("moment");
const simpleGit = require("simple-git");
const random = require("random");

const path = "./data.json";
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}


let counter = 0;

const makeCommits = (n) => {
  if (n === 0) return4
  counter++;
  console.log(`Commit #${counter}`);
  
  const x = random.int(0, 54);
  const y = random.int(0, 5);
  const date = moment()
    .subtract(getRndInteger(0,10x), "y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();
  const data = { date: date };
  console.log(date);
  
  jsonfile.writeFile(path, data, () => {
    simpleGit()
      .pull("origin", "main")
      .then(() => {
        simpleGit()
          .add([path])
          .commit(date, { "--date": date })
          .push("origin", "main", { "--force": true }, (err) => {
            if (err) {
              console.error("Push error:", err);
            } else {
              console.log("Push successful!");
            }
            makeCommits.bind(this, --n)();
          })
      })
      .catch((err) => {
        console.error("Pull error:", err);
      });
  });
};

makeCommits(1340);

