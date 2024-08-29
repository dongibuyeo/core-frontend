'use client'

import MiniChallengeCard from '@/components/MiniChallengeCard'
import ChatBubble from '@/containters/my-challenge/ChatBubble'
import { ArrowSend } from '@/public/svg'
import { getUserInfo } from '@/services/auth'
import { getChatHistory } from '@/services/chat'
import { ChatRoomType } from '@/types/chat'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState, useRef, useEffect } from 'react'

export default function Chat({ params }: { params: { id: ChatRoomType } }) {
  const [chatMessage, setChatMessage] = useState('')
  const socketRef = useRef<WebSocket | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const roomName = params.id

  const queryClient = useQueryClient()

  const { data: userInfo, isLoading: userLoading } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    enabled: !!localStorage.getItem('email'),
  })

  const { data: chatHistory, isLoading: chatLoading } = useQuery({
    queryKey: ['chatHistory', roomName],
    queryFn: () => getChatHistory(roomName),
    enabled: !!roomName,
  })

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatHistory])

  useEffect(() => {
    const ws = new WebSocket('ws://3.36.59.109:8080/ws/chat')

    ws.onopen = () => {
      console.log('소켓연결!!!')
    }

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data)
      // 메시지가 현재 채팅방의 메시지인지 확인
      if (message.roomId === roomName) {
        queryClient.invalidateQueries({ queryKey: ['chatHistory', roomName] })
      }
    }

    ws.onclose = () => {
      console.log('소켓연결 끊겼음!')
    }

    socketRef.current = ws

    return () => {
      ws.close()
    }
  }, [roomName, queryClient])

  const isValid = (): boolean => chatMessage.trim().length > 0

  const handleChangeChat = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatMessage(e.target.value)
  }

  const handleSendChat = () => {
    if (isValid() && socketRef.current && chatMessage.trim() !== '') {
      const newMessage = {
        roomName,
        memberId: userInfo?.memberId,
        message: chatMessage,
      }
      socketRef.current.send(JSON.stringify(newMessage))
      setChatMessage('')

      queryClient.invalidateQueries({ queryKey: ['chatHistory', roomName] })
    }
  }

  if (userLoading || chatLoading) {
    return <div>Loading...</div>
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
        {chatHistory?.messages.map((chat) => (
          <ChatBubble
            key={crypto.randomUUID()}
            senderName={chat.memberNickName}
            senderProfile={Number(chat.image)}
            isMine={chat.memberId === userInfo?.memberId}
            message={chat.message}
            timeStamp={chat.createdAt}
          />
        ))}
        <div ref={bottomRef} />
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
