Hi !

For running the project please do the following:

1. run npm install on both server and client folders
2. in the server folder, type "npm run dev"

*
3. The mysql server is running on an external machine to make things easier. All config details are in the file as well as all passwords/hashing to avoide hidden files in git etc. Everything should work out of the box. As this sql service is not super amazing, it sometimes disconnects if you haven't done any operation for a few minutes. In such a case please run "npm run dev".

 in server/mysql/mysql.js I initiated a database and a table for quick and easy setup. If you would like to drop and re-create the table, please feel free to uncomment the drop and createtable functions in the file. I'm hoping that the rest of the way is intuitive enough for the comments to explain clearly.