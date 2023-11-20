import { Doughnut } from 'react-chartjs-2';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      align: 'start',
      textAlign: 'left',
      labels: {
        padding: 10,
        boxWidth: 7,
        boxHeight: 7,
        usePointStyle: true,
        color: '#000',
        font: {
          size: 12,
        },
      },
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
          return 'Destinasi';
        },
        label: (value) => {
          return `${value.label}: ${value.formattedValue}%`;
        },
      },
    },
  },
};

export const DoughnutChart = ({ topData }) => {
  const labels = topData?.data?.map((item) => item.destination_title);
  const totalTicketPercentage = topData?.data?.map((item) => item.total_ticket_percentage);

  const datas = {
    labels,
    datasets: [
      {
        data: totalTicketPercentage,
        backgroundColor: ['#1C3FB7', '#5475E5', '#ADBCF2'],
      },
    ],
  };

  return (
    <div className="mb-2.5">
      <div className="w-full rounded-lg bg-white shadow ring-0">
        <h1 className="px-3 pt-[15px] text-lg font-bold text-blackDestimate-100">
          Destinasi Terpopuler
        </h1>
        <div className="flex flex-col items-center pb-3">
          <Doughnut className="mt-8 max-h-[180px]" options={options} data={datas} />
        </div>
      </div>
    </div>
  );
};
