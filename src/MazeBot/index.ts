import 'reflect-metadata';
import '../database/connection';

import mock from './mock';
import makeRequest from '../utils/makeRequest';
import getAllProductsFromHtml from './services/GetAllProductsFromHtml';
import MazeBotRepository from '../repositories/MazeBotRepository';
import SaveToDb from './services/SaveToDb';
import handleNewProducts from './services/HandleNewProducts';

import { sendMazeMessage } from '../telegram/telegramBot';

makeRequest('https://www.maze.com.br/categoria/sale/tenis').then(
  async (html) => {
    const mazeBotRepository = new MazeBotRepository();
    const saveToDb = new SaveToDb(mazeBotRepository);

    const allProducts = await getAllProductsFromHtml.execute(html);
    const allProductsFromBd = await mazeBotRepository.selectAllProducts();

    const newProductsToSave = await handleNewProducts(
      allProductsFromBd,
      allProducts,
      sendMazeMessage
    );
    // console.log(newProductsToSave);
    await mazeBotRepository.deleteAllProduct();
    await saveToDb.execute(newProductsToSave);
  }
);
