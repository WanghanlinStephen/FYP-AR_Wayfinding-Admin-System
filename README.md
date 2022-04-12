## How to Start

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Instructions for usage

### Map Controller Bar 
![image](./image/Map%20Controller%20Bar.png)
    
    Fetch Previous Labels:
        Purpose:Fetch previous nodes stored in mysql database
    Fetch Previous Connections:
        Purpose:Fetch previous connections stored in mysql database
    Selection Bar:
        First Selection: building name
        Second Selection: floor number

### General Controller Bar
#### - Stage One Add Node
![image](./image/Add%20Node.png)
    
    LabelID:the label (X,Y) coordinates the user clicked on the map
    NameEnglish,NameChinese: input corresponding name
![image](./image/Intersectional%20Angle.png)

    IntersectionalAngle: refer to Angle 1 - Angle 2
    Select Emergent ID: the label (X,Y) coordinates the user clicked on the map, then update the node as staircase

#### - Stage Two Add Connection 
![image](./image/Add%20Connection.png)
    
    Source:the label (X,Y) coordinates the user clicked on the map
    Destination:the label (X,Y) coordinates the user clicked on the map

#### - Stage Three Delete Node
![image](./image/Delete%20Node.png)
    
    NodeId:the label (X,Y) coordinates the user clicked on the map

#### - Stage Four Delete Connection

    Source:the label (X,Y) coordinates the user clicked on the map
    Destination:the label (X,Y) coordinates the user clicked on the map

#### - Stage Five Label Id
    
    LabelID:the label (X,Y) coordinates the user clicked on the map
    Then QR will appear:
![image](./image/QR%20code.png)
    