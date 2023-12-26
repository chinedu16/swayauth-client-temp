import { CONST } from "@/lib/constant";
import { reduxRequest } from "@/lib/request";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "..";
import { updateCustomerStats } from "../slice/customerStats";

const useCustomerStats = (auto = true) => {
    const { loading, data, message, status } = useAppSelector(state => state.customerStats)
    const http = useAppDispatch()

    useEffect(() => {
        if (auto) {
            if (loading === 'false' && data === null) {
                http(reduxRequest(CONST.COMPANY.USERS.STATISTICS, {}, updateCustomerStats, 'get'))
            }
        }
    }, []);

    return { loading: loading == 'true', data, message, status }
}

export default useCustomerStats;