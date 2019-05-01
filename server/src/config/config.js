module.exports = {
  port: process.env.PORT || 4040,
  db: {
    database: process.env.DB_NAME || 'stockdb',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'ramirudy2010',
    options: {
      dialect: process.env.DIALECT || 'postgres',
      port: 5432,
      host: process.env.HOST || 'localhost',
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
};
