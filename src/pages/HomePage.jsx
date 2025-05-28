import { Link } from "react-router-dom";

export function HomePage() {
    return (
        <section className="home-page">
            <div className="hero-section">
                <h1>Welcome to Monday Clone</h1>
                <p className="hero-subtitle">
                    The ultimate project management platform that helps your team stay organized, 
                    collaborate effectively, and get work done faster.
                </p>
            </div>

            <div className="features-grid">
                <div className="feature-card">
                    <h3>📋 Dynamic Boards</h3>
                    <p>Create and customize project boards that adapt to your team's workflow and needs.</p>
                </div>
                
                <div className="feature-card">
                    <h3>✅ Task Management</h3>
                    <p>Track progress, set deadlines, and assign tasks with our intuitive task management system.</p>
                </div>
                
                <div className="feature-card">
                    <h3>👥 Team Collaboration</h3>
                    <p>Work together in real-time with your team members, share updates, and stay connected.</p>
                </div>
                
                <div className="feature-card">
                    <h3>📊 Data Insights</h3>
                    <p>Get valuable insights into your team's productivity with built-in analytics and reporting.</p>
                </div>
            </div>

            <div className="cta-section">
                <h2>Ready to boost your team's productivity?</h2>
                <p>Start organizing your projects today with our powerful board management system.</p>
                <Link to='/board' className="cta-button">Explore Your Boards</Link>
            </div>
        </section>
    )
}