import { Doughnut } from "react-chartjs-2";
const DoughnutDiagram = ({ data1 = 0, data2 = 0 }) => {
  const options = {
    cutoutPercentage: 55,
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
  };
  const dataIs = (data1 / data2) * 100;
  const data = {
    datasets: [
      {
        data: [dataIs, 100 - dataIs],
        backgroundColor: ["#53C48A", "#E1E9F8"],
        hoverBackgroundColor: ["#53C48A", "#E1E9F8"],
        borderColor: ["#53C48A", "#E1E9F8"],
        borderWidth: [0, 0],
      },
    ],
  };
  return (
    <div className="doughnut-wrapper">
      <Doughnut data={data} options={options} width={150} height={150} />
      <div className="progressbar__main">
        <span className="progressbar__text">
          {`${data1} of ${data2}`}
          <span className="progressbar__text progressbar__text--small">
            Payments
          </span>
        </span>
      </div>
    </div>
  );
};
export default DoughnutDiagram;
