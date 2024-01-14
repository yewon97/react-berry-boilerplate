import './App.css'
import Text from '@shared/Text'
import Button from '@shared/Button'

function App() {
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

      <div style={{ height: 10, width: '100%', background: '#efefef' }}>
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
      </div>
    </div>
  )
}

export default App
