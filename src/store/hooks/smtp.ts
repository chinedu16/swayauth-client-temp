import { CONST } from "@/lib/constant";
import { reduxRequest } from "@/lib/request";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "..";
import { SmtpData, updateSmtp } from "../slice/smtp";

const useSmtp = (auto = true) => {
    const { loading, data, message, status } = useAppSelector(state => state.smtp)
    const http = useAppDispatch()

    useEffect(() => {
        if (auto) {
            if (loading === 'false' && data === null) {
                fetchSmtp()
            }
        }
    }, []);

    const fetchSmtp = () => {
        http(reduxRequest(CONST.COMPANY.SMTP.DETAIL, {}, updateSmtp, 'get'))
    }

    const updateSmtpStatus = (data?: SmtpData | null) => {
        if (data)
            http(updateSmtp({ data }))
    }

    return { loading: loading == 'true', data, message, status, updateSmtpStatus, fetchSmtp }
}

export default useSmtp;