import api from '../../api'
import ConversationClientPage from './client'

type Props = {
  params: {
    conversation: number
  }
}

const ConversationPage = async ({
  params: { conversation },
}: Props) => {
  const user = await api.user.fetch()
  const messages = await api.messages.list(conversation)

  return (
    <ConversationClientPage
      messages={messages}
      user={user}
      conversation={conversation}
    />
  )
}

export default ConversationPage
