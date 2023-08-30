/* eslint-disable react/prop-types */


const File = ({ file }) => {
  const handleFileDoubleClick = () => {
    if (file.type === 'image') {
      // Show image preview
      const imagePreview = window.open('', '_blank');
      imagePreview.document.write(
        `<img src="${file.url}" alt="${file.name}" style="max-width: 100%;" />`
      );
    } else {
      // Initiate file download
      const downloadLink = document.createElement('a');
      downloadLink.href = file.url;
      downloadLink.target = '_blank';
      downloadLink.download = file.name;
      downloadLink.click();
    }
  };

  return (
    <div className="file" onDoubleClick={handleFileDoubleClick}>
      <div className="file-icon">
        <i className={`fas fa-${file.type === 'image' ? 'image' : 'file'}`}></i>
      </div>
      <div className="file-name">{file.name}</div>
      <div className="file-date">{file.date}</div>
      <div className="file-favorite">
        {file.favorite ? <i className="fas fa-star"></i> : null}
      </div>
    </div>
  );
};

export default File;
