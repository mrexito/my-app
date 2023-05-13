import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt" 

interface RequestBody {
  username: string;
  password: string;
}
export async function Post(request:Request ) {
  const body:RequestBody = await request.json()
  
  const user = await prisma.user.findFirst({
    where: {
      email:body.username
    }
  })
  if (user && (await bcrypt.compare(body.password, user.password))) {
    const {password, ...user WithoutPass} = user
    return new Response(JSON.stringify(userWithoutPass))
  }
  else return new Response(JSON.stringify({error:"Invalid username or password"}), {status:401})
}
