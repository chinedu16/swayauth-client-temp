import { CONST } from "@/lib/constant";
import { normalRequest } from "@/lib/request";
import { useEffect, useState } from "react";
import { OrganizationData } from "../slice/organization";

const useOneOrganization = (id: string) => {
  const [data, setData] = useState<{
    data: OrganizationData | null,
    status: boolean,
    message: string
  }>({
    data: null,
    status: true,
    message: ''
  })
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (id) loadOrganization(id)
  }, [id]);

  const updateData = (data: OrganizationData) => {
    setData(p => ({ ...p, data }))
  }

  const loadOrganization = async (id: string) => {
    setLoading(true)
    const res = await normalRequest(CONST.COMPANY.ORGANIZATION.LIST + "/" + id, {}, 'get')
    setLoading(false)
    setData(res)
  }

  return { ...data, loading, updateData }
}

export default useOneOrganization