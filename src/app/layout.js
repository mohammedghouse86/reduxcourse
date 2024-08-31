'use client';
import { Inter } from "next/font/google";
import "./globals.css";
import './app.css';
const inter = Inter({ subsets: ["latin"] });
import store from './Redux/store';
import { Provider } from 'react-redux';



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
      <Provider store={store}>
        {children}</Provider></body>
      
    </html>
  );
}
