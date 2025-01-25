import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return <>
    <span className='flex justify-center items-center min-h-screen'>
      <SignUp />
    </span>
  </>
}