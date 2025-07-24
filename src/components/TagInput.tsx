interface TagInputProps {
  tags: string[];
  newTag: string;
  handleNewTagChange: (value: string) => void;
  handleAddTag: () => void;
  handleRemoveTag: (tag: string) => void;
}

const TagInput: React.FC<TagInputProps> = ({
  tags,
  newTag,
  handleNewTagChange,
  handleAddTag,
  handleRemoveTag,
}) => (
  <div>
    <div>
      <input
        type='text'
        value={newTag}
        onChange={(e) => handleNewTagChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag();
          }
        }}
      />
      <button type='button' onClick={handleAddTag}>
        추가
      </button>
    </div>

    <div>
      {tags.map((tag) => (
        <span key={tag}>
          {tag}
          <button type='button' onClick={() => handleRemoveTag(tag)}>
            X
          </button>
        </span>
      ))}
    </div>
  </div>
);

export default TagInput;
export type { TagInputProps };
