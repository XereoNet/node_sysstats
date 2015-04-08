var listener = null;
var ci = require("correcting-interval");
var os = require("os");

function Sysstats (options) {
    var $class = this;
    options = options || {};
    this.rate = options.rate || options.interval || 1000;
    this.lastCPUs = os.cpus();
    this.current = os.cpus().map(function (cpu) {
        return {times: cpu.times, speed: cpu.speed};
    });

    this.interval = ci.setCorrectingInterval(calcCPU, this.rate);

    function calcCPU() {
        var newCPUs = os.cpus();
        var updated = [];
        for (var i = 0; i < newCPUs.length; ++i) {
            updated[i] = {
                speed: newCPUs[i].speed,
                times: {
                    user: newCPUs[i].times.user - $class.lastCPUs[i].times.user,
                    nice: newCPUs[i].times.nice - $class.lastCPUs[i].times.nice,
                    system: newCPUs[i].times.system - $class.lastCPUs[i].times.system,
                    idle: newCPUs[i].times.idle - $class.lastCPUs[i].times.idle,
                    irq: newCPUs[i].times.irq - $class.lastCPUs[i].times.irq
                }
            };
            updated[i].times.system = updated[i].times.system ? updated[i].times.system : 0;
        }
        $class.current = updated;
        $class.lastCPUs = newCPUs;
    }
}

Sysstats.prototype.getCPUInfo = function () {
    return os.cpus().map(function (cpu) {
        return cpu.model;
    });
};

Sysstats.prototype.cpus = function () {
    return this.current;
};

Sysstats.prototype.mem = function () {
    return {
        used: os.totalmem() - os.freemem(),
        total: os.totalmem()
    };
};

Sysstats.prototype.unref = function () {
    ci.clearCorrectingInterval(this.interval);
    listener = null;
};


module.exports = function (options) {
    if (listener)
        return listener;
    else
        return new Sysstats(options);
};
