# Readme 

<h4>Application required</h4>
<li>NodeJs V10.x or above</li>
<li>NPM V6.x or above</li>
<li>MySQL</li>
<hr>
<h4>How to install application</h4>
<li>Run npm install --save</li>
<li>Make sure the node modules is already exist after npm install</li>
<li>Change the connection to database in config knex.js</li>
<hr>
<h4>How to run</h4>
<li><b>Nodemon :</b> nodemon bin/www</li>
<li><b>PM2 :</b> pm2 start bin/www</li>
<li><b>Node :</b> node bin/www</li>
The application serve in port 3000

<h4>How to use</h4>
<li>For number 1</li>
<ul>
<li>Run application</li>
<li>Open in browser in port 3000 || 127.0.0.1:3000/fb/getdatas?pagin={change pages ex 1/2/3} </li>
<li>Change the access token in routes/api</li>
<li>Save and rerun</li>
<li>Open in browser in port 3000 || 127.0.0.1:3000/fb/getdatas?pagin={change pages ex 1/2/3} </li>
</ul>
<li>For number 2</li>
<ul>
 <li>Run application</li>
 <li>Open in browser in port 3000 || 127.0.0.1:3000</li>
 <li>If the table doesnt exist it will create table and insert 10 dummy data</li>
 <li>You will see tables and form to insert new transaction and on the bottom there are button to pivot the page</li>
<li>For form insert transaction there are button generete fields and reset, for generate fields it will fill all the fields form automaticly and rese button will clear all fields</li>
<li>All fields in form is required</li>
 </ul>
 
 
 <h5><b>Make sure your computer is connected</b></h5>
 This application is already in cloud you could access on "http://35.187.238.178:3000/", but for number 2 will show status nok because there is no access token 