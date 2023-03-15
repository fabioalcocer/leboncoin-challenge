import type { GetServerSideProps } from 'next'
import type { Message } from '../types/message'
import { getLoggedUserId } from '../utils/getLoggedUserId'
import { FormEvent, useState } from 'react'

type Props = {
  user: number
  messages: Message[]
  conversation: number
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
      messages,
      conversation
    }
  }
}

const ConversationPage = ({
  messages,
  user,
  conversation
}: Props) => {
  const [message, setMessage] = useState<string>('')

  const handleSubmit = async (event: FormEvent) => {
    try {
      const res = await fetch(
        `http://localhost:3005/messages/${conversation}`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            conversationId: conversation,
            body: message,
            authorId: user,
            timestamp: 0
          })
        }
      )

      return res
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main>
      <form action='' onSubmit={handleSubmit}>
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
        <div>
          <input
            value={message}
            type='text'
            name='message'
            id='god'
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type='submit'>Send</button>
        </div>
      </form>
    </main>
  )
}

export default ConversationPage
