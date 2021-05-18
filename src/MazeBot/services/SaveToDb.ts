import MazeBotRepository from '../../repositories/MazeBotRepository';

type Products = {
  name: string;
  img: string;
  url: string;
  preco: string;
};

class SaveToDb {
  private mazeBotRepository: MazeBotRepository;

  constructor(mazeBotRepository: MazeBotRepository) {
    this.mazeBotRepository = mazeBotRepository;
  }

  async execute(data: Products[]): Promise<void> {
    data.map(async (value) => {
      const { name, img, preco, url } = value;
      await this.mazeBotRepository.create({
        name,
        img,
        preco,
        url
      });
    });
  }
}

export default SaveToDb;
