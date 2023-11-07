import { useEffect, useState } from "react"

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const daysNumeric = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const valueCalculator = (values: number[] | null | undefined) => {
  if (values) {
    const max = Math.max(...values)
    if (max > 100) {
      const maxLength = String(max).length - 2;
      values = values.map(v => Math.floor(v / Math.pow(10, maxLength)))
    }
    const x = Math.floor(100 / max)
    return values.map(v => Math.floor(v * x))
  } else {
    return []
  }
}

function Chart({ data, format = '7', height = 'h-[15rem]' }: { height?: string, data: number[] | undefined | null, format?: '7' | '30' | '180' | '360' }) {
  const [array, setArray] = useState(data?.map(_ => 0) ?? [])
  const [ini, sIni] = useState<number[]>([])

  useEffect(() => {
    if (data && data?.length) {
      sIni(data)
      setTimeout(() => {
        setArray(valueCalculator(data.slice(0, format === '7' ? 7 : format === '30' ? 30 : format === '180' ? 6 : 12)))
      }, 200)
    }
  }, [data])

  return (
    <div className={`chart flex ${height} pb-5 justify-between items-stretch`}>
      {
        array.map((v, i) =>
          <div data-tooltip={`${ini[i]}`} key={i} className="d-flex h-full flex-col items-center">
            <div className={`_${format} h-full mb-2 cursor-pointer relative rounded-md bg-slate-200 overflow-hidden`}>
              <div className={`w-full item absolute rounded-md bottom-0 bg-blue-700 h-${v}`}></div>
            </div>
            <div className={`text-slate-500 title _${format}`}>{format === '7' ? days[i] : format === '30' ? daysNumeric[i] : months[i]}</div>
          </div>
        )
      }
    </div>
  )
}

export default Chart