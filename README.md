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

### Sysstats(options)

Creates the stats listener. If it has already been called it will return the previous one.

Options:
    - interval: The interval between cpu calculations in milliseconds. (default: 1000)

Providing a custom interval will calculate the cpu usage over the past x milliseconds.

### (Array) Sysstats.prototype.cpus

Returns the cpu usage as of maximum `interval` milliseconds ago. Returns an array with objects containing:
- speed: The speed of each core at last calculation
- times: The amount of time the cpu was in each of the states (See node docs for os.cpus())

The returned data can be maximum `interval` seconds old.

### (Array) Sysstats.prototype.getCPUInfo

Returns the model name for each core (As this is not provided in the cpus call). The keys correspond to the cores in the .cpus call.

### (Object) Sysstats.prototype.mem

Returns the current memory usage as an object containing:
- used: The used memory
- total: The total memory in the system

### (void) Sysstats.prototype.unref

Unreferences the timer used to calculate the cpu usage. (for automatic closing of node)

## License

Copyright 2015 Jamy Timmermans and Contributors.

Licensed under GPLv2. See `LICENSE` for more details.
