import dotenv from dotenv

dotenv.config()

export const app_config = {
    app: {
        port: process.env.PORT || 4000,
    },
    mongo: {
        clouster: process.env.MONGO_CLOUSTER_URL || null,
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        pass: process.env.MYSQL_PASS || '',
        database: process.env.MYSQL_DB || 'ejemplo'
    }
};