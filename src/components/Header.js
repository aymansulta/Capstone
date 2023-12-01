import React from "react";
import { Link } from "react-router-dom";
import bannerImg from"../images/restauranfood.jpg";


const Header = () => {
    return (
        <div>
            <header className="header">
                <section className="banner">
                    <div>
                        <h2>Little Lemon</h2>
                        <h3>Chicago</h3>
                        <p>We are a family owned Mediterraneran restaurant, focused on traditional recipes served with a modern twist.</p>
                        <Link to="/booking">
                            <button aria-label="on Click">Reserve Table</button>
                        </Link>
                    </div>

                    <div className="banner-img">
                        <img src={bannerImg} alt="banner-image"/>
                    </div>
                </section>
            </header>
        </div>
    )
}

export default Header;