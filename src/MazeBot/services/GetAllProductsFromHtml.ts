import cheerio, { CheerioAPI } from 'cheerio';

type Products = {
  name: string;
  img: string;
  url: string;
  preco: string;
};

class GetAllProductsFromHtml {
  private $: CheerioAPI;

  public execute(html: string): Promise<Products[]> {
    this.$ = cheerio.load(html);

    return new Promise((resolve, reject) => {
      try {
        const products = this.getProductsName().map((name, index) => ({
          name,
          img: this.getProductsImg()[index],
          url: this.getProductsUrl()[index],
          preco: this.getProductsPreco()[index]
        }));

        resolve(products);
      } catch (e) {
        reject(e);
      }
    });
  }

  private getProductsUrl(): string[] {
    const products = this.$('.dados a');
    const productsUrl: string[] = [];

    products.each((index, element): void => {
      const newUrl = this.$(element);

      productsUrl.push(`https://www.maze.com.br${newUrl.attr('href')}`);
    });

    return productsUrl;
  }

  private getProductsName(): string[] {
    const products = this.$('h3 span');
    const productsName: string[] = [];

    products.each((index, element): void => {
      const newName = this.$(element);

      productsName.push(newName.text().slice(15).slice(0, -13));
    });

    return productsName;
  }

  private getProductsPreco(): string[] {
    const products = this.$('.preco');
    const productsPreco: string[] = [];

    products.each((index, element): void => {
      const newPreco = this.$(element);

      productsPreco.push(newPreco.text() as string);
    });

    return productsPreco;
  }

  private getProductsImg(): string[] {
    const products = this.$('a.ui.image.fluid.attached img');
    const productsImg: string[] = [];

    products.each((index, element): void => {
      const newImg = this.$(element);

      productsImg.push(newImg.attr('data-src') as string);
    });

    return productsImg;
  }
}

export default new GetAllProductsFromHtml();
