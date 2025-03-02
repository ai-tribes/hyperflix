import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Create the handler and export it as GET and POST
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 