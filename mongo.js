const mongoose = require('mongoose');


mongoose.Promise = global.Promise;


const env = require('./env/environment');

const mongoUri = `mongodb://${env.dbName}:${env.key}@${env.dbName}.documents.azure.com:${env.cosmosPort}/?ssl=true`;
//"mongodb://85adb35f-0ee0-4-231-b9ee:HI6LdFXosus2JrBnFHI87MqvPcylhdqPduJryUtHEuWpIl4BWpwF1FeaaYppa6guRvNNCXEP7T6HWnHq4jlmTQ%3D%3D@85adb35f-0ee0-4-231-b9ee.documents.azure.com:10255/?ssl=true"
function connect() {
    return mongoose.connect(mongoUri);
}

module.exports = {
    connect
};