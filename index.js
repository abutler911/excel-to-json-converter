const uploadBtn = document.getElementById("upload-btn");
const mainContainer = document.getElementById("myData");

uploadBtn.addEventListener("click", () => {
  upload();
});

// Upload and get the file name and extension
function upload() {
  let files = document.getElementById("file-upload").files;
  if (files.length == 0) {
    alert("Please choose a file...");
    return;
  }
  let filename = files[0].name;
  let extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
  if (extension == ".XLS" || extension == ".XLSX") {
    excelFileToJSON(files[0]);
  } else {
    alert("Please select a valid Excel file...");
  }
}

// Method to read the Excel file and convert it to JSON

function excelFileToJSON(file) {
  try {
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = function (e) {
      let data = e.target.result;
      let workbook = XLSX.read(data, {
        type: "binary",
      });
      let result = {};
      workbook.SheetNames.forEach(function (sheetName) {
        let roa = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheetName]
        );
        if (roa.length > 0) {
          result[sheetName] = roa;
        }
      });
      for (let i = 0; i < result.ButlerBudget.length; i++) {
        let div = document.createElement("div");
        div.innerHTML = `Category: ${result.ButlerBudget[i].Category}, Item: ${result.ButlerBudget[i].Item}, Amount: ${result.ButlerBudget[i].Amount}`;
        mainContainer.appendChild(div);
      }

      //   let resultEle = document.getElementById("json-result");
      //   resultEle.value = JSON.stringify(result, null, 2);
      //   resultEle.style.display = "block";
    };
  } catch (e) {
    console.error(e);
  }
}
