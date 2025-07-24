'use client';

import { useState } from 'react';

export const useTags = (initialTags: string[]) => {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [newTag, setNewTag] = useState<string>('');

  const addTag = () => {
    const trimmedTag = newTag.trim();
    if (trimmedTag !== '' && !tags.includes(trimmedTag)) {
      setTags((prevTags) => [...prevTags, trimmedTag]);
    }
    setNewTag('');
  };

  const removeTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleNewTagChange = (value: string) => {
    setNewTag(value);
  };

  return { tags, newTag, addTag, removeTag, handleNewTagChange };
};
