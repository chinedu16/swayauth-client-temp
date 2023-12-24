import { useEffect, useState } from "react"
// const daysNumeric = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28']

const currMonth = 11 || new Date().getMonth();
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const weeks = [<span key={1}>1<sup>st</sup> wk</span>, <span key={2}>2<sup>nd</sup> wk</span>, <span key={3}>3<sup>rd</sup> wk</span>, <span key={4}>4<sup>th</sup> wk</span>,]
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const get6months = (curr: number) => {
  if (curr > 4) {
    return months.slice(curr - 5, curr + 1);
  } else {
    let arr = months.slice(0, curr + 1);
    arr = months.slice().reverse().slice(0, 5 - curr).reverse().concat(arr);
    return arr
  }
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
            <div className={`_${format} h-full cursor-pointer relative rounded-md bg-slate-200 overflow-hidden`}>
              <div className={`w-full item absolute rounded-md bottom-0 bg-blue-700 h-${v}`}></div>
            </div>
            <div className={`text-slate-500 inline-block text-center title _${format}`}>{format === '7' ? days[i] : format === '30' ? weeks[i] : get6months(currMonth)[i]}</div>
          </div>
        )
      }
    </div>
  )
}

export default Chart