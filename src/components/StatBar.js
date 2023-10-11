function StatBar({ label, value }) {
  const MAX_STAT = 255;  // Maximum possible stat value to normalize the bar length.
  const barWidth = (value / MAX_STAT) * 100;

  return (
    <div className="flex items-center mb-2">
      <div className="w-32 font-bold capitalize mt-4" >{label}</div>
      <div className="flex-1 bg-gray-300 h-5 rounded mt-5">
        <div className="bg-blue-500 h-full" style={{ width: `${barWidth}%` }}></div>
      </div>
      <div className="ml-2 w-10 text-right mt-4 font-bold">{value}</div>
    </div>
  );
}

export default StatBar;