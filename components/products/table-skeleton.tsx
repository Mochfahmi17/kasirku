const TableSkeleton = ({ rows = 10 }: { rows?: number }) => {
  return (
    <tbody className="bg-white text-gray-500">
      {Array(rows)
        .fill(0)
        .map((_, i) => (
          <tr key={i} className="animate-pulse border-b border-gray-200">
            <td className="px-6 py-4">
              <div className="h-4 w-32 rounded bg-gray-200"></div>
            </td>
            <td className="px-6 py-4">
              <div className="h-4 w-20 rounded bg-gray-200"></div>
            </td>
            <td className="px-6 py-4">
              <div className="h-4 w-12 rounded bg-gray-200"></div>
            </td>
            <td className="px-6 py-4">
              <div className="h-4 w-16 rounded bg-gray-200"></div>
            </td>
            <td className="px-6 py-4">
              <div className="h-4 w-24 rounded bg-gray-200"></div>
            </td>
            <td className="px-6 py-4">
              <div className="h-4 w-28 rounded bg-gray-200"></div>
            </td>
            <td className="px-6 py-4">
              <div className="h-4 w-20 rounded bg-gray-200"></div>
            </td>
          </tr>
        ))}
    </tbody>
  );
};

export default TableSkeleton;
