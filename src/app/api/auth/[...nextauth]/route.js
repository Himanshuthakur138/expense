import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        console.log("credentials",credentials)
        // if (typeof window !== "undefined") {
        //   const storeddata = JSON.parse(
        //     window.localStorage.getItem("register")
        //   );
        //   console.log("sssssssssssssssssssssssssssssssssssssss", storeddata);
        // }
        const { email, password, localData } = credentials;
        const data = JSON.parse(localData);
        console.log("data", data);
        const user = data.find(
          (item) => item.email === email && item.password === password
        );
        if (user) {
          return { email: user.email };
        } else {
          console.log("Invalid credentials");
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.email = token.email;
      return session;
    },
  },
});
export { handler as GET, handler as POST };

// Credentials({
//   async authorize(credentials, req) {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         username: credentials.username, // Pass username from credentials
//         password: credentials.password,
//         expiresInMins: 30, // optional, defaults to 60
//       }),
//     });
//     const data = await res.json(); // Parse the response
//     if (res.ok && data) {
//       return {
//         ...data.user,
//         username: credentials.username,
//         email: data.email,
//         firstName: data.firstName,
//         lastName: data.lastName,
//         image: data.image,
//         accessToken: data.access_token,
//         refreshToken: data.refresh_token,
//         iat: data.iat,
//         exp: data.exp,
//         jti: data.jti,
//       };
//     } else {
//       throw new Error("CredentialsSignin"); // Invalid credentials
//     }
//   },
// }),
