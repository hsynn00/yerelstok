'use client';

import IdentityVerification from '@/components/IdentityVerification';

export default function VerifyPage() {
  const handleVerified = (data) => {
    alert(`Tebrikler! ${data.type === 'primci' ? 'T.C. Kimlik' : 'VKN'} doğrulamanız başarıyla tamamlandı. Oturum açılıyor...`);
    window.location.href = '/prim';
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <IdentityVerification onVerified={handleVerified} />
    </div>
  );
}