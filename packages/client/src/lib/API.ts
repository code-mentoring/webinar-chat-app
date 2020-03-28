import axios from 'axios';

class API {
  prefix = 'http://localhost:9999';

  async getConversation(id: string) {
    const res = await axios.get(`${this.prefix}/conversations/${id}`);
    return res.data;
  }
}
export const api = new API();
