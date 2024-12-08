import ReactDOM from 'react-dom/client'
import {
  Provider,
} from 'react-redux'
import {
  BrowserRouter,
} from 'react-router-dom'
import App from './App'
import './main.css'
import {
  store,
} from './store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
)
