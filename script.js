document.getElementById('processButton').addEventListener('click', processFile);
document.getElementById('downloadTxt').addEventListener('click', () => download('txt'));
document.getElementById('downloadCsv').addEventListener('click', () => download('csv'));

let processedData = [];

function processFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select a file first!');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const lines = e.target.result.split('\n');
        processedData = lines.map(line => parseLine(line)).filter(line => line !== null);
        alert('File processed!');
    };
    reader.readAsText(file);
}

function parseLine(line) {
    const parts = line.split('#');
    if (parts.length !== 2) return null;

    const timestamp = parts[0];
    const data = parts[1].split(',').map(v => parseInt(v, 10));
    if (data.length !== 4 || data.some(v => v < 0 || v > 4095)) return null;

    const act1 = data[2] + data[3];
    const act2 = 4095 - data[0] + (4095 - data[1]);
    const ydir = data[0] - data[1];
    const xdir = data[2] - data[3];
    const x = 8000 + (xdir * 28000) / act1;
    const y = 10000 + (ydir * 59200) / act1;

    const x_out = convertRange(x,0,16000,0,1000).toFixed(0)
    const y_out = convertRange(y,0,20000,0,1000).toFixed(0)

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
        alert('No data to download. Process a file first.');
        return;
    }

    let dataStr = processedData.join('\n');
    if (type === 'csv') {
        dataStr = 'Timestamp,X,Y,Act2\n' + dataStr.replace(/;/g, '');
    }

    const blob = new Blob([dataStr], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `processed_data.${type}`;
    a.click();
    window.URL.revokeObjectURL(url);
}
