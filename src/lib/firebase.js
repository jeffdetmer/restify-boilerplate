import firebase from 'firebase-admin';
import Config from './config';

const serviceAccount = Config.get('/firebase/serviceAccountKey');

let connection;

const getConnection = () => {
  firebase.initialize({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: Config.get('/firebase/url'),
  });
  connection = firebase.database();
};

export default { connection, getConnection };
