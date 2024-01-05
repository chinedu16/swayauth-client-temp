import { AccountData, scope } from '@/store/slice/account';
import Cookie from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { CONST } from "./constant";

const month = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const monthLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const dateShort = (dateString?: string, fullMonth = false) => {
  const date = dateString ? new Date(dateString) : new Date();
  return `${(fullMonth ? monthLong : month)[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

export const dateLong = (dateString?: string, hour: boolean = true) => {
  const hr = hour ? { hour: 'numeric', minute: 'numeric' } : {}
  const event = dateString ? new Date(dateString as string) : new Date();
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour12: true,
    ...hr
  };
  return event.toLocaleDateString(undefined, options as any);
};

export const getTime = (dateString?: string | null) => {
  const date = dateString ? new Date(dateString as string) : new Date();
  let h = date.getHours();
  h = h > 12 ? h % 12 : h;
  let m = date.getMinutes()
  return `${h < 10 ? `0${h}` : h}:${m < 10 ? `0${m}` : m} ${h > 12 ? 'PM' : 'AM'}`;
};

export const money = (value?: number | string, currency = true, trailingZero = 0) =>
  `${currency ? '₦' : ''}` +
  new Intl.NumberFormat('en-US', {
    minimumFractionDigits: trailingZero,
    maximumFractionDigits: trailingZero,
  }).format(((value ?? 0) as any) * 1);

export const cropString = (str?: string, length: number = 1) => {
  return str ? str.substring(0, length) + (str.length > length ? '. . .' : '') : 'N/A';
}

export const sortObject = (
  array: any[],
  sort: { key: string, asc: boolean }
) => {
  if (!sort.key || array?.length < 2) return array
  const s = sort.key.split('.');
  return array.sort((u1: any, u2: any) => {
    const v1 = s.length > 1 ? u1[s[0]][s[1]] : u1[s[0]]
    const v2 = s.length > 1 ? u2[s[0]][s[1]] : u2[s[0]]
    return sort.asc ? ((v1 < v2) ? 1 : (v1 > v2) ? -1 : 0) : (v1 > v2) ? 1 : (v1 < v2) ? -1 : 0
  })
}

export const shareLink = async (invitee?: string) => {
  const url = `https://betascratch.com/home?register=true&invitee=${invitee}`;
  try {
    navigator.share({
      url,
      text: "Hi friend, earn amazing cashback in your wallet when you register using my invite link on Betascratch",
      title: "Earn amazing cashback in your wallet when you register using my invite link on Betascratch",
    });
  } catch (error) {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `Hi friend, earn amazing cashback in your wallet when you register using my invite link on Betascratch \n${url}`
      )}`,
      "_blank"
    );
  }
};

export const copyText = async (data?: string) => {
  try {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(data || '');
    }
  } catch (error) {
    prompt("Copy to clipboard: Ctrl+C, Enter", data || '');
  }
  toast.success("Copied to clipboard!");
};

interface Decoded {
  permissions: ('read' | 'write' | 'delete')[]
  access: 'level_2' | 'level_3'
  scope: scope[]
}

export const isPermission = (permission: 'read' | 'write' | 'delete') => {
  try {
    const tk = Cookie.get(CONST.ACCESS_TOKEN) ?? '';
    return jwtDecode<Decoded>(tk).permissions.includes(permission)
  } catch (error: any) {
    return false
  }
}

export const isScope = (
  scope: scope,
  data?: AccountData | null
) => {
  try {
    const tk = Cookie.get(CONST.ACCESS_TOKEN) ?? '';
    return (data ?? jwtDecode<Decoded>(tk))?.scope?.includes(scope) || false
  } catch (error: any) {
    return false
  }
}


export const isAccess = (access?: 'level_2' | 'level_3') => {
  try {
    const tk = Cookie.get(CONST.ACCESS_TOKEN) ?? '';
    return jwtDecode<Decoded>(tk).access == access
  } catch (error: any) {
    return false
  }
}
