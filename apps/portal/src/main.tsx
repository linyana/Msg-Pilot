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

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
)
