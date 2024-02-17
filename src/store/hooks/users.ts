import { CONST } from "@/lib/constant";
import { reduxRequest } from "@/lib/request";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "..";
import { removeAUser, updateUsers, updateUsersStatus } from "../slice/users";

const useUsers = (auto = true) => {
    const { loading, data, message, status } = useAppSelector(state => state.users)
    const http = useAppDispatch()

    useEffect(() => {
        if (auto) {
            if (loading === 'false' && data === null) {
                http(reduxRequest(CONST.COMPANY.USERS.LIST, {}, updateUsers, 'get'))
            }
        }
    }, []);

    const updateStatus = (ids: string[], status: 'active' | 'disabled') => {
        http(updateUsersStatus({ ids, status }))
    }

    const removeUser = (id: string) => {
        http(removeAUser( id))
    }

    const fetchUsers = (query: string) => {
        http(reduxRequest(CONST.COMPANY.USERS.LIST + '?' + query, {}, updateUsers, 'get'))
    }

    return { loading, data, message, status, fetchUsers, updateStatus , removeUser}
}

export default useUsers;