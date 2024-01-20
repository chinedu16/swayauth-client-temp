import toast from "react-hot-toast";

export const copyText = async (data?: string) => {
  if (data) {
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(data);
      }
    } catch (error) {
      prompt("Copy to clipboard: Ctrl+C, Enter", data);
    }
    toast.success("Copied to clipboard");
  }
};

export const idMaker = (str?: string) => {
  if (str) {
    return str.replaceAll(/[{/}]/gi, '__')
  }
  return "";
};
