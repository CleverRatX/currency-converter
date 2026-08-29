import type { Currency } from '../types/currency';

export const currencies: Currency[] = [
  {
    code: 'PLN',
    title: 'Polish zloty',
    symbol: 'zł',
    description:
      'This is the official currency and legal tender of Poland. It is subdivided into 100 grosz-y (gr). ' +
      'It is the most traded currency in Central and Eastern Europe and ranks 21st most-traded in the foreign exchange market.'
  },
  {
    code: 'JPY',
    title: 'Japanese yen',
    symbol: '¥',
    description:
      'The yen is the official currency of Japan. It is the third-most traded currency in the foreign exchange market, ' +
      'after the United States dollar and the euro. It is also widely used as a third reserve currency after the US dollar and the euro.'
  },
  {
    code: 'CAD',
    title: 'Canadian dollar',
    symbol: '$',
    description:
      'The Canadian dollar is the official currency of Canada. It is subdivided into 100 cents and is held by many ' +
      'central banks as a reserve currency, largely because of the size of the Canadian resource market.'
  },
  {
    code: 'USD',
    title: 'United States dollar',
    symbol: '$',
    description:
      'The United States dollar is the official currency of the United States and several other countries. ' +
      'It is the most traded currency in the world and the main reserve currency of central banks.'
  },
  {
    code: 'EUR',
    title: 'Euro',
    symbol: '€',
    description:
      'The euro is the official currency of the euro area. It is the second most traded currency in the foreign ' +
      'exchange market and the second largest reserve currency after the US dollar.'
  }
];

export const getCurrency = (code: string): Currency => {
  const currency = currencies.find((item) => item.code === code);

  if (!currency) {
    throw new Error(`Неизвестный код валюты: ${code}`);
  }

  return currency;
};
