import './App.css'
import Navbar from "./components/navbar";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./components/home";
import Products from "./components/products";
import ContactUs from "./components/contactus";



function App() {
  console.log("Rendering from App.jsx file");

  return (
    <div className="App">
      <Navbar />
      {/* <Header /> */}
      <Home />
      <Products />
      <ContactUs />
      <Footer />
    </div>


  )
}

export default App
