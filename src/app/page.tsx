import Link from 'next/link'
import api from '../api'

const HomePage = async () => {
  const user = await api.user.fetch()
  const conversations = await api.conversation.list(user)

  return (
    <main>
      <ul>
        {conversations.map(
          ({
            id,
            senderId,
            recipientNickname,
            senderNickname,
            lastMessageTimestamp,
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
