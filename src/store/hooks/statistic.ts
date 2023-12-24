import { CONST } from "@/lib/constant";
import { normalRequest, reduxRequest } from "@/lib/request";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "..";
import { StatisticData, statsProp, updateOneStat, updateStatistics } from "../slice/statistics";

const useStatistics = (auto = true) => {
    const { loading, data, message, status } = useAppSelector(state => state.statistics)
    const http = useAppDispatch()

    useEffect(() => {
        if (auto) {
            if (loading === 'false') {
                http(reduxRequest(CONST.COMPANY.STATISTICS.GET_ALL_STATISTIC_PERFORMANCE, {}, updateStatistics as any, 'get'))
            }
        }
    }, []);

    const updateOneStatistic = async (key: keyof StatisticData, duration: string) => {
        http(updateOneStat({ key, loading: 'true' }))
        const res = await normalRequest<
            { duration: statsProp['duration'] } &
            { [K in keyof StatisticData]: number }
        >(CONST.COMPANY.STATISTICS.GET_STATISTIC_PERFORMANCE + `?${key}&duration=${duration}`, {}, 'get')
        http(updateOneStat({ key, loading: 'done', ...res }))
    }

    return { loading: loading == 'true', data, message, status, updateOneStatistic }
}

export default useStatistics;