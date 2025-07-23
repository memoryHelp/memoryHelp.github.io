# Navbar Component

This directory contains reusable components for the Memorise website.

## Files

- `navbar.html` - The main navigation bar component
- `navbar-loader.js` - JavaScript utility to load the navbar component

## Usage

### Method 1: Auto-load (Recommended)

Add the `data-navbar-autoload` attribute to the `<body>` tag and include the navbar loader script:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Your Page</title>
    <link rel="stylesheet" href="css/styles.css">
    <script src="js/navbar-loader.js"></script>
</head>
<body data-navbar-autoload>
    <!-- Navbar will be automatically loaded here -->
    
    <!-- Your page content -->
</body>
</html>
```

### Method 2: Manual container

Create a specific container for the navbar and include the loader script:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Your Page</title>
    <link rel="stylesheet" href="css/styles.css">
    <script src="js/navbar-loader.js"></script>
</head>
<body>
    <!-- Navbar will be loaded into this container -->
    <div id="navbar-container"></div>
    
    <!-- Your page content -->
</body>
</html>
```

### Method 3: Programmatic loading

Load the navbar programmatically using JavaScript:

```javascript
// Load navbar into default location
NavbarLoader.loadNavbar();

// Load navbar into specific container
NavbarLoader.loadNavbar('my-navbar-container');
```

## Features

- **Responsive Design**: The navbar adapts to different screen sizes
- **Dropdown Navigation**: Elements section contains Memory Test and Periodic Table
- **Smart Configuration**: Automatically adjusts logo and home link behavior based on current page
- **Fallback Support**: Provides a basic navbar if component loading fails
- **Cross-page Consistency**: Ensures consistent navigation across all pages

## Page-specific Behavior

- **index.html**: Logo is text only, Home link goes to `#home`
- **Other pages**: Logo links to `index.html`, Home link goes to `index.html`

## File Structure

```
main/
├── components/
│   └── navbar.html
├── js/
│   └── navbar-loader.js
├── css/
│   └── styles.css (contains navbar styles)
├── index.html
├── elements.html
└── periodic-table.html
```

## Dependencies

- Font Awesome (for icons)
- `css/styles.css` (for navbar styling)
- Modern browser with ES6 support (for async/await)
