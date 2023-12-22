import { CONST } from "@/lib/constant";
import { reduxRequest } from "@/lib/request";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "..";
import { updateAssociation } from "../slice/association";

const useAssociation = (auto = true) => {
    const { loading, data, message, status } = useAppSelector(state => state.association)
    const http = useAppDispatch()

    useEffect(() => {
        if (auto) {
            if (loading === 'false' && data === null) {
                http(reduxRequest(CONST.ACCOUNT.GET_ASSOCIATION, {}, updateAssociation, 'get'))
            }
        }
    }, []);

    return { loading: loading == 'true', data, message, status }
}

export default useAssociation;