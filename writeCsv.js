const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const writeCsv = async (contents, path) => {
  const csvWriter = createCsvWriter({
    path,
    header: [
      { id: "---", title: "---" },
      { id: "Type", title: "Type" },
      { id: "Text", title: "Text" },
      { id: "Montage", title: "Montage" },
      { id: "duration", title: "duration" },
      { id: "LineDurationOverride", title: "LineDurationOverride" },
      { id: "CameraSequence", title: "CameraSequence" },
      { id: "bBlocking", title: "bBlocking" },
    ],
  });

  return await csvWriter.writeRecords(contents);
};

exports.writeCsv = writeCsv;
