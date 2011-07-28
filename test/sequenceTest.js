require('./helper');
var fs = require('fs');

function C(param, callback) {
    console.log('C');
    Step(
        function D() {
            console.log('D');
            fs.readFile(param, this);
        },

        function E(err, some_data) {
            console.log('E');
            this(undefined, some_data);
        },

        callback
    );
}

function quick_io(callback) {
    callback('1');
}

Step(
    function A() {
        console.log('A');
        quick_io(this.parallel());
        quick_io(this.parallel());
    },

    function B(err, data1, data2) {
        console.log('B');
        // read some big file or directory
        C('/tmp', this);
    },

    function F(err) {
        console.log('F');
    }

);
