import { urlEncode } from '../utils/urlHelpers';
const endpoint = 'http://localhost:9001';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNlY29uZEB0ZXN0LmNvbSIsImlhdCI6MTUyMTYwNjM0NywiZXhwIjoxNTIyMjExMTQ3fQ.rrv_mkxTfGP_KMXzc7ANj-WXKAnXRsFInDvFkvJWdnk';

class OrderApi {
  static doCallout(method, url, isAuth, type, body) {
    let config = { method };
    config.headers = {};
    if(isAuth) {
      config.headers.Authorization = 'Bearer '+token;
    }
    if(type === 'URL') {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
      body = urlEncode(body);
    }else {
      config.headers['Content-Type'] = 'application/json';
    }
    switch (method) {
      case 'GET':
        break;
      case 'POST':
        config.body = body;
        break;
      default:
        break;
    }
    console.log('API Request ==> ', endpoint+url, config);
    return new Promise((resolve, reject) => {
      fetch(endpoint+url, config)
      .then(function(response) {
        if(response.ok) {
          console.log(response.status, response.ok);
          resolve(response.json());
        }else {
          console.log(response.status, response.ok);
          response.json()
            .then((error) => reject(error));
        }
      })
      .catch(error => reject(error));
    });
  }

  // All calls return promises.
  static getAllOrders() {
    return OrderApi.doCallout('GET', '/api/orders', true, 'JSON' );
  }

  static login(credentials) {
    return OrderApi.doCallout('POST', '/api/auth/login', false, 'URL', credentials);
  }

  static saveOrder(order) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign({}, order));
      }, 1000);
    });
  }  
}

export default OrderApi;
