# Kırıkhan Pansiyon Yönetim Sistemi - Proje Dokümantasyonu

Bu dosya, projenin teknik yapısı, mimari kararları ve geliştirme standartları hakkında rehberlik sağlamak amacıyla oluşturulmuştur.

## 🏨 Proje Hakkında
**Kırıkhan Pansiyon**, üniversite bitirme projesi kapsamında geliştirilmiş, modern bir pansiyon resepsiyon ve ön muhasebe otomasyonudur. 

## 🛠 Teknoloji Yığını
- **Backend:** .NET 9 Web API
- **Frontend:** WPF (Windows Presentation Foundation) - .NET 9
- **Veritabanı:** PostgreSQL (Entity Framework Core)
- **Mimari:** Clean Architecture & MVVM (Model-View-ViewModel)
- **Kütüphaneler:** CommunityToolkit.Mvvm, Npgsql, BCrypt.Net

## 📐 Mimari Standartlar ve Özellikler

### 1. Oda ve Konaklama Yönetimi
- **Üçlü Durum Takibi:** Odalar üç farklı renkle görselleştirilir:
    - 🔴 **Dolu:** Misafir konaklıyor.
    - 🟡 **Kirli:** Misafir çıkış yapmış, temizlik bekliyor (Check-in yapılamaz).
    - 🟢 **Müsait:** Temiz ve boş, girişe hazır.
- **Housekeeping (Temizlik):** Check-out yapıldığında oda otomatik "Kirli" olur. Resepsiyonist "Temizlik Onayı" vermeden oda tekrar müsaite dönmez.
- **Zam Modülü:** Oda fiyatları tek tek güncellenebildiği gibi, oda tipine göre (Standart, Suit vb.) toplu olarak da güncellenebilir.

### 2. Resepsiyon ve Misafir Tanıma
- **TC ile Otomatik Kayıt:** Misafir girişi (Check-in) sırasında TC Kimlik No girildiğinde, sistem geçmiş kayıtları tarar. Eğer misafir daha önce konakladıysa Ad-Soyad ve Telefon bilgileri otomatik doldurulur.
- **Ödeme ve Çıkış Ayrımı:** Ödeme tamamlansa dahi oda otomatik boşalmaz. Misafirin ayrılışı (Check-out) manuel bir işlemdir.

### 3. Dashboard ve Görsel Analiz
- **Grafiksel Özet:** Ana sayfada odaların doluluk oranını gösteren dairesel (Ring) grafik ve aylık gelir/borç durumunu gösteren sütun (Bar) grafik bulunur.
- **Bugün Ayrılacaklar:** O gün çıkış yapması gereken misafirler ana panelde liste olarak sunulur.

### 4. Finans ve Raporlama
- **Para Birimi:** Tüm finansal değerler yerel formatta (**₺**) gösterilir.
- **Excel/CSV Çıktısı:** Tüm rezervasyon kayıtları Windows-1254 (Türkçe) kodlamasıyla Excel uyumlu CSV olarak dışa aktarılabilir.
- **Dijital Fiş:** Tahsilat sonrası otomatik metin tabanlı ödeme fişleri oluşturulur ve `Settings` sayfasındaki özel klasöre kaydedilir.

### 🌐 5. Tanıtım Web Sitesi (GitHub Pages)
- **Modern Landing Page:** Projenin tüm özelliklerini, teknik mimarisini ve kurulum adımlarını sergileyen profesyonel bir web sitesi (`docs/` klasörü) oluşturulmuştur.
- **Teknoloji:** HTML5, CSS3 (Glassmorphism & Gradients), Modern JavaScript (SPA yapısı).
- **Görsel Analiz:** Projenin grafiksel gücünü yansıtan interaktif Donut ve Line chartlar simüle edilmiştir.
- **Yayın:** GitHub Pages üzerinden `docs/` klasörü kaynak gösterilerek yayına hazır durumdadır.

## 🚀 Başlatma Talimatları
1. **Veritabanı:** `docker-compose up -d` (veya yerel Postgres) ile DB başlatılmalı.
2. **Migration:** Yeni sütunlar (IsClean vb.) için `dotnet ef database update` komutu çalıştırılmalıdır.
3. **API:** `dotnet run --project src/ApartmentManagement.API`
4. **WPF:** `dotnet run --project src/ApartmentManagement.WPF`

---
*Bu proje bir Gemini CLI eseridir. Üniversite sunumunda başarılar dilerim!* 🎓
