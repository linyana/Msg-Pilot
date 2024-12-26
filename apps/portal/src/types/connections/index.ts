import {
  CONNECTION_TYPE,
} from './enum'

export type IConnectionType = {
  type: CONNECTION_TYPE
  name: string
  description?: string
}

export type ICreateConnectionType = {
  type: CONNECTION_TYPE
  name: string
  description?: string
}
