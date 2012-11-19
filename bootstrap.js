var mongoose   = require('mongoose');
var config     = require('config');
var semver     = require('semver')

// configure mongodb
mongoose.connect(config.mongodb.connectionString || 'mongodb://' + config.mongodb.user + ':' + config.mongodb.password + '@' + config.mongodb.server +'/' + config.mongodb.database);
mongoose.connection.on('error', function (err) {
  console.error('MongoDB error: ' + err.message);
  console.error('Make sure a mongoDB server is running and accessible by this application')
});
mongoose.connection.on('open', function (err) {
  mongoose.connection.db.admin().serverStatus(function(err, data) { 
    if (!semver.satisfies(data.version, '>=2.1.0')) {
      console.error('Error: Uptime requires MongoDB v2.1 minimum. The current MongoDB server uses only '+ data.version);
      process.exit(1);
    };
  });
});


module.exports = mongoose;