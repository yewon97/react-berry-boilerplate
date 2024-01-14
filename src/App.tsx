import './App.css'
import Text from '@shared/Text'
import Button from '@shared/Button'
import Input from '@components/shared/Input'
import TextField from '@components/shared/TextField'
import Alert from './components/shared/Alert'

import { useAlertContext } from '@contexts/AlertContext'

function App() {
  const { open } = useAlertContext()
  console.log('open: ', open)

  return <div></div>
}

export default App
