import { getProfileImage } from '@/utils/getProfileImage'

interface Props {
  isMine: boolean
  message: string
  senderName: string
  senderProfile: string
  timeStamp: string
}

export default function ChatBubble({
  isMine,
  message,
  senderName,
  senderProfile,
  timeStamp,
}: Props) {
  const getFormattedTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('ko-KR', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
  }

  return (
    <div className={`flex gap-2 ${isMine && 'self-end flex-row-reverse'}`}>
      {!isMine && (
        <div className="w-10 h-10 rounded-3xl bg-gray-100 shrink-0 overflow-hidden">
          <div className="w-10 h-10 object-contain flex justify-center items-center">
            {getProfileImage(senderProfile)}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-1">
        {!isMine && <p className="text-sm mb-1">{senderName}</p>}
        <p
          className={`w-full px-4 py-3 ${isMine ? 'bg-_blue-300 text-white rounded-3xl rounded-tr-none' : 'bg-_grey-100 rounded-3xl rounded-tl-none'}`}
        >
          {message}
        </p>
      </div>
      <p className="whitespace-nowrap self-end text-xs text-gray-500">
        {timeStamp && getFormattedTime(timeStamp)}
      </p>
    </div>
  )
}
