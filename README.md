# Time Tracker - Getting Started

## Introduction

This React Native app is designed to help students track their study time and enhance focus. Built with **Expo** and **React Native**, it offers a user-friendly interface and features such as task tracking, time logging, and notifications. This README provides steps to get started with the app, preview it on a device, and set up your development environment.

## Prerequisites

Before creating and running the React Native project, you need to have a few dependencies set up on your machine.

### 1. Install Node.js

To get started with React Native development, ensure that **Node.js** is installed on your system.

- Download the latest **LTS version** from [nodejs.org](https://nodejs.org/).
- Node.js is a JavaScript runtime necessary for running commands like `npx create-expo` and is used by Expo to build and serve your React Native app.

## Getting Started

### 2. Install Dependencies

Once Node.js is installed, you’ll need to install the required dependencies for the project. Use the following command to install them:

```bash
npm install
The necessary dependencies include:

"dependencies": {
    "@expo/vector-icons": "^14.0.3",
    "@react-native-community/datetimepicker": "^8.2.0",
    "@react-navigation/bottom-tabs": "~6.6.1",
    "@react-navigation/native": "^6.1.18",
    "@react-navigation/native-stack": "^6.11.0",
    "expo": "~51.0.28",
    "expo-status-bar": "~1.12.1",
    "react": "18.2.0",
    "react-native": "0.74.5",
    "react-native-gesture-handler": "~2.16.1",
    "react-native-reanimated": "~3.10.1",
    "react-native-safe-area-context": "^4.10.5",
    "react-native-screens": "^3.31.1"
}

### 3. Previewing Your React Native App
To preview your app on a real device (iPhone or Android), follow these steps:

Download the Expo Go app:
For iPhone or Android, search for the Expo Go app in the App Store or Google Play Store and download it.
This app allows you to preview and test your Expo-based React Native apps on your device.
Start the Development Server:
Open the terminal (either integrated in VS Code or your system terminal).
Run the following command to start the Expo Development Server, which watches for code changes and builds your app:
npm start
This will open a browser window and display a QR code.
Scan the QR Code:
On Android: Use the Expo Go app to scan the QR code directly in the app (use the barcode scanner button).
On iPhone: Use your camera to scan the QR code. Once scanned, tap Open to launch the Expo Go app.

