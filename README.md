# eState
Pinnacle Hacks 2021 repo for eState.

eState is a democratic and transparent housing market.
eState is a democratizing real estate market for all.

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
  </br>
  </br>
  
# Tech Stack
  ## Frontend
    - React.js

  ## Backend
    - Node.js@16.9.1
    - express.js

  ## Blockchain
    - stellar-sdk
