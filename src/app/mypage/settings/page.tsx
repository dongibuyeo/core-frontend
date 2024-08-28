'use client'

import SettingItem from '@/containers/settings/SettingItem'
import {
  EditProfile,
  PushNotification,
  Announcement,
  Contact,
  Logout,
  Delete,
  Version,
} from '@/public/svg/index'

export default function SettingPage() {
  return (
    <div className="-mx-5">
      <div className="relative w-full flex flex-col items-start justify-center bg-_grey-100">
        <div className="mb-3 w-full">
          <SettingItem
            icon={<EditProfile />}
            label="프로필 설정"
            url="/mypage/settings/profile"
          />
          <SettingItem
            icon={<PushNotification />}
            label="푸시알림 설정"
            url="/mypage/settings/notification"
          />
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
