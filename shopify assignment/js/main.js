document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const thumbnailsContainer = document.querySelector('.thumbnails');
    const visibleThumbnails = window.innerWidth < 768 ? 4 : 5; // Number of visible thumbnails based on screen size

    // Product Variants Functionality
    const colorOptions = document.querySelectorAll('.color-option');
    const sizeOptions = document.querySelectorAll('.size-option');
    const selectedColorSpan = document.getElementById('selectedColor');
    const selectedSizeSpan = document.getElementById('selectedSize');
    const addToCartBtn = document.getElementById('addToCartBtn');

    // Function to update main image and thumbnails
    function updateProductImage(imageSrc, color) {
        // Update main image
        mainImage.src = imageSrc;
        
        // Update thumbnails
        thumbnails.forEach(thumb => {
            thumb.classList.remove('active');
            if (thumb.dataset.color === color) {
                thumb.classList.add('active');
            }
        });
    }

    // Color selection
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove selected class from all color options
            colorOptions.forEach(opt => opt.classList.remove('selected'));
            // Add selected class to clicked option
            option.classList.add('selected');
            // Update selected color display
            selectedColorSpan.textContent = option.dataset.color.charAt(0).toUpperCase() + 
                                          option.dataset.color.slice(1);
            // Update product image
            updateProductImage(option.dataset.image, option.dataset.color);
            // Update product state
            updateProductState();
        });
    });

    // Thumbnail click handler
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            const color = thumbnail.dataset.color;
            const imageSrc = thumbnail.dataset.image;
            
            // Update color selection
            colorOptions.forEach(opt => {
                opt.classList.remove('selected');
                if (opt.dataset.color === color) {
                    opt.classList.add('selected');
                    selectedColorSpan.textContent = opt.dataset.color.charAt(0).toUpperCase() + 
                                                  opt.dataset.color.slice(1);
                }
            });
            
            // Update main image
            updateProductImage(imageSrc, color);
            // Update product state
            updateProductState();
        });
    });

    // Size selection
    sizeOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove selected class from all size options
            sizeOptions.forEach(opt => opt.classList.remove('selected'));
            // Add selected class to clicked option
            option.classList.add('selected');
            // Update selected size display
            selectedSizeSpan.textContent = option.textContent;
            // Update product state
            updateProductState();
        });
    });

    // Update product state and enable/disable add to cart button
    function updateProductState() {
        const hasColor = document.querySelector('.color-option.selected');
        const hasSize = document.querySelector('.size-option.selected');
        const sizeMessage = document.getElementById('sizeSelectionMessage');
        
        // Show/hide size selection message
        if (!hasSize) {
            sizeMessage.classList.add('visible');
        } else {
            sizeMessage.classList.remove('visible');
        }
        
        // Enable add to cart button only if both color and size are selected
        addToCartBtn.disabled = !(hasColor && hasSize);
    }

    // Initialize product state
    updateProductState();

    // Add to cart button click handler
    addToCartBtn.addEventListener('click', () => {
        const selectedColor = selectedColorSpan.textContent;
        const selectedSize = selectedSizeSpan.textContent;
        
        // Here you would typically add the item to cart
        console.log(`Added to cart: ${selectedColor} / ${selectedSize}`);
        
        // Show success message (you can enhance this later)
        alert(`Added to cart: ${selectedColor} / ${selectedSize}`);
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        const newVisibleThumbnails = window.innerWidth < 768 ? 4 : 5;
        if (newVisibleThumbnails !== visibleThumbnails) {
            thumbnailsContainer.style.transform = 'translateX(0)';
        }
    });

    // Size Chart Modal Functionality
    const sizeChartBtn = document.getElementById('sizeChartBtn');
    const modal = document.getElementById('sizeChartModal');
    const modalClose = document.getElementById('modalClose');

    // Calculate scrollbar width
    function getScrollbarWidth() {
        return window.innerWidth - document.documentElement.clientWidth;
    }

    // Set scrollbar width as CSS variable
    document.documentElement.style.setProperty('--scrollbar-width', `${getScrollbarWidth()}px`);

    // Open modal
    sizeChartBtn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.classList.add('modal-open');
    });

    // Close modal functions
    function closeModal() {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    modalClose.addEventListener('click', closeModal);

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Compare Colors Modal Functionality
    const compareColorsBtn = document.getElementById('compareColorsBtn');
    const compareModal = document.getElementById('compareColorsModal');
    const compareModalClose = document.getElementById('compareModalClose');
    const compareImage1 = document.getElementById('compareImage1');
    const compareImage2 = document.getElementById('compareImage2');

    // Function to handle color selection in compare modal
    function handleCompareColorSelection(container, imageElement) {
        const colorOptions = container.querySelectorAll('.color-option');

        colorOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Remove selected class from all color options in this container
                colorOptions.forEach(opt => opt.classList.remove('selected'));
                // Add selected class to clicked option
                option.classList.add('selected');
                // Update main image
                imageElement.src = option.dataset.image;
            });
        });
    }

    // Initialize color selection for both compare items
    const compareItems = document.querySelectorAll('.compare-item');
    compareItems.forEach((item, index) => {
        handleCompareColorSelection(item, index === 0 ? compareImage1 : compareImage2);
    });

    // Open compare modal
    compareColorsBtn.addEventListener('click', () => {
        // Reset both sides to default gray color
        const defaultColor = 'gray';
        const defaultImage = 'assets/gray.png';
        
        // Reset first side
        const firstColorOptions = compareItems[0].querySelectorAll('.color-option');
        firstColorOptions.forEach(opt => {
            opt.classList.remove('selected');
            if (opt.dataset.color === defaultColor) {
                opt.classList.add('selected');
            }
        });
        compareImage1.src = defaultImage;

        // Reset second side
        const secondColorOptions = compareItems[1].querySelectorAll('.color-option');
        secondColorOptions.forEach(opt => {
            opt.classList.remove('selected');
            if (opt.dataset.color === defaultColor) {
                opt.classList.add('selected');
            }
        });
        compareImage2.src = defaultImage;

        // Open modal
        compareModal.classList.add('active');
        document.body.classList.add('modal-open');
    });

    // Close compare modal
    function closeCompareModal() {
        compareModal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    compareModalClose.addEventListener('click', closeCompareModal);

    // Close modal when clicking outside
    compareModal.addEventListener('click', (e) => {
        if (e.target === compareModal) {
            closeCompareModal();
        }
    });

    // Close modal with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && compareModal.classList.contains('active')) {
            closeCompareModal();
        }
    });

    // Product Info Tabs Functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    function switchTab(tabId) {
        // Remove active class from all buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to selected button
        const selectedButton = document.querySelector(`[data-tab="${tabId}"]`);
        selectedButton.classList.add('active');

        // On mobile, show all panels
        if (window.innerWidth <= 768) {
            tabPanels.forEach(panel => panel.classList.add('active'));
        } else {
            // On desktop, show only selected panel
            tabPanels.forEach(panel => panel.classList.remove('active'));
            const selectedPanel = document.getElementById(tabId);
            selectedPanel.classList.add('active');
        }
    }

    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;
            switchTab(tabId);
        });
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            tabPanels.forEach(panel => panel.classList.add('active'));
        } else {
            // Show only the active panel on desktop
            const activeTab = document.querySelector('.tab-btn.active');
            if (activeTab) {
                const tabId = activeTab.dataset.tab;
                tabPanels.forEach(panel => panel.classList.remove('active'));
                document.getElementById(tabId).classList.add('active');
            }
        }
    });

    // Initialize tabs based on screen size
    if (window.innerWidth <= 768) {
        tabPanels.forEach(panel => panel.classList.add('active'));
    }

    // Initialize zoom functionality
    function initZoom() {
        const mainImage = document.querySelector('.main-image');
        const mainImageContainer = document.querySelector('.main-image-container');
        
        mainImageContainer.addEventListener('mousemove', (e) => {
            const rect = mainImageContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = (x / rect.width) * 100;
            const yPercent = (y / rect.height) * 100;
            
            mainImage.style.transformOrigin = `${xPercent}% ${yPercent}%`;
        });
    }

    // Load saved selections from localStorage
    function loadSavedSelections() {
        const savedColor = localStorage.getItem('selectedColor');
        const savedSize = localStorage.getItem('selectedSize');
        
        if (savedColor) {
            const colorOption = document.querySelector(`.color-option[data-color="${savedColor}"]`);
            if (colorOption) {
                selectColor(colorOption);
            }
        }
        
        if (savedSize) {
            const sizeOption = document.querySelector(`.size-option:contains('${savedSize}')`);
            if (sizeOption) {
                selectSize(sizeOption);
            }
        }
    }

    // Save selections to localStorage
    function saveSelections() {
        const selectedColor = document.querySelector('.color-option.selected')?.dataset.color;
        const selectedSize = document.querySelector('.size-option.selected')?.textContent;
        
        if (selectedColor) {
            localStorage.setItem('selectedColor', selectedColor);
        }
        
        if (selectedSize) {
            localStorage.setItem('selectedSize', selectedSize);
        }
    }

    // Update color selection function
    function selectColor(colorOption) {
        document.querySelectorAll('.color-option').forEach(option => {
            option.classList.remove('selected');
        });
        colorOption.classList.add('selected');
        
        const mainImage = document.getElementById('mainImage');
        const selectedColor = colorOption.dataset.color;
        const imagePath = colorOption.dataset.image;
        
        mainImage.src = imagePath;
        document.getElementById('selectedColor').textContent = selectedColor;
        
        // Save to localStorage
        localStorage.setItem('selectedColor', selectedColor);
    }

    // Update size selection function
    function selectSize(sizeOption) {
        document.querySelectorAll('.size-option').forEach(option => {
            option.classList.remove('selected');
        });
        sizeOption.classList.add('selected');
        
        const selectedSize = sizeOption.textContent;
        document.getElementById('selectedSize').textContent = selectedSize;
        document.getElementById('sizeSelectionMessage').classList.remove('visible');
        document.getElementById('addToCartBtn').disabled = false;
        
        // Save to localStorage
        localStorage.setItem('selectedSize', selectedSize);
    }

    // Add micro-interactions
    function addMicroInteractions() {
        // Add hover effect to product cards
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            });
        });
        
        // Add smooth tab transitions
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.dataset.tab;
                const tabPanels = document.querySelectorAll('.tab-panel');
                
                tabPanels.forEach(panel => {
                    if (panel.id === targetTab) {
                        panel.style.opacity = '0';
                        setTimeout(() => {
                            panel.classList.add('active');
                            panel.style.opacity = '1';
                        }, 150);
                    } else {
                        panel.classList.remove('active');
                        panel.style.opacity = '0';
                    }
                });
            });
        });
    }

    // Initialize all features
    initZoom();
    loadSavedSelections();
    addMicroInteractions();
    
    // Add event listeners for color and size selection
    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', () => selectColor(option));
    });
    
    document.querySelectorAll('.size-option').forEach(option => {
        option.addEventListener('click', () => selectSize(option));
    });
}); 