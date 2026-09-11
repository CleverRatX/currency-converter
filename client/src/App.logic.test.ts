import {
  convertAmount,
  convertAmountBack,
  getLatestPriceChange,
  getPriceHistoryStart,
  isAmountInputValid
} from './App.logic';
import { toPriceChanges } from './api/mappers';
import { createPriceChangeDtos } from './mocks/priceChanges';

const price = 36.05;

const priceChanges = toPriceChanges(createPriceChangeDtos('PLN', 'JPY'));
const latestPriceChange = priceChanges[priceChanges.length - 1];

test('converts the amount by the given price', () => {
  expect(convertAmount('2', price)).toBe('72.1');
});

test('converts the amount back by the given price', () => {
  expect(convertAmountBack('100', price)).toBe('2.7739');
});

test('accepts only a number with a single separator', () => {
  expect(isAmountInputValid('12.5')).toBe(true);
  expect(isAmountInputValid('12,5')).toBe(true);
  expect(isAmountInputValid('12.5.5')).toBe(false);
  expect(isAmountInputValid('12x')).toBe(false);
});

test('takes the most recent price change from the history', () => {
  expect(getLatestPriceChange(priceChanges)).toBe(latestPriceChange);
});

test('does not depend on the order of the history', () => {
  expect(getLatestPriceChange([...priceChanges].reverse())).toBe(latestPriceChange);
});

test('returns null for an empty history', () => {
  expect(getLatestPriceChange([])).toBeNull();
});

test('shifts the start of the history window back from the given moment', () => {
  expect(getPriceHistoryStart(new Date('2026-04-27T09:05:00.000Z')).toISOString()).toBe('2026-04-27T09:00:00.000Z');
});
