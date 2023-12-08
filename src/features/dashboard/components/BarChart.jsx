import { Bar } from 'react-chartjs-2';
import CountUp from 'react-countup';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { ArrowUpRightIcon } from 'lucide-react';

import { convertToRupiah } from '@/utils/format';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#545F71',
        font: {
          size: 14,
        },
      },
    },
    y: {
      ticks: {
        color: '#545F71',
        font: {
          size: 14,
        },
        callback: (value) => {
          return `${convertToRupiah(value)}`;
        },
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: '#f7f7f7',
      titleColor: '#000',
      bodyColor: '#000',
      titleAlign: 'center',
      bodyAlign: 'center',
      displayColors: false,
      padding: 14,
      callbacks: {
        title: () => {
          return 'Income';
        },
        label: (value) => {
          if (value.parsed.y !== null) {
            return new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(value.parsed.y);
          }
        },
      },
    },
  },
};

export const BarChart = ({ data }) => {
  const labels = data?.monthlyIncome?.map((item) => item.month);
  const income = data?.monthlyIncome?.map((item) => item.income);

  const datas = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: income,
        backgroundColor: '#1C3FB7',
        borderRadius: 5,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="xl:col-span-6 xl:col-start-1">
      <div className="h-full w-full rounded-lg bg-white p-[17px] shadow ring-0">
        <h1 className="mb-4 text-xl font-bold text-primary-100 sm:text-2xl">Pendapatan</h1>
        <div className="font-semibold text-blackDestimate-100">
          <div className="mb-5 flex items-end gap-4">
            <p className="truncate text-xl sm:text-2xl lg:text-3xl xl:text-4xl">
              Rp.
              <CountUp start={0} end={data?.totalIncomeForTimeRange} duration={2} separator="." />
            </p>
            <div className="flex items-center text-xl">
              <ArrowUpRightIcon className="h-6 w-6 flex-none text-greenDestimate-100" />
              <span className="ml-1 flex-none truncate text-greenDestimate-100">5.2%</span>
            </div>
          </div>
        </div>
        {/* <div className="h-auto sm:h-[391px]"> */}
        <Bar options={options} data={datas} />
        {/* </div> */}
      </div>
    </div>
  );
};
