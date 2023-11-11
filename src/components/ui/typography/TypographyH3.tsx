interface TypographyH3Props {
  children: React.ReactNode
}

const TypographyH3 = ({ children }: TypographyH3Props) => {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-black dark:text-white">
      {children}
    </h3>
  )
}

export default TypographyH3
