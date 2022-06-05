import { connect } from 'mongoose';
import { exit } from 'process';

const MONGO_URI: string = process.env.MONGO_URI || 'mongodb://localhost/test';

connect(MONGO_URI, (err) => {
  if (err) {
    console.log(err);
    exit(1);
  }
  console.log(`Connected to ${MONGO_URI}`);
});
