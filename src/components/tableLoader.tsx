"use client"
const TableLoader = ({ row, col = 4 }: { row: number, col?: number }) => {
  return <>
    {
      Array(col).fill(0).map((_, i) =>
        <tr key={i}>
          {
            Array(row).fill(0).map((_, j) =>
              <td key={j}>
                <div className="animate-pulse bg-gray-300 h-5 mx-1 mt-4 rounded-xl" />
              </td>
            )
          }
        </tr>
      )
    }
  </>;
};

export default TableLoader;
