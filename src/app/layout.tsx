import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import '../styles/chart.css';
import '../styles/globals.css';
import StoreProvider from './storeProvider';
config.autoAddCss = false;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="description"
          content="SwayAuth is a SaaS product that helps businesses of all sizes manage authentication and user data on their websites and applications. With SwayAuth, you can easily implement social login (Facebook, Google), manual login and signup, one-time password (OTP) token authentication, SMS and email password messaging, and more."
        />
        <link rel="icon" href="/logo-circle.png" />
        <title>Swayauth</title>
      </head>
      <body><StoreProvider>{children}</StoreProvider></body>
    </html>
  )
}
