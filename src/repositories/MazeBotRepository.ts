import { Repository, getRepository, createQueryBuilder } from 'typeorm';
import CreateMazeBotDTO from '../dtos/CreateMazeBotDTO';
import Maze from '../models/Maze';

class MazeBotRepository {
  private ormRepository: Repository<Maze>;

  constructor() {
    this.ormRepository = getRepository(Maze);
  }

  public async selectAllProducts(): Promise<Maze[]> {
    const allProducts = await this.ormRepository.find();
    return allProducts;
  }

  public async deleteAllProduct(): Promise<void> {
    await createQueryBuilder().delete().from(Maze).execute();
  }

  public async save(maze: Maze): Promise<Maze> {
    return this.ormRepository.save(maze);
  }

  public async create({
    img,
    name,
    preco,
    url
  }: CreateMazeBotDTO): Promise<Maze> {
    // console.log(this.ormRepository.create());
    const newMaze = this.ormRepository.create({ img, preco, name, url });

    await this.ormRepository.save(newMaze);

    return newMaze;
  }
}

export default MazeBotRepository;
