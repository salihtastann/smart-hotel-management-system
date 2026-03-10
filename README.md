# 🏨 Kırıkhan Pansiyon Yönetim Sistemi

Kırıkhan Pansiyon Yönetim Sistemi, üniversite bitirme projesi kapsamında geliştirilmiş, modern bir pansiyon resepsiyon ve ön muhasebe otomasyonudur. .NET 9 ve WPF teknolojileri kullanılarak geliştirilen sistem, kullanıcı dostu arayüzü ve güçlü backend altyapısı ile pansiyon işletmeciliğini dijitalleştirir.

---

## 🚀 Öne Çıkan Özellikler

### 📊 Ana Panel (Dashboard)
- **Aylık Finansal Takip:** Kasa her ayın 1'inde otomatik olarak sıfırlanır.
- **İstatistik Kartları:** Toplam oda, doluluk oranları, personel sayısı, aylık tahsilat ve bekleyen borç takibi.
- **Bugün Ayrılacaklar:** Çıkış yapması gereken misafirler için otomatik uyarı ve liste.

### 🛏️ Oda Yönetimi
- **Görsel Oda Haritası:** Odaların durumunu (Dolu/Boş/Kirli) renklerle (Kırmızı/Yeşil/Sarı) anlık takip.
- **Dinamik Bilgi Paneli:** Dolu odalarda kalan misafirlerin isim ve konaklama tarihlerini anlık görüntüleme.
- **Hızlı Check-out:** Borcu tamamlanan odalar için tek tıkla çıkış işlemi.

### 🛎️ Resepsiyon & Misafir Girişi
- **Akıllı Formlar:** Kişi sayısına göre dinamik olarak açılan misafir bilgi alanları.
- **TC Kimlik ile Tanıma:** Geçmiş kayıtları tarayarak mükerrer misafir bilgilerini otomatik doldurma.
- **Otomatik Fiyatlandırma:** Oda tipi ve konaklama süresine göre anlık borç hesaplama.

### 💰 Ön Muhasebe & Raporlama
- **Cari Hesap Takibi:** Rezervasyon bazlı ödeme ve borç yönetimi.
- **Kısmi Ödeme Desteği:** Parça parça ödeme alma ve bakiye güncelleme.
- **Excel/CSV Çıktısı:** Tüm raporları Windows-1254 (Türkçe) kodlamasıyla Excel uyumlu dışa aktarma.
- **Dijital Fiş:** Tahsilat sonrası otomatik ödeme fişi (.txt) oluşturma.

---

## 🛠 Teknoloji Yığını

- **Backend:** .NET 9 Web API
- **Frontend:** WPF (Windows Presentation Foundation) - .NET 9
- **Veritabanı:** SQLite & PostgreSQL (Entity Framework Core)
- **Mimari:** Clean Architecture & MVVM (Model-View-ViewModel)
- **Güvenlik:** BCrypt şifreleme, İşlem Logları, Regex Giriş Kontrolleri

---

## 🎨 Görsel ve Teknik Detaylar
- **Karanlık Mod:** Tek tıkla gece/gündüz teması geçişi.
- **Modern UI:** Standart Windows pencereleri yerine özelleştirilmiş, kurumsal logolu modern arayüz.
- **İşlem Logları:** Tüm kritik işlemler `islemler.log` dosyasına tarih-saat damgasıyla kaydedilir.

---

## 🔑 Yönetici Giriş Bilgileri
- **E-posta:** `admin@pansiyon.com`
- **Şifre:** `741852`

---

## 📦 Kurulum ve Çalıştırma
1. Projeyi bilgisayarınıza indirin.
2. `src/ApartmentManagement.sln` dosyasını Visual Studio 2022 ile açın.
3. Veritabanı için `dotnet ef database update` komutunu çalıştırın.
4. Önce `ApartmentManagement.API` projesini, ardından `ApartmentManagement.WPF` projesini başlatın.

---
*Bu proje üniversite bitirme projesi olarak hazırlanmıştır.*
