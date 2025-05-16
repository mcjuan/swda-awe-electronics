React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

js
export default tseslint.config({
extends: [
// Remove ...tseslint.configs.recommended and replace with this
...tseslint.configs.recommendedTypeChecked,
// Alternatively, use this for stricter rules
...tseslint.configs.strictTypeChecked,
// Optionally, add this for stylistic rules
...tseslint.configs.stylisticTypeChecked,
],
languageOptions: {
// other options...
parserOptions: {
project: ['./tsconfig.node.json', './tsconfig.app.json'],
tsconfigRootDir: import.meta.dirname,
},
},
})

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
plugins: {
// Add the react-x and react-dom plugins
'react-x': reactX,
'react-dom': reactDom,
},
rules: {
// other rules...
// Enable its recommended typescript rules
...reactX.configs['recommended-typescript'].rules,
...reactDom.configs.recommended.rules,
},
})

Project Update - Ankit

Core Architectural Additions:

- Folder Structure Enhancements: Established pages, components/features, services, types, and context directories for better organization.
- Routing: Implemented basic page routing using react-router-dom in App.tsx and main.tsx.
- Shadcn UI Integration: Added specific UI components (button, input, label, card, select) using npx shadcn@latest add.

Implemented Pages & Components:

- HomePage (/):
  - Fetches and displays a list of products from a mock service.
  - Uses the ProductCard component for rendering.
- ProductCard (src/components/features/product/ProductCard.tsx):
  - Reusable component to display product summary (image, name, description, price, stock status).
  - Handles missing product images with a local fallback (public/images/noImageAvailable.jpeg).
  - Clickable, navigating to the respective product detail page.
- ProductDetailPage (/product/:productId):
  - Fetches and displays detailed information for a single product using its ID.
  - Handles image display with local fallback.
- LoginPage (/login):
  - UI built with Shadcn Card, Input, Label, Button.
  - Implements mock login functionality using AuthContext and authService.
  - Handles form submission, displays errors, and navigates on success.
- RegisterPage (/register):
  - UI built with Shadcn Card, Input, Label, Button, Select (for role).
  - Implements mock user registration using AuthContext and authService.
  - Includes basic password confirmation and validation.
- Header Component (Header.tsx):
  - Updated with navigation links (Home, Cart, Login/Register or Profile/Logout).
  - Navigation links are dynamic based on user authentication state from AuthContext.
- Placeholder Pages Created:
  - CartPage.tsx
  - ProfilePage.tsx

Data Structures & Mock Services:

- Type Definitions (src/types):
  - product.ts: Defined Product interface with core attributes.
  - user.ts: Defined Account, Customer, Administrator, and UserRole types.
- Mock Services (src/services):
  - productService.ts:
    - Implements WorkspaceProducts and WorkspaceProductById (mocked with setTimeout).
    - Contains initializeDummyProducts function with sample product data, including local image fallback logic.
  - authService.ts:
    - Implements mock registerUser, loginUser, logoutUser.
    - Manages an in-memory mockUserDatabase for registered users (no actual password storage).
- State Management (src/context):
  - AuthContext.tsx:
    - Provides currentUser state globally.
    - Exposes login, register, logout functions that interact with authService.
    - Manages isLoading state for auth operations.
    - Persists currentUser to localStorage to maintain session across page reloads.
    - AuthProvider wraps the application in main.tsx.

Key Functionalities Added by Ankit:

- Display system for product listings and detailed product views using mock data.
- Complete (mocked) user authentication flow:
  - User registration with role selection.
  - User login.
  - User logout.
  - Persistent user session using localStorage via AuthContext.
- Dynamic header navigation that changes based on whether a user is logged in.
- Clickable product cards navigating to detail pages with dynamic routing.
- Basic form handling and error display for login and registration.
