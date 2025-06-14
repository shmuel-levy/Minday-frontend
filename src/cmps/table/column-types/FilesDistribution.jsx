export function FilesDistribution({ filesCount }) {
    return (
        <div className="files-distribution">
            {filesCount > 0 ? (
                <>
                    <span>{filesCount}</span>
                    <span className="files-label">files</span>
                </>
            ) : (
                <span>-</span>
            )}
        </div>
    );
}