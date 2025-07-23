// Navbar Component Loader
class NavbarLoader {
    static async loadNavbar(containerId = 'navbar-container') {
        try {
            // Check if we're running on file:// protocol
            if (window.location.protocol === 'file:') {
                console.log('File protocol detected, using fallback navbar');
                this.createFallbackNavbar(containerId);
                return;
            }
            
            // Try multiple possible paths for the navbar component (for http/https only)
            const possiblePaths = [
                'components/navbar.html',
                './components/navbar.html',
                '../components/navbar.html'
            ];
            
            let response;
            let navbarHTML;
            
            for (const path of possiblePaths) {
                try {
                    response = await fetch(path);
                    if (response.ok) {
                        navbarHTML = await response.text();
                        break;
                    }
                } catch (err) {
                    console.log(`Failed to fetch from ${path}:`, err.message);
                    continue;
                }
            }
            
            if (!navbarHTML) {
                throw new Error('Failed to load navbar component from any path');
            }
            
            // Find the container element
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = navbarHTML;
            } else {
                // If no container specified, insert at the beginning of body
                document.body.insertAdjacentHTML('afterbegin', navbarHTML);
            }
            
            // Execute any scripts in the loaded HTML
            const scripts = container ? container.querySelectorAll('script') : document.querySelectorAll('nav script');
            scripts.forEach(script => {
                try {
                    // Create and execute the script
                    const scriptContent = script.textContent;
                    const newScript = document.createElement('script');
                    newScript.textContent = scriptContent;
                    document.head.appendChild(newScript);
                    script.remove();
                    
                    // Execute the script content directly to ensure functions are available
                    const scriptFunction = new Function(scriptContent);
                    scriptFunction();
                    
                } catch (error) {
                    console.error('Error executing navbar script:', error);
                }
            });
            
        } catch (error) {
            console.error('Error loading navbar:', error);
            // Fallback: create a basic navbar if loading fails
            this.createFallbackNavbar(containerId);
        }
    }
    
    static createFallbackNavbar(containerId) {
        const fallbackNavbar = `
            <nav class="navbar">
                <div class="nav-container">
                    <div class="nav-logo" id="nav-logo-container">
                        <i class="fas fa-brain"></i>
                        <span>Memorise</span>
                    </div>
                    <ul class="nav-menu">
                        <li><a href="#" id="home-link">Home E</a></li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle">
                                Elements <i class="fas fa-chevron-down"></i>
                            </a>
                            <div class="dropdown-menu">
                                <a href="elements.html">Memory Test</a>
                                <a href="periodic-table.html">Periodic Table</a>
                            </div>
                        </li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle">
                                Music <i class="fas fa-chevron-down"></i>
                            </a>
                            <div class="dropdown-menu">
                                <a href="musical-scales.html">Musical Scales Test</a>
                                <a href="scales-reference.html">Scales Reference</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        `;
        
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = fallbackNavbar;
        } else {
            document.body.insertAdjacentHTML('afterbegin', fallbackNavbar);
        }
        
        // Add full navbar functionality to fallback
        setTimeout(() => {
            this.initializeFallbackNavbar();
        }, 10);
    }
    
    static initializeFallbackNavbar() {
        // Configure navigation based on current page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const logoContainer = document.getElementById('nav-logo-container');
        const homeLink = document.getElementById('home-link');
        
        if (logoContainer && homeLink) {
            // Configure logo and home link based on current page
            if (currentPage === 'index.html' || currentPage === '') {
                // On index page: logo is just text, home link goes to #home
                logoContainer.innerHTML = '<i class="fas fa-brain"></i><span>Memorise</span>';
                homeLink.href = '#home';
            } else {
                // On other pages: logo is a link to index.html, home link goes to index.html
                logoContainer.innerHTML = '<a href="index.html" class="nav-logo"><i class="fas fa-brain"></i><span>Memorise</span></a>';
                homeLink.href = 'index.html';
            }
        }
        
        // Add dropdown functionality
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
            
            if (dropdownToggle) {
                dropdownToggle.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Close other dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                    
                    // Toggle current dropdown
                    dropdown.classList.toggle('active');
                });
            }
        });
        
        // Close all dropdowns when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.dropdown')) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
        
        // Close all dropdowns on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }
}

// Auto-load navbar when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Check if navbar should be auto-loaded (look for navbar-container or auto-load attribute)
    const navbarContainer = document.getElementById('navbar-container');
    const autoLoad = document.querySelector('[data-navbar-autoload]');
    
    if (navbarContainer || autoLoad) {
        NavbarLoader.loadNavbar();
    }
});
