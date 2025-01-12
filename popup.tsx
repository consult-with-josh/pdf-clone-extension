import { useEffect, useState } from "react"

function IndexPopup() {
  const [isPDF, setIsPDF] = useState(false)
  const [pdfUrl, setPdfUrl] = useState("")

  console.log("🚀 ~ IndexPopup ~ isPDF:", isPDF)
  console.log("🚀 ~ IndexPopup ~ pdfUrl:", pdfUrl)

  useEffect(() => {
    // Listen for messages from the content script
    const handleMessage = (message: { type: string; url: string }) => {
      if (message.type === "PDF_DETECTED") {
        console.log("🚀 ~ IndexPopup ~ message:", message)
        setIsPDF(true)
        setPdfUrl(message.url)
      } else {
        console.log("ERROR ~ IndexPopup ~ message:", message)
      }
    }

    chrome.runtime.onMessage.addListener(handleMessage)

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage)
    }
  }, [])

  return (
    <div style={{ padding: 16 }}>
      <h2>Welcome to your PDF Extension!</h2>
      {isPDF ? (
        <>
          <p>This is a PDF!</p>
          <p>URL: {pdfUrl}</p>
        </>
      ) : (
        <p>This page is not a PDF.</p>
      )}
    </div>
  )
}

export default IndexPopup
