import parser from "js-yaml";

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
  console.log(doc);
  if (!doc) {
    return mapOf('');
  }
  const keys = Object.keys(doc);
  return mapOf(keys.map((key) => `\n${indentation}"${key}", ${traverseNode(doc[key], 1)}`).join(","));
}

function mapOf(obj) {
  return `ImmutableMap.of(${obj});`;
}

function traverseNode(node, indent) {
  console.log("current node: ", node);
  if (node instanceof Array) {
    return renderArray(node, indent);
  } else if (typeof node === 'string') {
    return renderText(node, indent);
  } else {
    return `unknown node type ${node}: ${typeof node}`;
  }
}

function renderArray(arr, indent) {
  return `List.of(${arr.map(key => `\n${renderNode(key)}"`)}\n${i(indent)})`;
}
  

function renderText(node) {
  const text = node.trim();
  return text ? `"${text}"` : "";
}

function renderNode(node, indent) {
  return `${i(indent)}${node}`;
}

export function copyInput() {
  navigator.clipboard.writeText(document.getElementById(inputId).textContent);
}

export function copyOutput() {
  navigator.clipboard.writeText(document.getElementById(outputId).textContent);
}

function i(indent) {
  return "\t".repeat(indent);
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

// Only run if we are in the browser
if (typeof window !== "undefined") {
  window.convert = convert;
  window.setDefaultInput = setDefaultInput;
  window.copyInput = copyInput;
  window.copyOutput = copyOutput;
}