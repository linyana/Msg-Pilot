import {
  CONNECTION_TYPE,
} from './enum'

export * from './enum'

export type IConnectionType = {
  id?: string | number
  type: CONNECTION_TYPE
  name: string
  description?: string
}

export type ICreateConnectionType = {
  type?: CONNECTION_TYPE
  connection: {
    name: string
    description?: string
  }
  account: {
    cookie?: string
    name?: string
    description?: string
  }
}

export type ICreateConnectionFormType = {
  connection_name: string;
  description: string;
  account_name: string;
  account_cookie: string;
  account_description: string
}
