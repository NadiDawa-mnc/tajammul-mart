import Link from 'next/link'

export default function Page() {
  return (
    <div>
      <h1>HomePage</h1>
      <Link href='/home'>Home</Link>
      <br />
      <Link href='/order'>order</Link>
      <br />
      <Link href='/billing'>billing</Link>
      <br />
      <Link href='/dashboard'>dashboard</Link>
    </div>
  )
}
