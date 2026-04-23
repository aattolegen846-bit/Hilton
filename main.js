document.addEventListener('DOMContentLoaded', () => {
    // --- Supabase Config ---
    // СІЗДІҢ SUPABASE МӘЛІМЕТТЕРІҢІЗДІ ОСЫ ЖЕРГЕ ҚОЙЫҢЫЗ:
    const SUPABASE_URL = 'https://wlpzucakitgfbpwrysrd.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndscHp1Y2FraXRnZmJwd3J5c3JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5MzQyMDMsImV4cCI6MjA5MjUxMDIwM30.v-V-R7GXtkygkzCSkiQ_M8IWhfl4r54SjcnxA11UfTk';
    
    let supabaseClient = null;
    if (SUPABASE_URL !== 'YOUR_SUPABASE_URL') {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }

    // --- i18n Implementation ---
    const translations = {
        EN: {
            nav_feedback: "SUBMIT FEEDBACK",
            nav_location: "LOCATION",
            nav_quality: "QUALITY PROGRAM",
            nav_contact: "CONTACT",
            btn_book: "BOOK",
            hero_title: "YOUR OPINION IS OUR PRIORITY.<br>EVALUATE SERVICE QUALITY.",
            guest_rating_title: "GUEST QUALITY RATING",
            cleanliness_title: "CLEANLINESS",
            cleanliness_desc: "Interactive cleanliness rating.",
            staff_title: "STAFF",
            staff_desc: "Staff performance rating.",
            breakfast_title: "BREAKFAST",
            breakfast_desc: "Breakfast impressions.",
            comfort_title: "ROOM COMFORT",
            comfort_desc: "Room comfort and amenities.",
            comments_title: "YOUR COMMENTS AND SUGGESTIONS",
            comment_placeholder: "We read every review.",
            btn_submit: "SUBMIT FEEDBACK AND IMPROVE SERVICE",
            summary_title: "CURRENT GUEST RATING",
            analysis_section_title: "HOW WE USE YOUR FEEDBACK",
            hsqip_title: "Hilton Service Quality Improvement Program",
            hsqip_desc: "Comparative analysis from Quality Improvement Program Model, experience and assessment.",
            comparison_header: "COMPARATIVE ANALYSIS",
            comp_before: "BEFORE",
            comp_before_sub: "0% data collection",
            comp_after: "AFTER",
            comp_after_sub: "After data collection",
            alert_empty: "Please provide some feedback before submitting.",
            btn_submitting: "SUBMITTING...",
            btn_thank_you: "THANK YOU FOR YOUR FEEDBACK!"
        },
        RU: {
            nav_feedback: "ОСТАВИТЬ ОТЗЫВ",
            nav_location: "РАСПОЛОЖЕНИЕ",
            nav_quality: "ПРОГРАММА КАЧЕСТВА",
            nav_contact: "КОНТАКТЫ",
            btn_book: "ЗАБРОНИРОВАТЬ",
            hero_title: "ВАШЕ МНЕНИЕ - НАШ ПРИОРИТЕТ.<br>ОЦЕНИТЕ КАЧЕСТВО СЕРВИСА.",
            guest_rating_title: "РЕЙТИНГ КАЧЕСТВА ГОСТЕЙ",
            cleanliness_title: "ЧИСТОТА",
            cleanliness_desc: "Интерактивный рейтинг чистоты.",
            staff_title: "ПЕРСОНАЛ",
            staff_desc: "Рейтинг работы персонала.",
            breakfast_title: "ЗАВТРАК",
            breakfast_desc: "Впечатления от завтрака.",
            comfort_title: "КОМФОРТ НОМЕРА",
            comfort_desc: "Комфорт и удобства в номере.",
            comments_title: "ВАШИ КОММЕНТАРИИ И ПРЕДЛОЖЕНИЯ",
            comment_placeholder: "Мы читаем каждый отзыв.",
            btn_submit: "ОТПРАВИТЬ ОТЗЫВ И УЛУЧШИТЬ СЕРВИС",
            summary_title: "ТЕКУЩИЙ РЕЙТИНГ ГОСТЕЙ",
            analysis_section_title: "КАК МЫ ИСПОЛЬЗУЕМ ВАШ ОТЗЫВ",
            hsqip_title: "Программа повышения качества обслуживания Hilton",
            hsqip_desc: "Сравнительный анализ на основе модели программы улучшения качества, опыта и оценок.",
            comparison_header: "СРАВНИТЕЛЬНЫЙ АНАЛИЗ",
            comp_before: "ДО",
            comp_before_sub: "0% сбор данных",
            comp_after: "ПОСЛЕ",
            comp_after_sub: "После сбора данных",
            alert_empty: "Пожалуйста, оставьте отзыв перед отправкой.",
            btn_submitting: "ОТПРАВКА...",
            btn_thank_you: "СПАСИБО ЗА ВАШ ОТЗЫВ!"
        },
        KZ: {
            nav_feedback: "ПІКІР ҚАЛДЫРУ",
            nav_location: "ОРНАСҚАН ЖЕРІ",
            nav_quality: "САПА БАҒДАРЛАМАСЫ",
            nav_contact: "БАЙЛАНЫС",
            btn_book: "БРОНДАУ",
            hero_title: "СІЗДІҢ ПІКІРІҢІЗ БІЗ ҮШІН МАҢЫЗДЫ.<br>ҚЫЗМЕТ САПАСЫН БАҒАЛАҢЫЗ.",
            guest_rating_title: "ҚОНАҚТАРДЫҢ САПА БАҒАСЫ",
            cleanliness_title: "ТАЗАЛЫҚ",
            cleanliness_desc: "Интерактивті тазалық рейтингі.",
            staff_title: "ҚЫЗМЕТКЕРЛЕР",
            staff_desc: "Қызметкерлердің жұмыс сапасы.",
            breakfast_title: "ТАҢҒЫ АС",
            breakfast_desc: "Таңғы ас туралы әсерлер.",
            comfort_title: "НӨМІР ЖАЙЛЫЛЫҒЫ",
            comfort_desc: "Нөмірдегі жайлылық пен ыңғайлылық.",
            comments_title: "СІЗДІҢ ПІКІРЛЕРІҢІЗ ПЕНҰСЫНЫСТАРЫҢЫЗ",
            comment_placeholder: "Біз әрбір пікірді оқимыз.",
            btn_submit: "ПІКІР ЖІБЕРУ ЖӘНЕ ҚЫЗМЕТТІ ЖАҚСАРТУ",
            summary_title: "ҚОНАҚТАРДЫҢ АҒЫМДАҒЫ РЕЙТИНГІ",
            analysis_section_title: "БІЗ СІЗДІҢ ПІКІРІҢІЗДІ ҚАЛАЙ ҚОЛДАНАМЫЗ",
            hsqip_title: "Hilton қызмет көрсету сапасын жақсарту бағдарламасы",
            hsqip_desc: "Сапаны жақсарту бағдарламасы моделі, тәжірибе және бағалау негізіндегі салыстырмалы талдау.",
            comparison_header: "САЛЫСТЫРМАЛЫ ТАЛДАУ",
            comp_before: "ДЕЙІН",
            comp_before_sub: "0% деректер жинау",
            comp_after: "КЕЙІН",
            comp_after_sub: "Деректер жиналғаннан кейін",
            alert_empty: "Жібермес бұрын пікір қалдырыңыз.",
            btn_submitting: "ЖІБЕРІЛУДЕ...",
            btn_thank_you: "ПІКІРІҢІЗГЕ РАҚМЕТ!"
        }
    };

    let currentLang = 'EN';

    function updateLanguage(lang) {
        currentLang = lang;
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
        placeholders.forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });
    }

    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateLanguage(btn.textContent.trim());
        });
    });

    // --- Original Logic (Modified for i18n) ---
    // Star Rating Logic
    const ratingContainers = document.querySelectorAll('.star-rating');
    
    ratingContainers.forEach(container => {
        const stars = container.querySelectorAll('.star');
        
        stars.forEach(star => {
            star.addEventListener('mouseover', () => {
                const value = parseInt(star.getAttribute('data-value'));
                highlightStars(stars, value);
            });
            
            star.addEventListener('mouseout', () => {
                const selectedValue = parseInt(container.getAttribute('data-selected') || 0);
                highlightStars(stars, selectedValue);
            });
            
            star.addEventListener('click', () => {
                const value = parseInt(star.getAttribute('data-value'));
                container.setAttribute('data-selected', value);
                highlightStars(stars, value);
                
                // Native-like feedback animation
                star.style.transform = 'scale(1.5)';
                setTimeout(() => star.style.transform = '', 200);
            });
        });
    });

    function highlightStars(stars, value) {
        stars.forEach(s => {
            const starValue = parseInt(s.getAttribute('data-value'));
            if (starValue <= value) {
                s.classList.add('active');
                s.style.color = 'var(--primary-blue)';
            } else {
                s.classList.remove('active');
                s.style.color = '#DDD';
            }
        });
    }

    // Form Submission
    const submitBtn = document.getElementById('submit-feedback');
    const textarea = document.getElementById('comment');

    submitBtn.addEventListener('click', () => {
        const ratings = {};
        ratingContainers.forEach(c => {
            const category = c.closest('.rating-card').dataset.category;
            ratings[category] = c.getAttribute('data-selected') || 0;
        });

        const comment = textarea.value;

        if (Object.values(ratings).every(v => v === 0) && !comment) {
            alert(translations[currentLang].alert_empty);
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = translations[currentLang].btn_submitting;

        const feedbackData = {
            ratings: ratings,
            comment: comment,
            date: new Date().toLocaleString()
        };
        
        // Save to Supabase if configured
        if (supabaseClient) {
            supabaseClient
                .from('hotel_feedback')
                .insert([feedbackData])
                .then(({ error }) => {
                    if (error) console.error('Supabase Error:', error);
                });
        }

        // Always save to localStorage as fallback/backup
        const existingFeedback = JSON.parse(localStorage.getItem('hotel_feedback') || '[]');
        existingFeedback.push({ ...feedbackData, id: Date.now() });
        localStorage.setItem('hotel_feedback', JSON.stringify(existingFeedback));

        // Simulate API call
        setTimeout(() => {
            submitBtn.style.background = 'var(--accent-green)';
            submitBtn.textContent = translations[currentLang].btn_thank_you;
            
            // Update the sidebar summary immediately
            updateSummarySidebar();

            // Clear form
            textarea.value = '';
            ratingContainers.forEach(c => {
                c.removeAttribute('data-selected');
                highlightStars(c.querySelectorAll('.star'), 0);
            });

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                submitBtn.textContent = translations[currentLang].btn_submit;
            }, 3000);
        }, 1500);
    });

    function updateSummarySidebar() {
        const feedback = JSON.parse(localStorage.getItem('hotel_feedback') || '[]');
        if (feedback.length === 0) return;

        const categories = {
            'staff': 'summary-staff',
            'breakfast': 'summary-breakfast',
            'cleanliness': 'summary-breakfast-quality', // Mapping cleanliness to breakfast-quality for demo if needed, or adjust
            'comfort': 'summary-comfort'
        };

        Object.entries(categories).forEach(([cat, elementId]) => {
            const sum = feedback.reduce((acc, item) => acc + parseInt(item.ratings[cat] || 0), 0);
            const avg = Math.round(sum / feedback.length);
            
            const el = document.getElementById(elementId);
            if (el) {
                let starsString = '';
                for (let i = 1; i <= 5; i++) {
                    starsString += (i <= avg) ? '★' : '☆';
                }
                el.textContent = starsString;
            }
        });
    }

    // Call on load
    updateSummarySidebar();

    // Simple scroll animation for cards
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.rating-card, .info-badge, .comparison-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});
