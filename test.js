var jsdom = require('jsdom');
var assert = require('assert');
const { expect } = require("chai");
const index = require('./index.js');

require('jsdom-global')();

describe('html-to-java', () => {
  describe('#htmlToJava', () => {
    it('should render empty as return empty map', () => {
        assert.equal(index.ymlToJava(''), 'return ImmutableMap.of();');
    });
  });
});
