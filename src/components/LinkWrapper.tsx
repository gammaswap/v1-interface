import { ReactNode } from "react"
import Link from "next/link"


interface LinkWrapperProps {
  children?: ReactNode,
  pathName: string,
  query: any
}

export const LinkWrapper = ({ children, pathName, query }: LinkWrapperProps) => {
  return (
    <Link
      passHref
      href={{
        pathname: pathName,
        query: query
      }}
    >
      <a>
        {children}
      </a>
    </Link>
  )
}
