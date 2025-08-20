import "../styles/globals.scss";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa">
      <head>
        <link
          href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
