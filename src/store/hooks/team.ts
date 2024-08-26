import { CONST } from "@/lib/constant";
import { reduxRequest } from "@/lib/request";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "..";
import { TeamData, pushATeamMember, updateTeam } from "../slice/team";

const useTeam = (auto = true) => {
    const { loading, data, message, status } = useAppSelector(state => state.team)
    const http = useAppDispatch()

    useEffect(() => {
        if (auto) {
            if (loading === 'false' && data === null) {
                http(reduxRequest(CONST.COMPANY.TEAM.LIST + '?page=-1', {}, updateTeam, 'get'))
            }
        }
    }, [loading, data]);

    const addTeam = (team: TeamData) => {
        http(pushATeamMember(team))
    }

    return { loading, data, message, status, addTeam }
}

export default useTeam;