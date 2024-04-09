import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/app/db/prismaClient";
const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials) {
                const response = await fetch(process.env.APP_URL + '/api/auth/signin',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password 
                    })
                })
                if (response.ok) {
                    const user = await response.json();
                    if (user)
                    {
                        return user
                    }
                    else 
                    {
                        return null
                    }
                }
                else {
                    return null
                }
            }
        })
    ],
    callbacks: {
        async signIn({profile, credentials}) {
            try {
                let email = credentials.email
                let userExist = await prisma.CustomerAccount.findUnique({where: {email: email}})
                return userExist
            }
            catch (error) {
                return false
            }
        },
        async jwt({token, user, trigger, session}) {
                // const userDB = await User.findOne({
                //     email: user.email
                // })
                // token.id = userDB.id,
                // token.username = userDB.username
                // token.avatar = "https://drive.google.com/uc?export=view&id=" + userDB.avatar
                // token.email = ""
                // return token
                if (trigger === "update") {
                    return {
                        ...token,
                        ...session.user
                    }
                }
                if (user) {
                    const userDB = await prisma.CustomerAccount.findUnique({where: {email: user.email}})
                    return {
                        ...token,
                        id: userDB.id,
                        email: userDB.email,
                        firstName: userDB.firstName,
                        lastName: userDB.lastName,
                        phone: userDB.phone,
                        address: userDB.address
                    }
                }
                return token
        },
        async session({session, token}) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    email: token.email,
                    firstName: token.firstName,
                    lastName: token.lastName,
                    phone: token.phone,
                    address: token.address
                }
            }
        }
    },
    session: {
        strategy: "jwt",
    }
})

export {handler as GET, handler as POST}