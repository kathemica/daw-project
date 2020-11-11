require('dotenv').config();


module.exports = function(env) {
  let development = {
    host     : process.env.DB_HOST || '10.0.0.50',
    port     : process.env.DB_PORT || '3306',
    user     : process.env.DB_USERNAME || 'nodeadmin',
    password : process.env.DB_PASSWORD || 'YHezDioFfnwiy0h8Jw',
    database : process.env.DB_DATABASE || 'devices',
    dialect: process.env.DB_DIALECT || 'mysql',
    pool: {
      max: process.env.DB_POOL_MAX,
      min: process.env.DB_POOL_MIN,
      acquire: process.env.DB_POOL_ACQUIRE,
      idle: process.env.DB_POOL_IDLE
    },
    define: {
      //genera claves foráneas de este tipo: user_id en vez de userId
      underscored: true
    }
  };
  let test= {
    host     : process.env.DB_HOST || '10.0.0.50',
    port     : process.env.DB_PORT || '3306',
    user     : process.env.DB_USERNAME || 'nodeadmin',
    password : process.env.DB_PASSWORD || 'YHezDioFfnwiy0h8Jw',
    database : process.env.DB_DATABASE || 'devices',
    dialect: process.env.DB_DIALECT || 'mysql',
    define: {
      //genera claves foráneas de este tipo: user_id en vez de userId
      underscored: true
    }
  };
  let  production= {
    use_env_variable: 'DB_CONNECTION_STRING',
    dialect: 'postgres',
    logging: false
  };

  switch (process.env.NODE_ENV) {
    case 'development':
      return development;
    case 'test':
      return test;
    case 'production':
      return production;
    default:
      return development;
  }
}