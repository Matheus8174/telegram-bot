import makeRequest from '../../utils/makeRequest';

class RestockService {
  public async execute(): Promise<void> {
    const result = await makeRequest('https://www.nike.com.br/');

    console.log(result);
  }
}

export default new RestockService().execute;
