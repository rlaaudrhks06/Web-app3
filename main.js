const express = require('express')
const fs = require('fs')
const qs = require('querystring')
const app = express()
const port = 3000
const template = require('./template.js')
app.use(express.static('views'));

const mysql = require('mysql');
const { title } = require('process')
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'kmkmartin0302',
  database : 'board'
});
 
db.connect();

app.get('/', (req, res)=>{
    let {name} = req.query
    db.query('SELECT * from data',(err, data2)=>{
        if (err) throw err;
        //console.log(teacher);
        let list = template.list(data2)
        let data, control
        if(name === undefined){
            name = '대나무숲'
            data = 'Welcome'
            control = `<button onclick="location.href='/create'" class="w-btn w-btn-indigo" type="submit">Create</button>`
            const html = template.HTML(name, list, `<h2>${name} 페이지</h2><p>${data}</p>`, control)
            res.send(html) 
        }
        else
        {
            db.query(`SELECT id, title, name, detail from data where id=${name}`,(err2, data3)=>{
                if (err2) throw err2;
                name = data3[0].name
                data = `작성자 : ${data3[0].name}`
                data2 = `${data3[0].detail}`
                control = `<button onclick="location.href='/create'" class="w-btn w-btn-indigo" type="submit">Create</button>
                <button onclick="location.href='/update?name=${data3[0].id}'" class="w-btn w-btn-indigo" type="submit">Update</button>
                <button onclick="location.href='/delete?name=${data3[0].id}'" class="w-btn w-btn-indigo" type="submit">Delete</button>
                `
                const html = template.HTML(name, list, `<h2 class="board-content-title">${data3[0].title}<span class="board-content-author">           ${data}</span></h2> <p class="board-content-body">${data2}</p>`, control)
                res.send(html)
            })
        }
    })
})
app.get('/create', (req, res)=>{
    db.query('SELECT * from data',(err, data2)=>{
        if (err) throw err;
        const name = 'create'
        const list = template.list(data2)
        const data = template.create()
        const html = template.HTML(name, list, data, '')
        res.send(html)
    })
})
app.get('/update', (req, res)=>{
    let {name} = req.query
    db.query('SELECT * from data',(err, data)=>{
        if (err) throw err;
        let list = template.list(data)
        db.query('SELECT * from data where id = ?', [name],(err2, data2)=>{
            if (err2) throw err2;
        // fs.readFile(`page/${name}`, 'utf8', (err,content)=>{
            // let control = `<a href="/create">create</a> <a href="/update?name=${data2[0].id}">update</a>`
            name = data2[0].name
            const data = template.update(data2[0].id, data2[0].title, name, data2[0].detail)
            const html = template.HTML(name, list, `<h2>${data2[0].title}</h2><p>${data}</p>`, '')
            res.send(html)  
        })
    })
})
app.get('/delete', (req, res)=>{
    let {name} = req.query
    db.query('SELECT * from data',(err, data)=>{
        if (err) throw err;
        let list = template.list(data)
        db.query('SELECT * from data where id = ?', [name],(err2, data2)=>{
            if (err2) throw err2;
            // fs.readFile(`page/${name}`, 'utf8', (err,content)=>{
            // let control = `<a href="/delete">delete</a> <a href="/delete?name=${data2[0].id}">delete</a>`

            const data = template.delete(data2[0].id)
            const html = template.HTML(name, list, data, '')
            res.send(html)  
        })
    })
})



//process
app.post('/create_process', (req, res)=>{
    let body = ''
    req.on('data', (data)=>{
        body = body + data
    })
    req.on('end', ()=>{
        const post = qs.parse(body)
        const title = post.title
        const name = post.name
        const detail = post.detail
        db.query(`insert into data (created, title, name, detail) values (now(), ?, ?, ?)`, [title, name, detail],(err, result)=>{
            if (err) throw err;
            res.redirect(302, `/?name=${result.insertId}`)
        })
        // fs.writeFile(`page/${title}`, description, 'utf8', (err)=>{
        //     res.redirect(302, `/?name=${title}`)
        // })
    })
})
app.post('/update_process', (req, res)=>{
    let body = ''
    req.on('data', (data)=>{
        body = body + data
    })
    req.on('end', ()=>{
        const post = qs.parse(body)
        const id = post.id
        const title = post.title
        const name = post.name
        const detail = post.detail
        db.query('UPDATE data set title = ?, name = ?, detail = ? where id = ?', [title, name, detail, id],(err, result)=>{
            if (err) throw err;
            res.redirect(302, `/?name=${id}`)
        })
        // fs.rename(`page/${id}`, `page/${title}`, (err)=>{  // 파일명 변경 시 처리
        //     fs.writeFile(`page/${title}`, description, 'utf8', (err)=>{
        //         res.redirect(302, `/?name=${title}`)
        //     })    
        // })
    })
})
app.post('/delete_process', (req, res)=>{
    let body = ''
    req.on('data', (data)=>{
        body = body + data
    })
    req.on('end', ()=>{
        const post = qs.parse(body)
        const id = post.id
        db.query('DELETE from data where id = ?', [id],(err, result)=>{
            if (err) throw err;
            res.redirect(302, `/`)
        })
        // fs.unlink(`page/${id}`, (err)=>{  // 파일 삭제 처리
        //     res.redirect(302, `/`)  //  삭제 후 홈으로 redirect
        // })
    })
})
app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})