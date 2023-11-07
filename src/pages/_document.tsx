import { Head, Html, Main, NextScript } from 'next/document'
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="description"
          content="SwayAuth is a SaaS product that helps businesses of all sizes manage authentication and user data on their websites and applications. With SwayAuth, you can easily implement social login (Facebook, Google), manual login and signup, one-time password (OTP) token authentication, SMS and email password messaging, and more."
        />
        <link rel="icon" href="/logo-circle.png" />
        <title>Swayauth</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
