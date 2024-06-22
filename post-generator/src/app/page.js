"use client"
import React, { useState } from 'react';
import styles from './page.module.css';
import { posteos } from './scripts/json.js';

export default function Home() {
  const [posts, setPosts] = useState([]);

  const handleLoadPosts = () => {
    setPosts(posteos);
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>Generador de Post</h1>
        <button onClick={handleLoadPosts}>Cargar Posts</button>
        {posts.length > 0 && (
          <div className={styles.posts}>
            {posts.map((post) => (
              <div className={styles.post} key={post.id}>
                <img src={post.permalink_url} alt={post.message || 'Imagen del post'} className={styles.image} />
                <p>
                  <a href={post.permalink_url} target="_blank" rel="noopener noreferrer">
                    {post.message || 'Ver post'}
                  </a>
                </p>
                <p>Fecha: {new Date(post.created_time).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>

  );
}