import {
  useState,
} from 'react'
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import {
  useConfig,
} from '../useConfig'

export interface UseHttpProps {
  url: string
  method?: AxiosRequestConfig['method']
  data?: AxiosRequestConfig['data']
  headers?: AxiosRequestConfig['headers']
  isLocal?: boolean
}

export interface UseHttpState<T> {
  loading: boolean
  error: string | null
  data: T | null
  code: number | null
  fetchData: () => void
}

export const useHttp = <T, >({
  url,
  method = 'get',
  data,
  headers,
  isLocal = true,
}: UseHttpProps): UseHttpState<T> => {
  const {
    token,
    apiBaseUrl,
    httpStrategy,
  } = useConfig()
  const [state, setState] = useState<UseHttpState<T>>({
    loading: false,
    error: null,
    data: null,
    code: null,
  })

  const fetchData = async () => {
    try {
      setState({
        ...state,
        data: null,
        error: null,
        loading: true,
        code: 0,
      })
      const response: AxiosResponse<T> = await axios({
        url: isLocal ? `${apiBaseUrl}${url}` : url,
        method,
        ...(method === 'get' ? {
          params: data,
        } : {
          data,
        }),
        headers: {
          ...headers,
          Authorization: token ? `Bearer ${token}` : '',
        },
      })
      setState({
        loading: false,
        error: null,
        code: 200,
        data: response.data,
      })
    } catch (error: any) {
      let errorMessage = ''
      switch (error?.response?.status) {
        case 500:
          errorMessage = 'Server error'
          break
        case 504:
          errorMessage = 'Time out'
          break
        default:
          errorMessage = error?.response?.data?.meta?.message || error?.message
          break
      }

      setState({
        loading: false,
        error: errorMessage || 'Unknown error',
        code: error?.response?.status,
        data: null,
      })
      httpStrategy[error?.response?.status]?.()
    }
  }

  return {
    ...state, fetchData,
  }
}
