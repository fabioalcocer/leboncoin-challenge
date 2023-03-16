import api from '../../api'
import ConversationClientPage from './client'

type Props = {
  params: {
    conversation: number
  }
}

const ConversationPage = async ({
  params: { conversation: conversationId },
}: Props) => {
  const user = api.user.fetch()
  const messages = await api.messages.list(conversationId)
  const conversations = await api.conversation.list(user)

  return (
    <ConversationClientPage
      messages={messages}
      user={user}
      conversation={conversationId}
      conversations={conversations}
    />
  )
}

export default ConversationPage
