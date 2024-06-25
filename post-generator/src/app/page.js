'use client'
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
    const posts = await fetchPosts(accessToken, userData.id);
    return { ...userData, posts };
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
        fields: 'id,message,full_picture,permalink_url',
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const MyComponent = () => {
  const [pageData, setPageData] = useState(null);
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    if (accessToken) {
      getUserData(accessToken, ['id', 'name'])
        .then(data => setPageData(data))
        .catch(error => console.error(error));
    }
  }, [accessToken]);

  return (
    <div>
      <button onClick={() => setAccessToken('EAAMQ30J3R08BOyZBZAALziMaxZAjVnZCZBb7Ojf45F4iMhcPgYK9CGBZA10RgD1vHjhRaZBvNMn3q1OnaIW4fMDg5Tw29cfiftuwCq9mXfGl9zc418gzXLAslrIaUJInVMSSHFSK2NXwbC1kyzIW3ZBPHR2QYNpGGY775ubrqFhaq1bblZBUcX9Pq5AFaB7Pj4ZAqETaGZAwFEncU76wsY90RidoQZDZD')}>
        Obtener posts de la página
      </button>
      {pageData && (
        <div>
          <h2>Página: {pageData.name}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            {pageData.posts.map(post => (
              <div key={post.id} style={{ width: '300px', margin: '10px', border: '1px solid #ddd', padding: '10px' }}>
                {post.full_picture && (
                  <img src={post.full_picture} alt="Post" style={{ width: '100%', height: 'auto' }} />
                )}
                <p>{post.message || 'No hay mensaje'}</p>
                <a href={post.permalink_url} target="_blank" rel="noopener noreferrer">Ver en Facebook</a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyComponent;