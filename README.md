# React Movie Search and Rating App

This React application allows you to search for movies using the OMDB API, rate them, and track view time metrics for your watched movies.

Getting Started

1. Prerequisites:

Node.js and npm (or yarn) installed on your system. You can download them from <https://nodejs.org/en>

2. Clone the Repository:

```
Bash
git clone https://your-github-repo-url.git
```

Use code with caution.

3. Install Dependencies:

```Bash
cd your-project-directory
npm install
(or `yarn install`)
```

Use code with caution.

4. Obtain an OMDB API Key:

- Create a free account on <https://www.omdbapi.com/>
- Go to your account and generate an API key.

5. Create the API Key File:

- Create a new file named key.js in the root of your project directory.
- Add the following code to key.js, replacing YOUR_API_KEY with your actual key:
- 
```
export const KEY = 'YOUR_API_KEY';
```

Use code with caution.

1. Running the Application:

Start the development server:
```Bash
npm start
 (or `yarn start`)
 
Use code with caution.
 ```

2. The application will typically run on <http://localhost:3000/> in your web browser.
Using the Application:

- Enter a movie title in the search bar and press Enter or click the search button.
- The application will fetch movie information from the OMDB API and display it on the screen.
- You can rate a movie using the provided rating stars.
- Add a movie to your "Watched" list to track its view time.
- The application will display view time metrics for your watched movies.
