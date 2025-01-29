import Image from "next/image";


export default function Logo() {
  return (
    <Image src="/logo.svg" alt="logo cashtrackr" width={400} height={123} priority className="w-full"/>
  )
}
