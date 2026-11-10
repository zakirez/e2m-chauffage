import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('dist');
http.createServer(async(req,res)=>{try{let p=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(p.endsWith('/'))p+='index.html';const file=path.resolve(root,'.'+p);if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}const data=await readFile(file);res.setHeader('Content-Type',({'html':'text/html; charset=utf-8','css':'text/css','js':'text/javascript','png':'image/png','jpg':'image/jpeg'})[file.split('.').pop()]||'application/octet-stream');res.end(data);}catch{res.writeHead(404);res.end('Page introuvable');}}).listen(3000,'127.0.0.1',()=>console.log('E2M Chauffage : http://localhost:3000'));
