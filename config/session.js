/**
 * Session Configuration
 * (sails.config.session)
 *
 * Sails session integration leans heavily on the great work already done by
 * Express, but also unifies Socket.io with the Connect session store. It uses
 * Connect's cookie parser to normalize configuration differences between Express
 * and Socket.io and hooks into Sails' middleware interpreter to allow you to access
 * and auto-save to `req.session` with Socket.io the same way you would with Express.
 *
 * For more information on configuring the session, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.session.html
 */

module.exports.session = {

  /***************************************************************************
  *                                                                          *
  * Session secret is automatically generated when your new app is created   *
  * Replace at your own risk in production-- you will invalidate the cookies *
  * of your users, forcing them to log in again.                             *
  *                                                                          *
  ***************************************************************************/
  secret: 'dfb2ee77db01215c34749b28917745ec',


  /***************************************************************************
  *                                                                          *
  * Set the session cookie expire time The maxAge is set by milliseconds,    *
  * the example below is for 24 hours                                        *
  *                                                                          *
  ***************************************************************************/

  // cookie: {
  //   maxAge: 24 * 60 * 60 * 1000
  // },

  /***************************************************************************
  *                                                                          *
  * Uncomment the following lines to set up a Redis session store that can   *
  * be shared across multiple Sails.js servers.                              *
  *                                                                          *
  * Requires connect-redis (https://www.npmjs.com/package/connect-redis)     *
  *                                                                          *
  ***************************************************************************/

  // adapter: 'socket.io-redis',

  /***************************************************************************
  *                                                                          *
  * The following values are optional, if no options are set a redis         *
  * instance running on localhost is expected. Read more about options at:   *
  *                                                                          *
  * https://github.com/visionmedia/connect-redis                             *
  *                                                                          *
  ***************************************************************************/
//redis://redistogo:115dd628a9b534e1c56675527602081d@barreleye.redistogo.com:11968/
  // host: 'barreleye.redistogo.com',
  // port: 11968,
  // user: 'redistogo',
  // pass: "115dd628a9b534e1c56675527602081d",
  // prefix: 'sess:',
  // ttl: <redis session TTL in seconds>,
  // db: 0,
  


  /***************************************************************************
  *                                                                          *
  * Uncomment the following lines to set up a MongoDB session store that can *
  * be shared across multiple Sails.js servers.                              *
  *                                                                          *
  * Requires connect-mongo (https://www.npmjs.com/package/connect-mongo)     *
  * Use version 0.8.2 with Node version <= 0.12                              *
  * Use the latest version with Node >= 4.0                                  *
  *                                                                          *
  ***************************************************************************/

  adapter: 'mongo',

  // url: 'mongodb://user:password@localhost:27017/dbname', // user, password and port optional
  url: 'mongodb://heroku_jk3x96bx:9c54miloegjjd0pd6uur9jk1rj@ds127801.mlab.com:27801/heroku_jk3x96bx',


  

  /***************************************************************************
  *                                                                          *
  * Optional Values:                                                         *
  *                                                                          *
  * See https://github.com/kcbanner/connect-mongo for more                   *
  * information about connect-mongo options.                                 *
  *                                                                          *
  * See http://bit.ly/mongooptions for more information about options        *
  * available in `mongoOptions`                                              *
  *                                                                          *
  ***************************************************************************/

  // collection: 'sessions',
  // stringify: true,
  // mongoOptions: {
  //   server: {
  //     ssl: true
  //   }
  // }

};
