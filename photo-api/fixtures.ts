import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Picture from "./models/Picture";

const dropCollection = async (db: mongoose.Connection, collectionName: string) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing. skipping drop ...`);
  }
};
const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;
  const collections = ['users', 'pictures'];
  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }
  const [user1, user2] = await User.create(
    {
      email: 'misha@gmail.com',
      password: '123',
      token: crypto.randomUUID(),
      role: 'user',
      displayName: 'Major',
      avatar: 'fixtures/buster.jpeg',
    },
    {
      email: 'anna@gmail.com',
      password: '0000',
      token: crypto.randomUUID(),
      role: 'user',
      displayName: 'Anna',
      avatar: 'fixtures/siyay.jpeg',
    },
    {
      email: 'nini@gmail.com',
      password: '123',
      token: crypto.randomUUID(),
      role: 'admin',
      displayName: 'Ninini',
      avatar: 'fixtures/relaps.jpeg',
    },
  );
  await Picture.create(
      {
        title: 'Tree at sunset',
        image: 'fixtures/Tree.jpeg',
        user: user1._id,
        createdAt: new Date()
      },
      {
          title: 'Girl under the moon',
          image: 'fixtures/girl.jpeg',
          user: user2._id,
          createdAt: new Date()
      },
      {
          title: 'Beautiful height',
          image: 'fixtures/Mountain.jpeg',
          user: user1._id,
          createdAt: new Date()
      },
      {
          title: 'O, Paris',
          image: 'fixtures/Paris.jpeg',
          user: user2._id,
          createdAt: new Date()
      },
      {
          title: 'Sea at sunset',
          image: 'fixtures/See.jpeg',
          user: user1._id,
          createdAt: new Date()
      },
      {
          title: ' Tree in a drop of water',
          image: 'fixtures/water.jpeg',
          user: user2._id,
          createdAt: new Date()
      },
  )


  await db.close();
};

void run();
