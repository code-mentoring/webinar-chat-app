import axios from 'axios';

class API {
  prefix = 'http://localhost:9999';

  async login(email: string, password: string) {
    return this.request('post', '/auth/login', {
      email, password
    });
  }

  async getConversations() {
    return this.request('get', '/conversations');
  }

  async getConversation(id: string) {
    return this.request('get', `/conversations/${id}`);
  }

  async createConversation(name: string) {
    return this.request('post', '/conversations', { name });
  }

  async getMessages(id: string) {
    return this.request('get', `/conversations/${id}/messages`);
  }

  async createMessage(
    conversationId: string,
    content: string
  ) {
    return this.request('post', '/messages', {
      userId: 'd6147162-7377-4236-ab1d-a641f577c3b7',
      content,
      conversationId
    });
  }


  private async request(
    type: 'get' | 'post',
    url: string,
    data?: object
  ) {
    const headers = {
      authorization: `Bearer ${localStorage.getItem('token')}`
    };

    try {
      let res: any;
      if (type === 'get') {
        res = await axios.get(`${this.prefix}${url}`, {
          headers
        });
      }
      if (type === 'post') {
        res = await axios.post(`${this.prefix}${url}`, data, {
          headers
        });
      }
      return res!.data;
    } catch (e) {
      return null;
    }
  }
}
export const api = new API();
