import axios from 'axios';
import faker from 'faker';

const users = 100;
const emails = [];

(async() => {
  for (let i = 0; i < users; i += 1) {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: 'secret'
    };
    emails.push(user);
    await axios.post('http://localhost:9999/auth/signup', user);
  }

  console.log(emails);

})();
