 "use client"
// import React, { useState } from 'react';
// import styles from './page.module.css';
// import { graphAPI } from './scripts/facebook.js';

// export default function Home() {
//   const [posts, setPosts] = useState([]);

//   const handleLoadPosts = () => {
//     setPosts(graphAPI);
//   };

//   return (
//     <main className={styles.main}>
//       <div className={styles.description}>
//         <h1>Generador de Post</h1>
//         <button onClick={handleLoadPosts}>Cargar Posts</button>
//         {posts.length > 0 && (
//           <div className={styles.posts}>
//             {posts.map((post) => (
//               <div className={styles.post} key={post.id}>
//                 <img src={post.permalink_url} alt={post.message || 'Imagen del post'} className={styles.image} />
//                 <p>
//                   <a href={post.permalink_url} target="_blank" rel="noopener noreferrer">
//                     {post.message || 'Ver post'}
//                   </a>
//                 </p>
//                 <p>Fecha: {new Date(post.created_time).toLocaleDateString()}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </main>

//   );
// }
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const metaAPI = axios.create({
  baseURL: 'https://graph.facebook.com/v20.0/',
});

const getUserData = async (accessToken, fields) => {
  try {
    const response = await metaAPI.get('/me', {
      params: {
        access_token: accessToken,
        fields: fields.join(','),
      },
    });
    const userData = response.data;
    await fetchPosts(accessToken, userData.id);
    return userData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const fetchPosts = async (accessToken, userId) => {
  try {
    const response = await metaAPI.get(`/${userId}/feed`, {
      params: {
        access_token: accessToken,
      },
    });
    const posts = response.data.data;
    console.log(posts)
    return posts; // Return the posts array for display
  } catch (error) {
    console.error(error);
  }
};

const MyComponent = () => {
  const [userData, setUserData] = useState(null);
  const [accessToken, setAccessToken] = useState(''); // Replace with your actual access token

  useEffect(() => {
    if (accessToken) {
      getUserData(accessToken, ['id', 'name'])
        .then(data => setUserData(data))
        .catch(error => console.error(error));
    }
  }, [accessToken]);

  return (
    <div>
      <button onClick={() => setAccessToken('EAAMQ30J3R08BO0vpBe6AnZCFRqSZB3RrqaEZBYAd68c7a5RtAfp1MSGZBbkusrQAyjQLx4ZCANtZCqWUKmIfsBAuZCsF1dDpt3qUqY4Y6yccQYNgiSI41peuCwK2MoyAK6X8fZCStB6aGvjIhopqAk4WJIIAedi7tEKiZA4331ZCjNXRenessFAlVZA28mh6xd5bZB6ndxUBtdnW2BZACjJeIZCuy6BgZDZD')}>
        Obtener datos del usuario
      </button>
      {userData && (
        <div>
          <p>Nombre: {userData.name}</p>
          <p>ID: {userData.id}</p>
          <h2>Publicaciones:</h2>
          {userData.posts && userData.posts.map(post => (
            console.log(post),
            <div key={post.id}>
              <h3>{post.message}</h3>
              <p>Creado el: {post.created_time}</p>
              {/* You can display other post details here (e.g., story, id) */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyComponent;

