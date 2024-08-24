'use client'

import SettingItem from '@/containters/SettingItem'
import {
  EditProfile,
  PushNotification,
  Announcement,
  Contact,
  Logout,
  Delete,
  Version,
} from '@/public/svg/index'

export default function Settingpage() {
  return (
    <div className="w-full h-full">
      <div className="absolute inset-0 bg-_grey-100" />
      <div className="relative w-full h-full flex flex-col items-start justify-center">
        <div className="mb-3 w-full">
          <SettingItem icon={<EditProfile />} label="프로필 설정" />
          <SettingItem icon={<PushNotification />} label="푸시알림 설정" />
        </div>
        <div className="mb-3 w-full">
          <SettingItem icon={<Announcement />} label="공지사항" />
          <SettingItem icon={<Contact />} label="문의하기" />
        </div>
        <div className="mb-3 w-full">
          <SettingItem icon={<Logout />} label="로그아웃" />
          <SettingItem icon={<Delete />} label="탈퇴하기" />
        </div>
        <div className="w-full">
          <SettingItem icon={<Version />} label="버전 정보" text="v 1.0.0" />
        </div>
      </div>
    </div>
  )
}
