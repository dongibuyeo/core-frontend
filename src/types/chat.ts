export type ChatRoomType = 'COFFEE' | 'DRINK' | 'DELIVERY' | 'SEVEN' | 'QUIZ'
export type ChatMessageReq = {
  roomName: string
  memberId: string
  message: string
}

export type ChatMessage = {
  memberId: string
  roomName: ChatRoomType
  message: string
  image: string
  sendAt: string
  nickName: string
}

export type ChatHistory = {
  roomInfo: {
    roomId: string
    roomName: ChatRoomType
  }
  messages: ChatMessage[]
}
