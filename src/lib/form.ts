import { Dispatch, FormEvent, SetStateAction, useState } from "react";

type ObjectType = { [key: string]: string | boolean | any[] | { [key: string]: string | boolean | any[] | { [key: string]: string | boolean | any[] | { [key: string]: string | boolean | any[] | { [key: string]: string | boolean | any[] | { [key: string]: string | boolean | any[] | { [key: string]: string | boolean | any[] } } } } } } }
export class Validator {
  Pattern: RegExp | undefined;
  OtherPattern: RegExp[] = [];
  Message = '';
  OtherMessages: string[] = [];

  constructor(...args: [(RegExp | string), (RegExp | string)] | [(RegExp | string)] | []) {
    if (args[0]) {
      if (typeof args[0] === 'string') this.Message = args[0]; else this.Pattern = args[0]
    }
    if (args[1]) {
      if (typeof args[1] === 'string') this.Message = args[1]; else this.Pattern = args[1]
    }
  }

  isPassword(message?: string, regexp?: RegExp) {
    this.OtherPattern.push(regexp ? regexp : /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[\W_]).{6,}$/)
    this.OtherMessages.push(message ? message : 'Password must be at least 6 letters, containing one symbol, digit, lowercase, and uppercase character.')
    return this
  }

  isPhone(message?: string, regexp?: RegExp) {
    this.OtherPattern.push(regexp ? regexp : /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g)
    this.OtherMessages.push(message ? message : '')
    return this
  }

  isEmail(message?: string, regexp?: RegExp) {
    this.OtherPattern.push(regexp ? regexp : /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    this.OtherMessages.push(message ? message : 'Invalid email address format');
    return this
  }

  isUrl(message?: string, regexp?: RegExp) {
    this.OtherPattern.push(regexp ? regexp : /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)
    this.OtherMessages.push(message ? message : '')
    return this
  }

  String = (v: any = ''): string => {
    let valid = (typeof v === 'string' &&
      (this.Pattern ? this.Pattern.test(v) : true))
      ? true : false;
    let message = this.Message;
    let pattern = this.Pattern;
    if (valid && this.OtherPattern.length) {
      for (let i = 0; i < this.OtherPattern.length; i++) {
        const regexp = this.OtherPattern[i];
        if (!regexp.test(v)) {
          valid = false; message = this.OtherMessages[i]; pattern = regexp
          break;
        }
      }
    }

    return {
      valid,
      value: v,
      pattern,
      message,
    } as any
  }

  Array = <T = any>(v: any[] = []): T[] => {
    v = typeof v === 'string' ? [v] : v
    let valid = (typeof v === 'object' && v[0])
      ? true : false;
    let message = this.Message;
    let pattern = this.Pattern;
    if (valid && this.OtherPattern.length) {
      for (let i = 0; i < this.OtherPattern.length; i++) {
        const regexp = this.OtherPattern[i];
        if (!v.every(r => regexp.test(r))) {
          valid = false; message = this.OtherMessages[i]; pattern = regexp
          break;
        }
      }
    }

    return {
      valid,
      value: v,
      pattern,
      message,
    } as any
  }

  Object = <O = ObjectType>(v: any = {}): O => {
    let valid = (typeof v === 'object'
      && Object.keys(v)?.length) ? true : false;
    let message = this.Message;
    let pattern = this.Pattern;
    if (valid && this.OtherPattern.length) {
      for (let i = 0; i < this.OtherPattern.length; i++) {
        const regexp = this.OtherPattern[i];
        if (!Object?.values(v)?.every(r => typeof r === 'string' ? regexp.test(r) : true)) {
          valid = false; message = this.OtherMessages[i]; pattern = regexp
          break;
        }
      }
    }

    return {
      valid,
      value: v,
      pattern,
      message,
    } as any
  }

  Boolean = (v: any = true): boolean => {
    return {
      valid: (typeof v === 'boolean'),
      value: v,
      pattern: this.Pattern,
      message: this.Message
    } as any
  }

  Number = (v: any = true): boolean => {
    return {
      valid: (typeof v === 'number'),
      value: v,
      pattern: this.Pattern,
      message: this.Message
    } as any
  }
}


export const FormClear = (event: any, fieldsArray: string[]) => {
  event?.preventDefault();
  for (let i = 0; i < fieldsArray.length; i++) {
    try {
      event.target[fieldsArray[i]].value = '';
    } catch (error) { }
  }
}

