import { CONST } from "@/lib/constant";
import { reduxRequest } from "@/lib/request";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "..";
import { updateAppKey } from "../slice/appKey";

const useAppKey = (auto = true) => {
    const { loading, data, message, status } = useAppSelector(state => state.appKey)
    const http = useAppDispatch()

    useEffect(() => {
        if (auto) {
            if (loading === 'false' && data === null) {
                http(reduxRequest(CONST.COMPANY.CREDENTIALS.GET_APP_KEY, {}, updateAppKey, 'get'))
            }
        }
    }, []);

    const rotateAppKey = () => {
        http(reduxRequest(CONST.COMPANY.CREDENTIALS.ROTATE_APP_KEY, {}, updateAppKey, 'put'))
    }

    return { loading: loading == 'true', data, message, status, rotateAppKey }
}

export default useAppKey;