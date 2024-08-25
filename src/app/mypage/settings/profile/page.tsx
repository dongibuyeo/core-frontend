'use client'

import { useState, useRef, useEffect } from 'react'
import { ProfileSetting, Sol } from '@/public/svg/index'
import Button from '@/components/ui/Button'
import EditNickname from '@/components/ui/EditNickname'
import ProfileImage from '@/components/ui/ProfileImage'
import ProfileSelector from '@/containters/settings/ProfileSelector'

export default function ProfilePage() {
  const storedNickname =
    typeof window !== 'undefined'
      ? localStorage.getItem('nickname') || '강남건물주될거야'
      : '강남건물주될거야'

  const [nickname, setNickname] = useState(storedNickname)
  const [profileImage, setProfileImage] = useState<JSX.Element>(<Sol />)
  const [isProfileSelectorOpen, setProfileSelectorOpen] = useState(false)

  const handleNicknameChange = (value: string) => {
    setNickname(value)
  }

  const handleNicknameSave = () => {
    localStorage.setItem('nickname', nickname)
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

      <div className="w-full fixed px-5 bottom-12">
        <Button text="수정 완료" onClick={handleNicknameSave} />
      </div>

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
