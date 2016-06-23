const env = process.env.NODE_ENV || 'development'

module.exports = (env === 'production') ?
    require('./production') : require('./development')
