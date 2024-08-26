import { CONST } from "@/lib/constant";
import { reduxRequest } from "@/lib/request";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "..";
import { SubscriptionData, updateSubscription } from "../slice/subscription";

const useSubscription = (auto = true) => {
    const { loading, data, message, status } = useAppSelector(state => state.subscription)
    const http = useAppDispatch()

    useEffect(() => {
        if (auto) {
            if (loading === 'false' && data === null) {
                fetchSubscription()
            }
        }
    }, [loading, data]);

    const fetchSubscription = () => {
        http(reduxRequest(CONST.COMPANY.SUBSCRIPTION.GET, undefined, updateSubscription, 'get'))
    }

    const updateScription = (data: SubscriptionData | null) => {
        http(updateSubscription({ data }))
    }

    return { loading: loading == 'true', data, message, status, updateScription, fetchSubscription }
}

export default useSubscription;