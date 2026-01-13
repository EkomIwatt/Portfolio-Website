document.addEventListener('DOMContentLoaded', () => {
    
    // --- Initialize EmailJS ---
    // Make sure your User ID is correct here
    (function(){
        emailjs.init("bVE4OU2OXh9_4SfCN");
    })();

    // --- Mobile Menu Logic ---
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('close-menu-btn');
    const links = document.querySelectorAll('.mobile-link');

    // In script.js - Refined Toggle Logic
    function toggleMenu() {
        const isClosed = menu.classList.contains('translate-x-full');
    
        if (isClosed) {
            menu.classList.remove('translate-x-full');
            document.body.classList.add('overflow-hidden'); // Stop background scrolling
        } else {
            menu.classList.add('translate-x-full');
            document.body.classList.remove('overflow-hidden');
        }
    }

    if(btn) btn.addEventListener('click', toggleMenu);
    if(closeBtn) closeBtn.addEventListener('click', toggleMenu);
    
    links.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // --- Navbar Shadow Logic ---
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            nav.classList.add('shadow-lg');
        } else {
            nav.classList.remove('shadow-lg');
        }
    });

    // --- Scroll Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal, .reveal-right').forEach(el => {
        observer.observe(el);
    });

    // --- CONTACT FORM LOGIC ---

    // 1. Cache DOM elements
    const contactBtn = document.getElementById('contactBtn');
    const contactForm = document.getElementById('contactForm');
    const sendBtn = document.getElementById('sendBtn');
    const popupOverlay = document.getElementById('popupOverlay');
    const closePopup = document.getElementById('closePopup');
    const timeInput = document.getElementById('timeInput'); 

    // Helper: Close Popup Smoothly
    const closePopupSmoothly = () => {
        contactForm.classList.add('slide-down');
        setTimeout(() => {
            contactForm.classList.add('hidden');
            popupOverlay.classList.add('hidden');
            contactForm.classList.remove('slide-down');
        }, 300);
    };

    // Event Listeners for Opening/Closing
    if(contactBtn) {
        contactBtn.addEventListener('click', () => {
            contactForm.classList.remove('hidden');
            popupOverlay.classList.remove('hidden');
        });
    }

    if(closePopup) closePopup.addEventListener('click', closePopupSmoothly);

    if(popupOverlay) {
        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) {
                closePopupSmoothly();
            }
        });
    }

    // --- THE SEND BUTTON LOGIC ---
    if(sendBtn) {
        sendBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Stop page reload
            console.log("Send button clicked...");

            // 1. Capture Current Date & Time
            const now = new Date();
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
            };
            
            if(timeInput) {
                timeInput.value = now.toLocaleDateString('en-US', options);
            }

            // 2. Change Button Text (Feedback)
            const originalBtnContent = sendBtn.innerHTML;
            sendBtn.textContent = "Sending...";

            // 3. Send via EmailJS
            console.log("Attempting to send email...");
            
            // NOTE: Ensure these IDs match your EmailJS Dashboard exactly
            emailjs.sendForm('service_ah7qnm9', 'template_5droz1e', '#contactForm')
                .then(() => {
                    console.log("SUCCESS!");
                    
                    // Success UI Updates
                    closePopupSmoothly();
                    contactForm.reset(); 

                    // Update Main CTA Button
                    if(contactBtn) {
                        contactBtn.textContent = "Sent"; 
                        contactBtn.classList.add('flashing');

                        setTimeout(() => {
                            contactBtn.textContent = "I'll be in Touch Soon";
                            contactBtn.classList.remove('flashing');
                        }, 2000);

                        setTimeout(() => {
                            contactBtn.textContent = "Get in Touch";
                        }, 5000);
                    }

                    // Restore inner form button
                    sendBtn.innerHTML = originalBtnContent;

                }, (error) => {
                    console.error("FAILED...", error);
                    alert("Failed to send. Check console for details.");
                    
                    // Reset button text
                    setTimeout(() => {
                        sendBtn.innerHTML = originalBtnContent;
                    }, 2000);
                });
        });
    }
});