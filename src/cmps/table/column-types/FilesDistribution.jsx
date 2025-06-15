export function FilesDistribution({ tasks }) {
    const totalFiles = tasks.reduce((sum, task) => sum + (task.files?.length || 0), 0);

    return (
        <div className="files-summary">
            <div className="files-count">{totalFiles}</div>
            <div className="files-label">files</div>
        </div>
    );
}