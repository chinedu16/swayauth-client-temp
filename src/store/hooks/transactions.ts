import { CONST } from "@/lib/constant";
import { reduxRequest } from "@/lib/request";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "..";
import { updateTransactions } from "../slice/transactions";

const useTransactions = (auto = true) => {
    const { loading, data, message, status } = useAppSelector(state => state.transactions)
    const http = useAppDispatch()

    useEffect(() => {
        if (auto) {
            if (loading === 'false' && data === null) {
                http(reduxRequest(CONST.COMPANY.TRANSACTION.LIST, {}, updateTransactions, 'get'))
            }
        }
    }, []);

    const fetchTransactions = (query: string) => {
        http(reduxRequest(CONST.COMPANY.TRANSACTION.LIST + '?' + query.trim(), {}, updateTransactions, 'get'))
    }

    return { loading, data, message, status, fetchTransactions }
}

export default useTransactions;