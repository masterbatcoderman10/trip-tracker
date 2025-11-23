# Design Guide: Vehicle Trip Tracker

## 1. Screen List
1.  **Auth Screen** (Login/Signup)
2.  **Dashboard** (Home)
3.  **Active Trip Screen** (In-progress state)
4.  **Trip Entry/Edit Screen** (Start/End forms)
5.  **Trip History** (List view)
6.  **Analytics Dashboard**
7.  **Vehicle Management** (List & Form)
8.  **Toll Rate Management**
9.  **Trip Details** (Read-only view)
10. **Settings**

## 2. Screen Layouts (Wireframes)

### 2.1 Auth Screen
```
+----------------------+
|      [ Logo ]        |
|                      |
|   Welcome Back       |
|                      |
| [ Email Input      ] |
| [ Password Input   ] |
|                      |
| [   Login Button   ] |
|                      |
|  Or sign up with...  |
| [ Google ] [ Apple ] |
+----------------------+
```

### 2.2 Dashboard (Home)
![Dashboard Mockup](assets/dashboard.png)

*Mobile Layout (Vertical Stack)*
```
+----------------------+
| [Menu]  Home  [User] |
+----------------------+
| [ <  Swipeable   > ] | <--- Vehicle Card (Swipe L/R)
| [ Toyota Camry '23 ] |      (Left Aligned)
| [ Odo: 12,500 km   ] |
| [ Fuel: 450 km left] |
|                      |
|                      |
+----------------------+
| Recent Trips         | <--- Explicit Title
| [ Oct 24: 12km     ] |
| [ Oct 23: 45km     ] |
| [ Oct 22:  8km     ] |
+----------------------+
| [Home] [Trips]  ( + )  [Set] | <--- Bottom Navigation (Round Start Button in Center)
+----------------------+
```

### 2.3 Active Trip Screen
![Active Trip Mockup](assets/active_trip.png)

*Displays when a trip is currently in progress.*
+----------------------+
|      TRIP ACTIVE     |
+----------------------+
|   Started: 08:30 AM  |
|   Duration: 00:45:12 | <--- Ticking timer
+----------------------+
| Start Odo: 12,500    |
| Start Fuel: 85%      |
+----------------------+
|                      |
| [   END TRIP     ]   | <--- Large Red/Primary Button
|                      |
+----------------------+
| [ Cancel Trip ]      |
+----------------------+
```

### 2.4 Start Trip Screen
![Start Trip Mockup](assets/start_trip.png)

*First half of the trip session.*
```
+----------------------+
| < Back    Start Trip |
+----------------------+
| [   Camera Preview ] | <--- Carousel if multiple
| [  Capture Button  ] |
+----------------------+
| AI Scanned Data:     |
| Odometer: [ 12545  ] |
| Fuel:     [ 405 km ] |
+----------------------+
| [   Start Trip     ] |
+----------------------+
```

### 2.5 End Trip Screen
![End Trip Mockup](assets/end_trip.png)

*Second half of the trip session.*
```
+----------------------+
| < Back    End Trip   |
+----------------------+
| [   Camera Preview ] | <--- Carousel if multiple
| [  Capture Button  ] |
+----------------------+
| AI Scanned Data:     |
| Odometer: [ 12590  ] |
| Fuel:     [ 360 km ] |
+----------------------+
| Tolls Used? (o) Yes  |
| Count:  [ -  2  +  ] |
+----------------------+
| [   Complete Trip  ] |
+----------------------+
```

### 2.6 Analytics Dashboard
![Analytics Mockup](assets/analytics.png)

```
+----------------------+
| <      Analytics     |
+----------------------+
| [ Month v ] [ Car v] |
+----------------------+
| Total Distance       |
|     1,240 km         |
| [   Bar Chart      ] |
| [   Bar Chart      ] |
+----------------------+
| Costs                |
| Fuel: $120  Toll: $15|
| [   Pie Chart      ] |
| [ Vehicle Card     ] |
| [ Photo            ] |
| [ Toyota Camry     ] |
| [ Edit ] [ Delete ]  |
+----------------------+
| [ Vehicle Card     ] |
| [ Photo            ] |
| [ Ford F-150       ] |
| [ Edit ] [ Delete ]  |
+----------------------+
```

### 2.8 Toll Rate Management
![Toll Setup Mockup](assets/toll_setup.png)

```
+----------------------+
| <    Toll Rates      |
+----------------------+
| [ + Add Rate       ] |
+----------------------+
| [ Standard Toll    ] |
| [ $5.00            ] |
| [ All Day          ] |
+----------------------+
| [ Peak Hour        ] |
| [ $8.00            ] |
| [ 07:00 - 09:00    ] |
+----------------------+
```

### 2.9 Trip Details (Completed)
```
+----------------------+
| <    Trip Details    |
+----------------------+
| [ Map Placeholder? ] |
+----------------------+
| 24 Oct, 2023         |
| 08:30 AM - 09:15 AM  |
+----------------------+
| Distance: 45 km      |
| Duration: 45m        |
| Cost:     $12.50     |
+----------------------+
| [ Start Photo ]      |
| [ End Photo   ]      |
+----------------------+
| [ Edit ]  [ Delete ] |
+----------------------+
```

### 2.10 Vehicle Form (Add/Edit)
```
+----------------------+
| <   Edit Vehicle     |
+----------------------+
| [ Upload Photo     ] |
+----------------------+
| Make:  [ Toyota    ] |
| Model: [ Camry     ] |
| Year:  [ 2023      ] |
| Nickname: [ Daily  ] |
+----------------------+
| Fuel Capacity:       |
| [ 50 ] [ Liters v ]  |
+----------------------+
| [x] Primary Vehicle  |
+----------------------+
| [    Save          ] |
+----------------------+
```

### 2.11 Settings
```
+----------------------+
|      Settings        |
+----------------------+
| Profile              |
| [ Name / Email     ] |
+----------------------+
| Preferences          |
| Units: [ km / mi ]   |
| Currency: [ $ ]      |
| Timezone: [ UTC+4 ]  |
+----------------------+
| Privacy              |
| Store Photos: [ON/OFF|
+----------------------+
| Toll Configuration   |
| [ Manage Rates >   ] |
+----------------------+
| [    Log Out       ] |
+----------------------+
```
