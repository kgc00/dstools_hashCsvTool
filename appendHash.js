const crypto = require("crypto");

const localizationPrefix = `NSLOCTEXT("`;
const delimiter = `", "`;
const ender = `")`;

const appendHash = (text = "") => {
  const splitLines = splitNsloc(text);
  const hash = hashLine(splitLines[2]);
  splitLines[1] = addHash(splitLines[1], hash);
  return combineLines(splitLines);
};

exports.appendHash = appendHash;

const combineLines = (lines = [""]) =>
  `${lines[0]}${delimiter}${lines[1]}${delimiter}${lines[2]}${ender}`;

const addHash = (segId = "", hash = "") => `${segId},${hash}`;

const hashLine = (line) =>
  crypto.createHash("sha256").update(line).digest("hex");

// Convert text:
// NSLOCTEXT("HistorianDialogueSequence_1", "Segment_021", "Always glad to meet a fellow garbage aficionado. You're welcome to come and chat anytime
// you like.")
// =>
// [ 'NSLOCTEXT("HistorianDialogueSequence_1',
//   'Segment_021',
//   'Always glad to meet a fellow garbage aficionado. You\'re welcome to come and chat anytime you like.' ]

function splitNsloc(text = "") {
  const splitDialogue = text.replace(ender, "").split(`", "`);
  if (handleErrors(splitDialogue)) throw new Error("Incorrect Splitting");
  return splitDialogue;
}

const handleErrors = (splitDialogue = [""]) =>
  splitDialogue.length != 3 ||
  !splitDialogue[0].startsWith(localizationPrefix) ||
  !splitDialogue[1].startsWith("Segment") ||
  splitDialogue[2] === undefined ||
  splitDialogue[2] === null;
