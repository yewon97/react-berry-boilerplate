import Text from '@components/shared/Text'
import Flex from '@components/shared/Flex'
import Spacing from '@components/shared/Spacing'

export default function FullPageLoader({ message }: { message?: string }) {
  return (
    <Flex
      style={{ position: 'fixed', top: 0, left: 0, bottom: 0, right: 0 }}
      justify="center"
      align="center"
    >
      <Flex direction="column" align="center">
        <img width={120} src="/img/loading.gif" alt="Loading..." />
        {message != null ? (
          <>
            <Spacing size={120} />
            <Text bold={true} typography="t4">
              {message}
            </Text>
          </>
        ) : null}
      </Flex>
    </Flex>
  )
}
