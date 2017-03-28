import cassandra from 'cassandra-driver';
import Config from './config';

const authProvider = new cassandra.auth.PlainTextAuthProvider(
  Config.get('/database/user'),
  Config.get('/database/password')
);
const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  keyspace: 'mydatabase',
  authProvider,
});

export default client;
