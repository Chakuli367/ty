import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import App from "./App";
import PlanDisplay from "./components/PlanDisplay";
import ConversationFlow from "./components/ConversationFlow";

import "./index.css";

const container = document.getElementById("root");
if (!container) throw new Error("Root container not found");

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Main app */}
        <Route path="/" element={<App />} />

        {/* Plan display page */}
        <Route path="/plan-display/:userId" element={<PlanDisplayWrapper />} />

        {/* ConversationFlow full-page route */}
        <Route path="/conversation" element={<ConversationFlowWrapper />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

// Wrapper to pass userId param as prop to PlanDisplay
function PlanDisplayWrapper() {
  const { userId } = useParams<{ userId: string }>();
  if (!userId) return <div>User ID not found in URL</div>;
  return <PlanDisplay />;
}

// Wrapper for ConversationFlow if you want to pass userId or other props
function ConversationFlowWrapper() {
  const { userId } = useParams<{ userId: string }>();
  // You can pass userId as prop if needed; for now, it uses "user_demo"
  return <ConversationFlow avatar={null} messages={[]} setMessages={() => {}} onSendMessage={() => {}} isLoading={false} progress={0} answers={{}} />;
}
