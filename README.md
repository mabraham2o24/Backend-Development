## Documentation

### 3rd Party API and Data Validation 

#### Connecting to MongoDB
<img width="636" height="262" alt="Screenshot 2025-11-10 151113" src="https://github.com/user-attachments/assets/b33c70a3-98e2-4301-bf4c-f23ca8012d8d" />

-------

#### Used Weather API - i edited out the API key for security reasons
<img width="1102" height="578" alt="Screenshot 2025-11-11 211339" src="https://github.com/user-attachments/assets/c181711f-0589-459c-bf3d-0831b6d65617" />

-------

#### MongoDB User
<img width="931" height="478" alt="Screenshot 2025-11-10 175207" src="https://github.com/user-attachments/assets/17658368-1187-4639-b83d-67aea9deed14" />

-------

#### Connecting to MongoDB and Saving Weather Data for Philadelphia 
<img width="558" height="425" alt="Screenshot 2025-11-10 175615" src="https://github.com/user-attachments/assets/c0be3d42-9ede-4ce0-8b52-f48f72dc8405" />

-------

#### Proof of Data Being Saved to MongoDB
<img width="1007" height="600" alt="Screenshot 2025-11-10 191612" src="https://github.com/user-attachments/assets/85b75c34-e4ae-46dd-b1eb-a0d26815f9ea" />

-------

#### Database Server Running on Local Host: 
<img width="580" height="343" alt="Screenshot 2025-11-10 233710" src="https://github.com/user-attachments/assets/f2eef208-9e0d-4fab-90d6-a7c4ec83642e" />

-------

#### Opened up Server:
<img width="478" height="186" alt="Screenshot 2025-11-10 234935" src="https://github.com/user-attachments/assets/5f1fc2fc-d893-4eaf-a05c-06529da82bdc" />

-------

#### Health of Server - Is Everything Running Okay? 
<img width="491" height="252" alt="Screenshot 2025-11-10 234952" src="https://github.com/user-attachments/assets/6e03b674-a21b-48a8-83c7-9985631f8545" />

-------

#### Weather Data for Philadelphia - Put a limit of 5 datasets so it looks cleaner and is not keep on repeating Philadelphia since we only have one data point
<img width="1904" height="362" alt="Screenshot 2025-11-10 235142" src="https://github.com/user-attachments/assets/e85809f2-a336-4335-bfdd-bb79ea000556" />

-------

### CRUD Operation Testing Using Postman

#### Get Method - Philadelphia
<img width="1737" height="852" alt="Screenshot 2025-11-11 000553" src="https://github.com/user-attachments/assets/2430f805-ff65-40e7-8992-f05bd0390e83" />

-------

#### Post Method
<img width="1737" height="885" alt="Screenshot 2025-11-11 000755" src="https://github.com/user-attachments/assets/4d59c3c0-9bf6-4ea2-9b41-d2950fe0e059" />

-------

#### Get Method - New York(after being added using POST method)
<img width="1721" height="883" alt="Screenshot 2025-11-11 001319" src="https://github.com/user-attachments/assets/01464e50-b21e-45ab-bd83-30295fb6656a" />

-------

#### Put Method 
<img width="1733" height="878" alt="Screenshot 2025-11-11 001531" src="https://github.com/user-attachments/assets/a7b32029-fb0b-4af1-951a-d488dfd939ae" />

-------

#### Delete Method
<img width="1734" height="585" alt="Screenshot 2025-11-11 001907" src="https://github.com/user-attachments/assets/109bf056-37b2-4da4-ad34-6963133def80" />

-------

### Swagger Documentation - Terminal Output SHowing It Running Properly 
<img width="450" height="147" alt="Screenshot 2025-11-11 003506" src="https://github.com/user-attachments/assets/d40d3480-fb88-4682-8fe4-3c6f424c854e" />

-------

### Swagger Document - http://localhost:3000/docs
<img width="1822" height="825" alt="Screenshot 2025-11-11 004116" src="https://github.com/user-attachments/assets/e038e6dc-4aaa-45e3-bfc4-34225d1e68c2" />

-------

### Using the Swagger Document - Testing Out the database/api 
<img width="1427" height="851" alt="Screenshot 2025-11-11 004400" src="https://github.com/user-attachments/assets/59902a53-c569-4405-88a7-a3abe1d6fa7c" />

-------

### Code Snippets and Explanations: 

#### 1. Package.JSON file - dependencies that needs to be installed for the project 
<img width="783" height="780" alt="image" src="https://github.com/user-attachments/assets/5360edc1-354e-4038-8875-769a889d83de" />

-------

#### 2. .env file - this consists of the api key and mongodb url and is stored in .gitignore so it does not get committed with the code. Everyone has their own .env file. 

-------

#### 3. Index.js under the src folder - connects to MongoDB, starts Express server, and sets up Swagger documentation 
<img width="692" height="146" alt="image" src="https://github.com/user-attachments/assets/4eeb5d9c-0961-4e08-9681-ce8176fd7a0b" />
<img width="570" height="128" alt="image" src="https://github.com/user-attachments/assets/2955fb82-4963-43d7-a2e6-6e55164735a6" />

-------

#### 4. App.js under src folder - sets up the routes
<img width="820" height="681" alt="image" src="https://github.com/user-attachments/assets/27e68e64-42b7-4f54-975b-fbd060940fb0" />

-------

#### 5. Weather.js under src folder - defines how the weather data should be displayed within the MongoDB
<img width="719" height="506" alt="image" src="https://github.com/user-attachments/assets/e8fec663-3ca7-49d7-8712-c357fbb38770" />

-------

#### 6. Validation.js under src folder - validates the incoming data before it is saved 
<img width="442" height="374" alt="image" src="https://github.com/user-attachments/assets/6c3022ce-ad2c-471e-8b1d-09b1c5fca4d1" />

-------

#### 7. weatherService.js under src folder - Calls the 3rd party API(weather app) and returns clean data that matches the defined schema
<img width="611" height="588" alt="image" src="https://github.com/user-attachments/assets/c02e7169-83b7-4e3c-a17d-1c1fe26bfdd7" />

-------

#### 8. weatherRoutes.js under the route folder which is under the src folder - this implements the CRUD operations: Create, Read, Update, Delete

<img width="415" height="128" alt="image" src="https://github.com/user-attachments/assets/cfd92212-0ead-46df-a33d-a9bf950c9eff" />
<img width="377" height="245" alt="image" src="https://github.com/user-attachments/assets/444020d8-4ba2-4606-8bb7-eb86ae6fbc88" />
<img width="502" height="512" alt="image" src="https://github.com/user-attachments/assets/e5bc156d-3d65-44be-899e-684b61923e54" />

-------

#### 9. Swagger.js under the src folder - Swagger setup 
<img width="714" height="377" alt="image" src="https://github.com/user-attachments/assets/ab97d1fd-a2eb-488f-9cc0-7961dfa27a0a" />

-------

#### 10. JSDoc blocks inside the weatherRoutes.js file - this is what sets up the /docs UI(Swagger). Swagger reads these comments to build the interactive UI. Under the "Code Testing" section I have added a screenshot of it being tested using the GET method - only added one snippet to avoid excessive screenshots
<img width="403" height="85" alt="image" src="https://github.com/user-attachments/assets/c39ea0f5-d418-4731-929e-0c794bd02d6e" />




