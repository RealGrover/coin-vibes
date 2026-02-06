// Coin Vibes - Simple JavaScript for interactivity

document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to demo items
    const demoItems = document.querySelectorAll('.demo-item');
    demoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(26, 26, 26, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'var(--coin-bg)';
            header.style.backdropFilter = 'none';
        }
    });

    // Add click effect to coins
    const coins = document.querySelectorAll('.coin');
    coins.forEach(coin => {
        coin.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'float 3s ease-in-out infinite';
            }, 10);
        });
    });

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero h2');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let index = 0;
        
        const typeWriter = () => {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after page load
        setTimeout(typeWriter, 500);
    }

    // Add parallax effect to hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add interactive coin grid
    const coinGrid = document.querySelector('.coin-grid');
    if (coinGrid) {
        coinGrid.addEventListener('click', function(e) {
            if (e.target.closest('.coin')) {
                const clickedCoin = e.target.closest('.coin');
                const amount = clickedCoin.dataset.amount;
                
                // Create a floating coin effect
                const floatingCoin = document.createElement('div');
                floatingCoin.className = 'floating-coin';
                floatingCoin.textContent = `${amount}¢`;
                floatingCoin.style.cssText = `
                    position: fixed;
                    top: ${e.clientY}px;
                    left: ${e.clientX}px;
                    font-size: 2rem;
                    font-weight: bold;
                    background: var(--gradient-1);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    pointer-events: none;
                    z-index: 1000;
                    animation: floatUp 2s ease-out forwards;
                `;
                
                document.body.appendChild(floatingCoin);
                
                setTimeout(() => {
                    if (floatingCoin.parentNode) {
                        floatingCoin.parentNode.removeChild(floatingCoin);
                    }
                }, 2000);
            }
        });
    }

    // Add CSS for floating coin animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translateY(-200px) scale(0.5);
                opacity: 0;
            }
        }
        
        .floating-coin {
            pointer-events: none;
            z-index: 10000;
        }
    `;
    document.head.appendChild(style);
});

// Function to copy text to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        // Show a temporary confirmation
        const toast = document.createElement('div');
        toast.textContent = 'Copied to clipboard!';
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--gradient-1);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 6px;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 2000);
    });
}

// Add copy functionality to buttons
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.ui-btn, .mobile-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const text = this.textContent;
            copyToClipboard(text);
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initCopyButtons);