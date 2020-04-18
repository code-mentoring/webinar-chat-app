import axios from 'axios';
import faker from 'faker';

const users = 100;
const emails = [];

(async() => {
  for (let i = 0; i < users; i += 1) {
    const email = faker.internet.email();
    emails.push(email);
    await axios.post('http://localhost:9999/auth/signup', {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email,
      password: 'secret'
    });
  }

  console.log(emails);

})();
