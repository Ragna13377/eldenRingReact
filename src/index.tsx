import "@/index.scss";
import "./shared/assets/images/dog.jpg";
import { createRoot } from "react-dom/client";
import App from "@/app/App";

const domNode = document.getElementById("root") as HTMLDivElement;
const root = createRoot(domNode);

root.render(<App />);
