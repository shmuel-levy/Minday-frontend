import CountUp from 'react-countup';

export function NumbersWidget({ title, value }) {
  return (
    <div className="numbers-widget">
      <h2>{title}</h2>
      <div className="number-value">{value}</div>
    </div>
  );
}