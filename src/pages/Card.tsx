import Top from '@shared/Top'
import { getCard } from '@remote/card'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { CardWithId } from '@models/card'
import ListRow from '@shared/ListRow'
import { colors } from '@styles/colorPalette'
import FixedBottomButton from '@shared/FixedBottomButton'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { useCallback } from 'react'
import useUser from '@hooks/auth/useUser'
import { useAlertContext } from '@/contexts/AlertContext'

export default function CardPage() {
  const navigate = useNavigate()
  const { open } = useAlertContext()

  // id가 항상 있는게 아니라서 default value로 '' 를 부여함
  const { id = '' } = useParams()
  const user = useUser()

  const { data } = useQuery(['card', id], () => getCard(id), {
    // enabled >> id가 빈값이 아니면 호출하겠다~
    enabled: id !== '',
  })

  const moveToApply = useCallback(() => {
    if (user == null) {
      open({
        title: '로그인이 필요한 서비스입니다.',
        onButtonClick: () => {
          navigate('/signin')
        },
      })

      return
    }

    navigate(`/apply/${id}`)
  }, [user, id, open, navigate])

  if (data == null) {
    return null
  }

  const { name, corpName, promotion, tags, benefit } = data

  const subTitle =
    promotion != null ? removeHtmlTags(promotion.title) : tags.join(',')

  return (
    <div>
      <Top title={`${corpName} ${name}`} subTitle={subTitle} />

      <ul>
        {benefit.map((text, idx) => {
          return (
            <motion.li
              key={idx}
              initial={{
                opacity: 0,
                translateX: -90,
              }}
              // 스크롤 내려갔다가 올라올 때 다시 액션주기
              // whileInView={{
              //   opacity: 1,
              //   translateX: 0,
              // }}
              transition={{
                duration: 1.0,
                // ease: 'easeInOut',
                ease: [0.25, 0.1, 0.25, 0.1],
                delay: idx * 0.1,
              }}
              animate={{
                opacity: 1,
                translateX: 0,
              }}
            >
              <ListRow
                as="div"
                key={text}
                left={<IconCheck />}
                contents={
                  <ListRow.Texts title={`혜택 ${idx + 1}`} subTitle={text} />
                }
              />
            </motion.li>
          )
        })}
      </ul>

      {promotion != null ? (
        <Flex direction="column" css={termsContainerStyles}>
          <Text bold={true}>유의사항</Text>
          <Text typography="t7">{removeHtmlTags(promotion.terms)}</Text>
        </Flex>
      ) : null}

      <FixedBottomButton label="신청하기" onClick={moveToApply} />
    </div>
  )
}

function IconCheck() {
  return (
    <svg
      viewBox="0 0 512 512"
      fill={colors.blue}
      height="20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M335 175L224 286.1L176.1 239c-9.375-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94l64 64C211.7 341.7 217.8 344 224 344s12.28-2.344 16.97-7.031l128-128c9.375-9.375 9.375-24.56 0-33.94S344.4 165.7 335 175zM256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464z" />
    </svg>
  )
}

function removeHtmlTags(text: string) {
  let output = ''

  for (let i = 0; i < text.length; i++) {
    if (text[i] === '<') {
      for (let j = i + 1; j < text.length; j++) {
        if (text[j] === '>') {
          i = j
          break
        }
      }
    } else {
      output += text[i]
    }
  }

  return output
}

const termsContainerStyles = css`
  margin-top: 80px;
  padding: 0 24px 80px 24px;
`
