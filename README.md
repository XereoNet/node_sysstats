# Sysstats

[![Build Status](https://travis-ci.org/XereoNet/node_sysstats.svg?branch=master)](https://travis-ci.org/XereoNet/node_sysstats) [![Coverage Status](https://coveralls.io/repos/XereoNet/node_sysstats/badge.svg?branch=master)](https://coveralls.io/r/XereoNet/node_sysstats?branch=master)

Provide system statistics in a easy to use API. Made to be cross platform so you can collect statistics on Windows too!

## Installation

`npm install sysstats`

## Usage


```javascript
var stats = require('sysstats')();

stats.cpus();
// Returns the cpu usages and speeds for the last second.
// [
//   {
//      speed: "2400",
//      times: {
//          user: 125,
//          nice: 0,
//          idle: 875,
//          irq: 0,
//          system: 0
//      }
//   }
// ]

stats.mem();
// Returns used and total memory in bytes (handy for getting percentage)
// Output:
// {
//      used: 7773933568,
//      total: 8529788928
// }

// Close the stats listener
stats.unref();
```

## API