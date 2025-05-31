const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'LUCKY-XFORCE••<=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUJObUZQNUFNRXZVNFkrOEhJM3g1TlgrcDJBOVJBZVVUR0VudTNqcE4yZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNGIyNy91QmxFRXlVUTdyNmZaNEY2dVZ2ZzhZWk1HWG43S0F2Q29VMHdoWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNQVhOSUhXWUFvb1NuWXdnRWszaFBUczg5OVFxZlp3U09TeWRaUlhrNUcwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrWjZZSEZwTFFRcUZwcVRPUTlQMXpoTHlBZEg0ei93ZHlwQmE4RG9KOXlRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFFQ3ppZURrRnRaVzliVVo1dGM4amVQN0NYVjA1d2JXMFhHazFla2FsazQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkRDN2ZEUVhRTnNmU284ZEc3NnFnZCs0eVk3UHBYcjI1TUFiK1ZBRDdGM2c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVU13eU04VEdrR3R1ZnIzKytDR2syUGlvbGoyN2lRWXN2R2Z6U3I0djAwMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiclF5OTBGVmtwQ3pWVFd4MHUrQzlDc25OUFlwVW80K2J6T1pCN0FvUmhnND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkhEelQrVzJJU3ByeFpzVEU3OGdQVmpRdkE1SXZyNmVOaXJGSE9BVkhrcXZMNWZNOHZPdVlLWlkzS2UwVVFDSUZLeUpHMnBQOW5QYkIzR202Zy9xeUNBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM1LCJhZHZTZWNyZXRLZXkiOiJ0YUs0ei84cEVCcEVuZFV3VVcvdDArMHBQZ0FySlI0Q2k1MjBCNXVyTVNzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJMN2xvWDdOUFRYNndZMVUteXhtWkRRIiwicGhvbmVJZCI6ImJiY2M0MTQ4LTIzOWQtNDA2Mi1iMjU2LWI0YTMwOTliNTQxZCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ6NkcwNWpiQUZWcWJZVjMyUWNERndGY3Fpb1U9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVjAzT0Q1VWtDQWNLUVB0c2ZtMUU1ZXUwWDBBPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkZSRURFWlJBIiwibWUiOnsiaWQiOiIyMzc2NTYzNjAzMTc6ODFAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiI5MTExMzQ4NjU3NzcwMDo4MUBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tqZitzd0dFS3JaNjhFR0dBTWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkRWZEg2OW5xU1FtVnFoN1pwRkxCRE1rd24rTVpKZDF0NmtORUJQMnBRaUk9IiwiYWNjb3VudFNpZ25hdHVyZSI6Im0rWjR4QmVmVjBvOVZyUmNRcFJzSEUvT0YraWtKQXR5Zk55NWVMNVF3NnczM2UyL0htKy95YWRGd1g5dXExR1JvS0cxM3VURlZkRk40YTdCWmZCY0FnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJjcTRHWEsxRjdydFNBR2dteWdKOVlwMmZMeCt6NzY1c2lNSWJnbzkzamV0RDRtaUtqa2ZyN2pKeE10Mzl2OVdqbnZwOFpFcGh3cjlpVmFDMGtZY3dBZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNzY1NjM2MDMxNzo4MUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJRMVhSK3ZaNmtrSmxhb2UyYVJTd1F6Sk1KL2pHU1hkYmVwRFJBVDlxVUlpIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQWdJRWc9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDg2OTIxNTEsImxhc3RQcm9wSGFzaCI6IjNnUFVKayIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRlh0In0=',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/mr-X-force/LUCKY-MD-XFORCE',
    OWNER_NAME : process.env.OWNER_NAME || "Fredi",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255752593977",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/uw4l17.jpeg",  
    URL2: process.env.URL2 || "https://files.catbox.moe/3o37c5.jpeg",
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'Your Status Seen By ☢️LUCKY-MD-XFORCE☢️',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    CAPTION : process.env.CAPTION || "☢️LUCKY-MD-XFORCE☢️",
    BOT : process.env.BOT_NAME || '☢️LUCKY-MD-XFORCE☢️⁠',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Dar_Es_Salam", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    FREDI_DELETE : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',             
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
