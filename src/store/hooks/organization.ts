import { CONST } from "@/lib/constant";
import { reduxRequest } from "@/lib/request";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "..";
import { updateOrganization } from "../slice/organization";

const useOrganization = (auto = true) => {
    const { loading, data, message, status } = useAppSelector(state => state.organization)
    const http = useAppDispatch()

    useEffect(() => {
        if (auto) {
            if (loading === 'false' && data === null) {
                http(reduxRequest(CONST.COMPANY.ORGANIZATION.LIST + `?page=-1`, {}, updateOrganization, 'get'))
            }
        }
    }, []);

    return { loading, data, message, status }
}

export default useOrganization;