let mongoose = require("mongoose");
let mongoDBStettings = require("./config");
class connect {

    getMongoConnectionSettings() {
        let connectionConfig = mongoDBStettings;
        let connectionURI = `mongodb://`;

        if (connectionConfig.servers !== undefined && Array.isArray(connectionConfig.servers) && connectionConfig.servers.length) {
            connectionURI += connectionConfig.servers.join();
        } else {
            console.error("Mongo Servers in config should not be an empty array");
            process.exit(1);
        }

        if (connectionConfig.database !== undefined && connectionConfig.database) {
            connectionURI += `/${connectionConfig.database}`;
            if ((connectionConfig.options.auth || {}).user !== undefined) {
                connectionURI += `?authSource=admin`;
            }
        } else {
            console.error("Mongo Database name should not be blank");
            process.exit(1);
        }
        return { uri: connectionURI, options: connectionConfig.options };
    }

    async bootstrap() {
        let connectionSetting = this.getMongoConnectionSettings();
        mongoose.connect(connectionSetting.uri, connectionSetting.options);

        mongoose.connection.on('connecting', function () {
            console.log("trying to establish a connection to mongo");
        });
        mongoose.connection.on('connected', function () {
            console.log("Mongo connection established successfully");

        });
        mongoose.connection.on('reconnected', function () {
            console.log("Mongo reconnected");
        });
        mongoose.connection.on('reconnectTries', function () {
            console.error("Trying to reconnect mongo..");
        });
        mongoose.connection.on('error', function (err) {
            console.error('connection to mongo failed ' + err);
        });
        mongoose.connection.on('disconnected', function () {
            console.log('mongo db connection closed');
            mongoose.connect(connectionSetting.uri, connectionSetting.options);
        });


        // try {
        //     await mongoose.connect("mongodb://localhost:27017/test", {
        //         connectTimeoutMS: 1000,
        //         useNewUrlParser: true,
        //         useUnifiedTopology: true
        //       })
        // } catch (error) {
        //     console.log(error.message)
        // }


    }
}

module.exports = new connect();