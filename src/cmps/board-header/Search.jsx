import { useState } from 'react';

export function Search({ onSetFilterBy }) {
    const [searchText, setSearchText] = useState('');

    // הפונקציה שתעדכן את הטקסט ותריץ את הפילטרים בזמן כתיבה
    function handleSearchChange(event) {
        const value = event.target.value;
        setSearchText(value);
        onSetFilterBy({ txt: value });  // שולח את הטקסט למקום שמטפל בו
    }

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={handleSearchChange}
            />
        </div>
    );
}
