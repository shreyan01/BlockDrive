import React from "react";
import './LandingPage.css'
const LandingPage=()=>{
    return (
        <div className="landing-page">
            <header>
                <h1>
                    Welcome to BlockDrive
                </h1>
            </header>
            <main>
                <p>Store and manage your files efficiently and securely on our blockchain!</p>
                <h3>Personal Blockchain specially for you</h3>
                <nav>
                    <ul>
                        <li><a href="/signup">Sign Up</a></li>
                        <li><a href="/login">Log In</a></li>
                        <li><a href="/drive">Access Your Drive</a></li>
                    </ul>
                </nav>
            </main>
        </div>
    )
}

export default LandingPage