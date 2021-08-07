import MazeTenis from '../../models/Maze';

type Products = {
  name: string;
  img: string;
  url: string;
  preco: string;
};

class HandleNewProducts {
  async execute(
    allProductsFromBd: MazeTenis[],
    allProducts: Products[],
    callBack: (newItem: Products) => void
  ): Promise<Products[]> {
    const result: Products[] = [];
    allProducts.forEach(async (element) => {
      const productThatNotExist = allProductsFromBd.find(
        ({ name }) => name === element.name
      );

      if (productThatNotExist) {
        result.push(element);
      }

      if (!productThatNotExist) {
        result.unshift(element);
        callBack(element);
      }
    });

    return result;
  }
}

export default new HandleNewProducts().execute;
