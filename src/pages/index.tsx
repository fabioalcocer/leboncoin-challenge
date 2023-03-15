import Link from 'next/link'
import { Conversation } from '../types/conversation'
import { getLoggedUserId } from '../utils/getLoggedUserId'

type Props = {
  user: number
  conversations: Conversation[]
}

export const getServerSideProps = async () => {
  const user = getLoggedUserId()

  const conversations: Conversation[] = await fetch(
    `http://localhost:3005/conversations/${user}`
  ).then((res) => res.json())
  return {
    props: {
      user,
      conversations
    }
  }
}

const HomePage = ({ conversations, user }: Props) => {
  return (
    <main>
      <ul>
        {conversations.map(
          ({
            id,
            senderId,
            recipientNickname,
            senderNickname,
            lastMessageTimestamp
          }) => (
            <li key={id}>
              <Link href={`/${id}`}>
                {user === senderId
                  ? recipientNickname
                  : senderNickname}
              </Link>
              <p>
                {new Date(
                  Date.now() - lastMessageTimestamp
                ).toLocaleString('es-BO')}
              </p>
            </li>
          )
        )}
      </ul>
    </main>
  )
}

export default HomePage
