# eState
Pinnacle Hacks 2021 repo for eState.

eState is a platform that allows real estate agencies, estate seekers, and solo real estate agents to do estate transactions in a cheaper, faster, and more transparent way.

# How to run the environment
  ## Get up-to-date npm and node
   <details>
    <summary>
      Windows
    </summary>
      Install from the official Node.JS Website https://nodejs.org/en/
   </br>
   </details>
   
   <details>
    <summary>
      Mac (All available options as noted in https://nodejs.org/en/download/package-manager/#macos)
    </summary>
  
      curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
   ---
      brew install node
   ---
      port install nodejs16
   ---
      pkgin -y install nodejs
   </details>
   
  <details>
    <summary>
      Linux (Debian/Ubuntu)
    </summary>
  
      sudo apt update
   ---
      sudo apt install npm
   ---
      sudo npm install node@16.9.1 -g --force
   </details>
   </br>
  
 ## Initially install necessary packages
    npm install
  </br>
  
 ## List of Main Packages Used
    stellar-sdk
    albedo-link
    material-ui
    ipfs-mini
    react
    
  </br>
  
 ## Frontend
    npm run start
 ## Backend
    node express.js
  </br>
  
# Tech Stack
  ## Frontend
    - React.js

  ## Backend
    - Node.js@16.9.1
    - express.js

  ## Blockchain
    - stellar-sdk
    - ipfs-mini
    - ipfs-core
    
![image](https://user-images.githubusercontent.com/38967557/133930023-17e161e0-7c78-46d4-a5b7-afaa0a80f818.png)

