import type { GetServerSideProps } from 'next'
import type { Message } from '../types/message'
import { getLoggedUserId } from '../utils/getLoggedUserId'

type Props = {
  user: number
  messages: Message[]
}

export const getServerSideProps: GetServerSideProps = async ({
  params: { conversation }
}) => {
  const user = getLoggedUserId()

  const messages: Message[] = await fetch(
    `http://localhost:3005/messages/${conversation}`
  ).then((res) => res.json())

  console.log(messages)
  return {
    props: {
      user,
      messages
    }
  }
}

const ConversationPage = ({ messages, user }: Props) => {
  console.log(messages)
  return (
    <main>
      <ul>
        {messages.map((message) => {
          const isSender = user === message.authorId

          return (
            <li
              style={{
                alignSelf: isSender ? 'flex-end' : 'flex-start',
                backgroundColor: isSender
                  ? 'dodgerblue'
                  : 'whitesmoke',
                color: isSender ? 'white' : 'black'
              }}
              key={message.id}
            >
              {message.body}
            </li>
          )
        })}
      </ul>
    </main>
  )
}

export default ConversationPage
