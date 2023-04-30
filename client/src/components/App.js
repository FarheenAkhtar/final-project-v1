// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Panel from "./Admin/Panel";
import ViewRecipeList from "./Admin/ViewRecipeList";
import Header from "./Header";
import Footer from "./Footer";
import About from "./About";
import ContactUs from "./ContactUs";
import DetailedRecipe from "./DetailedRecipe";
import Tags from "./Admin/Tags";
import Login from "./Admin/Login";
import UpdateRecipeForm from "./Admin/UpdateRecipe";
import CategoryList from "./Category";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/category/:categoryId" element={<CategoryList />}></Route>
        <Route path="/recipes/:recipeId" element={<DetailedRecipe />}></Route>
        <Route path="/contact" element={<ContactUs />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="admin/add-recipe" element={<Panel />} />
        <Route path="admin/view-recipe" element={<ViewRecipeList />} />
        <Route path="admin/recipe/:recipeId" element={<UpdateRecipeForm />} />
        <Route path="admin/tags" element={<Tags />} />
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
