'use client'

import { useState, useRef, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { ProfileSetting } from '@/public/svg/index'
import Button from '@/components/ui/Button'
import ProfileImage from '@/components/ui/ProfileImage'
import { ModalLayout } from '@/components/modals/ModalLayout'
import { CenterModalContainer } from '@/components/modals/CenterModalContainer'
import ProfileSelector from '@/containers/settings/ProfileSelector'
import { updateUserProfile } from '@/services/mypage'
import { getUserInfo } from '@/services/auth'

export default function ProfilePage() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [nickname, setNickname] = useState<string>('')
  const [profileImage, setProfileImage] = useState<string>('Sol')
  const [isProfileSelectorOpen, setProfileSelectorOpen] = useState(false)

  const queryClient = useQueryClient()
  const router = useRouter()

  let email
  if (typeof window !== 'undefined') email = localStorage.getItem('email')

  const { data: userInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    enabled: !!email,
  })

  const mutation = useMutation({
    mutationFn: () =>
      updateUserProfile({
        nickname,
        profileImage,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] })
      router.push('/mypage')
    },
  })

  const handleNicknameChange = (value: string) => {
    setNickname(value)
  }

  const handleNicknameSave = () => {
    mutation.mutate()
  }

  useEffect(() => {
    if (userInfo) {
      setNickname(userInfo.nickname)
      setProfileImage(userInfo.profileImage)
    }
  }, [userInfo])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleModalClose = () => {
    setProfileSelectorOpen(false)
  }

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      handleModalClose()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      handleModalClose()
    }
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <div className="relative w-36 h-36 mt-9 mb-14">
        <ProfileImage profileImage={profileImage} />
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
        <ModalLayout>
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20"
            onClick={handleOutsideClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label="Close profile selector"
          >
            <CenterModalContainer>
              <div
                className="bg-white p-4 rounded-lg"
                onClick={(e) => e.stopPropagation()}
                role="none"
                tabIndex={-1}
              >
                <ProfileSelector
                  onSelect={(image: string) => {
                    setProfileImage(image)
                    handleModalClose()
                  }}
                />
              </div>
            </CenterModalContainer>
          </div>
        </ModalLayout>
      )}
    </div>
  )
}
