import axios from 'axios';

class API {
  prefix = 'http://localhost:9999';

  async getConversation(id: string) {
    try {
      const res = await axios.get(`${this.prefix}/conversations/${id}`);
      return res.data;
    } catch (e) {
      return null;
    }
  }

  async getMessages(id: string) {
    const res = await axios.get(`${this.prefix}/conversations/${id}/messages`);
    return res.data;
  }

  async createMessage(
    conversationId: string,
    content: string
  ) {
    const res = await axios.post(`${this.prefix}/messages`, {
      "userId": "d6147162-7377-4236-ab1d-a641f577c3b7",
      content,
      conversationId
    });
    return res.data;
  }
}
export const api = new API();
