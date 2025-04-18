'use client';
import Navbar from "../components/Navbar";
import { IntlProvider } from "../components/IntlProvider";
import { FormattedMessage } from "react-intl";
import "../styles/globals.css";
import "../styles/debug.css";
// import("../styles/dev.css");

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Plant Tracker App</title>
        <meta name="description" content="Plant Tracker App" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" 
        />
        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/npm/@creativebulma/bulma-tooltip@1.2.0/dist/bulma-tooltip.min.css"
        />
      </head>
      <body>
        <IntlProvider>
          <Navbar />
          <main className="section">
            <div className="container is-fluid">
              {children}
            </div>
          </main>
          <footer className="footer">
            <div className="content has-text-centered">
              <p>
                <FormattedMessage id="footer.text" />
              </p>
            </div>
          </footer>
        </IntlProvider>
      </body>
    </html>
  );
}
