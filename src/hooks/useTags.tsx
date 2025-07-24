'use client';

import { useState } from 'react';

export const useTags = (initialTags: string[]) => {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [newTag, setNewTag] = useState<string>('');

  const addTag = () => {
    if (newTag.trim() !== '' && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleNewTagChange = (value: string) => {
    setNewTag(value);
  };

  return { tags, newTag, addTag, removeTag, handleNewTagChange };
};
