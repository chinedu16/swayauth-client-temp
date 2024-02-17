import { useEffect, useState } from "react";
// const daysNumeric = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28']

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const weeks = [<span key={1}>—3 wk</span>, <span key={2}>—2 wk</span>, <span key={3}>—1 wk</span>, <span key={4}><span className="inline-block rounded-full min-h-2 min-w-2 bg-green-600"></span> wk</span>,]
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const getDay = () => {
  const currDay = new Date().getDay();
  return days.concat(days).slice(currDay + 1, currDay + 8)
}
const get6months = () => {
  const currMonth = new Date().getMonth();
  return months.concat(months).slice(currMonth + 7, currMonth + 13)
}
const getOneYear = () => {
  const currMonth = new Date().getMonth();
  return months.concat(months).slice(currMonth + 1, currMonth + 13)
}

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

function Chart({ data, loading, format = '7', height = 'h-[15rem]' }: { loading?: boolean, height?: string, data: number[] | undefined | null, format?: '7' | '30' | '180' | '360' }) {
  const [array, setArray] = useState<number[]>(Array(format == '7' ? 7 : format == '30' ? 28 : format == '180' ? 6 : 12).fill(0))
  const [ini, sIni] = useState<number[]>([])

  useEffect(() => {
    if (data && data?.length) {
      sIni(data)
      setTimeout(() => {
        setArray(valueCalculator(data.slice(0, format === '7' ? 7 : format === '30' ? 30 : format === '180' ? 6 : 12)))
      }, 200)
    }
  }, [data, format])

  return (
    <div className={`chart flex ${height} ${loading ? 'opacity-20' : ''} pb-5 relative justify-between items-stretch`}>
      {
        array.map((v, i) =>
          <div data-tooltip={`${ini[i]}`} key={i} className="d-flex h-full flex-col items-center">
            <div className={`_${format} h-full cursor-pointer relative rounded-full bg-slate-200 overflow-hidden`}>
              <div className={`w-full item absolute rounded-xl bottom-0 bg-blue-700 h-${v}`}></div>
            </div>
            <div className={`text-slate-500 inline-block text-center title _${format}`}>{format === '7' ? getDay()[i] : format === '30' ? weeks[i] : format == '180' ? get6months()[i] : getOneYear()[i]}</div>
          </div>
        )
      }
    </div>
  )
}

export default Chart