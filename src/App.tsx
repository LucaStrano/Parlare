import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import Layout from "~/Layout";
import "~/App.css";

function App() {
  return (
    <div id="app">
      <Layout>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </Layout>
    </div>
  )
}

export default App;
