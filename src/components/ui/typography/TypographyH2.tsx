interface TypographyH2Props {
  children: React.ReactNode
}

const TypographyH2 = ({ children }: TypographyH2Props) => {
  return (
    <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight text-black first:mt-0 dark:text-white">
      {children}
    </h2>
  )
}

export default TypographyH2
