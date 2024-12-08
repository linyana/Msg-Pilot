import {
  ReactNode,
} from 'react'
import {
  Navigate,
} from 'react-router-dom'
import {
  DashboardOutlined,
} from '@ant-design/icons'
import {
  Dashboard,
  Login,
  Registration,
} from './pages'

export interface RouteItem {
  id: string;
  element: ReactNode;
  path: string;
  text?: string;
  isPublic?: boolean;
  icon?: ReactNode;
}

export const routes: Array<RouteItem> = [
  {
    id: 'not-found',
    path: '*',
    element: <Navigate to="/login" />,
  },
  {
    id: 'login',
    element: <Login />,
    path: '/login',
    isPublic: true,
  },
  {
    id: 'registration',
    element: <Registration />,
    path: '/registration',
    isPublic: true,
  },
  {
    id: 'dashboard',
    element: <Dashboard />,
    text: 'Dashboard',
    icon: <DashboardOutlined />,
    path: '/dashboard',
  },
]

export const pageTypes = {
  noFrame: ['', 'login', 'registration'],
}
