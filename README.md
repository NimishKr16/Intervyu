# Intervyu
A functional React application that allows HR/Recruiters to schedule, manage, and view interviews efficiently.


## Technologies Used

- **React.js (v19)**: Frontend framework for building the UI.
- **FullCalendar**: Library for displaying and interacting with the interview schedule in a calendar view.
- **Tailwind-CSS**: Utility-first framework for styling the app and UI components.
- **React-Flowbite**: UI components for building the app (buttons, modals, forms, etc.).
- **React Toastify**: For displaying notifications (e.g., when a candidate is added).
- **React Context-API**: For managing global state (candidate & interviewer state/data).


## 🚀 Project Setup

### 🛠️ Prerequisites

#### Ensure you have the following installed on your machine:
	•	Node.js (v14 or higher) – Download Node.js
	•	npm or yarn – Package Managers

### 📥 1. Clone the Repository

```bash
git clone https://github.com/NimishKr16/Intervyu
```

```bash
cd intervyu
```

### 📦 2. Install Dependencies

```bash
npm install
```

### 💻 4. Run the Development Server

Start the development server locally:

```bash
npm start
```

## 🧠 Key Features

- ✅ **Interview Calendar**: Visualize all scheduled interviews on a calendar.
- ✅ **Time Slot Validation**: Prevent overlapping time slots for the same interviewer.
- ✅ **Editable Events**: Update candidate details, time slots, or interviewers dynamically.
- ✅ **Add Interviewers & Candidates**: Add new candidates and interviewers dynamically with their information
- ✅ **Real-time Feedback**: Immediate feedback on invalid or conflicting slots.
- ✅ **Custom Modal**: View detailed interview information upon event click.