import { useState, useEffect } from 'react';
import axios from 'axios';
import Folder from './Folder';
import File from './File';

const FileManager = () => {
  const [fileStructure, setFileStructure] = useState([]);

  useEffect(() => {

    axios
      .get('http://3wdz.c.time4vps.cloud:3000/' )
      .then((response) => {
        setFileStructure(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="file-manager">
      {fileStructure.map((item) =>
        item.type === 'folder' ? (
          <Folder key={item.id} folder={item} />
        ) : (
          <File key={item.id} file={item} />
        )
      )}
    </div>
  );
};

export default FileManager;
