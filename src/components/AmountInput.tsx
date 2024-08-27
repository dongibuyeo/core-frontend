'use client'

import { useState, useRef, useEffect } from 'react'

interface Props {
  placeholder: string
  quickAmounts: number[]
  hasFullAmountOption?: boolean
  balance: number
  errorMessage: string
}

export default function AmountInput({
  placeholder,
  quickAmounts,
  hasFullAmountOption,
  balance,
  errorMessage,
}: Props) {
  const [amount, setAmount] = useState<number | null>(null)
  const [isOverBalance, setIsOverBalance] = useState(false)
  const [inputWidth, setInputWidth] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const isValidAmount = () => amount === null || amount <= balance

  useEffect(() => {
    if (inputRef.current) {
      const tempSpan = document.createElement('span')
      tempSpan.style.visibility = 'hidden'
      tempSpan.style.position = 'absolute'
      tempSpan.style.whiteSpace = 'nowrap'
      tempSpan.style.fontSize = getComputedStyle(inputRef.current).fontSize
      tempSpan.style.fontFamily = getComputedStyle(inputRef.current).fontFamily
      tempSpan.textContent = inputRef.current.value
      document.body.appendChild(tempSpan)
      setInputWidth(tempSpan.offsetWidth)
      document.body.removeChild(tempSpan)
    }
  }, [amount])

  const handleQuickAmountClick = (quickAmount: number | 'full') => {
    if (quickAmount === 'full' && hasFullAmountOption) {
      setAmount(balance)
      setIsOverBalance(false)
    } else if (!isOverBalance && typeof quickAmount === 'number') {
      const newAmount = (amount ?? 0) + quickAmount
      setAmount(newAmount)
      setIsOverBalance(newAmount > balance)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value.replace(/,/g, ''), 10) || 0

    if (isOverBalance && value > balance) {
      return
    }

    setAmount(value)
    if (value > balance) {
      setIsOverBalance(true)
    } else {
      setIsOverBalance(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        className={`relative w-full h-14 border-b-2 text-3xl text-center outline-none ${
          isOverBalance
            ? 'text-_red border-_red animate-shake'
            : 'focus:border-primary'
        }`}
      >
        <input
          ref={inputRef}
          type="text"
          value={amount !== null && amount > 0 ? amount.toLocaleString() : ''}
          onChange={handleInputChange}
          className={`w-full h-14 border-b-2 text-3xl text-center outline-none ${
            isOverBalance
              ? 'text-_red border-_red animate-shake'
              : 'focus:border-primary'
          }`}
          placeholder={placeholder}
        />
        {amount !== null && amount > 0 && (
          <span
            className="absolute text-3xl -translate-y-1/2 top-1/2"
            style={{
              left: `calc(50% + ${inputWidth / 2}px)`,
            }}
          >
            원
          </span>
        )}
      </div>
      {amount !== null && !isValidAmount() && (
        <span className="text-_red text-sm pl-2">{errorMessage}</span>
      )}

      <ul className="flex gap-2 whitespace-nowrap overflow-auto scrollbar-hide -mr-5">
        {quickAmounts.map((quickAmount) => (
          <li
            key={quickAmount}
            className="shrink-0 w-24 px-4 py-2 text-sm font-medium text-center text-_blue-300 bg-_blue-300/[8%] rounded-full cursor-pointer"
          >
            <button
              type="button"
              onClick={() => handleQuickAmountClick(quickAmount)}
            >
              {quickAmount.toLocaleString()}원
            </button>
          </li>
        ))}
        {hasFullAmountOption && (
          <li className="shrink-0 w-24 px-4 py-2 text-sm font-medium text-center text-_blue-300 bg-_blue-300/[8%] rounded-full cursor-pointer">
            <button
              type="button"
              onClick={() => handleQuickAmountClick('full')}
            >
              전액
            </button>
          </li>
        )}
      </ul>
    </div>
  )
}
