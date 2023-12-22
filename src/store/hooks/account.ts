import { CONST } from "@/lib/constant";
import { reduxRequest } from "@/lib/request";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "..";
import { AccountData, updateAccount } from "../slice/account";

const useAccount = (auto = true) => {
    const { loading, data, message, status } = useAppSelector(state => state.account)
    const http = useAppDispatch()

    useEffect(() => {
        if (auto) {
            if (loading === 'false' && data === null) {
                http(reduxRequest(CONST.ACCOUNT.GET_PROFILE, {}, updateAccount, 'get'))
            }
        }
    }, []);

    const updateClientProfile = (data: AccountData | null) => {
        if (data)
            http(updateAccount({ data }))
    }

    return { loading: loading == 'true', data, message, status, updateClientProfile }
}

export default useAccount;