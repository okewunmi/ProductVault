# ProductVault — React Native Expo App

A clean, production-ready mobile app that lets you manage up to 5 products with photos, names, and prices.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your phone (iOS or Android)

### Installation

```bash
# 1. Clone / extract the project
cd ProductVault

# 2. Install dependencies
npm install

# 3. Start the dev server
npx expo start
```

Scan the QR code with the **Expo Go** app on your device.

---

## 📁 Project Structure

```
ProductVault/
├── App.js                      # Root component
├── app.json                    # Expo configuration
├── package.json
├── babel.config.js
│
├── context/
│   └── ProductContext.js       # Global state (Context + useReducer)
│
├── navigation/
│   └── AppNavigator.js         # React Navigation stack
│
├── screens/
│   ├── HomeScreen.js           # Product list + progress bar
│   ├── AddProductScreen.js     # Add product form
│   └── ProductDetailScreen.js  # View / delete product
│
└── components/
    ├── theme.js                # Design tokens (colors, spacing)
    ├── ProductCard.js          # List item card
    ├── EmptyState.js           # Empty list placeholder
    └── LimitBanner.js          # 5/5 limit warning banner
```

---

## 🏗 Architecture

### State Management
Uses **React Context + useReducer** (no external state library needed):
- `ADD_PRODUCT` — adds a product, blocks if limit reached
- `DELETE_PRODUCT` — removes by ID, unlocks limit
- `UPDATE_PRODUCT` — edits in-place

### Notifications
Uses `expo-notifications` to fire an **immediate local push notification** when the 5-product limit is hit or a user tries to exceed it.

### Image Picker
Uses `expo-image-picker` — supports both camera and photo library, with square crop and quality compression.

---

## ✅ Features
- Add up to 5 products (name, photo, price, category)
- Visual capacity progress bar (green → yellow → red)
- Push notification on limit reached
- In-app limit banner
- Product detail view with delete confirmation
- Clean card-based UI with smooth navigation transitions
- Form validation with inline error messages
