import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/bookmarks/';

class BookmarkService {

  getAll() {
    return axios.get(API_URL + 'getAll', { headers: authHeader() });
  }

  getOne(url) {
    return axios.get(API_URL + 'getOne?url=' + encodeURIComponent(url), { headers: authHeader() });
  }

  getTags() {
    return axios.get(API_URL + 'tags', { headers: authHeader() });
  }

  save(bookmark) {
    return axios.post(API_URL + 'save', bookmark, { headers: authHeader() });
  }

}

export default new BookmarkService();
