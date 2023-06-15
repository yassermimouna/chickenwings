const express = require('express');
const { createConnection } = require('typeorm');
const { User,UserSchema } = require('./entities/user'); 
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json());

app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;

    const connection = await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '123456',
        database: 'testdb',
        synchronize: true,
        logging: true,
        entities: [
            UserSchema,
        ],
      });
    const userRepository = connection.getRepository(User);

    const user = new User();
      user.id = uuidv4();
      user.name = name;
      user.email = email; 

    await userRepository.save(user);

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorr: 'Internal Server Error',error });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
