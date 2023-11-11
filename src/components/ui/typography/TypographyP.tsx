interface TypographyPProps {
  children: React.ReactNode
}

const TypographyP = ({ children }: TypographyPProps) => {
  return (
    <p className="leading-7 text-black dark:text-white [&:not(:first-child)]:mt-6">
      {children}
    </p>
  )
}

export default TypographyP
