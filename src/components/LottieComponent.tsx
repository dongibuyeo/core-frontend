/* eslint-disable object-shorthand */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import React, { useState, useRef, useEffect } from 'react'
import Lottie, { AnimationConfigWithData, AnimationItem } from 'lottie-web'

interface LottieComponentProps {
  animationData: object // Replace 'object' with the specific type if available
  loop?: boolean
  autoplay?: boolean
  speed?: number
  isPaused?: boolean
  isStopped?: boolean
  init?: number
  end?: number
  onComplete?: () => void // 추가된 콜백 함수
  [key: string]: any // For any additional props
}

const LottieComponent: React.FC<LottieComponentProps> = ({
  animationData,
  loop = true,
  autoplay = true,
  speed,
  isPaused,
  isStopped,
  init = 0,
  end = 10000,
  onComplete, // onComplete prop 추가
  ...restProps
}) => {
  const animationContainer = useRef<HTMLDivElement | null>(null)
  const [animationInstance, setAnimationInstance] =
    useState<AnimationItem | null>(null)

  useEffect(() => {
    if (!animationContainer.current) return

    const animationOptions: AnimationConfigWithData<'svg'> = {
      container: animationContainer.current,
      renderer: 'svg',
      loop: loop,
      autoplay: autoplay,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    }

    const animation = Lottie.loadAnimation(animationOptions)

    if (onComplete) {
      animation.addEventListener('loopComplete', onComplete)
      // animation.addEventListener('drawnFrame', onComplete);
    }
    setAnimationInstance(animation)
    return () => {
      animation.removeEventListener('loopComplete', onComplete)
      animation.destroy()
    }
    // 애니메이션이 완료되었을 때 콜백 함수 호출
  }, [animationData, loop, autoplay, init, end, onComplete])

  useEffect(() => {
    if (animationInstance !== null) {
      if (isPaused) {
        animationInstance.pause()
      } else {
        animationInstance.play()
      }

      if (isStopped) {
        animationInstance.stop()
      } else {
        animationInstance.playSegments([init, end], true)
      }

      if (speed !== undefined) {
        animationInstance.setSpeed(speed)
      }
    }
  }, [isPaused, isStopped, speed, animationInstance])

  return <div ref={animationContainer} {...restProps} />
}

export default LottieComponent
