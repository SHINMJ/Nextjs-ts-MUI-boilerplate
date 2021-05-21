import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import axios from 'axios'

interface IUser {
  id?: string
  redirectTo?: string
  redirectIfFound?: string
}

export default function useUser({ id, redirectTo, redirectIfFound }: IUser) {
  const { data, error } = useSWR(`/api/users`, (url: string) => {
    return axios.get(url).then(res => res.data)
  })

  const user = data?.user
  const finished = Boolean(data)
  const hasUser = Boolean(user)

  useEffect(() => {
    if (!redirectTo || !finished) return
    if (
      (redirectTo && !redirectIfFound && !hasUser) ||
      (redirectIfFound && hasUser)
    ) {
      Router.push(redirectTo)
    }
  }, [redirectTo, redirectIfFound, finished, hasUser])

  return {
    user,
    loading: !finished && user == null,
    error,
  }
}
