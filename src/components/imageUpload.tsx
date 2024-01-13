"use client"
import { fileToBase64 } from "@/lib/media";
import { uploadServerImage } from "@/lib/server/form";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useState, useTransition } from "react";
import PreloadImage from "./preloadImage";

const ImageUpload = ({ image, setImage, setLoading, loading, disabled }: { disabled?: boolean, image?: string, loading?: boolean, setLoading?: (v: boolean) => void, setImage: (img: string) => void }) => {
  const [loader, setLoader] = useState(false);
  const [, startTransition] = useTransition()

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = (e.target as any).files[0];
    const base64 = await fileToBase64(file)
    setImage(base64)
    setLoading ? setLoading(true) : setLoader(true)
    startTransition(() => {
      uploadServerImage(base64).then((res) => {
        setLoading ? setLoading(false) : setLoader(false)
        setImage(res.data?.path ?? '');
      }).catch((err) => {
        setLoading ? setLoading(false) : setLoader(false)
      })
    })
  }

  return <label className="inline-block relative border-2 w-[6rem] h-[6rem] cursor-pointer rounded-full overflow-hidden">
    <input disabled={disabled} onChange={handleImageChange} type="file" name="logo" className="hidden" accept="image/*" />
    <PreloadImage src={image} alt="" className="object-cover" />
    <span className={`absolute ${loader || loading ? 'animate-pulse' : ''} top-[40%] left-[40%] text-blue-700`}><FontAwesomeIcon icon={faCamera} /></span>
  </label>
};

export default ImageUpload;
