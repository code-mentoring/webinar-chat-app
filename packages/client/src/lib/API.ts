import axios from 'axios';
import { setMe, getMe } from '../config';

class API {
  prefix = '%%API_URL%%'; // Replaced in webpack depending on the NODE_ENV

  async login(email: string, password: string) {
    return this.request('post', '/auth/login', {
      email, password
    });
  }

  async signup(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    return this.request('post', '/auth/signup', {
      firstName, lastName, email, password
    });
  }

  async me() {
    const me = await this.request('get', '/me');
    setMe(me);
    return me;
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
      userId: getMe()!.id,
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
