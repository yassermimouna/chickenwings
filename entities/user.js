const { EntitySchema } = require('typeorm');

class User {
  constructor() {
    this.id = null;
    this.name = null;
    this.email = null;
  }
}

const UserSchema = new EntitySchema({
  name: 'User',
  target: User,
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
    },
    name: {
      type: 'varchar',
    },
    email: {
      type: 'varchar',
      unique: true,
    },
  },
});


module.exports = { User , UserSchema}