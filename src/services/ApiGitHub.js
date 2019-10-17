import OAuthManager from 'react-native-oauth';
import AsyncStorage from '@react-native-community/async-storage';
import axios, {AxiosInstance, AxiosResponse} from 'axios';

export class ApiGitHub {
  /**
   * @returns {Promise<boolean>}
   */
  async login() {
    const loginConfig = {
      github: {
        client_id: 'Iv1.1e3db251ec8c44ff',
        client_secret: '235ed1923c675953779e58d4df49b317b912a5a6',
      },
    };
    const manager = new OAuthManager('DevFinder-AceleraDev');
    manager.configure(loginConfig);
    try {
      const credentials = await manager.authorize('github');
      if (credentials && credentials.authorized) {
        await AsyncStorage.setItem(
          'userToken',
          credentials.response.credentials.accessToken,
        );
        return true;
      }
    } catch (error) {
      return false;
    }
  }

  /**
   * @returns {Promise<AxiosResponse<any>>}
   */
  async getUser() {
    const request = await this.getAxios();
    return request.get('/user');
  }

  /**
   * @returns {Promise<AxiosInstance>}
   */
  async getAxios() {
    const token = await AsyncStorage.getItem('userToken');
    return axios.create({
      baseURL: 'https://api.github.com',
      headers: {
        Authorization: `token ${token}`,
      },
    });
  }
}
