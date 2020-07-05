const cache = {};

const getValue = key => cache[key];

const putValue = (key, value) => cache[key] = value;

module.exports = { getValue, putValue };