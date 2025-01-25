import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <>
    <span className='flex justify-center items-center min-h-screen'>
      <SignIn />
    </span>
  </>
}