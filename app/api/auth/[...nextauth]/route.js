import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.HUB_ID,
      clientSecret: process.env.HUB_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      session.user.role = session.user.email === process.env.ADMIN_EMAIL
        ? "admin"
        : "user";
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
