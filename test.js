var jsdom = require('jsdom');
var assert = require('assert');
const { expect } = require("chai");
const index = require('./index.js');

require('jsdom-global')();

describe('html-to-java', () => {
  describe('#htmlToJava', () => {
    it('should render empty as return empty map', () => {
        assert.equal(index.ymlToJava(''), 'ImmutableMap.of();');
    });

    it('should render company: spacelift as ImmutableMap.of("company", "spacelift");', () => {
        assert.equal(index.ymlToJava('company: spacelift'), 'ImmutableMap.of(\n\t"company", "spacelift"\n);');
    });

    it('should render list as List', () => {
        const yml = `domain:
 - devops
 - devsecops`;
        const expected = `ImmutableMap.of(
\t"domain", List.of(
\t\t"devops",
\t\t"devsecops"
\t)
);`;
        assert.equal(index.ymlToJava(yml), expected);
    });
  });
});
