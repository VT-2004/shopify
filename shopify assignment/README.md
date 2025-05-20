# Shopify Product Page Implementation

A responsive product page implementation. Built with vanilla HTML, CSS, and JavaScript.

## 🌟 Features

### Core Features
1. **Scrollable Product Images Gallery**
   - Main image area with thumbnails
   - Click-to-update functionality
   - Scrollable thumbnails for multiple images

2. **Size Chart with Modal**
   - Interactive size chart button
   - Accessible modal popup
   - Multiple close options (button, ESC key, overlay click)

3. **Product Variants**
   - Color variations with visual swatches
   - Size variations with button selection
   - Real-time product state updates

4. **Compare Colors Feature**
   - Side-by-side color comparison
   - Interactive color selection
   - Modal-based comparison view

5. **Pair Well With Section**
   - Horizontal scrollable product recommendations
   - Product cards with images, titles, and prices
   - Add to cart functionality

6. **Product Bundle Suggestion**
   - Combined product recommendations
   - Individual and total pricing
   - Bundle add to cart option

7. **Product Info Tabs**
   - Description tab
   - Product Information tab
   - Shipping Details tab
   - Responsive tab layout

8. **Related Products Section**
   - Grid layout of related items
   - Product cards with badges
   - Responsive design

### Bonus Features
- Image zoom on hover for main product image
- Persistent color/size selection using localStorage
- Micro-interactions and smooth transitions
- Enhanced hover effects and animations

## 🛠️ Technical Details

### Technologies Used
- HTML5
- CSS3 (with Flexbox and Grid)
- Vanilla JavaScript (ES6+)
- No external libraries or frameworks

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Responsive Design
- Mobile-first approach
- Breakpoints:
  - Mobile: < 480px
  - Tablet: 481px - 768px
  - Desktop: > 768px

## 📦 Project Structure
```
shopify-assignment/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   ├── gray.png
│   ├── black.png
│   ├── red.png
│   ├── purple.png
│   ├── yellow.png
│   └── [other product images]
└── README.md
```

## 🚀 Getting Started

### Local Development
1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```
   OR
   Extract the ZIP file

2. Open the project folder:
   ```bash
   cd shopify-assignment
   ```

3. Open `index.html` in your browser:
   - Double-click the file
   - OR use a local server (recommended):
     ```bash
     python -m http.server 8000
     ```

4. Access the site:
   - If using a local server: `http://localhost:8000`
   - If opening directly: `file:///path/to/index.html`


## 💡 Features in Detail

### Image Gallery
- Smooth scrolling thumbnails
- Touch-friendly on mobile devices
- Responsive image sizing

### Color Selection
- Visual color swatches
- Persistent selection
- Real-time image updates

### Size Selection
- Interactive size buttons
- Size chart integration
- Validation for add to cart

### Product Information
- Tabbed interface
- Responsive layout
- Smooth transitions