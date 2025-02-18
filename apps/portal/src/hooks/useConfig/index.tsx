import React, {
  useContext,
} from 'react'

type Config = {
  [key: string]: any
};

export const ConfigContext = React.createContext<Config>({})

type ConfigProviderProps = {
  children: React.ReactNode;
  config?: Partial<Config>;
};

export const ConfigProvider: React.FC<ConfigProviderProps> = ({
  children,
  config = {},
}) => <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>

export const useConfig = () => useContext(ConfigContext)
