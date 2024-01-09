import { CONST } from "@/lib/constant";
import { reduxRequest } from "@/lib/request";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "..";
import { updateWallet } from "../slice/wallet";

const useWallet = (auto = true) => {
    const { loading, data, message, status } = useAppSelector(state => state.wallet)
    const http = useAppDispatch()

    useEffect(() => {
        if (auto) {
            if (loading === 'false' && data === null) {
                fetchWallet()
            }
        }
    }, []);

    const fetchWallet = () => {
        http(reduxRequest(CONST.COMPANY.WALLET.GET_WALLET, {}, updateWallet, 'get'))
    }

    return { loading: loading == 'true', data, message, status , fetchWallet}
}

export default useWallet;