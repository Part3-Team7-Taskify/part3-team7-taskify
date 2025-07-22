// 'use client';
// import { FormValue } from '@/components/form/formTypes';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { useState } from 'react'

// const FormCompo = () => {

//   const handleSubmit
//   const handleTitleChange
//   const handleDescriptionChange
//   const handleAddTag
//   const handleDateChange
//   const handleImageChange
//   const handleNewTagChange
//   const onCancel
//   const handleImageChange

//   return (
//     <form onSubmit={handleSubmit}>

//       <div>
//         <label htmlFor="assigneeUserId">담당자</label>
//         <select id="assigneeUserId" value="">
//           <option>선택</option>
//           {members.map(()=>(<option key={member} value={member}>담당자들목록이나오겠지?{member}</option>))}
//         </select>
//       </div>

//       <div>
//         <label htmlFor="title">제목*</label>
//         <input type="text" id="title" value={title} onChange={handleTitleChange}/>
//       </div>

//       <div>
//         <label htmlFor="description">설명*</label>
//         <textarea id="description" value={description} onChange={handleDescriptionChange}} />
//       </div>

//       <div>
//         <label htmlFor="dueDate">마감일</label>
//         <DatePicker selected={dueDate} onChange={handleDateChange} dateFormat="yyyy-MM-dd"/>
//       </div>

//       <div>
//         <label>태그</label>
//         <div>
//           <input type="text" value={newTag} onChange={handleNewTagChange}/>
//           <button type="button" onClick={handleAddTag} onClick={handleAddTag}>추가</button>
//         </div>
//         <div>
//           {Tags.map(()=>(<span key={tag}>{tag}<button type="button" onClick={handleRemoveTag}>X</button></span>))}
//         </div>

//       <div>
//         <label htmlFor="image">이미지</label>
//         <input type="file" id={image} onChange={handleImageChange}/>
//         {image && (<img src={} alt="Upload"/>)}
//       </div>

//       <div>
//         <button onclick={onCancel}>취소</button>
//         <button type="submit">생성</button>
//       </div>

//       </div>
//     </form>
//   );
// };

// export default FormCompo;
