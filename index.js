import parser from 'js-yaml'

const inputId = "id-input-area";
const outputId = "id-output-area";
const indentation = "\t";

export function convert() {
  clearWarning();
  clearOutput();
  var input = getInputArea().value;
  var result = parse(input);
  if (result.success) {
    getOutputArea().innerHTML = result.value;
    hljs.highlightAll();
  } else {
    setWarning(result.value);
  }
}

function getOutputArea() {
  return document.getElementById(outputId);
}

function getInputArea() {
  return document.getElementById(inputId);
}

export function setDefaultInput() {
  getInputArea().innerHTML = getDefault();
  convert();
}

export function ymlToJava(yml) {
    const doc = parser.load(yml, "utf8");
    console.log(doc)
    return "ImmutableMap.of();";
}

