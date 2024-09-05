'use client'

import MiniChallengeCard from '@/components/MiniChallengeCard'
import ChatBubble from '@/containters/my-challenge/ChatBubble'
import { ArrowSend } from '@/public/svg'
import { getUserInfo } from '@/services/auth'
// import { getChatHistory } from '@/services/chat'
import { ChatMessage, ChatRoomType } from '@/types/chat'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState, useRef, useEffect } from 'react'
import Loader from '@/components/Loader'
import { Client } from '@stomp/stompjs'

export default function Chat({ params }: { params: { id: ChatRoomType } }) {
  const [chatMessage, setChatMessage] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const socketRef = useRef<Client | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const roomName = params.id
  const queryClient = useQueryClient()
  // const isFirst = useRef(true)

  const isValid = (): boolean => chatMessage.trim().length > 0

  const { data: userInfo, isLoading: userLoading } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    enabled: !!localStorage.getItem('email'),
  })

  // const { data: chatHistory, isLoading: chatLoading } = useQuery({
  //   queryKey: ['chatHistory', roomName],
  //   queryFn: () => getChatHistory(roomName),
  //   enabled: !!roomName,
  // })

  // useEffect(() => {
  //   if (chatHistory && isFirst.current) {
  //     setMessages(chatHistory.messages)
  //     isFirst.current = false
  //   }
  // }, [chatHistory])

  useEffect(() => {
    const stompClient = new Client({
      brokerURL: 'ws:////3.36.59.109:8080/ws',
      reconnectDelay: 5000,
      onConnect: () => {
        stompClient.subscribe(`/sub/chat/${roomName}`, (message) => {
          const newMessage = JSON.parse(message.body)
          setMessages((prevMessages) => [...prevMessages, newMessage])
        })
      },
    })

    stompClient.activate()
    socketRef.current = stompClient

    return () => {
      if (socketRef.current) {
        socketRef.current.deactivate()
      }
    }
  }, [roomName])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleChangeChat = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatMessage(e.target.value)
  }

  const handleSendChat = () => {
    if (isValid() && socketRef.current && chatMessage.trim() !== '') {
      const newMessage = {
        roomName,
        memberId: userInfo?.memberId,
        message: chatMessage,
        image: userInfo?.profileImage,
        sendAt: new Date().toISOString(),
        nickName: userInfo?.nickname,
      }

      socketRef.current.publish({
        destination: '/pub/chat',
        body: JSON.stringify(newMessage),
      })

      setChatMessage('')

      queryClient.invalidateQueries({ queryKey: ['chatHistory', roomName] })
    }
  }

  if (userLoading) {
    return <Loader />
  }

  return (
    <div className="w-full h-[calc(100dvh-5rem)] flex flex-col items-center justify-center gap-4">
      <MiniChallengeCard
        title="한달 커피 소비 줄이기"
        isChatPage
        participantCount={1053}
        imageUrl="coffee_challenge"
      />
      <div className="w-full h-full flex flex-col gap-5 overflow-auto">
        {messages.map((chat) => (
          <ChatBubble
            key={crypto.randomUUID()}
            senderName={chat.nickName}
            senderProfile={chat.image}
            isMine={chat.memberId === userInfo?.memberId}
            message={chat.message}
            timeStamp={chat.sendAt}
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
          onKeyDown={(e) => {
            if (e.key === 'Enter' && isValid()) {
              handleSendChat()
            }
          }}
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
