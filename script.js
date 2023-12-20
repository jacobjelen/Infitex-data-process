document.getElementById("processButton").addEventListener("click", processFile);
document
  .getElementById("downloadTxt")
  .addEventListener("click", () => download("txt"));
document
  .getElementById("downloadCsv")
  .addEventListener("click", () => download("csv"));

let processedData = [];

let inputDatapoints = 0;
let outputDatapoints = 0;
const inputLength = document.getElementById("inputLength");
const outputLength = document.getElementById("outputLength");

let activationThreshold = document.getElementById("thresholdInput").value;
document.getElementById("thresholdInput").onchange = () => {
  activationThreshold = document.getElementById("thresholdInput").value;
  console.log(activationThreshold);
};

function processFile() {
  inputDatapoints = 0;
  outputDatapoints = 0;
  // chartConfig.data.datasets[0].data = []

  //user uploads a file
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];
  if (!file) {
    alert("Please select a file first!");
    return;
  }

  //
  const reader = new FileReader();
  reader.onload = function (e) {
    const lines = e.target.result.split("\n");
    processedData = lines
      .map((line) => parseLine(line))
      .filter((line) => line !== null);
    // alert('File processed!');

    liveChart.update(); //update the chart

  };
  reader.readAsText(file);

}

function parseLine(line) {
  inputDatapoints = inputDatapoints + 1;
  inputLength.innerText = `${inputDatapoints}`;

  const parts = line.split("#");
  if (parts.length !== 2) return null;

  const timestamp = parts[0];
  const data = parts[1].split(",").map((v) => parseInt(v, 10));

  if (data.length !== 4 || data.some((v) => v < 0 || v > 4095)) return null;

  const act1 = data[2] + data[3];
  const act2 = 4095 - data[0] + (4095 - data[1]);

  if (act2 < activationThreshold) return; //threshold check

  const ydir = data[0] - data[1];
  const xdir = data[2] - data[3];
  const x = (xdir * 28000) / act1;
  const y = (ydir * 59200) / act1;

  const x_out = convertRange(x, -8000, 8000, 0, 1000).toFixed(0);
  const y_out = convertRange(y, -1000, 1000, 0, 1000).toFixed(0);

  //add data for the chart
  chartConfig.data.datasets[0].data.push({ x: timestamp, y: act2 });
  
  outputDatapoints = outputDatapoints + 1;
  outputLength.innerText = `${outputDatapoints}`;

  return `${timestamp},${x_out},${y_out},${act2};`;
}

// scale a value from one range to another.
function convertRange(value, inMin, inMax, outMin, outMax) {
  const result =
    ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

  if (result < outMin) {
    return outMin;
  } else if (result > outMax) {
    return outMax;
  }

  return result;
}

function download(type) {
  if (processedData.length === 0) {
    alert("No data to download. Process a file first.");
    return;
  }

  let dataStr = processedData.join("\n");
  if (type === "csv") {
    dataStr = "Timestamp,X,Y,Act2\n" + dataStr.replace(/;/g, "");
  }

  const blob = new Blob([dataStr], { type: "text/plain" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `processed_data.${type}`;
  a.click();
  window.URL.revokeObjectURL(url);
}
