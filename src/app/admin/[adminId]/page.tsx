'use client';

// pages/admin/[adminId]/index.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { Admin } from '@/types/admin';
import { auth, db } from '@/utils/firebase';

const AdminPage = () => {
  const router = useRouter();
  const { adminId } = router.query;
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const user = auth.currentUser;
      if (user) {
        const adminDocRef = doc(db, 'admins', user.uid);
        const adminDoc = await getDoc(adminDocRef);
        if (adminDoc.exists() && adminDoc.data().role === 'admin') {
          setIsAdmin(true);
          setAdmin(adminDoc.data() as Admin);
        } else {
          router.push('/admin/login');
        }
      } else {
        router.push('/admin/login');
      }
    };
    checkAdmin();
  }, [adminId]);

  if (!isAdmin) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome, {admin?.name}</h1>
      {/* Admin specific content */}
    </div>
  );
};

export default AdminPage;