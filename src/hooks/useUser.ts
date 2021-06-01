import useSWR from 'swr'
import axios from 'axios'

export default function useUser() {
  const { data, error, mutate } = useSWR(
    `/api/proxy/demo/user`,
    (url: string) => {
      return axios.get(url).then(res => res.data)
    },
  )

  const loading = !data && !error
  const isLogin = !Boolean(error) && Boolean(data)

  return {
    user: data,
    loading,
    isLogin,
    error,
    mutate,
  }
}
