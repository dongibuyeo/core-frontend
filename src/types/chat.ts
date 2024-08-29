export type ChatRoomType = 'COFFEE' | 'DRINK' | 'DELIVERY' | 'SEVEN' | 'QUIZ'
export type ChatMessageReq = {
  roomName: string
  memberId: string
  message: string
}
export type ChatMessageRes = {
  memberId: string
  memberNickName: string
  message: string
  image: string
  createdAt: string
}

export type ChatHistory = {
  roomInfo: {
    roomId: string
    roomName: ChatRoomType
  }
  messages: ChatMessageRes[]
}
