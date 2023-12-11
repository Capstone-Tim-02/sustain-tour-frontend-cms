import { default as dayjs } from 'dayjs';

import 'dayjs/locale/id';

/**
 * Format date to locale id (indonesia) with dayjs library (https://day.js.org/)
 * @function formatDate
 * @param date {string} -> 2023-12-31
 * @param format {string} -> DD MMMM YYYY
 * @returns {string} -> 31 Desember 2023
 */
export const formatDate = (date, format) => dayjs.locale('id') && dayjs(date).format(format);

/**
 * Convert number to rupiah format
 * @function convertToRupiah
 * @param number {number} -> 1000000
 * @returns {string} -> Rp. 1.000.000
 */
export const convertToRupiah = (number) => {
  let rupiah = '';
  let numberRev = number.toString().split('').reverse().join('');

  for (let i = 0; i < numberRev.length; i++) if (i % 3 == 0) rupiah += numberRev.substr(i, 3) + '.';
  return (
    'Rp. ' +
    rupiah
      .split('', rupiah.length - 1)
      .reverse()
      .join('')
  );
};

/**
 * Convert Number to Thousand
 * @function convertNumberToThousand
 * @param number {number} -> 1000
 * @returns {string} -> 1.000
 */
export const convertNumberToThousand = (number) =>
  number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

/**
 * Split Emission
 * @function splitEmission
 * @param number {number} -> 1000.00
 * @returns {string} -> 1000
 */
export const splitEmission = (number) => number?.toString().split('.')[0];

/**
 * Convert number to positive
 * @function convertToPositive
 * @param number {number} -> -1000
 * @returns {string} -> 1000
 */
export const convertToPositive = (number) => Math.abs(number);

/**
 * Format Currency
 * @function formatCurrency
 * @param number {number} -> 1000
 * @returns {string} -> 1.000
 */
export const formatCurrency = (value) => {
  const removeCharacter = value?.toString().replace(/[^0-9]/g, '');
  return removeCharacter?.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

/**
 * Replace Format Currency
 * @function replaceFormatCurrency
 * @param number {number} -> 1.000
 * @returns {string} -> 1000
 */
export const replaceFormatCurrency = (value) => value?.replace(/[^0-9]/g, '');
