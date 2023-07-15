import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Homepage from "./pages/homepage/Homepage";
import Profile from "./pages/Profile";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import BookListingById from "./components/MyListings/BookListingById";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="app-div">
          <div className="content-wrapper">
            <Header className='header-s' />
            <div className="main-content">
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route
                  path="/bookListingById/:id"
                  element={<BookListingById />}
                />
                <Route path="/profile" element={<Profile />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </div>
          </div>
          <Footer className="main-footer" />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;