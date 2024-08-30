type Props = {
  name: string
  challengeLabel: string
}

export default function RecommendTo({ name, challengeLabel }: Props) {
  return (
    <div>
      <h1 className="text-left text-xl mt-8 mb-2">
        <span className="font-medium">{name}</span>
        <span>님,</span>
      </h1>
      <h2 className="text-left mb-20">
        <span className="text-2xl font-medium text-primary">
          {challengeLabel}
        </span>
        <span className="text-xl"> 어떠세요?</span>
      </h2>
    </div>
  )
}
