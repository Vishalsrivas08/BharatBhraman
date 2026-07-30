# 🌍 Bharat Bhraman

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

Welcome to **Bharat Bhraman**, a premier travel and hotel booking application. The app offers a seamless experience for finding stays, managing bookings, exploring new collections, and a robust Admin panel for property and user management.

## 🌟 Key Features

### For Travelers (Public)
- **Explore & Search**: Browse curated travel collections, view property details, and find the perfect stay.
- **Booking Management**: Seamlessly book properties, manage checkout, view booking details, and access order history.
- **Secure Payments**: Manage payment methods and process payments securely.
- **Profile & Rewards**: Personalize your travel preferences, track your rewards, and manage saved stays.
- **User Authentication**: Secure login and registration.

### For Administrators (Admin)
- **Dashboard**: Comprehensive overview of app activities.
- **Property Management**: Add, edit, and manage property listings across the platform.
- **User Management**: Oversee registered users, view analytics, and manage access.
- **Bookings & Reports**: View all bookings, manage booking statuses, and generate detailed reports.
- **Security & Support**: Maintain audit logs and handle support requests efficiently.

## 📱 Tech Stack

- **Framework**: React Native with [Expo](https://expo.dev/) (~54.0.36)
- **Language**: TypeScript
- **Navigation**: `@react-navigation/native-stack` & `@react-navigation/bottom-tabs`
- **UI Components**: Custom screens utilizing `expo-linear-gradient`, `react-native-safe-area-context`, and `@expo/vector-icons`
- **Date & Time**: `@react-native-community/datetimepicker`

## 📂 Project Structure

```
BharatBhraman/
├── src/
│   ├── components/      # Reusable UI components
│   ├── context/         # Auth and App state contexts
│   ├── screens/         
│   │   ├── admin/       # Admin-specific screens (Dashboard, Manage Properties, etc.)
│   │   ├── auth/        # Authentication screens (Login, Register)
│   │   └── public/      # User-facing screens (Explore, Bookings, Rewards, etc.)
│   └── navigation/      # Stack and Tab Navigators
├── App.tsx              # Application Entry Point
└── package.json         # Project dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or above recommended)
- npm or yarn
- [Expo Go](https://expo.dev/client) installed on your physical device, or an Android/iOS emulator setup.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vishalsrivas08/BharatBhraman.git
   cd BharatBhraman
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm start
   ```

### Running the App

After starting the Expo server, you can:
- **Scan the QR Code** with the Expo Go app on a physical Android/iOS device.
- Press `a` in the terminal to launch on an **Android Emulator**.
- Press `i` in the terminal to launch on an **iOS Simulator**.

## 📜 License

This project is proprietary and confidential. Unauthorized copying of this file, via any medium is strictly prohibited.
