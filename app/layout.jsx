'use client';
import { AuthProvider } from './context/authContext';

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <body>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}