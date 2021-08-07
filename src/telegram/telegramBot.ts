import { Telegraf } from 'telegraf';

const bot = new Telegraf('1716663879:AAGNti3hb5JI-DVXk58th0hQJaMU_3EdfsI');

type Products = {
  name: string;
  img: string;
  url: string;
  preco: string;
};

export async function sendMazeMessage(message: Products): Promise<void> {
  const { name, img, preco, url } = message;
  await bot.telegram.sendMessage(
    '1375598149',
    `
      Nome: ${name}
      Image: ${img}
      Preco: ${preco}
      Link: ${url}
    `
  );
}

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

bot.launch();
