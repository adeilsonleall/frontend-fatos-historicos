import "./globals.css";

export const metadata = {
  title: "API Fatos Históricos",
  description: "Um fato inesquecivél para cada ano entre 1920 e 2020",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}
