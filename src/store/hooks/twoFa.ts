import { CONST } from "@/lib/constant";
import { reduxRequest } from "@/lib/request";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "..";
import { updateTwoFa } from "../slice/twoFa";

const useTwoFa = (auto = true) => {
    const { loading, data, message, status } = useAppSelector(state => state.twoFa)
    const http = useAppDispatch()

    useEffect(() => {
        if (auto) {
            if (loading === 'false' && data === null) {
                http(reduxRequest(CONST.AUTH.GET_TWO_FA, {}, updateTwoFa, 'get'))
            }
        }
    }, []);

    return { loading: loading == 'true', data, message, status }
}

export default useTwoFa;