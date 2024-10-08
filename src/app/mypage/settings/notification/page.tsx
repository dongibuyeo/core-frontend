'use client'

import { useState } from 'react'
import ToggleSettingItem from '@/containers/ToggleSettingItem'

export default function NotificationPage() {
  const [isChallengeAlertEnabled, setIsChallengeAlertEnabled] = useState(true)
  const [isMarketingConsentEnabled, setIsMarketingConsentEnabled] =
    useState(true)

  return (
    <div className="w-full mt-5">
      <ToggleSettingItem
        label="챌린지 관련 알림"
        isChecked={isChallengeAlertEnabled}
        onToggle={() => setIsChallengeAlertEnabled((prev) => !prev)}
      />
      <ToggleSettingItem
        label="마케팅 수신 동의"
        isChecked={isMarketingConsentEnabled}
        onToggle={() => setIsMarketingConsentEnabled((prev) => !prev)}
      />
    </div>
  )
}
