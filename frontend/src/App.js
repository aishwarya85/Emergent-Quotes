import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrainyQuoteProvider } from "./components";
import HomePage from "./pages/HomePage";
import AuthorsPage from "./pages/AuthorsPage";
import AuthorDetailPage from "./pages/AuthorDetailPage";
import TopicsPage from "./pages/TopicsPage";
import TopicDetailPage from "./pages/TopicDetailPage";
import QuoteOfTheDayPage from "./pages/QuoteOfTheDayPage";
import SearchPage from "./pages/SearchPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrainyQuoteProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/authors" element={<AuthorsPage />} />
            <Route path="/authors/:id" element={<AuthorDetailPage />} />
            <Route path="/topics" element={<TopicsPage />} />
            <Route path="/topics/:id" element={<TopicDetailPage />} />
            <Route path="/quote-of-the-day" element={<QuoteOfTheDayPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </BrainyQuoteProvider>
  );
}

export default App;