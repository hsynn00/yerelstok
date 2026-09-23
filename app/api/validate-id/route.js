import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { tcNo, name, surname, birthYear } = await request.json();

    // 1. Temel Format Kontrolü (11 hane ve rakam)
    if (!tcNo || tcNo.length !== 11 || !/^\d+$/.test(tcNo)) {
      return NextResponse.json({ success: false, message: 'Geçersiz T.C. Kimlik Numarası formatı.' });
    }

    // 2. NVİ SOAP Servis İsteği (Devlet Nüfus Doğrulama Servisi)
    const xmlData = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <TCKimlikNoDogrula xmlns="http://nvi.gov.tr/WS">
      <TCKimlikNo>${tcNo}</TCKimlikNo>
      <Ad>${name.toLocaleUpperCase('tr-TR')}</Ad>
      <Soyad>${surname.toLocaleUpperCase('tr-TR')}</Soyad>
      <DogumYili>${birthYear}</DogumYili>
    </TCKimlikNoDogrula>
  </soap:Body>
</soap:Envelope>`;

    const response = await fetch('https://tckimlik.nvi.gov.tr/WS/TCKimlikNoDogrula.asmx', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': 'http://nvi.gov.tr/WS/TCKimlikNoDogrula',
      },
      body: xmlData,
    });

    const xmlText = await response.text();
    const isValid = xmlText.includes('<TCKimlikNoDogrulaResult>true</TCKimlikNoDogrulaResult>');

    if (isValid) {
      return NextResponse.json({ success: true, message: 'Kimlik bilgileri NVİ tarafından doğrulandı.' });
    } else {
      return NextResponse.json({ success: false, message: 'Girilen T.C. Kimlik bilgileri eşleşmedi veya geçersiz.' });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Doğrulama servisine ulaşılamadı.' }, { status: 500 });
  }
}