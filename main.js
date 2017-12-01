var fs = require('fs');
var success = function (url, method, functionName, time, response, sessionid ,res) {
    var filename = '/' + sessionid + '_Success_Log.txt'
    var date = new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate();
    if (fs.existsSync('logs/' + date)) {
    if (fs.existsSync('logs/'+ date + filename)) {
       successFunction(date, method, functionName, url, time, response, filename);
    }
    else {
        fs.createWriteStream('logs/' + date + filename, { flag: 'a' });
        successFunction(date, method, functionName, url, time, response, filename);
    }
}
else {
    
        fs.mkdirSync('logs/' + date);
        if (fs.existsSync('logs/' + date + filename)) {
            successFunction(date, method, functionName, url, time, response, filename);
        }
        else {
            fs.createWriteStream('logs/' + date + filename, { flag: 'a' });
            successFunction(date, method, functionName, url, time, response ,filename);
        }
}
     res.json({
        success: true,
        status: 200,
        body: response
    });
}

var failed = function (url, method, functionName, time, error, sessionid, res) {
    var date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
    var filename = '/' + sessionid + '_Error_Log.txt'

    if (fs.existsSync('logs/' + date)) {
        if (fs.existsSync('logs/' + date + filename)) {
            failedFunction(date, method, functionName, url, time, error, filename);
        }
        else {
            fs.createWriteStream('logs/' + date + filename, { flag: 'a' });
            failedFunction(date, method, functionName, url, time, error, filename);
        }
    }
    else {

        fs.mkdirSync('logs/' + date);
        if (fs.existsSync('logs/' + date + filename)) {
            failedFunction(date, method, functionName, url, time, error, filename);
        }
        else {
            fs.createWriteStream('logs/' + date + filename, { flag: 'a' });
            failedFunction(date, method, functionName, url, time, error, filename);
        }
    }
    res.json({
        success: false,
        status: 404,
        body: error
    });
}


function successFunction (date ,method , functionName, url, time, response, filename) {
    fs.appendFileSync('logs/' + date + filename, 'Method: '
        + method + ' || Function Name: ' + functionName + ' || Url: ' + url 
        + ' || Time: ' + time + ' || Response:' + JSON.stringify(response) + '\n');
}


function failedFunction(date, method, functionName, url, time, error, filename) {
    fs.appendFileSync('logs/' + date + filename, 'Method: '
        + method + ' || Function Name: ' + functionName + ' || Url: ' + url 
        + ' || Time: ' + time + ' || Response:' + JSON.stringify(error) + '\n');
}

module.exports = { failed, success }