export const FormData = <T extends string>(
  e: any,
  o: Array<T>,
): { [K in T]: string | number | boolean } => {
  e?.preventDefault();
  return o.reduce((res, k) => {
    res[k] =
      e?.target[k]?.attributes?.type?.value === 'checkbox'
        ? e?.target[k]?.checked
        : NodeList.prototype.isPrototypeOf(e?.target[k]) ?
          [...e?.target[k]].map((node: any) => node?.value)
          : isNaN(e?.target[k]?.value)
            ? e?.target[k]?.value
            : Number(e?.target[k]?.value);
    return res;
  }, Object.create(null));
};


export function FormHandler<T extends { [key: string]: (v?: any) => string | boolean | any[] | ObjectType }>(e: any, schema: T): {
  data: { [K in keyof T]: ReturnType<T[K]> }
  error: boolean
  affectedKey: keyof T,
  message: string
} {
  e?.preventDefault();
  let error = false
  let affectedKey = ''
  let message = 'OK'
  const data = Object.keys(schema).reduce((res: any, k: any) => {
    const val = e?.target[k]?.attributes?.type?.value === 'checkbox'
      ? e?.target[k]?.checked
      : NodeList.prototype.isPrototypeOf(e?.target[k]) ?
        [...e?.target[k]].map((node: any) => node?.value)
        : isNaN(e?.target[k]?.value)
          ? e?.target[k]?.value
          : Number(e?.target[k]?.value);

    const vRes = schema[k](val) as unknown as { valid: boolean, value: any, pattern: RegExp | undefined, message: string }
    if (!vRes.valid) {
      error = true
      affectedKey = k
      message = vRes.message
    }
    res[k] = vRes.value
    return res;

  }, Object.create(null))

  return {
    data,
    error,
    affectedKey,
    message
  };
}

export const file2Base64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() || '');
    reader.onerror = error => resolve('');
  })
}

export function useForm<T extends
  { [key: string]: (v?: any) => string | boolean | any[] | ObjectType }
>({ schema, extendSubmit }: {
  schema: T,
  extendSubmit?: (obj: {
    data: { [K in keyof T]: ReturnType<T[K]> },
    error: boolean,
    affectedKey: keyof T
    message: string
  }, {
    setError,
    resetForm,
    setLoading
  }:
      {
        setError: (
          v: { error?: boolean, affectedKey?: string, message?: string }
        ) => void;
        resetForm: () => void;
        setLoading: Dispatch<SetStateAction<boolean>>
      }
  ) => Promise<void>
}): {
  data: { [K in keyof T]: ReturnType<T[K]> }
  error: boolean
  affectedKey: keyof T,
  loading: boolean
  message: string,
  handleFormSubmit: (e: FormEvent<HTMLFormElement>) => void
  handleFormChanges: (e: FormEvent<HTMLFormElement>) => void
} {

  const [formData, setFormData] = useState<{
    data: { [K in keyof T]: ReturnType<T[K]> },
    error: boolean,
    affectedKey: keyof T
    message: string
  }>({
    data: Object.keys(schema).reduce((res: any, k: any) => {
      res[k] = null
      return res
    }, Object.create(null)),
    affectedKey: '',
    error: false,
    message: ''
  });

  const [loading, setLoading] = useState(false);

  const handleExtSubmitError = (v: { error?: boolean, affectedKey?: string, message?: string }) => {
    setFormData(p => ({ ...p, ...v }))
  }

  const handleFormChanges = (e: any) => {
    const k = e?.target?.name
    const val = e?.target?.attributes?.type?.value === 'checkbox'
      ? e?.target?.checked
      : NodeList.prototype.isPrototypeOf(e?.target) ?
        [...e?.target].map((node: any) => node?.value)
        : isNaN(e?.target?.value)
          ? e?.target?.value
          : Number(e?.target?.value);

    const vRes = schema[k]?.(val) as unknown as { valid: boolean, value: any, pattern: RegExp | undefined, message: string }
    setFormData(p => ({ ...p, data: { ...p.data, [k]: vRes?.value || '' }, error: !vRes?.valid, affectedKey: vRes?.valid ? '' : k, message: vRes?.message || 'OK' }))
  }

  const handleFormReset = (e: any) => {
    e?.preventDefault();
    for (const key in schema) {
      try {
        e.target[key].value = '';
      } catch (error: any) { }
    }
  }

  const handleFormSubmit = async (e: any) => {
    const res = FormHandler(e, schema)
    setFormData(p => res)
    if (!res.error) {
      if (extendSubmit) {
        setLoading(true)
        await extendSubmit(formData, { setError: handleExtSubmitError, resetForm: () => handleFormReset(e), setLoading })
      }
    }
    setLoading(false)
  }

  return {
    ...formData,
    loading,
    handleFormSubmit,
    handleFormChanges
  }
}