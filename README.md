## To run on local
- move to react directory
    ```
    cd my-react-app
    ```
- run localhost
    ```
    npm start
    ```

## To deploy on https remote
- move to react directory
    ```
    cd my-react-app
    ```
- Run the build command to generate the production-ready static files:
    ```
    npm run build
    ```
- back to root directory
    ```
    cd ..
    ```
- forcely copy the built files to firebase public directory
    ```
    cp -r -Force my-react-app/build/* y/
    ```
- run this command to deploy to remote https firebase
    ```
    firebase deploy
    ```