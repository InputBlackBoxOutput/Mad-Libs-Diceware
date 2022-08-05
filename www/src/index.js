import React from 'react';
import ReactDOM from 'react-dom/client';

import './style/bootstrap.min.css';
import './style/bootstrap.min.css.map';
import './style/style.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="terms-and-conditions" element={<TermsAndConditionsPage />} />
    </Routes>
  </BrowserRouter>
);

