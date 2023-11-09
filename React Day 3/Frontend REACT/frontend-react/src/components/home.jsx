import React from 'react';
import './home.style.css';

function Home() {
    return (
        <div id="home" className="section">
            <h2>Welcome to Our Website</h2>
            <div className="image-container">
                <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/004/299/835/small/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg"
                    alt="Home Image"
                />
            </div>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac ex
                vel justo vehicula faucibus. Fusce a augue bibendum, feugiat est nec,
                bibendum tellus.
            </p>
            <p>
                Proin euismod, est sit amet vehicula auctor, velit enim iaculis arcu,
                nec varius erat leo non velit.
            </p>
        </div>
    );
}

export default Home;
