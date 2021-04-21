const config={
    production :{
        CONNECTION_STRING: process.env.MONGODB_URI
    },
    default : {
        CONNECTION_STRING: process.env.MONGODB_URI || "mongodb+srv://myselfdictionary:Pka9mu8R6dhyvJUD@myselfdictionary.3evws.mongodb.net/myselfdictionary?retryWrites=true&w=majority",
        SECRET: 'ac74e6f7-92ff-4a98-9efb-8e1df2267893'
    }
}

exports.get = function get(env){
    return config[env] || config.default
}