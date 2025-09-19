import HadithGenerator from "./components/HadithGenerator";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <HadithGenerator />
      <Analytics />
    </>
  );
}

export default App;
