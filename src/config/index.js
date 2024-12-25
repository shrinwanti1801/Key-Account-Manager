const {db,connectDB}=require('./server-config')

module.exports = {
    connectDB,
    db,
    Logger: require('./logger-config')
}