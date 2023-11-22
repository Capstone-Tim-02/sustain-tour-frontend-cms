import { default as dayjs } from 'dayjs';

import 'dayjs/locale/id';

// DATE FORMAT exp: 2021-01-01 => 30 November 2023
export const formatDate = (date, format) => dayjs.locale('id') && dayjs(date).format(format);

// RUPIAH FORMAT exp: 1000 => Rp. 1.000
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

// NUMBER TO THOUSAND exp: 1000 => 1.000
export const convertNumberToThousand = (number) => {
  let formattedNumber = number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return formattedNumber;
};

// SPLIT DATA EMISSION. exp: 1000.00 => 1000
export const splitEmission = (number) => {
  let splitNumber = number?.toString().split('.')[0];
  return splitNumber;
};
