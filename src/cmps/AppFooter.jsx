import { useSelector } from 'react-redux'

export function AppFooter() {
    const count = useSelector(storeState => storeState.userModule.count)

    return (
        <footer className="app-footer main-container full">
            <section>
                <p>Monday Clone &copy; 2024</p>
                <p>Active Boards: {count}</p>
            </section>
        </footer>
    )
}