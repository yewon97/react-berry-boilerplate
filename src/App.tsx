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

  return (
    <div>
      <Text typography="t1" display={'block'}>
        hi
      </Text>
      <Text typography="t2">hi</Text>
      <Text typography="t3">hi</Text>
      <Text typography="t4">hi</Text>
      <Text typography="t5" color="red">
        hi
      </Text>

      <div style={{ height: 10, width: '100%', background: '#efefef' }} />
      <Button>클릭해주세요</Button>
      <Button color="primary">클릭해주세요</Button>
      <Button color="success">클릭해주세요</Button>
      <Button color="error">클릭해주세요</Button>
      <Button weak={true} color="primary">
        클릭해주세요
      </Button>
      <Button weak={true} color="success">
        클릭해주세요
      </Button>
      <Button weak={true} color="error">
        클릭해주세요
      </Button>
      <Button full={true}>클릭해주세요</Button>
      <Button full={true} disabled={true}>
        클릭해주세요
      </Button>

      <div style={{ height: 10, width: '100%', background: '#efefef' }} />
      <Input placeholder="로그인" />
      <br />
      <br />
      <Input aria-invalid={true} />
      <br />
      <br />
      <Input aria-invalid={false} />
      <div style={{ height: 10, width: '100%', background: '#efefef' }} />
      <TextField label={'아이디'} />
      <TextField label={'패스워드'} hasError={true} />

      <div style={{ height: 10, width: '100%', background: '#efefef' }} />
      {/* <Alert
        open={true}
        description="안녕하세요"
        title="알럿이 떴습니다."
        onButtonClick={() => {}}
      /> */}

      <Button
        onClick={() => {
          open({
            title: '카드신청완료',
            description: '내역페이지에서 확인하세요.',
            onButtonClick: () => {
              //
            },
          })
        }}
      >
        Alert open
      </Button>
    </div>
  )
}

export default App
