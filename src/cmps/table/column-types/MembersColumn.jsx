import { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'

export function MembersColumn({ value = [], onUpdate }) {
    const allUsers = useSelector(state => state.userModule?.users || [])
    const currentUser = useSelector(state => state.userModule?.user)
    
    const [isOpen, setIsOpen] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [search, setSearch] = useState("")
    
    const allMembers = useMemo(() => {
        let members = []
        
        if (currentUser) {
            members.push({
                _id: currentUser._id,
                name: currentUser.fullname || currentUser.username || 'Current User',
                imgUrl: currentUser.imgUrl,
                color: currentUser.color || '#0073ea'
            })
        }
                if (allUsers.length > 0) {
            const otherUsers = allUsers
                .filter(user => user._id !== currentUser?._id) 
                .map(user => ({
                    _id: user._id,
                    name: user.fullname || user.username || user.name || 'Unknown User',
                    imgUrl: user.imgUrl,
                    color: user.color || '#ff9500'
                }))
            members = [...members, ...otherUsers]
        } else {
            const testUsers = [
                { _id: 'test1', name: 'Avi Ron', color: '#0073ea' },
                { _id: 'test2', name: 'Amit Hangel', color: '#ff9500' },
                { _id: 'test3', name: 'Ruth Avor', color: '#00c875' },
                { _id: 'test4', name: 'Benny Vdal', color: '#ff3333' },
                { _id: 'test5', name: 'Eli Cupter', color: '#9333ea' },
                { _id: 'test6', name: 'Leah Flitz', color: '#f59e0b' }
            ].filter(testUser => testUser._id !== currentUser?._id) 
            
            members = [...members, ...testUsers]
        }
        
        return members
    }, [allUsers, currentUser])

    const availableMembers = useMemo(() => {
        return allMembers
            .filter(m => !value.some(v => v._id === m._id)) 
            .filter(m => {
                if (!search.trim()) return true 
                return m.name.toLowerCase().includes(search.toLowerCase().trim())
            })
    }, [allMembers, value, search])
    const addMember = (member) => {
        onUpdate?.([...value, member])
        setIsOpen(false)
        setSearch("") 
    }

    const removeMember = (id) => {
        onUpdate?.(value.filter(m => m._id !== id))
    }

    const toggleDialog = () => {
        if (!isOpen) {
            setSearch("") 
        }
        setIsOpen(!isOpen)
    }

    const Avatar = ({ member, size = "32px" }) => (
        member.imgUrl ? (
            <img src={member.imgUrl} alt={member.name} 
                 style={{width: size, height: size, borderRadius: "50%", border: "2px solid white"}} />
        ) : (
            <div style={{
                width: size, height: size, borderRadius: "50%", border: "2px solid white",
                backgroundColor: member.color || '#0073ea', color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '12px', fontWeight: '600'
            }}>
                {member.name?.[0]?.toUpperCase() || '?'}
            </div>
        )
    )

    return (
        <div className="members-column" 
             onMouseEnter={() => setIsHovered(true)} 
             onMouseLeave={() => setIsHovered(false)}>
                        <div className="members-display" onClick={toggleDialog}>
                {isHovered && availableMembers.length > 0 && (
                    <button className="add-btn">+</button>
                )}
                
                {value.length === 0 && (
                    <img src="https://cdn.monday.com/icons/dapulse-person-column.svg" width={24} height={24} />
                )}
                
                {value.length === 1 && <Avatar member={value[0]} />}
                
                {value.length > 1 && (
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        {value.slice(0, 3).map((member, i) => (
                            <div key={member._id} style={{marginLeft: i > 0 ? '-8px' : '0', zIndex: 3-i}}>
                                <Avatar member={member} size="24px" />
                            </div>
                        ))}
                        {value.length > 3 && (
                            <div className="counter">+{value.length - 3}</div>
                        )}
                    </div>
                )}
            </div>
            {isOpen && (
                <>
                    <div className="members-dialog">
                        <div className="section">
                            <input 
                                placeholder="Search members..." 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="search-input"
                            />
                        </div>
                        {value.length > 0 && (
                            <div className="section">
                                <h5>Suggested People</h5>
                                {value.map(member => (
                                    <div key={member._id} className="member-row">
                                        <div className="member-info">
                                            <Avatar member={member} size="24px" />
                                            <span>{member.name}</span>
                                        </div>
                                        <button onClick={() => removeMember(member._id)}>×</button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="section">
                            {availableMembers.map(member => (
                                <div key={member._id} className="member-row clickable" 
                                     onClick={() => addMember(member)}>
                                    <div className="member-info">
                                        <Avatar member={member} size="24px" />
                                        <span>{member.name}</span>
                                    </div>
                                    <span>+</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="overlay" onClick={() => setIsOpen(false)} />
                </>
            )}
        </div>
    )
}