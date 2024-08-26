import { CONST } from "@/lib/constant";
import { reduxRequest } from "@/lib/request";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "..";
import { updateCustomerStats, updateCustomerStatus } from "../slice/customerStats";

const useCustomerStats = (auto = true) => {
    const { loading, data, message, status } = useAppSelector(state => state.customerStats)
    const http = useAppDispatch()

    useEffect(() => {
        if (auto) {
            if (loading === 'false' && data === null) {
                http(reduxRequest(CONST.COMPANY.USERS.STATISTICS, {}, updateCustomerStats, 'get'))
            }
        }
    }, [loading, data]);

    const changeCount = (ids: string[], status: 'active' | 'disabled') => {
        http(updateCustomerStatus({ count: ids.length, status }))
    }

    return { loading: loading == 'true', data, message, status, changeCount }
}

export default useCustomerStats;