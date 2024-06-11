import { useState, useEffect, useRef } from 'react';

const EditRecipeModal = ({ isOpen, onClose, recipe, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const modalRef = useRef(null);

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title);
      setDescription(recipe.description);
    }
    // eslint-disable-next-line
  }, [recipe]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.showModal();
    }
    // eslint-disable-next-line
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({...recipe, title, description});
    modalRef.current.close();
  };

  useEffect(() => {
    const closeOnEscapeKey = (e) => e.key === "Escape" ? onClose() : null;
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
    // eslint-disable-next-line
  }, [onClose]);

  return (
    <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle" onClose={onClose}>
      <div className="modal-box">
        <form onSubmit={handleSubmit}>
          <h3 className="font-bold text-lg">Edit Recipe</h3>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            className="textarea textarea-bordered w-full max-w-xs"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          ></textarea>
          <div className="modal-action">
            <button type="submit" className="btn">Save</button>
            <button type="button" className="btn" onClick={() => modalRef.current.close()}>Cancel</button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EditRecipeModal;
