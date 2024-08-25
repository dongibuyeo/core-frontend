'use client'

import { useState, useRef, useEffect } from 'react'
import { ProfileSetting, Sol } from '@/public/svg/index'
import Button from '@/components/ui/Button'
import EditNickname from '@/components/ui/EditNickname'
import ProfileImage from '@/components/ui/ProfileImage'
import ProfileSelector from '@/containters/settings/ProfileSelector'

export default function ProfilePage() {
  const [nickname, setNickname] = useState('')
  const [profileImage, setProfileImage] = useState<JSX.Element>(<Sol />)
  const [isProfileSelectorOpen, setProfileSelectorOpen] = useState(false)

  const handleNicknameChange = (value: string) => {
    setNickname(value)
  }

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <div className="relative w-[8.375rem] h-[8.375rem] mt-9 mb-14">
        <ProfileImage imageUrl={profileImage} />

        <button
          type="button"
          onClick={() => setProfileSelectorOpen(true)}
          className="absolute w-8 h-8 bottom-0 right-0 bg-_grey-200 rounded-full flex items-center justify-center"
          aria-label="Open profile settings"
        >
          <ProfileSetting className="w-6 h-6" />
        </button>
      </div>

      <EditNickname
        ref={inputRef}
        value={nickname}
        onChange={handleNicknameChange}
      />

      <Button text="수정 완료" url="/mypage/settings" />

      {isProfileSelectorOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20">
          <div className="bg-white p-4 rounded-lg">
            <ProfileSelector
              onSelect={(image: JSX.Element) => {
                setProfileImage(image)
                setProfileSelectorOpen(false)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
