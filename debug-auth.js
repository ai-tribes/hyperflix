require('dotenv').config({ path: '.env.local' });

console.log('Checking NextAuth environment variables:');
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? 'Set (first 10 chars: ' + process.env.GOOGLE_CLIENT_ID.substring(0, 10) + '...)' : 'Not set');
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? 'Set (length: ' + process.env.GOOGLE_CLIENT_SECRET.length + ')' : 'Not set'); 