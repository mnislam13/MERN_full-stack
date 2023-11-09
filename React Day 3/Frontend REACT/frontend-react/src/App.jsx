// import './App.scss'
import Navbar from "./components/navbar";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./components/home";
import Products from "./components/products";
import ContactUs from "./components/contactus";

import MyName from "./components/myName";



function App() {
  console.log("Rendering from App.jsx file");


  const person = {
    firstname: "Najrul",
    lastname: "Islam",
    styling: {
      backgroundColor: "blue",
      color: "white",
    },
  };

  // const headerFlag = false;
  // if (headerFlag == false) {
  //   return <h1>Hey, there is no contents to show</h1>
  // }

  // const showList = false;
  const listArray = [
    { id: 1, name: "list 1" },
    { id: 2, name: "list 2" },
    { id: 3, name: "list 3" }
  ];

  return (
    <div className="App">

      {/* <Header /> */}

      <Navbar />
      <Home />
      <Products />
      <ContactUs />
      <Footer />

      {/* <MyName /> */}
      {/* {headerFlag == true && <Header />} */}
    </div>


  )
}

export default App
