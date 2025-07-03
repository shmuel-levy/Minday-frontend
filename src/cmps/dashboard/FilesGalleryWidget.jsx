import React, { useState } from 'react';
import { AttachmentIcon } from '../svg/AttachmentIcon';

export function FilesGalleryWidget({ board }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  if (!board || !board.groups) {
    return (
      <div className="files-gallery-widget">
        <div className="files-gallery-empty">
          <div className="empty-icon">
            <AttachmentIcon />
          </div>
          <h3>No files yet</h3>
          <p>Upload files to share with your team</p>
        </div>
      </div>
    );
  }

  // Collect all files from all tasks in the board
  const allFiles = [];
  board.groups.forEach(group => {
    group.tasks.forEach(task => {
      if (task.files && task.files.length > 0) {
        task.files.forEach(file => {
          allFiles.push({
            ...file,
            taskTitle: task.title,
            groupTitle: group.title,
            taskId: task.id,
            groupId: group.id
          });
        });
      }
    });
  });

  const totalFiles = allFiles.length;
  const imageFiles = allFiles.filter(file => isImageFile(file));
  const otherFiles = allFiles.filter(file => !isImageFile(file));

  function isImageFile(file) {
    if (file.type && file.type.startsWith('image')) return true;
    if (file.url) {
      return /\.(png|jpe?g|gif|webp|svg|bmp|tiff)$/i.test(file.url);
    }
    return false;
  }

  function getFileIcon(file) {
    if (isImageFile(file)) {
      return (
        <div className="file-icon image-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21,15 16,10 5,21"/>
          </svg>
        </div>
      );
    }

    if (file.type === 'link') {
      return (
        <div className="file-icon link-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
        </div>
      );
    }

    return (
      <div className="file-icon document-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
      </div>
    );
  }

  function formatFileSize(bytes) {
    if (!bytes) return '';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  }

  function handleFileClick(file) {
    if (isImageFile(file)) {
      setSelectedFile(file);
      setIsPreviewOpen(true);
    } else {
      window.open(file.url, '_blank');
    }
  }

  function closePreview() {
    setIsPreviewOpen(false);
    setSelectedFile(null);
  }

  return (
    <div className="files-gallery-widget">
      <div className="files-gallery-header">
        <div className="files-stats">
          <div className="total-files">{totalFiles}</div>
          <div className="files-label">files</div>
        </div>
        <div className="files-breakdown">
          {imageFiles.length > 0 && (
            <div className="file-type-count">
              <span className="count">{imageFiles.length}</span>
              <span className="label">images</span>
            </div>
          )}
          {otherFiles.length > 0 && (
            <div className="file-type-count">
              <span className="count">{otherFiles.length}</span>
              <span className="label">documents</span>
            </div>
          )}
        </div>
      </div>

      {totalFiles === 0 ? (
        <div className="files-gallery-empty">
          <div className="empty-icon">
            <AttachmentIcon />
          </div>
          <h3>No files yet</h3>
          <p>Upload files to share with your team</p>
        </div>
      ) : (
        <div className="files-gallery-grid">
          {allFiles.slice(0, 12).map((file, index) => (
            <div 
              key={file.id || file._id || index} 
              className="file-card"
              onClick={() => handleFileClick(file)}
            >
              {isImageFile(file) ? (
                <div className="file-thumbnail">
                  <img src={file.url} alt={file.name} />
                </div>
              ) : (
                <div className="file-preview">
                  {getFileIcon(file)}
                </div>
              )}
              <div className="file-info">
                <div className="file-name" title={file.name}>
                  {file.name.length > 20 ? file.name.substring(0, 20) + '...' : file.name}
                </div>
                <div className="file-meta">
                  {file.size && <span className="file-size">{formatFileSize(file.size)}</span>}
                  {file.taskTitle && (
                    <span className="file-source" title={`From: ${file.taskTitle}`}>
                      📋 {file.taskTitle.length > 15 ? file.taskTitle.substring(0, 15) + '...' : file.taskTitle}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          {totalFiles > 12 && (
            <div className="more-files-indicator">
              <span>+{totalFiles - 12} more</span>
            </div>
          )}
        </div>
      )}

      {isPreviewOpen && selectedFile && (
        <div className="file-preview-modal" onClick={closePreview}>
          <div className="preview-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-preview" onClick={closePreview}>×</button>
            <img src={selectedFile.url} alt={selectedFile.name} />
            <div className="preview-info">
              <h3>{selectedFile.name}</h3>
              <p>From: {selectedFile.taskTitle}</p>
              {selectedFile.size && <p>Size: {formatFileSize(selectedFile.size)}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 