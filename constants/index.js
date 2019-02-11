require('dotenv').config()

module.exports = {
    DATABASE: process.env.DATABASE || 'heroku_9dwd2l27',
    DB_USER: process.env.DB_USERNAME || 'heroku_9dwd2l27',
    DB_PASSWORD: process.env.DB_PASSWORD || 'dxLnbd9rEvc1rGoY06dr',

    SALT_FOR_PASSWORD: process.env.SALT_FOR_PASSWORD || 10,

    SECRET_FOR_JWT: process.env.SECRET_FOR_JWT || 'YSX7UummQEBHSco3uqKGfrTDQVFx7eUdFgSNfnCppVqEYIFHYp',
    // ALGORITHM_JWT: process.env.ALGORITHM_JWT || 'RS512',
    EXPIRES_IN_JWT: process.env.EXPIRES_IN_JWT || '1d'
}

module.exports.API_VERSIONS = [
    {
        key: 'v1',
        routes: [
            {
                route: 'post',
                router: require('../routes/api/v1/post')
            },
            {
                route: 'posts',
                router: require('../routes/api/v1/posts')
            },
            {
                route: 'auth/login',
                router: require('../routes/api/v1/auth/login')
            },
            {
                route: 'auth/register',
                router: require('../routes/api/v1/auth/register')
            }
        ]
    }
]