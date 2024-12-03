import { Workbook } from "exceljs";
import { saveAs } from "file-saver";

let excelBlob = null; // Store the blob globally

export const generateCSV = async (metrics, graphData, graphImage) => {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet("Report");

  // Add headers
  worksheet.addRow(["Record", ...metrics]);

  // Add data
  graphData.forEach((row, index) => {
    worksheet.addRow([`Record ${index + 1}`, ...row]);
  });

  // Add image
  const imageId = workbook.addImage({
    base64: graphImage,
    extension: "png",
  });
  worksheet.addImage(imageId, {
    tl: { col: 0, row: graphData.length + 2 },
    ext: { width: 500, height: 300 },
  });

  // Save workbook to a file
  const buffer = await workbook.xlsx.writeBuffer();
  excelBlob = new Blob([buffer], { type: "application/octet-stream" });
};

export const downloadExcel = () => {
  if (excelBlob) {
    saveAs(excelBlob, "custom_report.xlsx");
  } else {
    alert("No Excel file generated yet!");
  }
};
