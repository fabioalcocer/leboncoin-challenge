'use client'
import { FormEvent, useState } from 'react'
import useSWR from 'swr'
import { Message } from '../../types/message'
import { Conversation } from '../../types/conversation'
import { IoSendSharp } from 'react-icons/io5'

type Props = {
  user: number
  messages: Message[]
  conversation: number
  conversations: Conversation[]
}

const fetcher = (url: RequestInfo | URL, options: RequestInit) =>
  fetch(url, options).then((res) => res.json())

const ConversationClientPage = ({
  messages: initialMessages,
  user,
  conversation: conversationId,
  conversations,
}: Props) => {
  const [message, setMessage] = useState<string>('')
  const { data: messagesSwr } = useSWR<Message[]>(
    `http://localhost:3005/messages/${conversationId}`,
    fetcher,
    {
      refreshInterval: 5000,
      fallbackData: initialMessages,
    }
  )

  const userConversation = conversations[conversationId - 1]

  const handleSubmit = async (event: FormEvent) => {
    // event.preventDefault()
    try {
      const res = await fetch(
        `http://localhost:3005/messages/${conversationId}`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            conversationId: conversationId,
            body: message,
            authorId: user,
            timestamp: 0,
          }),
        }
      )

      return res
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className='flex flex-col justify-center items-center min-h-screen w-full p-2'>
      <div className='bg-zinc-900 rounded-md overflow-hidden w-full max-w-xl min-h-[500px] flex flex-col'>
        <header className='bg-blue-800 p-3 pl-5 text-zinc-50'>
          <p className='font-bold text-lg'>
            {userConversation?.recipientNickname} -{' '}
            {userConversation?.senderNickname}
          </p>
        </header>
        <form
          className='w-full h-full mt-auto flex items-center flex-col p-3 pt-5'
          action=''
          onSubmit={handleSubmit}
        >
          <ul className='flex flex-col gap-4 w-full font-medium'>
            {messagesSwr.map((message) => {
              const isSender = user === message.authorId
              return (
                <li
                  className={`${
                    isSender
                      ? 'bg-blue-800 self-end text-zinc-50'
                      : 'bg-slate-100 self-start text-slate-900'
                  } w-fit p-2 px-4 rounded-3xl max-w-[300px]`}
                  key={message.id}
                >
                  {message.body}
                </li>
              )
            })}
          </ul>
          <div className='relative w-full my-3 mt-5 self-end'>
            <input
              value={message}
              type='text'
              name='message'
              id='god'
              className='shadow appearance-none border rounded-3xl w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Send message'
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type='submit' className='absolute right-2 top-2'>
              <IoSendSharp className='text-2xl fill-gray-400'/>
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default ConversationClientPage
