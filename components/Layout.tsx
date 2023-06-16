import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Footer from './Footer';
import Head from 'next/head';
import Seotags from './seo';

export default function RootLayout({
  children,
  user, // Receive the user prop
}: {
  children: React.ReactNode;
  user: any; // Add User type annotation
}) {
  const router = useRouter();
  const { query } = router;
  const username = query.username;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Remove the useState for user since it's now received as a prop

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        if (!username) return;
        // setUser(response.data.data[0]); // Remove this line
        setLoading(false);
      } catch (error) {
        console.log('Error fetching user data', error);
        setLoading(false);
        // setError(error);
      }
    }

    fetchUser();
  }, [username]);

  const background = user?.backgroundColor;
  const font = user?.font;

  return (
    <div>
      <Seotags user={user} /> {/* Pass the user prop to Seotags component */}
      <div
        className='min-h-max'
        style={{
          background: background,
          fontFamily: font + ', sans-serif',
        }}
      >
        <main>
          {children}
          <Footer />
        </main>
      </div>
    </div>
  );
}
