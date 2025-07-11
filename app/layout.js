"use client";

import React, { useEffect } from "react";
import { Provider } from 'react-redux';
import { store } from "@/store/store";
import { Sora } from "@next/font/google";
import AuthProvider from "@/provider/AuthProvider";
import { AuthProvider as SupabaseAuthProvider } from "@/context/AuthContext";
import Context from "@/context/Context";

import "bootstrap/scss/bootstrap.scss";

// ========= Plugins CSS START =========
import "../public/css/plugins/feature.css";
import "../public/css/plugins/fontawesome-all.min.css";
import "../public/css/plugins/animation.css";
import "../node_modules/sal.js/dist/sal.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-tooltip/dist/react-tooltip.css";
import "../public/css/supabase-custom.css";
// ========= Plugins CSS END =========

const sora = Sora({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
})

import "../public/scss/style.scss";

export default function RootLayout({ children }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <html lang="en">
      <body className={sora.className} suppressHydrationWarning={true}>
        <Provider store={store}>
          <Context>
            <SupabaseAuthProvider>
              <AuthProvider>
                {children}
              </AuthProvider>
            </SupabaseAuthProvider>
          </Context>
        </Provider>
      </body>
    </html>
  );
}
