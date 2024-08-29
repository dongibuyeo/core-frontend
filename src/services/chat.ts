import { ChatHistory, ChatRoomType } from '@/types/chat'
import { instance } from './config/axios'

export const getChatHistory: (
  roomName: ChatRoomType,
) => Promise<ChatHistory> = async (roomName) => {
  const response = await instance.get(`/chat/${roomName}`)
  return response.data
}
