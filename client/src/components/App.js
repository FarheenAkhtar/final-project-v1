// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import AddRecipeForm from "./Admin/AddRecipeForm";
import Sidebar from "./Admin/Sidebar";
import ViewRecipeList from "./Admin/ViewRecipeList";
import Header from "./Header";
import Footer from "./Footer";
import About from "./About";
import ContactUs from "./ContactUs";
import DetailedRecipe from "./DetailedRecipe";

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar />
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/category" element={<h1>Category</h1>}></Route>
        <Route path="/recipes/:recipeId" element={<DetailedRecipe />}></Route>
        <Route path="/contact" element={<ContactUs />}></Route>
        <Route path="admin/add-recipe" element={<AddRecipeForm />} />
        <Route path="admin/view-recipe" element={<ViewRecipeList />} />
        <Route
          path="admin/update-recipe"
          element={<h1>Update an existing Post</h1>}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
