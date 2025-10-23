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


export function copyInput() {
  navigator.clipboard.writeText(
    document.getElementById(inputId)
      .textContent
    );
}

export function copyOutput() {
  navigator.clipboard.writeText(
    document.getElementById(outputId)
      .textContent
    );
}


function getDefault() {
  return `---
# A sample yaml file
company: spacelift
domain:
 - devops
 - devsecops
tutorial:
  - yaml:
      name: "YAML Ain't Markup Language"
      type: awesome
      born: 2001
  - json:
      name: JavaScript Object Notation
      type: great
      born: 2001
  - xml:
      name: Extensible Markup Language
      type: good
      born: 1996
author: omkarbirade
published: true
`;
}

function parse(yml) {
  try {
    return {
      success: true,
      value: ymlToJava(yml),
    };
  } catch (e) {
    return {
      success: false,
      value: e,
    };
  }
}

function getWarningCard() {
  return document.getElementById("warning-card");
}

function clearWarning() {
  getWarningCard().innerHTML = null;
}

function clearOutput() {
  getOutputArea().innerHTML = null;
}

function setWarning(error) {
  getWarningCard().innerHTML =
    '<div class="alert alert-warning alert-dismissible fade show" role="alert"><strong>Parsing Error</strong>\n' +
    error +
    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ymlToJava: ymlToJava,
    renderAttr,
    renderChild,
    renderText
  };
}
