// import { FormData } from "@/lib/form";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

const CodeInput = ({ length = 6, onChange, loading }: { length?: number, loading?: boolean, onChange?: (v: string) => void }) => {
  const [values, setValues] = useState('');
  const inputRefs = useRef<HTMLInputElement[]>([])

  useEffect(() => {
    if (onChange) {
      onChange(values);
    }
  }, [values]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const buttons = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'] as const
    const key = e.key as typeof buttons[number]
    const value = (e.target as any).value
    const name = Number((e.target as any).name)
    if (buttons.includes(key) && !value) {
      if (name > 0) {
        inputRefs.current[name].blur()
        inputRefs.current[name - 1].focus()
      }
    }
    if (key === 'ArrowLeft' && name > 0) {
      inputRefs.current[name].blur()
      inputRefs.current[name - 1].focus()
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const name = Number(e.target.name)
    setValues(p => {
      if (p[name]) {
        let str = p.split('');
        str[name] = value[value.length - 1]
        p = str.join('')
      } else {
        p += value
      }
      return p
    })
    if (value) {
      if (name < (length - 1)) {
        inputRefs.current[name].blur()
        inputRefs.current[name + 1].focus()
      }
    } else {
      if (name > 0) {
        inputRefs.current[name].blur()
        inputRefs.current[name - 1].focus()
      }
    }
  }

  return <div className="inline-block relative">
    {
      Array(length).fill(0).map((_, i) =>
        <input
          key={i}
          autoFocus={i == 0 ? true : false}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={elem => { (inputRefs.current as any)[i] = elem }}
          required
          disabled={loading}
          value={values[i] || ''}
          placeholder="*"
          type="number"
          name={`${i}`}
          className={`
        md:text-xl inline-flex mr-2 relative
        md:py-2 md:pl-4 w-[2.3rem] py-1 pl-3
      md:w-[3rem] focus:outline-1 
      placeholder:text-xl
      md:placeholder:text-3xl
      placeholder:absolute
      disabled:bg-slate-300
      justify-center items-center
      invalid:[&:not(:placeholder-shown):not(:focus)]:ring-2
    invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-200
    invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-700 
      focus:ring-2 border rounded-md
      [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none
      `} />
      )
    }
    <button type="submit" className="hidden w-0 h-0"></button>
  </div>;
};

export default CodeInput;
