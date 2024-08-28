'use client'

import MiniChallengeCard from '@/components/MiniChallengeCard'
import ChatBubble from '@/containters/my-challenge/ChatBubble'
import { ArrowSend } from '@/public/svg'
import { randomUUID } from 'crypto'
import { useState, ChangeEvent, MouseEvent } from 'react'

const dummy = [
  {
    profileImg: 2,
    senderId: 2,
    sender: '강남건물주',
    message:
      '커피좋아죽겠어요커피좋아죽겠어요커피좋아죽겠어요커피좋아죽겠어요커피좋아죽겠어요커피좋아죽겠어요커피좋아죽겠어요커피좋아죽겠어요커피좋아죽겠어요커피좋아죽겠어요커피좋아죽겠어요커피좋아죽겠어요커피좋아죽겠어요커피좋아죽겠어요커피좋아죽겠어요커피좋아죽겠어요커피좋아죽겠어요',
    timeStamp: new Date().toISOString(),
  },
  {
    profileImg: 1,
    senderId: 4,
    sender: '커피조앙',
    message: '죽지마세요',
    timeStamp: new Date().toISOString(),
  },
  {
    profileImg: 4,
    senderId: 4,
    sender: '커피귀신',
    message: '미치셨어요??????',
    timeStamp: new Date().toISOString(),
  },
  {
    profileImg: 2,
    senderId: 4,
    sender: '커피귀신',
    message: '미치셨어요??????',
    timeStamp: new Date().toISOString(),
  },
]

export default function Chat() {
  const [chatMessage, setChatMessage] = useState<string>('')
  const isValid = (): boolean => chatMessage.trim().length > 0

  const handleChangeChat = (e: ChangeEvent<HTMLInputElement>) => {
    setChatMessage(e.target.value)
  }

  const handleSendChat = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (isValid()) {
      console.log('Message sent:', chatMessage)
      setChatMessage('')
    }
  }

  return (
    <div className="w-full h-main-screen flex flex-col items-center justify-center gap-4">
      <MiniChallengeCard
        title="한달 커피 소비 줄이기"
        isChatPage
        participantCount={1053}
        imageUrl="/image/coffee.jpg"
      />
      <div className="w-full h-full flex flex-col gap-5 overflow-auto">
        {dummy.map((chat) => (
          <ChatBubble
            key={crypto.randomUUID()}
            senderName={chat.sender}
            senderProfile={chat.profileImg}
            isMine={chat.senderId === 2}
            message={chat.message}
            timeStamp={chat.timeStamp}
          />
        ))}
      </div>
      <div className="flex items-center w-full gap-2">
        <input
          type="text"
          value={chatMessage}
          onChange={handleChangeChat}
          className="w-full h-11 bg-_grey-100 outline-none rounded-full px-4 focus:bg-_blue-300/[8%] focus:border-[1.5px] focus:border-_blue-300"
        />
        <button
          type="button"
          onClick={handleSendChat}
          aria-label="send-chat"
          disabled={!isValid()}
        >
          <ArrowSend
            className={`w-6 h-6 ${isValid() ? 'text-_blue-300' : 'text-_grey-300'}`}
          />
        </button>
      </div>
    </div>
  )
}
