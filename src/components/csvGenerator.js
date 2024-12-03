export const generateCSV = (metrics, graphData, graphImage) => {
  const headers = ["Record", ...metrics].join(",");

  // Generating CSV data from graphData
  const csvData = graphData.map(
    (row, index) => `Record ${index + 1},${row.join(",")}`
  );

  // Generating the CSV content with base64 image at the end
  const csvContent = [
    headers,
    ...csvData,
    "", // Blank line for separation
    "Graph Image:", // A label for the image part
    graphImage, // Add the base64 image here (as string)
  ].join("\n");

  // Creating a Blob from the CSV content
  const blob = new Blob([csvContent], { type: "text/csv" });

  // Creating a URL for the Blob object
  const url = URL.createObjectURL(blob);

  // Creating a temporary link element for downloading the CSV
  const a = document.createElement("a");
  a.href = url;

  // Setting the download filename (this will trigger download in the Downloads folder)
  a.download = "custom_report.csv";

  // Triggering the download by simulating a click event
  document.body.appendChild(a);
  a.click();

  // Removing the temporary link element after download
  document.body.removeChild(a);

  // Revoke the object URL after use to release memory
  URL.revokeObjectURL(url);
};
