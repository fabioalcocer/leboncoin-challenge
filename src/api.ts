import type { Conversation } from './types/conversation'
import type { Message } from './types/message'
import type { User } from './types/user'

const api = {
  user: {
    fetch: (): User['id'] => 1,
  },
  conversation: {
    list: async (userId: User['id']): Promise<Conversation[]> =>
      fetch(`http://localhost:3005/conversations/${userId}`).then(
        (res) => res.json()
      ),
  },
  messages: {
    list: async (userId: User['id']): Promise<Message[]> =>
      fetch(`http://localhost:3005/messages/${userId}`).then(
        (res) => res.json()
      ),
  },
}

export default api
