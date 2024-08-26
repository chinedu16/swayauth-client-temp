import { CONST } from "@/lib/constant";
import { reduxRequest } from "@/lib/request";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "..";
import { OrganizationData, addAnOrganization, deleteOrg, updateOrganization } from "../slice/organization";

const useOrganization = (auto = true) => {
    const { loading, data, message, status } = useAppSelector(state => state.organization)
    const http = useAppDispatch()

    useEffect(() => {
        if (auto) {
            if (loading === 'false') {
                http(reduxRequest(CONST.COMPANY.ORGANIZATION.LIST + `?page=-1`, {}, updateOrganization, 'get'))
            }
        }
    }, [loading]);

    const addOrganization = (organization: OrganizationData) => {
        http(addAnOrganization(organization))
    }

    const removeOrg = (id: string) => {
        http(deleteOrg(id))
    }

    return { loading, data, message, status, addOrganization, removeOrg }
}

export default useOrganization;