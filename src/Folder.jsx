/* eslint-disable react/prop-types */
import  { useState } from 'react';
import File from './File';

const Folder = ({ folder }) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleFolderDoubleClick = () => {
    setIsOpened(!isOpened);
  };

  return (
    <div className="folder" onDoubleClick={handleFolderDoubleClick}>
      <div className="folder-icon">
        <i className="fas fa-folder"></i>
      </div>
      <div className="folder-name">{folder.name}</div>
      {isOpened && (
        <div className="folder-content">
          {folder.files.map(file => (
            <File key={file.id} file={file} />
          ))}
          {folder.subfolders.map(subfolder => (
            <Folder key={subfolder.id} folder={subfolder} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Folder;
