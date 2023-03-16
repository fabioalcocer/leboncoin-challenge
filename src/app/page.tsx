import Image from 'next/image'
import Link from 'next/link'
import api from '../api'
import Avatar from '../assets/contact.png'
import Logo from '../assets/lbc-logo.webp'

const HomePage = async () => {
  const user = await api.user.fetch()
  const conversations = await api.conversation.list(user)

  return (
    <main className='text-zinc-50 flex flex-col mt-20 p-4'>
      <Image src={Logo} alt='title leboncoin' className='w-64 mx-auto'></Image>
      <ul className='mt-12 flex flex-col gap-6 w-full max-w-xl'>
        {conversations.map(
          ({
            id,
            senderId,
            recipientNickname,
            senderNickname,
            lastMessageTimestamp
          }) => (
            <li
              key={id}
              className='w-full flex items-center gap-8 bg-slate-900 py-2 px-3 rounded-xl shadow-inner shadow-slate-700'
            >
              <Image
                src={Avatar}
                alt='avatar contact'
                className='w-10 h-10'
              />
              <div>
                <Link
                  href={`/${id as number}`}
                  className='text-xl hover:text-slate-200 '
                >
                  {user === senderId
                    ? recipientNickname
                    : senderNickname}
                </Link>
                <p className='text-zinc-200 mt-1'>
                  {new Date(
                    Date.now() - lastMessageTimestamp
                  ).toLocaleDateString('en-us', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </li>
          )
        )}
      </ul>
    </main>
  )
}

export default HomePage
