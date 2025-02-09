const text = "Kael memiliki misi untuk menumbuhkan pepohonan agar hutan terjaga kembali. Ia bekerja keras setiap hari, menanam bibit pohon dan merawatnya dengan penuh dedikasi. Kael percaya bahwa dengan menjaga hutan, ia dapat memberikan kontribusi besar bagi kelestarian alam dan kehidupan makhluk hidup di sekitarnya. Misi ini sangat penting bagi Kael, dan ia berharap dapat menginspirasi orang lain untuk turut serta dalam menjaga lingkungan.";
        const typingSpeed = 30; // Kecepatan mengetik (ms per karakter)
        let index = 0;

        function typeText() {
            if (index < text.length) {
                document.getElementById("typing-text").innerHTML += text.charAt(index);
                index++;
                setTimeout(typeText, typingSpeed);
            } else {
                setTimeout(() => {
                    window.location.href = "scene2.html"; // Ganti dengan halaman tujuan
                }, 1000);
            }
        }

        window.onload = () => {
            typeText();
        };