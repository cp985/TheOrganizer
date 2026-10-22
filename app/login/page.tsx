import LoginClient from "@/components/LogInClient";
import { auth } from "@/auth/auth";
import  {redirect} from 'next/navigation'

export default async function LogInServer(){
  const session = await auth()
  if(session){
redirect('/theorganizer')

  }
  return (
     <LoginClient/>
  )
}