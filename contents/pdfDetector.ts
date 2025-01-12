import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"] // Detect on all URLs
}

// detectPDF()
const detectUrlPDF = () => {
  console.log("Content script loaded and running.")

  const currentUrl = window.location.href

  console.log("Current page URL:", currentUrl)

  if (currentUrl.endsWith(".pdf")) {
    console.log("This page is a PDF:", currentUrl)
    chrome.runtime.sendMessage({ type: "PDF_DETECTED", url: currentUrl })

    document.body.style.border = "5px solid red"

    const container = document.createElement("div")
    container.style.position = "fixed"
    container.style.top = "6%"
    container.style.right = "1%"
    container.style.backgroundColor = "rgba(0, 0, 0, 0.8)"
    container.style.color = "#fff"
    container.style.padding = "8px"
    container.style.borderRadius = "8px"
    container.style.fontSize = "16px"
    container.style.zIndex = "9999"
    container.style.display = "flex"
    container.style.alignItems = "center"
    container.style.gap = "10px"

    const textElement = document.createElement("span")
    textElement.innerText = "This is a PDF!"

    const copyButton = document.createElement("button")
    copyButton.style.backgroundColor = "#007bff"
    copyButton.style.color = "#fff"
    copyButton.style.border = "none"
    copyButton.style.padding = "10px 15px"
    copyButton.style.borderRadius = "5px"
    copyButton.style.cursor = "pointer"
    copyButton.innerText = "Copy Content"

    copyButton.addEventListener("click", () => {
      alert("Copy content functionality is not implemented yet!")
    })

    container.appendChild(textElement)
    container.appendChild(copyButton)

    document.body.appendChild(container)
  } else {
    console.log("This page is not a PDF.")
  }
}

detectUrlPDF()
