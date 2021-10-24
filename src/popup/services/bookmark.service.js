import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/bookmarks/';

class BookmarkService {

  getAll() {
    return axios.get(API_URL + 'getAll', { headers: authHeader() });
  }

}

export default new BookmarkService();
