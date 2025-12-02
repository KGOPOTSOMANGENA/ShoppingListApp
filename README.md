# Shopping List App

A **React Native Shopping List App** built with **TypeScript**, **Redux**, and **Expo**, allowing users to add, edit, delete, and mark items as purchased. The app also persists data using AsyncStorage.

---

## **Table of Contents**

* [Demo](#demo)
* [Features](#features)
* [Installation & Setup](#installation--setup)
* [Project Structure](#project-structure)
* [Usage Guide](#usage-guide)
* [Technologies Used](#technologies-used)
* [License](#license)

---

## **Demo**

![Welcome Screen](./assets/screenshot-welcome.png)
![Home Screen](./assets/screenshot-home.png)

---

## **Features**

* Add new items with name and quantity
* Edit existing items
* Delete items from the list
* Mark items as purchased
* Data persistence with AsyncStorage
* Clean and responsive UI

---

## **Installation & Setup**

### **Prerequisites**

* Node.js (v20.x or later)
* npm (v10.x or later)
* Expo CLI
* Expo Go app on a mobile device (optional for mobile testing)

### **Steps**

1. Clone the repository:

```bash
git clone <your-github-repo-url>
cd ShoppingListApp
```

2. Install dependencies:

```bash
npm install
```

3. Start the app:

* **For mobile (Expo Go)**

```bash
npx expo start
```

Scan the QR code with the Expo Go app.

* **For web**

```bash
npx expo start --web
```

---

## **Project Structure**

```
ShoppingListApp/
├─ App.tsx                # Main entry point
├─ assets/                # Images, icons
├─ src/
│  ├─ screens/            # WelcomeScreen, HomeScreen
│  ├─ components/         # ItemCard, EditItemModal, Button
│  ├─ redux/              # Store and reducers
│  ├─ types/              # TypeScript types
│  └─ utils/              # AsyncStorage helper
├─ package.json
├─ tsconfig.json
└─ README.md
```

---

## **Usage Guide**

### **Welcome Screen**

* Shows a welcome message and a "Start" button
* Tap **Start** to navigate to the shopping list

### **Home Screen**

* **Add Item**: Enter name and quantity, then tap Add
* **Edit Item**: Tap Edit button, modify details, then Save
* **Delete Item**: Tap Delete button
* **Mark as Purchased**: Tap checkbox to mark items

All data is saved automatically and persists between app sessions.

---

## **Technologies Used**

* **React Native** with **TypeScript**
* **Expo** for development and testing
* **Redux Toolkit** for state management
* **AsyncStorage** for data persistence
* **React Navigation Stack** for navigation

---

## **License**

This project is **open source** and available under the MIT License.

## 📱 Download the App

You can download the Android build here:

👉 **Google Drive Link:** https://drive.google.com/drive/folders/1TKXVDognyW8iydBdvdU-r0A8z6Se2SwM?usp=sharing  
👉 **Expo Build Link:** https://expo.dev/accounts/kgopotsomangena/projects/ShoppingListApp/builds/c96606e3-b047-4a91-983a-070c964939eb
