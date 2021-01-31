# IbanValidator

![IBAN VALIDATOR](https://i.ibb.co/hm2kTcv/capture.png)

# Features

1. Instant IBAN validation (currently accepts LT format only).

2. List of IBANs validation (accepts .txt files only formatted as shown below)

![FORMAT EXAMPLE](https://i.ibb.co/SQtvMDc/kodai.png)

# How to setup

### Windows

- Go to [Node.js](https://nodejs.org/en/download/current/), download and install the latest version for your OS.
- Clone the repository or download the zipped file and unzip it.
- The repository directory will contain of three folders - "client", "ws1" and "ws2".
Navigate to each folder using command line, or visit each folder with file explorer, **shift + right click** inside the folder and select "Open PowerShell window here" (three instances of command line or PowerShell should now be running).

![EXAMPLE1](https://i.ibb.co/6wcV43d/ezgif-com-gif-maker.gif)
- In each of the command line or PowerShell window type `npm install` and wait until all of the processes are completed.
- In each of the command line or PowerShell window type `npm start` (all three services must be started). A browser window with the application should pop-up. If it doesn't, visit [http://localhost:3000](http://localhost:3000) on your browser.

### macOS

- Go to [Node.js](https://nodejs.org/en/download/current/), download and install the latest version for your OS.
- Clone the repository or download the zipped file and unzip it.
- The repository directory will conain of three folders - "client", "ws1" and "ws2".
Navigate to each folder using a separate terminal window.
- In each of the terminal window type `npm install` and wait until all of the processes are completed.
- In each of the terminal window type `npm start` (all three services must be started). A browser window with the application should pop-up. If it doesn't, visit [http://localhost:3000](http://localhost:3000) on your browser.

### Known issues

- Clicking "Upload and validate" opens two windows for both "filename_valid.csv" and "filename_bank.csv" files to be downloaded. The browser may block one of the pop-ups and only one of the files will be sent to the client. To avoid this, allow the pop-ups and click "Upload and validate" one more time.
