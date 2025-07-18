import { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { CloseDateIcon } from '../../../svg/CloseDateIcon'
import { SearchIcon } from '../../../svg/SearchIcon'

export const Avatar = ({ member, size = "30px" }) => (
    member.imgUrl ? (
        <img src={member.imgUrl} alt={member.name}
            style={{ width: size, height: size, borderRadius: "50%", border: "2px solid white" }} />
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

const PlusIcon = () => (
    <div className="plus-icon-members">
        <div className="plus-icon-line-vertical" />
        <div className="plus-icon-line-horizontal" />
    </div>
)

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
                { _id: 'test1', name: 'Shoham Shtiler', color: '#0073ea', imgUrl: "https://res.cloudinary.com/dadlyemp7/image/upload/v1751437720/dwxc5c2zmthbj1xyi7md.jpg" }, 
                { _id: 'test2', name: 'Agam Mor Levi', color: '#0073ea', imgUrl: "https://res.cloudinary.com/dadlyemp7/image/upload/v1751437271/q2xgh1sejmmydibxnriv.jpg" }, 
                { _id: 'test3', name: 'Shmuel levy', color: '#0073ea', imgUrl: "https://res.cloudinary.com/dadlyemp7/image/upload/v1751436456/q9nkmgavt13efxux32fa.jpg" }, 

                { _id: 'test4', name: 'Conor Oliver', color: '#0073ea', imgUrl: "https://i.pravatar.cc/40?img=60" }, 
                { _id: 'test5', name: 'Libbie Eaton', color: '#ff9500', imgUrl: "https://i.pravatar.cc/40?img=30" },
                { _id: 'test6', name: 'Alex Kim', color: '#00c875', imgUrl: "https://i.pravatar.cc/40?img=12" },
                { _id: 'test7', name: 'Maya Singh', color: '#ff3333', imgUrl: "https://i.pravatar.cc/40?img=47" },
                { _id: 'test8', name: 'Carlos Ortiz', color: '#9333ea', imgUrl: "https://i.pravatar.cc/150?img=61" },
                { _id: 'test9', name: 'Ella Levy', color: '#f59e0b', imgUrl: "https://i.pravatar.cc/40?img=21" },
                { _id: 'test10', name: 'Mark Brown', color: '#f59e0b', imgUrl: "https://i.pravatar.cc/40?img=64" },
                { _id: 'test11', name: 'Rina Adler', color: '#f59e0b', imgUrl: "https://i.pravatar.cc/40?img=33" }
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

    return (
        <div className="members-column"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <div className="members-display" onClick={toggleDialog}>
                {value.length === 0 ? (
                    <div className="members-with-plus">
                        {isHovered && <PlusIcon />}
                        <img src="https://cdn.monday.com/icons/dapulse-person-column.svg" width={30} height={30} />
                    </div>
                ) : (

                    <div className="members-with-plus">
                        {isHovered && <PlusIcon />}
                        {value.length === 1 && (
                            <Avatar member={value[0]} size="30px" />
                        )}

                        {value.length === 2 && (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                {value.map((member, i) => (
                                    <div key={member._id} style={{ marginLeft: i > 0 ? '-8px' : '0', zIndex: 3 + i }}>
                                        <Avatar member={member} size="30px" />
                                    </div>
                                ))}
                            </div>
                        )}

                        {value.length > 2 && (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ marginLeft: '0', zIndex: 3 }}>
                                    <Avatar member={value[0]} size="30px" />
                                </div>
                                <div className="counter">+{value.length - 1}</div>
                            </div>
                        )}
                    </div>

                )}
            </div>
            {isOpen && (
                <>
                    <div className="members-dialog">
                        {value.length > 0 && (
                            <div className="selected-members-box">
                                <div className="selected-members-chips">
                                    {value.map(member => (
                                        <div key={member._id} className="member-chip">
                                            <div className="member-info">
                                                <Avatar member={member} size="24px" />
                                                <span className="ds-text-component">{member.name}</span>
                                            </div>
                                            <div className="remove-btn">
                                                <CloseDateIcon onClick={() => removeMember(member._id)} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="section">
                            <div className="search-container">
                                <SearchIcon className="search-icon" />
                                <input
                                    placeholder="Search members..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="search-input"
                                />
                            </div>
                        </div>
                        <div className="section">
                            <h5>Suggested people</h5>
                            {availableMembers.map(member => (
                                <div key={member._id} className="member-row clickable"
                                    onClick={() => addMember(member)}>
                                    <div className="member-info">
                                        <Avatar member={member} size="30px" />
                                        <span className="ds-text-component">{member.name}</span>
                                    </div>
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