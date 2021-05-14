import request from 'request';

type Html = string;

function makeRequest(url: string): Promise<Html> {
  return new Promise((resolve, reject) => {
    try {
      request(url, (req, res, body) => {
        if (!body) {
          throw new Error('There was an error at Request body');
        }
        resolve(body);
      });
      if (url !== 'https://www.maze.com.br/categoria/sale/tenis')
        throw new Error('There was an error in the URL provided to the Bot');
    } catch (e) {
      reject(e);
    }
  });
}

export default makeRequest;
