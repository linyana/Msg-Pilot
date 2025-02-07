import {
  ReactNode,
} from 'react'
import {
  Navigate,
} from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AssignmentIcon from '@mui/icons-material/Assignment'
import SettingsIcon from '@mui/icons-material/Settings'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import {
  Account,
  Connections,
  CreateConnection,
  CreateTask,
  Dashboard,
  Login,
  Registration,
  Task,
  TaskDetails,
} from './pages'

export interface IRouteType {
  id?: string;
  element?: ReactNode;
  path?: string;
  text?: string;
  isPublic?: boolean;
  isNoConnection?: boolean;
  isNoFrame?: boolean;
  isNoNavigate?: boolean;
  icon?: ReactNode;
  children?: IRouteType[]
}

export const routes: Array<IRouteType> = [
  {
    id: 'not-found',
    path: '*',
    element: <Navigate to="/login" />,
    isPublic: true,
  },
  {
    id: 'login',
    element: <Login />,
    path: '/login',
    isNoFrame: true,
    isPublic: true,
  },
  {
    id: 'registration',
    element: <Registration />,
    path: '/registration',
    isNoFrame: true,
    isPublic: true,
  },
  {
    id: 'connections',
    element: <Connections />,
    path: '/connections',
    isNoConnection: true,
    isNoNavigate: true,
  },
  {
    id: 'create-connection',
    element: <CreateConnection />,
    path: '/create-connection',
    isNoConnection: true,
    isNoNavigate: true,
  },
  {
    id: 'dashboard',
    element: <Dashboard />,
    text: '主页',
    path: '/dashboard',
    icon: <DashboardIcon />,
  },
  {
    id: 'tasks',
    element: <Task />,
    text: '任务',
    path: '/tasks',
    icon: <AssignmentIcon />,
    children: [
      {
        id: 'tasks/create-task',
        element: <CreateTask />,
        path: '/tasks/create-task',
      },
      {
        id: 'tasks/:id',
        element: <TaskDetails />,
        path: '/tasks/:id',
      },
    ],
  },
  {
    id: 'settings',
    text: '设置',
    path: '/settings',
    icon: <SettingsIcon />,
    children: [
      {
        id: 'settings/account',
        element: <Account />,
        text: '账号',
        path: '/settings/account',
        icon: <AdminPanelSettingsIcon />,
      },
    ],
  },
]
