import { signOut } from "next-auth/react"

export default () => <button onClick={() => signOut({ callbackUrl: 'http://localhost:3000' })}>Sign out</button>
export function SignOut(){
    return (
        <button onClick={() => signOut({ callbackUrl: 'http://localhost:3000' })}>Sign out</button>
    )
}