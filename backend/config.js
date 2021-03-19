const path = require('path');

const rootPath = __dirname;

let db = 'mongodb://localhost/exam13';
let port = 8000;

if(process.env.NODE_ENV === 'test') {
    db = 'mongodb://localhost/exam13_test';
    port = 8010;
}

module.exports = {
    rootPath,
    port,
    uploadPath: path.join(rootPath, 'public/uploads'),
    db,
    dbOpt: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
}