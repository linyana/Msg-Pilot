import {
  IConnectionType,
} from './enum'

export * from './enum'

export type IConnectionType = {
  id?: string | number
  type: IConnectionType
  name: string
  description?: string
}

export type ICreateConnectionType = {
  type?: IConnectionType
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
  name: string;
  description: string;
  account_name: string;
  account_cookie: string;
  account_description: string
}
