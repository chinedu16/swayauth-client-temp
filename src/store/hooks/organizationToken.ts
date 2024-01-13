import { CONST } from "@/lib/constant"
import { normalRequest } from "@/lib/request"
import { useEffect, useState } from "react"
import { scope } from "../slice/account"

export interface OrganizationTokenData {
  id?: string
  name?: string
  api_key?: string
  redirect_url?: string
  origins?: string[]
  two_factor_type?: ('sms' | 'app' | 'mail')[]
  verify_registration?: boolean
  verify_registration_type?: ('sms' | 'mail_link' | 'mail_token')[]
  company_id?: string
  permissions: ('read' | 'write' | 'delete')[]
  scope?: scope[]
  organization_id?: string
  created_at?: string
  updated_at?: string
}

const useOrganzationToken = (id: string, auto = true) => {
  const [data, setData] = useState<{
    data: OrganizationTokenData[] | null,
    status: boolean,
    message: string
  }>({
    data: null,
    status: true,
    message: ''
  })
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrganizationTokens(id)
  }, []);

  const loadOrganizationTokens = async (id: string) => {
    if (!auto) return
    setLoading(true)
    const res = await normalRequest(CONST.COMPANY.ORGANIZATION.TOKEN.LIST + "/" + id + '/tokens?page=-1', {}, 'get')
    setLoading(false)
    setData(res)
  }

  const updateTokenData = (value: OrganizationTokenData) => {
    setData(p => {
      let newData = p.data ? [...p.data] : []
      const index = newData.findIndex(itm => itm.id == value.id) ?? -1
      if (index > -1) {
        newData[index] = value
      }
      return { ...p, data: newData }
    })
  }

  const addToTokenData = (value: OrganizationTokenData) => {
    setData(p => {
      let newData = p.data ? [...p.data] : []
      if (newData.length) {
        newData.push(value)
      } else {
        newData = [value]
      }
      return { ...p, data: newData }
    })
  }

  const removeTokenData = (ids: string[]) => {
    setData(p => {
      let newData = p.data ? [...p.data] : []
      if (newData.length) {
        for (let i = 0; i < ids.length; i++) {
          const index = newData.findIndex(d => d.id = ids[i])
          if (index > -1) {
            newData.splice(index, 1);
          }
        }
        return { ...p, data: newData }
      }
      return p
    })
  }

  return { ...data, loading, updateTokenData, removeTokenData, addToTokenData }

}

export default useOrganzationToken