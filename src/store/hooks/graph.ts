import { CONST } from "@/lib/constant";
import { reduxRequest } from "@/lib/request";
import { ChangeEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "..";
import { updateLogin, updateRegister } from "../slice/graph";

const useGraph = (auto = true) => {
    const { loading, data, message, status } = useAppSelector(state => state.graph)
    const http = useAppDispatch()

    useEffect(() => {
        if (auto) {
            if (loading === 'false') {
                http(reduxRequest(CONST.COMPANY.STATISTICS.GET_REGISTER_GRAPH + '?duration=7_days', {}, updateRegister as any, 'get'))
                http(reduxRequest(CONST.COMPANY.STATISTICS.GET_LOGIN_GRAPH + '?duration=7_days', {}, updateLogin as any, 'get'))
            }
        }
    }, [loading]);

    const updateLoginStatistic = async (e: ChangeEvent<HTMLSelectElement>) => {
        http(reduxRequest(CONST.COMPANY.STATISTICS.GET_LOGIN_GRAPH + `?duration=${e.target.value}`, {}, updateLogin as any, 'get'))
    }

    const updateRegisterStatistic = async (e: ChangeEvent<HTMLSelectElement>) => {
        http(reduxRequest(CONST.COMPANY.STATISTICS.GET_REGISTER_GRAPH + `?duration=${e.target.value}`, {}, updateRegister as any, 'get'))
    }

    return { loading: loading == 'true', data, message, status, updateLoginStatistic, updateRegisterStatistic }
}

export default useGraph;