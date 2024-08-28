'use client'

import { useState, useRef, useEffect } from 'react'
import { ProfileSetting, Sol } from '@/public/svg/index'
import Button from '@/components/ui/Button'
import ProfileImage from '@/components/ui/ProfileImage'
import ProfileSelector from '@/containers/settings/ProfileSelector'

export default function ProfilePage() {
  const storedNickname =
    typeof window !== 'undefined'
      ? localStorage.getItem('nickname') || '강남건물주될거야'
      : '강남건물주될거야'

  const [nickname, setNickname] = useState(storedNickname)
  const [profileImage, setProfileImage] = useState<JSX.Element>(
    <Sol className="h-[8.375rem]" />,
  )
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

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      setProfileSelectorOpen(false)
    }
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <div className="relative w-36 h-36 mt-9 mb-14">
        <ProfileImage imageUrl={profileImage} />

        <button
          type="button"
          onClick={() => setProfileSelectorOpen(true)}
          className="absolute w-8 h-8 bottom-1 right-2 bg-_grey-200 rounded-full flex items-center justify-center"
          aria-label="Open profile settings"
        >
          <ProfileSetting className="w-6 h-6" />
        </button>
      </div>

      <input
        ref={inputRef}
        type="text"
        value={nickname}
        onChange={(e) => handleNicknameChange(e.target.value)}
        className="border border-_grey-200 rounded-3xl px-5 py-2 w-56 outline-none focus:border-primary focus:ring-0 focus:outline-none"
        style={{ borderWidth: '1.5px' }}
      />

      <div className="w-full fixed px-5 bottom-12">
        <Button text="수정 완료" onClick={handleNicknameSave} />
      </div>

      {isProfileSelectorOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20"
          onClick={handleOutsideClick}
          role="button"
          tabIndex={0}
          aria-label="Close profile selector"
          onKeyDown={(e) => {
            if (e.key === 'Escape') setProfileSelectorOpen(false)
          }}
        >
          <div
            className="bg-white p-4 rounded-lg"
            onClick={(e) => e.stopPropagation()}
            role="none"
            tabIndex={-1}
          >
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
