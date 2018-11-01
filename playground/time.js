const moment = require('moment');

const date = moment();

date.add(100, 'year').subtract(11, 'months');

console.log(date.format('MMM Do, YYYY'));

console.log(date.format('h:mm a'));

const createAt = Date.now();

console.log(moment(createAt).format('h:mm:ss a MMM Do, YYYY'));