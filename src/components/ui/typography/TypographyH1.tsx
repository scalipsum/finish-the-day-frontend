interface TypographyH1Props {
  children: React.ReactNode
}
const TypographyH1 = ({ children }: TypographyH1Props) => {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-black dark:text-white lg:text-5xl">
      {children}
    </h1>
  )
}

export default TypographyH1
