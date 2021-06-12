module.exports = {
    "name": "testUsers",
    "servers": [
        "127.0.0.1:27017"
    ],
    "database": "testUsers",
    "options": {
        // "auth": {
        //     "user": "",
        //     "password": ""
        // },
        "useNewUrlParser": true,
        "connectTimeoutMS": 10000,
        "useUnifiedTopology": true
    }
}