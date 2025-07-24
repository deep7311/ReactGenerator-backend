// import axios from "axios";
// import { extractMainCodeBlock } from "../utils/extractCode.js";

// // const Model = "eepseek/deepseek-chat-v3-0324:free"

// export const generateComponent = async (req, res) => {
//   const userMessage = req.body.message;

//   // Validate
//   // if (!userMessage) {
//   //   return res.status(400).json({ error: "Message is required" });
//   // }

//   const systemPrompt = `Give ONLY clean JSX code for a React component. Include proper import statements and export default at the end. DO NOT explain anything. Wrap the code inside triple backticks (\`\`\`).`;

//   const finalPrompt = `${systemPrompt}\n\n${userMessage}`;

//   try {
//     // Dummy mode ON for testing
//     const useDummy = false;

//     // Dummy AI JSX response for local testing
//     let fullReply = `
// \`\`\`jsx
// import React from 'react';

// const MainPage = () => {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <header className="bg-white shadow-md">
//         <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//           <div className="flex items-center">
//             <span className="text-blue-600 font-bold text-xl">Logo</span>
//           </div>
//           <nav className="hidden md:flex space-x-8">
//             <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Home</a>
//             <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">About</a>
//             <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Contact</a>
//           </nav>
//           <div>
//             <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
//               Login
//             </button>
//           </div>
//         </div>
//       </header>

//       <main className="flex-grow flex items-center justify-center bg-gray-50">
//         <div className="text-center p-8">
//           <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Our Website</h1>
//           <p className="text-lg text-gray-600 max-w-2xl">
//             This is the main content area. You can place your primary content here.
//           </p>
//         </div>
//       </main>

//       <footer className="bg-gray-800 text-white py-6">
//         <div className="container mx-auto px-4 text-center">
//           <p>© 2023 Your Company Name. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default MainPage;
// \`\`\`
//     `;

//     // Live AI integration (commented for now)

//     if (!useDummy) {
//       const response = await axios.post(
//         "https://openrouter.ai/api/v1/chat/completions",
//         {
//           model: "qwen/qwen3-coder:free",
//           messages: [{ role: "user", content: finalPrompt }],
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//             "HTTP-Referer": "http://localhost:3000",
//             "X-Title": "Drive AI",
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       fullReply = response.data.choices?.[0]?.message?.content || "No response";
//     }

//     // Extract JSX code from response
//     const { components } = extractMainCodeBlock(fullReply);
//     console.log("Extracted components:", components);

//     return res.status(200).json({ userMessage, components, success: true });
//   } catch (error) {
//     console.error("AI API Error:", error.message);
//     return res.status(500).json({ error: "AI response failed" });
//   }
// };

// for testing purpose only

//     let fullReply = `
// \`\`\`jsx
// // import React from 'react';

// // const Header = () => {
// //   return (
// //     <header className="bg-white shadow-md py-4 px-6 flex flex-col sm:flex-row items-center justify-between">
// //       {/* Logo Section */}
// //       <div className="flex items-center mb-4 sm:mb-0">
// //         <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
// //         <span className="ml-3 text-xl font-bold text-gray-800">YourLogo</span>
// //       </div>

// //       {/* Navigation Links */}
// //       <nav className="flex flex-wrap justify-center space-x-1 sm:space-x-8 mb-4 sm:mb-0">
// //         <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition duration-300 px-2 py-1">Home</a>
// //         <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition duration-300 px-2 py-1">About</a>
// //         <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition duration-300 px-2 py-1">Contact Us</a>
// //       </nav>

// //       {/* Login Button */}
// //       <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
// //         Login
// //       </button>
// //     </header>
// //   );
// // };

// // export default Header;
// \`\`\`
//     `;

import { GoogleGenerativeAI } from "@google/generative-ai";
import { extractMainCodeBlock } from "../utils/extractCode.js";
import dotnev from "dotenv";

dotnev.config();

const key = process.env.GOOGLE_API_KEY;

// Initialize with API key
const genAI = new GoogleGenerativeAI(key);

export const generateComponent = async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: "Message is required" });
  }

  const basePrompt = `Give ONLY clean JSX code for a React component. Include proper import statements and export default at the end. DO NOT explain anything. Wrap the code inside triple backticks (\`\`\`).`;

  const tailwindStylePrompt = `Use **only Tailwind CSS classes** for all styling in the JSX. Do not use inline styles, external CSS, or any UI library. Style the component using Tailwind utility classes only.`;

  const finalPrompt = `${basePrompt}\n${tailwindStylePrompt}\n\n${userMessage}`;

  try {
    // Google AI model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    const text = response.text();

    const { components } = extractMainCodeBlock(text);
    console.log("Extracted components:", components);

    // const { components } = extractMainCodeBlock(fullReply);

    // console.log("Extracted components:", components);

    return res
      .status(200)
      .json({
        userMessage,
        components,
        success: true,
        message: "Generated code successfully",
      });
  } catch (error) {
    console.error("AI API Error:", error.message);
    return res
      .status(500)
      .json({ error: error.message || "AI response failed", success: false });
  }
};
