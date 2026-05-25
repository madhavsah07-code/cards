# Wedding RSVP Google Sheets Integration Guide

This guide contains everything you need to connect your React RSVP form to a Google Sheet using Google Apps Script. 

---

## 1. Google Sheet Structure

Create a new Google Sheet and rename the first sheet (tab) to **`Sheet1`** (or keep the default).
Set up the first row (headers) exactly as follows:

| Column | Header Name | Description |
|---|---|---|
| **A** | `Timestamp` | Date and time of the RSVP submission |
| **B** | `Name` | Guest's full name |
| **C** | `Email` | Guest's email address |
| **D** | `Guests` | Number of guests (e.g., 1, 2, 3...) |
| **E** | `Attending` | Attending status (`yes`, `no`, `maybe`) |
| **F** | `Ceremonies` | Comma-separated list of attending events |
| **G** | `Message` | Personal message/wishes for the couple |

> [!IMPORTANT]
> Keep the headers simple and match the order listed. Do not add formatting to Row 1 that changes text (e.g., lowercase vs uppercase) as Google Apps Script will append new data underneath row 1 regardless.

---

## 2. Google Apps Script Backend Code

Follow these steps to add the backend script:

1. In your Google Sheet, click **Extensions** -> **Apps Script**.
2. Delete any code in the editor (`myFunction()`) and paste the code below:

```javascript
/**
 * Google Apps Script RSVP Form Handler
 * 
 * Receives RSVP data via a POST request from the wedding React website,
 * formats array fields into strings, appends a new timestamped row,
 * and returns a CORS-safe JSON response.
 */

function doPost(e) {
  try {
    // 1. Verify request payload
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse("error", "No data received in post body.");
    }
    
    // 2. Parse payload JSON
    var data = JSON.parse(e.postData.contents);
    
    // 3. Open Spreadsheet Sheet
    // Since this is a container-bound script, it automatically opens the current Sheet.
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // 4. Extract data values with fallbacks
    var timestamp = new Date();
    var name = data.name || "N/A";
    var email = data.email || "N/A";
    var guests = data.guests || "1";
    var attending = data.attending || "N/A";
    
    // Format ceremonies array to a readable comma-separated string
    var ceremoniesJoined = "";
    if (Array.isArray(data.ceremony)) {
      ceremoniesJoined = data.ceremony.join(", ");
    } else if (data.ceremony) {
      ceremoniesJoined = String(data.ceremony);
    } else {
      ceremoniesJoined = "None";
    }
    
    var message = data.message || "";
    
    // 5. Append data row to the sheet
    // Columns: [Timestamp, Name, Email, Guests, Attending, Ceremonies, Message]
    sheet.appendRow([
      timestamp, 
      name, 
      email, 
      guests, 
      attending, 
      ceremoniesJoined, 
      message
    ]);
    
    // 6. Return success response
    return createJsonResponse("success", "RSVP recorded successfully!");
    
  } catch (error) {
    console.error("RSVP Processing Error: ", error);
    return createJsonResponse("error", error.toString());
  }
}

/**
 * Creates a CORS-compliant JSON response.
 * Google Apps Script handles redirection automatically when text output is returned.
 */
function createJsonResponse(status, message) {
  var responsePayload = {
    status: status,
    message: message
  };
  
  return ContentService.createTextOutput(JSON.stringify(responsePayload))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Save the project (click the **floppy disk icon** 💾 or press `Cmd+S` / `Ctrl+S`).

---

## 3. Deployment Steps

To expose this script to the internet so your React application can send data to it:

1. Click the **Deploy** button at the top-right corner and select **New deployment**.
2. Click the gear icon next to **Select type** and choose **Web app**.
3. Fill out the deployment configuration:
   - **Description:** `Wedding RSVP API` (or leave blank)
   - **Execute as:** **`Me (your-email@gmail.com)`** (This is crucial! It runs the database operation with your Google account permissions).
   - **Who has access:** **`Anyone`** (This enables public POST submissions from your wedding website).
4. Click **Deploy**.
5. Google will ask you to **Authorize Access**. Click it, choose your Google account, click **Advanced**, and then click **Go to Untitled project (unsafe)** (Google warns you because it's a script you wrote yourself).
6. Click **Allow**.
7. Copy the **Web App URL** generated (it will look like `https://script.google.com/macros/s/AKfycb.../exec`). This is your RSVP API endpoint!

---

## 4. Frontend React Integration

### The CORS-Safe Fetch Configuration
To prevent CORS problems in modern browsers:
- We send the request with `Content-Type: text/plain;charset=utf-8` using `fetch`.
- Because `text/plain` is considered a **simple request header** by browsers, it bypasses the preflight CORS `OPTIONS` preflight request.
- The Google Apps Script web app receives the payload, parses it with `JSON.parse(e.postData.contents)`, and redirects to a temporary Google Content Server where the response is served back with CORS headers enabled.

### Local Setup instructions

1. Create a file called `.env` in your project root:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and paste your Google Web App URL:
   ```env
   VITE_RSVP_API_URL=https://script.google.com/macros/s/YOUR_ACTUAL_DEPLOYED_SCRIPT_ID/exec
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

---

## 5. React Component Verification (`RSVPSection.jsx`)

The submit handler in [RSVPSection.jsx](file:///Users/chandramadhav/cards/src/components/RSVPSection.jsx) has been configured as follows:

```javascript
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const apiUrl = import.meta.env.VITE_RSVP_API_URL;

    if (!apiUrl) {
      setError("Google Apps Script URL is missing. Please create a .env file and set VITE_RSVP_API_URL.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.status === 'success') {
        setSubmitted(true);
        setForm({
          name: '',
          email: '',
          guests: '1',
          attending: '',
          ceremony: [],
          message: '',
        });
      } else {
        throw new Error(data.message || 'Failed to submit RSVP.');
      }
    } catch (err) {
      console.error('RSVP submission error:', err);
      setError(err.message || 'Unable to submit RSVP. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };
```

This completes the setup. Happy wedding planning! 🌺
