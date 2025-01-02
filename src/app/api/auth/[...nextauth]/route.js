import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import users from "../../../../data/users.js";

export const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const foundUser = users.find(
                    (user) =>
                        user.username === credentials.username &&
                        user.password === credentials.password
                );
                if (foundUser) {
                    return {
                        username: foundUser.username,
                        role: foundUser.role,
                    };
                } else {
                    return null; 
                }
            },
        }),
    ],
    pages: {
        signIn: "/login",
      },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.username = user.username;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.role = token.role;
            session.user.username = token.username;
            return session;
        },
    },
});

export { handler as GET, handler as POST };
